# ACP Wireframe Project — Persistent Memory

Last updated: 22 Apr 2026

## Who this is for
**Ascension Capital Partners (ACP)** — a single-principal, Sydney-based boutique running as an institutional-grade alternatives shop. Principal is **Joshua Ting (JT)**, Executive Managing Partner & Global Head of Alternatives & Private Markets. Legal entity is **APEX Consulting Partners Pty Ltd, ACN 674 649 417**. Team is **three people** currently (JT + 2 partners; names to be supplied).

**Never say "institutional" as filler.** JT has explicitly pushed back on the word being overused. Use specific, varied language — "principal-led," "GP-on-balance-sheet," "mandate-grade," etc.

## What lives in this project

### Marketing site wireframes (the primary deliverable)
- **`wireframe.html`** — design canvas with 18 artboards (9 pages × desktop + mobile). Loads `wf-shared.jsx` (chrome, hero, primitives) and `wf-pages.jsx` (pages) via Babel.
- **`wireframe-print.html`** — flattened print build for PDF export. Cover + TOC + 18 pages, desktop scaled from 1440 to A3 landscape, mobile at native 390 on A4 portrait.
- **`wireframe.css`** — all styles; imports `acp-tokens.css`.
- **`acp-tokens.css` + `acp-marketing.css`** — the ACP design system (midnight navy + gold + serif display + mono accents). Use these tokens; don't invent colors.
- **`chrome.jsx` + `design-canvas.jsx`** — canvas shell components.

### Pages covered (9 total)
1. **Homepage** — hero ("Everest peak" clean PNG cutout on midnight), verticals, transactions teaser, insights, CTA band
2. **About** — doctrine, **3-partner team grid** (JT + 2 placeholders), approach
3. **Energy Transition** (vertical template)
4. **Digital Infrastructure** (vertical template)
5. **Private Credit** (vertical template)
6. **Critical Minerals & Commodities** (vertical template) — renamed from "Critical Minerals"
7. **Impact Real Assets** (vertical template)
8. **Contact** — form, direct contact cards
9. **Track Record · Transactions** — filterable deal grid, 12+ transactions with varied role labels

### Tweaks exposed
- **Fidelity** — lo / mid / hi (default: hi)
- **Annotations** — on / off (default: on)
- **Homepage Hero** — left / centred / asym (default: left, canonical)

### Sibling deliverables in this project
- **`lp-portal.html`** (+ `lp-portal-data.js` + `lp-portal-views.jsx`) — LP portal mock from the perspective of **Macquarie Pension Trust (MPT)**. Dashboard, Fund Holdings, Capital Calls, Data Room, GP Intel, Messaging. Seeded data only — NOT connected to any backend. Links to EOS Hub.
- **`eos-hub.html`** (+ `eos-hub-data.js` + `eos-hub-app.js`) — index of all **42 Execution OS surfaces** across **13 function blocks** (FO / MO / BO / IC / REL / IR / HR / BD / KM / FIN / OPS / PM / EX). Office + phase chip filters, search, click any tile for detail drawer. BG-01 (Board & Governance Calendar) is the 42nd tile.
- **`backend-architecture.html`** — decision doc for the real LP portal backend. Recommendation: **Hetzner CX32 Sydney + Node/Fastify + Postgres 16 + Cloudflare + Resend**. ~A$300/yr at pilot, ~A$8.3k/yr at Fund II first close. 9-table schema with RLS. Magic-link auth. SOC2 roadmap.

## Source material (uploads/)
- **`ACP-WEBCOPY-v1.0-2026-04-19.docx`** — canonical webcopy doctrine for all 9 pages. Source of truth for all copy.
- **`ACP-EVEREST HOMEPAGE.pdf`** — the Everest peak image used as homepage hero backdrop. We extracted the embedded image, made a transparent cutout (`assets/everest-peak-clean.png`), and that's what the hero uses now. Do **not** re-introduce any file with baked-in "Strictly Confidential · Not for Distribution" or "Corporate Brochure Q2 2026" footer — JT has flagged this twice.
- **43 Execution OS PDFs** in `uploads/` — one per surface. These are the reference specs for EOS Hub.
- **`ARCHITECTURE.md`** / **`AGENTS.md`** / **`DEPLOY.md`** — notes from JT's separate **Claude Code** codebase (Notion Execution OS + Stripe + portal). That codebase is NOT in this project; this project is the design/narrative layer above it.

## Asset rules
- **Homepage hero image** — `assets/everest-peak-clean.png` (transparent PNG cutout of Everest). This is the only mountain asset that should appear anywhere — all others have been purged. If JT asks for "the clean Everest" or flags the branded footer, the fix is: check nothing references old filenames (`mountain-hero.jpg`, `everest-peak.jpg`, `*img_p0_1.jpg`) which were deleted.
- **Logo** — `assets/mark-simple.svg` (hexagonal ascent mark, gold on dark).
- **Insight card thumbnails** — three real Unsplash photographs (finance/data-center/industrial), dark-tinted.

## Design system in force
- **Type** — Cormorant Garamond / Playfair display (serif), JetBrains Mono for labels + codes, Inter for body
- **Color** — `--acp-midnight #0a0e1a` · `--acp-navy` · `--acp-gold #c9a84c` · `--acp-pearl` · `--acp-silver` · `--acp-steel`
- **Gold treatment** — italic gold-gradient fill on emphasis phrases (e.g. "Latest from *the Ascent.*")
- **Grid** — 1440 desktop max; 390 mobile; 56-64px section padding; `max-width:1280-1400px` inner
- **Voice** — confident, specific, no marketing adjectives, no emoji

## Recurring JT preferences & corrections
1. **"Latest from the Ascent"** (not "from ACP") — "the Ascent" is the publication name; italic + gold.
2. **"Platform Memorandum"** in footer — not "Thesis".
3. **Critical Minerals & Commodities** — full name, all 4 places (verticals grid, nav, footer, artboard label).
4. **3-person team on About** — grid layout, JT featured, 2 placeholders labeled "Partner 02 / 03".
5. **Transactions copy** — specific, varied role labels (Lead Advisor / Sell-Side / DD Principal / Structuring / etc.), no "institutional" padding.
6. **Mobile contact card phone** shows "MOBILE" literally (per 17 Apr direct edit).

## Workflow preferences
- JT often types fast with typos / double-letters — treat e.g. "wew" as "we", "aaadd" as "add". Don't ask for clarification on typos.
- When JT asks to "apply comment" with a short phrase attached, it usually maps to a `.wf-*` class on the element just commented on. Use grep to find it.
- JT frequently opens new threads ("c, d", "A, B, C, D") answering earlier multi-option questions — honor all of them.
- JT dislikes filler. Keep responses tight. Concrete deliverables, not ceremony.

## What NOT to build without asking
- Any page not in the 9 listed above (no pricing, no careers, no blog unless doctrine expands).
- Any backend / auth / live data on top of `lp-portal.html` — it is a mock by design; the real portal is a separate engineering track guided by `backend-architecture.html`.
- Any additional EOS surface — we have the 42-tile index; individual surface pages ship only when JT names one to build.

## Cache busters
Version bumps live on Babel script tags in `wireframe.html`, `eos-hub.html`, `lp-portal.html`. When JSX edits don't show up in the user's view, bump `?v=` on the offending script.
