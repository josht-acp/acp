// server.js — ACP Fee Billing Portal
// Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd | ACN 674 649 417
// Requires Node >= 22 (built-in SQLite via node:sqlite)

'use strict';
require('dotenv').config();

const { DatabaseSync } = require('node:sqlite');
const express          = require('express');
const helmet           = require('helmet');
const morgan           = require('morgan');
const rateLimit        = require('express-rate-limit');
const Stripe           = require('stripe');
const { v4: uuidv4 }  = require('uuid');
const path             = require('path');
const fs               = require('fs');

const app    = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PORT   = process.env.PORT || 3000;
const BASE   = process.env.BASE_URL || `http://localhost:${PORT}`;

// ─── Database ─────────────────────────────────────────────────
const dbPath = process.env.DB_PATH || './db/acp_payments.db';
if (!fs.existsSync(path.dirname(dbPath))) fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);

db.exec(`PRAGMA journal_mode = WAL;`);
db.exec(`PRAGMA foreign_keys = ON;`);
db.exec(`
  CREATE TABLE IF NOT EXISTS payment_sessions (
    id TEXT PRIMARY KEY, session_id TEXT UNIQUE NOT NULL,
    mandate_ref TEXT NOT NULL, client_name TEXT NOT NULL, client_email TEXT NOT NULL,
    fee_type TEXT NOT NULL, sku_code TEXT NOT NULL, amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd', status TEXT NOT NULL DEFAULT 'pending',
    stripe_customer TEXT, stripe_pi TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT, metadata TEXT
  );
  CREATE TABLE IF NOT EXISTS payment_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT, session_ref TEXT NOT NULL DEFAULT 'unknown',
    event_type TEXT NOT NULL, stripe_event_id TEXT, payload TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS fee_ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT, mandate_ref TEXT NOT NULL,
    client_name TEXT NOT NULL, sku_code TEXT NOT NULL, fee_type TEXT NOT NULL,
    amount_usd REAL NOT NULL, currency TEXT NOT NULL, status TEXT NOT NULL,
    stripe_session TEXT, invoice_date TEXT NOT NULL DEFAULT (datetime('now')), notes TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_sessions_mandate ON payment_sessions(mandate_ref);
  CREATE INDEX IF NOT EXISTS idx_sessions_status  ON payment_sessions(status);
  CREATE INDEX IF NOT EXISTS idx_ledger_mandate   ON fee_ledger(mandate_ref);
`);

// Prepared statements
const stmts = {
  insertSession:       db.prepare(`INSERT INTO payment_sessions (id,session_id,mandate_ref,client_name,client_email,fee_type,sku_code,amount_cents,currency,status,stripe_customer,metadata) VALUES (?,?,?,?,?,?,?,?,'usd','pending',?,?)`),
  updateSessionPaid:   db.prepare(`UPDATE payment_sessions SET status='paid',stripe_pi=?,completed_at=datetime('now'),updated_at=datetime('now') WHERE session_id=?`),
  updateSessionStatus: db.prepare(`UPDATE payment_sessions SET status=?,updated_at=datetime('now') WHERE session_id=?`),
  updateByPi:          db.prepare(`UPDATE payment_sessions SET status=?,updated_at=datetime('now') WHERE stripe_pi=?`),
  insertLedger:        db.prepare(`INSERT INTO fee_ledger (mandate_ref,client_name,sku_code,fee_type,amount_usd,currency,status,stripe_session,notes) VALUES (?,?,?,?,?,?,'paid',?,?)`),
  insertEvent:         db.prepare(`INSERT INTO payment_events (session_ref,event_type,stripe_event_id,payload) VALUES (?,?,?,?)`),
  getSessions:         db.prepare(`SELECT * FROM payment_sessions ORDER BY created_at DESC LIMIT ?`),
  getByMandate:        db.prepare(`SELECT * FROM payment_sessions WHERE mandate_ref=? ORDER BY created_at DESC LIMIT ?`),
  getByStatus:         db.prepare(`SELECT * FROM payment_sessions WHERE status=? ORDER BY created_at DESC LIMIT ?`),
  getLedger:           db.prepare(`SELECT * FROM fee_ledger ORDER BY invoice_date DESC`),
};

