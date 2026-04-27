// /api/enquiry — Ascension Capital Partners enquiry handler
// Posts enquiry to Resend (or logs to console if RESEND_API_KEY not set).
// Always returns 200 + { ok:true, ref } so the UI never breaks.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeJSON(req.body) : (req.body || {});
  const ref = body.ref || ('ACP-ENQ-' + Date.now().toString(36).toUpperCase());

  const html = `
    <h2 style="font-family:Georgia,serif;color:#0A0E1A">New Enquiry · Ascension Capital Partners</h2>
    <p><strong>Ref:</strong> ${escape(ref)}</p>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
      ${row('Name', body.name)}
      ${row('Organisation', body.organisation)}
      ${row('Title', body.title)}
      ${row('Email', body.email)}
      ${row('Phone', body.phone)}
      ${row('Enquiry Type', body.enquiry_type)}
      ${row('Interests', body.interests)}
      ${row('Capital', body.capital)}
      ${row('Message', body.message)}
      ${row('Source', body.source)}
      ${row('Timestamp', body.ts)}
    </table>
  `;

  // Log server-side (visible in Vercel function logs regardless)
  console.log('ACP_ENQUIRY', JSON.stringify({ ref, ...body }));

  // If RESEND_API_KEY is configured, deliver email
  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Ascension Capital <enquiries@ascensioncapitalpartners.com>',
          to: [process.env.RESEND_TO || 'joshuating53@outlook.com'],
          subject: `[ACP Enquiry] ${body.name || 'Unknown'} · ${body.organisation || '—'} · ${ref}`,
          html,
          reply_to: body.email || undefined
        })
      });
    } catch (e) {
      console.error('Resend delivery failed', e);
    }
  }

  return res.status(200).json({ ok: true, ref });
}

function safeJSON(s) { try { return JSON.parse(s); } catch { return {}; } }
function escape(s) { return String(s || '').replace(/[<>&"]/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;' }[c])); }
function row(label, val) {
  if (!val) return '';
  return `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666">${label}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${escape(val)}</td></tr>`;
}
