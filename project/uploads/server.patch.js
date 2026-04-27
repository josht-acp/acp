// ============================================================
// server.patch.js — ACP Portal Webhook Callback Extension
// Paste these routes into server.js BEFORE app.listen()
// Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd
// ============================================================
//
// WHAT THIS ADDS:
//   POST /api/sheets-webhook  → receive inbound calls from Google Sheets
//   POST /api/notion-sync     → manually trigger Notion sync for a mandate
//   GET  /api/health/full     → full system health including Stripe + Notion
//
// ALSO ADD to .env:
//   NOTION_TOKEN=secret_...
//   NOTION_DEALS_DB=6b68a34e-465f-4cbc-bf61-8f8b55b3fc12
//   GOOGLE_SHEETS_WEBHOOK_SECRET=your-shared-secret-with-apps-script
// ============================================================

// ─── Google Sheets Inbound Webhook ───────────────────────────
// Receives form submissions directly from Google Apps Script
// Use when Google Workspace → Portal (instead of Portal → Google Workspace)
app.post('/api/sheets-webhook', async (req, res) => {
  try {
    // Verify shared secret from Apps Script
    const secret = req.headers['x-sheets-secret'];
    if (process.env.GOOGLE_SHEETS_WEBHOOK_SECRET && secret !== process.env.GOOGLE_SHEETS_WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    const { mandate_ref, client_name, client_email, sku_code, amount_usd, notes } = req.body;

    if (!mandate_ref || !client_name || !client_email || !sku_code) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sku = FEE_SKUS[sku_code];
    if (!sku) return res.status(400).json({ error: `Unknown SKU: ${sku_code}` });

    // Create Stripe customer
    const existing = await stripe.customers.list({ email: client_email, limit: 1 });
    const customer = existing.data[0] || await stripe.customers.create({
      email: client_email, name: client_name,
      metadata: { mandate_ref, platform: 'ACP-SHEETS-WEBHOOK' },
    });

    // Create price for variable fees
    let priceId = sku.priceId;
    const amtCents = sku.variable ? Math.round(parseFloat(amount_usd) * 100) : sku.baseAmount;
    if (sku.variable) {
      const p = await stripe.prices.create({ unit_amount: amtCents, currency: 'usd', product: sku.productId });
      priceId = p.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: sku.recurring ? 'subscription' : 'payment',
      success_url: `${BASE}/success?session_id={CHECKOUT_SESSION_ID}&mandate=${encodeURIComponent(mandate_ref)}`,
      cancel_url:  `${BASE}/cancel?mandate=${encodeURIComponent(mandate_ref)}`,
      metadata: { mandate_ref, sku_code, client_name, platform: 'ACP-SHEETS-WEBHOOK', notes: notes || '' },
      ...(!sku.recurring && { invoice_creation: { enabled: true } }),
    });

    // DB record
    const { v4: uuidv4 } = require('uuid');
    const internalId = uuidv4();
    stmts.insertSession.run(internalId, session.id, mandate_ref, client_name, client_email, sku.label, sku_code, amtCents, customer.id, JSON.stringify({ notes: notes || '', source: 'google-sheets' }));

    console.log(`📋 Sheets webhook → checkout created: ${session.id} | ${mandate_ref}`);
    res.json({ session_id: session.id, checkout_url: session.url, amount_usd: amtCents / 100 });

  } catch (err) {
    console.error('Sheets webhook error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ─── Manual Notion Sync ───────────────────────────────────────
app.post('/api/notion-sync', requireAdmin, async (req, res) => {
  try {
    const { mandate_ref } = req.body;
    const notionToken = process.env.NOTION_TOKEN;
    const notionDb    = process.env.NOTION_DEALS_DB || '6b68a34e-465f-4cbc-bf61-8f8b55b3fc12';

    if (!notionToken) return res.status(500).json({ error: 'NOTION_TOKEN not set' });
    if (!mandate_ref) return res.status(400).json({ error: 'mandate_ref required' });

    // Pull paid sessions for this mandate from DB
    const sessions = stmts.getByMandate.all(mandate_ref, 50).filter(s => s.status === 'paid');
    const totalPaid = sessions.reduce((sum, s) => sum + s.amount_cents / 100, 0);

    // Search Notion for the deal
    const searchResp = await fetch(`https://api.notion.com/v1/databases/${notionDb}/query`, {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${notionToken}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28' },
      body: JSON.stringify({ filter: { property: 'Deal Name', title: { contains: mandate_ref } } }),
    });
    const searchData = await searchResp.json();
    if (!searchData.results?.length) return res.status(404).json({ error: 'Deal not found in Notion: ' + mandate_ref });

    const pageId = searchData.results[0].id;

    // Add comment to Notion page
    const comment = `[ACP-FEE-PORTAL SYNC] ${mandate_ref} — ${sessions.length} payment(s) confirmed | Total: $${totalPaid.toFixed(2)} USD | Sessions: ${sessions.map(s => s.session_id.substring(0, 16)).join(', ')}`;
    await fetch('https://api.notion.com/v1/comments', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${notionToken}`, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28' },
      body: JSON.stringify({ parent: { page_id: pageId }, rich_text: [{ type: 'text', text: { content: comment } }] }),
    });

    res.json({ synced: true, page_id: pageId, mandate_ref, sessions_synced: sessions.length, total_paid_usd: totalPaid });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Full Health Check ────────────────────────────────────────
app.get('/api/health/full', requireAdmin, async (req, res) => {
  const checks = {};

  // Stripe connectivity
  try {
    await stripe.products.list({ limit: 1 });
    checks.stripe = { ok: true, mode: process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'test' : 'live' };
  } catch (e) { checks.stripe = { ok: false, error: e.message }; }

  // Notion connectivity
  if (process.env.NOTION_TOKEN) {
    try {
      const r = await fetch('https://api.notion.com/v1/users/me', { headers: { 'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 'Notion-Version': '2022-06-28' } });
      const d = await r.json();
      checks.notion = { ok: r.ok, user: d.name || d.bot?.owner?.user?.name };
    } catch (e) { checks.notion = { ok: false, error: e.message }; }
  } else {
    checks.notion = { ok: false, error: 'NOTION_TOKEN not configured' };
  }

  // Database
  try {
    const sessionCount = db.prepare('SELECT COUNT(*) as c FROM payment_sessions').get();
    const ledgerCount  = db.prepare('SELECT COUNT(*) as c FROM fee_ledger').get();
    checks.database = { ok: true, sessions: sessionCount.c, ledger_rows: ledgerCount.c };
  } catch (e) { checks.database = { ok: false, error: e.message }; }

  res.json({
    status:   Object.values(checks).every(c => c.ok) ? 'healthy' : 'degraded',
    ts:       new Date().toISOString(),
    checks,
  });
});
