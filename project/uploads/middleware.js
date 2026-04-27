// middleware.js — Ascension Capital Partners
// Edge guard for internal routes. Runs BEFORE static files are served,
// which is the only way to actually protect static HTML on Vercel.
//
// Protected routes: /portal, /ir, /docs, /ops (and all sub-paths).
// Gate: presence of the `acp_session` cookie set by /api/auth.
// Missing/invalid cookie → rewrite to /internal-portal (the password gate).
//
// NOTE: The cookie is a presence-only marker. For production-grade
// protection, layer Vercel "Password Protection" (Pro plan) on top of
// this, or migrate to Supabase/NextAuth signed JWTs.

export const config = {
  matcher: ['/portal/:path*', '/ir/:path*', '/docs/:path*', '/ops/:path*', '/portal', '/ir', '/docs', '/ops']
};

export default function middleware(request) {
  const url = new URL(request.url);

  // Read cookie header manually (edge runtime)
  const cookieHeader = request.headers.get('cookie') || '';
  const hasSession = /(?:^|;\s*)acp_session=([^;]+)/.test(cookieHeader);

  if (hasSession) {
    // Presence check only — cookie is HttpOnly, Secure, 8h max-age per auth.js
    return; // allow through
  }

  // No session → rewrite to gate, preserve intended destination
  const next = encodeURIComponent(url.pathname + url.search);
  const gate = new URL('/internal-portal', request.url);
  gate.searchParams.set('next', next);
  return Response.redirect(gate.toString(), 302);
}
