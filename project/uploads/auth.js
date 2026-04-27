// /api/auth — Internal portal access gate
// Checks submitted code against INTERNAL_ACCESS_CODE env var.
// Returns { ok:true } with session cookie if match.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }
  const body = typeof req.body === 'string' ? safeJSON(req.body) : (req.body || {});
  const expected = process.env.INTERNAL_ACCESS_CODE;

  // If no code configured yet, deny all (fail-closed)
  if (!expected) {
    return res.status(200).json({ ok: false, msg: 'Access code not configured' });
  }

  if (body.code === expected) {
    // Set a short-lived session cookie (8h)
    res.setHeader('Set-Cookie', [
      `acp_session=${sign(body.code)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`
    ]);
    return res.status(200).json({ ok: true });
  }
  return res.status(200).json({ ok: false });
}

function safeJSON(s) { try { return JSON.parse(s); } catch { return {}; } }
function sign(s) {
  // Very simple signed marker — Vercel deployment protection should be primary defence
  return Buffer.from(String(s)).toString('base64').replace(/=/g,'') + '.' + Date.now().toString(36);
}
