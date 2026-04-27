# Deploy Runbook — Ascension Capital Partners

**Target:** `ascensioncapitalpartner.com` on Vercel.
**Time budget:** ~45 min first deploy. Subsequent deploys are auto on git push.
**Principal:** Joshua Ting · `jt@ascensioncapitalpartner.com`

---

## File tree

```
acp-site-deploy/
├── index.html              Flagship home (v2.0, Brand Suite v1.0)
├── ir.html                 LP Portal           ← middleware-gated
├── docs.html               Client Data Rooms   ← middleware-gated
├── portal.html             Template OS         ← middleware-gated
├── ops.html                Ops Command Centre  ← middleware-gated
├── client-portal.html      Public enquiry page
├── internal-portal.html    Password gate → /api/auth
├── middleware.js           Edge guard: cookie presence on /portal, /ir, /docs, /ops
├── vercel.json             Routing, security headers, noindex on internals
├── robots.txt              Internal routes disallowed
├── sitemap.xml             Public routes only
├── .env.example            Template — DO NOT COMMIT filled version
└── api/
    ├── auth.js             HttpOnly HMAC-signed session cookie
    └── enquiry.js          Resend relay → RESEND_TO inbox
```

---

## Pre-flight (do these once, ~20 min)

### 1. Domain

You've registered `ascensioncapitalpartner.com` (singular). Keep it at your current registrar — Cloudflare Registrar recommended for at-cost pricing and free WHOIS privacy. No registrar change needed for this deploy.

### 2. Resend account

1. Sign up at https://resend.com (free tier: 3,000 emails/month, 100/day — enough for enquiry traffic)
2. **Domains** → Add Domain → `ascensioncapitalpartner.com`
3. Copy the 3 DNS records Resend shows (MX, SPF, DKIM) → paste into Cloudflare DNS
4. Wait for verification (usually 5 min). Don't proceed until green
5. **API Keys** → Create API Key → scope: "Sending access" → copy the `re_...` key (shown once)

### 3. Generate secrets

Run each command, save the output:

```bash
# INTERNAL_ACCESS_CODE — the password you'll type at /internal-portal
openssl rand -base64 24

# INTERNAL_SESSION_SECRET — signs the session cookie
openssl rand -base64 48
```

Store these in 1Password or similar. Never commit.

---

## Deploy (once, ~15 min)

### 4. Push to GitHub

```bash
cd acp-site-deploy
git init
echo ".env*" > .gitignore
echo "node_modules" >> .gitignore
git add .
git commit -m "ACP flagship site — initial deploy"

# Create a private repo on github.com first, then:
git remote add origin git@github.com:YOUR_USERNAME/acp-site.git
git branch -M main
git push -u origin main
```

### 5. Import to Vercel

1. vercel.com → **Add New...** → **Project**
2. Import your `acp-site` repo
3. Framework preset: **Other** (it's static HTML + serverless functions)
4. Root directory: `./`
5. Build command: **leave empty**
6. Output directory: **leave empty**
7. **Environment Variables** — paste these 5 (click "Add" for each):

   | Name | Value |
   |---|---|
   | `INTERNAL_ACCESS_CODE` | from Step 3 |
   | `INTERNAL_SESSION_SECRET` | from Step 3 |
   | `RESEND_API_KEY` | `re_...` from Step 2 |
   | `RESEND_FROM` | `Ascension Capital <enquiries@ascensioncapitalpartner.com>` |
   | `RESEND_TO` | `jt@ascensioncapitalpartner.com` |

8. **Deploy**. Takes 30–60 sec. Site lives at `your-project.vercel.app` immediately.

### 6. Attach custom domain

1. Vercel → Project → **Settings** → **Domains**
2. Add `ascensioncapitalpartner.com` AND `www.ascensioncapitalpartner.com`
3. Vercel shows 2 DNS records to add
4. Cloudflare → DNS → add those records → set proxy status to **DNS only** (grey cloud, not orange) for the initial SSL handshake. Switch to proxied (orange) after SSL is live
5. Wait 2–10 min for SSL provisioning. Both domains go green

### 7. Verify — 5-minute smoke test

| Test | Expected |
|---|---|
| `https://ascensioncapitalpartner.com` | Flagship site renders |
| `https://www.ascensioncapitalpartner.com` | Same (redirect or mirror) |
| Open `/portal` in incognito | Redirects to `/internal-portal?next=%2Fportal` |
| Type wrong code | "Invalid access code" |
| Type correct code | Redirects to `/portal`, stays logged in for 8h |
| Submit an enquiry on `/client-portal` | Email lands in `jt@ascensioncapitalpartner.com` |
| Check `/robots.txt` | Shows disallows |
| Check HTTP response headers | `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN` present |

---

## Day-2 operations

### Update a page
```bash
# Edit the HTML locally
git add . && git commit -m "Update copy" && git push
# Vercel auto-deploys in 30 sec
```

### Rotate the access code
Vercel → Settings → Environment Variables → edit `INTERNAL_ACCESS_CODE` → Redeploy. All existing sessions invalidated immediately.

### Monitor enquiries
Vercel → Logs → filter `ACP_ENQUIRY`. Every submission is logged server-side even if Resend delivery fails.

### Add a new protected page
1. Drop `newpage.html` at root
2. Add to `middleware.js` matcher array: `'/newpage/:path*', '/newpage'`
3. Add to `vercel.json` rewrites if you want a clean URL
4. Add to `robots.txt` disallow + `X-Robots-Tag: noindex` in vercel.json headers

---

## Known limitations (accept for v1, fix in Phase 1)

1. **middleware.js checks cookie presence only, not HMAC validity.** If someone copies a logged-in session cookie off another browser, it works until the 8h max-age expires. Mitigation: short max-age + HTTPS-only + SameSite=Strict. Phase 1 fix: verify HMAC in a Node-runtime middleware or move to Supabase Auth.

2. **Internal pages (ir.html, docs.html, portal.html, ops.html) still on old brand** (EB Garamond + `#C5A55A` gold). Flagship + gates on new Brand Suite v1.0 (Cormorant Garamond + `#C9A84C`). These are JT-only, not counterparty-facing — brand reconciliation is Phase 1.

3. **No CMS.** Content edits = git push. Phase 1 decision: Sanity (per platform strategy) or stay static.

4. **Analytics not wired.** Add Plausible or Vercel Analytics in Phase 1.

---

*Ascension Capital Partners · Confidential · ACN 674 649 417*
*Document: ACP-DEPLOY-v1.0-2026-04-18*
