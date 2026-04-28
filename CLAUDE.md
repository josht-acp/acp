# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

```
project/        Design source — wireframes, tokens, copy doctrine (read-only reference)
app/
  web/          Next.js 14 App Router — marketing site + LP portal UI
  server/       Fastify 4 — REST API, auth, LP data endpoints
  db/           PostgreSQL 16 schema + seed (no ORM)
```

## Commands

### API server (`app/server`)
```bash
npm run dev          # tsx watch — hot reload on :4000
npm run build        # tsc → dist/
npm run db:migrate   # apply db/schema.sql
npm run db:seed      # seed demo LP (demo@macquarie.com / Macquarie Pension Trust)
```

### Web app (`app/web`)
```bash
npm run dev          # Next.js dev on :3000
npm run build        # static export → out/ (output: export)
npm run lint         # next lint
```

### Local dev setup (first time)
```bash
# 1. Postgres (Docker)
docker run -d --name acp-db -e POSTGRES_DB=acp -e POSTGRES_USER=acp \
  -e POSTGRES_PASSWORD=acp_dev -p 5432:5432 postgres:16-alpine

# 2. Server
cd app/server && cp .env.example .env   # set JWT_SECRET at minimum
npm install && npm run db:migrate && npm run db:seed && npm run dev

# 3. Web
cd app/web && echo "API_URL=http://localhost:4000" > .env.local
npm install && npm run dev
```

### Full stack via Docker
```bash
cd app && cp server/.env.example server/.env
docker compose up --build
```

## Architecture

### Auth flow (magic-link, no passwords)
1. `POST /api/v1/auth/request-link` — creates a 15-min token in `magic_links` table; emails it (or logs to stdout in dev when SMTP fails)
2. `GET /api/v1/auth/verify?token=xxx` — marks token used, creates `sessions` row with a `jwt_jti`, issues 30-day JWT
3. Every LP API request goes through `requireAuth` (`server/src/middleware/auth.ts`) — verifies JWT, checks `sessions.revoked_at IS NULL`, loads user
4. `POST /api/v1/auth/logout` — sets `sessions.revoked_at`

### Deployment (Netlify + Railway)
The web app uses `output: 'export'` — Next.js rewrites are unavailable. API proxying in production is handled by `app/web/public/_redirects` (Netlify redirects `/api/v1/*` to the Railway backend URL). Update the Railway URL in `_redirects` when the backend is redeployed.

**To deploy the web:** `npm run build` in `app/web` → drag the `out/` folder to Netlify.

In local dev, Next.js rewrites in `next.config.js` proxy `/api/v1/*` → `API_URL` (default `http://localhost:4000`). Frontend never references the Fastify hostname directly.

### Portal vs marketing layout
`app/web/src/app/layout.tsx` — root layout with marketing Nav + Footer  
`app/web/src/app/portal/layout.tsx` — separate root layout (own `<html><body>`) with only `PortalNav`; no marketing chrome

### LP portal pages (all `'use client'`)
All portal pages check `localStorage.getItem('acp-portal-token')` on mount; redirect to `/portal` if missing. They fetch from `/api/v1/lp/*` with `Authorization: Bearer <token>`.

| Route | Data source |
|-------|-------------|
| `/portal/overview` | `GET /api/v1/lp/overview` — summary, performance metrics, fund list, recent calls |
| `/portal/holdings` | Same endpoint, rendered per-fund |
| `/portal/capital-calls` | `GET /api/v1/lp/capital-calls` |
| `/portal/documents` | `GET /api/v1/lp/documents` + per-doc download URL |
| `/portal/messages` | `GET /api/v1/lp/messages` + `POST` to send |

### Database
All monetary values stored as **cents (BIGINT)**. All LP data queries filter by `user_id` (row-level security in application code). `audit_log` is written on login, doc view, and doc download. Schema is in `app/db/schema.sql` — applied via `db:migrate`, no migration framework.

### Shared portal styles
`app/web/src/app/portal/portal-pages.module.css` — stat cards, metric grids, tables, status chips used across all authenticated portal pages.

## Design system

**Colors** — `--acp-midnight: #0A0E1A` · `--acp-gold: #C9A84C` · `--acp-pearl: #CBD5E1` · `--acp-silver: #94A3B8` · `--acp-steel: #4A5568`  
**Fonts** — Cormorant Garamond (display/headings) · DM Sans (body) · JetBrains Mono (labels, chips, mono accents)  
**Gold gradient** — `linear-gradient(135deg, #9A7B2E 0%, #C9A84C 50%, #E2C97E 100%)`  
**Tokens file** — `app/web/src/styles/tokens.css` (imported by globals.css; do not invent values outside these)

All styling uses **CSS Modules**. No Tailwind. No inline styles except one-off layout values.

**CSS Modules gotcha:** bare element selectors (e.g. `button:disabled`) cause a build error ("pure selector" violation). Always scope to a local class: `.myBtn:disabled`.

## Client identity

**Ascension Capital Partners (ACP)** — legal entity: APEX Consulting Partners Pty Ltd, ACN 674 649 417. Principal: Joshua Ting (JT), Executive Managing Partner. Sydney-based, 3-person team.

**Voice rules from `project/CLAUDE.md`:**
- Never use "institutional" as filler — use "principal-led", "GP-on-balance-sheet", "mandate-grade"
- "Latest from the Ascent" — "the Ascent" is the publication name; italic + gold treatment
- Footer link: "Platform Memorandum" not "Thesis"
- Vertical name: "Critical Minerals & Commodities" (full name, every occurrence)
- Team grid: JT + Partner 02 + Partner 03 (3 people)
- JT types fast with typos — treat "wew"→"we", "aaadd"→"add" without asking

## Static content

All marketing copy lives in `app/web/src/lib/data.ts`: `VERTICALS` (5 items with slugs, criteria, ticket sizes), `TRANSACTIONS` (12 deals), `INSIGHTS` (3 articles). The capabilities dynamic route `app/web/src/app/capabilities/[slug]/page.tsx` uses `generateStaticParams()` over the 5 vertical slugs.

## Environment variables

**`app/server/.env`** — `DATABASE_URL`, `JWT_SECRET` (required); `SMTP_HOST/PORT/USER/PASS/FROM`, `NOTIFY_EMAIL`, `APP_URL`  
**`app/web/.env.local`** — `API_URL` (defaults to `http://localhost:4000`)

In development without SMTP, magic links are printed to the server console — this is intentional.

**`dotenv/config` requirement:** `tsx` does not auto-load `.env`. All server entrypoints (`src/index.ts`, `src/db/migrate.ts`, `src/db/seed.ts`) must have `import 'dotenv/config'` as their first import.