// ─── ACP Fee SKU Registry ─────────────────────────────────────
const FEE_SKUS = {
  'ACP-FEE-ARR': { label:'Arrangement Fee',  productId:process.env.PROD_ARR, priceId:process.env.PRICE_ARR, description:'Arrangement fee charged upon successful financial close or arrangement of debt/equity capital.', variable:true,  recurring:false },
  'ACP-FEE-SUC': { label:'Success Fee',       productId:process.env.PROD_SUC, priceId:process.env.PRICE_SUC, description:'Success fee payable upon closing of a transaction, M&A deal, or capital raise.',                  variable:true,  recurring:false },
  'ACP-FEE-MOB': { label:'Mobilisation Fee',  productId:process.env.PROD_MOB, priceId:process.env.PRICE_MOB, description:'Mobilisation fee charged at mandate execution to cover initial programme deployment.',              variable:false, baseAmount:250000, recurring:false },
  'ACP-FEE-PLC': { label:'Placement Fee',     productId:process.env.PROD_PLC, priceId:process.env.PRICE_PLC, description:'Placement fee earned upon successful placement of equity or debt instruments.',                    variable:true,  recurring:false },
  'ACP-FEE-RET': { label:'Retainer Fee',      productId:process.env.PROD_RET, priceId:process.env.PRICE_RET, description:'Monthly advisory retainer covering ongoing mandate management and execution oversight.',           variable:false, baseAmount:500000, recurring:true, interval:'month' },
  'ACP-FEE-EQY': { label:'Equity Earnout',    productId:process.env.PROD_EQY, priceId:process.env.PRICE_EQY, description:'Equity earnout entitlement crystallised per contractual milestones.',                             variable:true,  recurring:false },
  'ACP-FEE-CSH': { label:'Cash Strip',        productId:process.env.PROD_CSH, priceId:process.env.PRICE_CSH, description:'Cash strip payment from deal proceeds at financial close.',                                       variable:true,  recurring:false },
  'ACP-FEE-TL':  { label:'Tail Fee',          productId:process.env.PROD_TL,  priceId:process.env.PRICE_TL,  description:'Tail fee payable on transactions completed within the tail period post-mandate.',                  variable:true,  recurring:false },
  'ACP-FEE-SET': { label:'Setup Fee',         productId:process.env.PROD_SET, priceId:process.env.PRICE_SET, description:'One-time setup fee for programme onboarding, data room establishment, and mandate initialisation.',variable:false, baseAmount:250000, recurring:false },
};

// ─── Middleware ───────────────────────────────────────────────
app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);
app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc:["'self'"], scriptSrc:["'self'","https://js.stripe.com","'unsafe-inline'"], styleSrc:["'self'","https://fonts.googleapis.com","'unsafe-inline'"], fontSrc:["'self'","https://fonts.gstatic.com"], frameSrc:["'self'","https://js.stripe.com"], connectSrc:["'self'","https://api.stripe.com"], imgSrc:["'self'","data:","https:"] } } }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorised' });
  next();
}

// ─── API Routes ───────────────────────────────────────────────
app.get('/api/skus', (_req, res) => {
  res.json({ skus: Object.entries(FEE_SKUS).map(([sku, d]) => ({ sku, label:d.label, description:d.description, variable:d.variable, recurring:d.recurring, interval:d.interval||null, baseAmount:d.baseAmount ? d.baseAmount/100 : null })) });
});

app.post('/api/checkout', async (req, res) => {
  try {
    const { sku_code, mandate_ref, client_name, client_email, amount_usd, notes } = req.body;
    if (!sku_code || !mandate_ref || !client_name || !client_email) return res.status(400).json({ error: 'Missing required fields' });
    const sku = FEE_SKUS[sku_code];
    if (!sku) return res.status(400).json({ error: `Unknown SKU: ${sku_code}` });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email)) return res.status(400).json({ error: 'Invalid email' });

    let amountCents = sku.variable ? Math.round(parseFloat(amount_usd) * 100) : sku.baseAmount;
    if (sku.variable && (!amount_usd || amountCents <= 0)) return res.status(400).json({ error: 'amount_usd required > 0' });

    const existing = await stripe.customers.list({ email: client_email, limit: 1 });
    const customer = existing.data[0] || await stripe.customers.create({ email: client_email, name: client_name, metadata: { mandate_ref, platform: 'ACP-FEE-PORTAL' } });

    let priceId = sku.priceId;
    if (sku.variable) {
      const p = await stripe.prices.create({ unit_amount: amountCents, currency: 'usd', product: sku.productId });
      priceId = p.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: sku.recurring ? 'subscription' : 'payment',
      success_url: `${BASE}/success?session_id={CHECKOUT_SESSION_ID}&mandate=${encodeURIComponent(mandate_ref)}`,
      cancel_url:  `${BASE}/cancel?mandate=${encodeURIComponent(mandate_ref)}`,
      metadata: { mandate_ref, sku_code, client_name, platform: 'ACP-FEE-PORTAL', notes: notes || '' },
      ...(!sku.recurring && { invoice_creation: { enabled: true } }),
    });

    const internalId = uuidv4();
    stmts.insertSession.run(internalId, session.id, mandate_ref, client_name, client_email, sku.label, sku_code, amountCents, customer.id, JSON.stringify({ notes: notes || '' }));

    res.json({ session_id: session.id, checkout_url: session.url, internal_id: internalId, amount_usd: amountCents / 100, sku_code, mandate_ref });
  } catch (err) {
    console.error('Checkout error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/payment-link', requireAdmin, async (req, res) => {
  try {
    const { sku_code, amount_usd } = req.body;
    const sku = FEE_SKUS[sku_code];
    if (!sku) return res.status(400).json({ error: `Unknown SKU: ${sku_code}` });
    let priceId = sku.priceId;
    if (sku.variable) {
      if (!amount_usd) return res.status(400).json({ error: 'amount_usd required' });
      const p = await stripe.prices.create({ unit_amount: Math.round(parseFloat(amount_usd) * 100), currency: 'usd', product: sku.productId });
      priceId = p.id;
    }
    const link = await stripe.paymentLinks.create({ line_items: [{ price: priceId, quantity: 1 }] });
    res.json({ url: link.url, sku_code, amount_usd: sku.variable ? amount_usd : sku.baseAmount / 100 });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/sessions', requireAdmin, (req, res) => {
  const { mandate, status, limit = 50 } = req.query;
  const rows = mandate ? stmts.getByMandate.all(mandate, +limit)
             : status  ? stmts.getByStatus.all(status, +limit)
             :            stmts.getSessions.all(+limit);
  res.json({ sessions: rows, count: rows.length });
});

app.get('/api/ledger', requireAdmin, (req, res) => {
  const rows  = stmts.getLedger.all();
  const total = rows.reduce((s, r) => s + (r.status === 'paid' ? r.amount_usd : 0), 0);
  res.json({ ledger: rows, total_collected_usd: +total.toFixed(2), count: rows.length });
});

app.get('/api/status/:session_id', async (req, res) => {
  try {
    const s = await stripe.checkout.sessions.retrieve(req.params.session_id);
    res.json({ status: s.status, payment_status: s.payment_status, customer_email: s.customer_details?.email, amount_total: s.amount_total ? s.amount_total / 100 : null, currency: s.currency });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── Webhook Handler ──────────────────────────────────────────
async function handleWebhook(req, res) {
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`📨 ${event.type}`);
  const logEvt = (ref, obj) => { try { stmts.insertEvent.run(ref || 'unknown', event.type, event.id, JSON.stringify(obj)); } catch (_) {} };

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object;
      const { mandate_ref, sku_code, client_name, notes } = s.metadata || {};
      stmts.updateSessionPaid.run(s.payment_intent || s.id, s.id);
      if (mandate_ref && sku_code) {
        const sku = FEE_SKUS[sku_code];
        stmts.insertLedger.run(mandate_ref, client_name || s.customer_details?.name || 'Unknown', sku_code, sku?.label || sku_code, (s.amount_total || 0) / 100, s.currency || 'usd', s.id, notes || '');
      }
      if (process.env.NOTIFICATION_WEBHOOK_URL) {
        fetch(process.env.NOTIFICATION_WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ event:'payment_received', mandate_ref, sku_code, amount_usd:(s.amount_total||0)/100, client:s.customer_details?.email, ts:new Date().toISOString() }) }).catch(()=>{});
      }
      logEvt(s.id, s);
      break;
    }
    case 'checkout.session.expired': {
      const s = event.data.object;
      stmts.updateSessionStatus.run('expired', s.id);
      logEvt(s.id, s);
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object;
      stmts.updateByPi.run('failed', pi.id);
      logEvt(pi.id, pi);
      break;
    }
    default:
      logEvt(null, event.data.object);
  }
  res.json({ received: true });
}

// ─── Health + Start ───────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status:'ok', service:'ACP Fee Billing Portal', env:process.env.NODE_ENV||'development', stripe:process.env.STRIPE_SECRET_KEY?.startsWith('sk_test')?'test':'live', db:fs.existsSync(dbPath)?'connected':'missing', skus:Object.keys(FEE_SKUS).length, ts:new Date().toISOString() }));

app.listen(PORT, () => console.log(`
╔══════════════════════════════════════════════════════════════╗
║   ASCENSION CAPITAL PARTNERS — FEE BILLING PORTAL            ║
║   t/a APEX Consulting Partners Pty Ltd  |  ACN 674 649 417   ║
╠══════════════════════════════════════════════════════════════╣
║   http://localhost:${PORT}  |  Stripe: ${process.env.STRIPE_SECRET_KEY?.startsWith('sk_test')?'TEST':'LIVE'}  |  SKUs: ${Object.keys(FEE_SKUS).length}           ║
╚══════════════════════════════════════════════════════════════╝`));

module.exports = app;
