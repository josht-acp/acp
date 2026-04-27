# ACP INTEGRATED BACK-OFFICE AUTOMATION STACK
## Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd | ACN 674 649 417
## Architecture Reference — v1.0 | April 2026

---

## FULL SYSTEM MAP

```
╔═══════════════════════════════════════════════════════════════════════════╗
║              ASCENSION CAPITAL PARTNERS — AUTOMATION STACK                ║
╠═══════════════════╦═══════════════════════╦═══════════════════════════════╣
║  CAPTURE LAYER    ║  PROCESSING LAYER     ║  RECORD LAYER                 ║
║  ─────────────    ║  ────────────────     ║  ────────────                 ║
║  10 Google Forms  ║  Apps Script v2.0     ║  6 Google Sheets              ║
║  ↓ Form Submit    ║  StripeIntegration.gs ║  Pipeline Master              ║
║  Fee Proposal ────╬──→ ACP Fee Portal ────╬──→ Fee Register               ║
║  Deal Intake      ║  (Node.js / VPS)      ║  ACP Stripe Ledger [NEW]      ║
║  KYC Intake       ║  ↓ Stripe API         ║  KYC Register                 ║
║  Risk Assessment  ║  Checkout Session     ║  Risk Register                ║
║  Compliance Form  ║  Webhook Events       ║  Investor Register            ║
║  Meeting Debrief  ║  Payment Confirmed    ║  File Register                ║
╠═══════════════════╬═══════════════════════╬═══════════════════════════════╣
║  STRIPE SANDBOX   ║  NOTIFICATION LAYER   ║  NOTION EXECUTION OS          ║
║  ─────────────    ║  ─────────────────    ║  ─────────────────            ║
║  9 Fee Products   ║  Gmail (JT notified)  ║  Deals Master                 ║
║  9 Price IDs      ║  Client email w/ link ║  Investors & Partners         ║
║  3 Payment Links  ║  Zapier webhook       ║  AML/KYC Compliance Tracker   ║
║  Checkout Sessions║  (optional)           ║  Templates Library            ║
║  Webhook Events   ║                       ║  Documents & Packs            ║
║  Ledger DB        ║                       ║  Tasks & Rituals              ║
╚═══════════════════╩═══════════════════════╩═══════════════════════════════╝
```

---

## DATA FLOW — FEE COLLECTION (END TO END)

```
1. JT submits Fee Proposal Google Form
         │
         ▼
2. Apps Script v2.0 (ACP Operations Hub)
   → onFormSubmit() fires
   → StripeIntegration.gs intercepts fee proposal submissions
         │
         ▼
3. ACP Fee Portal API — POST /api/checkout
   → Resolves SKU code from fee type label
   → Converts AUD → USD
   → Finds/creates Stripe Customer
   → Creates Stripe Checkout Session
   → Returns checkout_url + session_id
         │
         ▼
4. Apps Script updates Fee Register row
   → Payment Link column ← checkout_url
   → Stripe Session column ← session_id
   → Payment Status ← "Link Sent"
         │
         ▼
5. Gmail sends branded payment email to counterparty
   → ACP gold/black HTML template
   → Secure Stripe Checkout link
   → 24-hour expiry warning
         │
         ▼
6. Counterparty clicks link → Stripe Checkout
   → Stripe processes card payment
         │
         ▼
7. Stripe fires webhook → POST /webhook (ACP Portal)
   → checkout.session.completed event
   → Updates payment_sessions DB → status: 'paid'
   → Inserts into fee_ledger DB
   → Fires NOTIFICATION_WEBHOOK_URL (Google Sheets script URL)
         │
         ▼
8. Google Sheets doPost() receives confirmation
   → Updates Fee Register row → "PAID"
   → Notifies JT by email
   → Updates Notion Deals Master comment
         │
         ▼
9. Admin: GET /api/ledger → full collected fee history
   Apps Script: syncLedgerFromPortal() → pulls into "ACP Stripe Ledger" tab
```

---

## COMPONENT REGISTER

### 1. ACP Forms Automation Blueprint v2.0
- **Location:** Google Apps Script (ACP Operations Hub spreadsheet)
- **Forms:** 10 (Deal Intake, Fee Proposal, KYC Intake, Risk Assessment, Investor CRM, Weekly Priorities, Covenant Monitor, Compliance Tracker, VDR Log, Meeting Debrief)
- **Sheets:** 6 (Pipeline Master, Fee Register/Invoices, KYC Register, Risk Register, Investor Register, File Register)
- **Status:** Live — deployed in Ascension Energy Google Workspace

### 2. StripeIntegration.gs (NEW — from this session)
- **Location:** Add to ACP Operations Hub Apps Script project
- **Functions:** onFeeProposalSubmitStripe, generateStripeForSelectedRow, syncLedgerFromPortal, doPost (webhook receiver)
- **Triggers:** formSubmit (auto), doPost (HTTP — deploy as web app)
- **Status:** Ready to deploy

### 3. ACP Fee Billing Portal (NEW — from this session)
- **Location:** VPS — `pay.ascensionenergies.com` (pending deploy)
- **Stack:** Node.js 22, Express, Stripe SDK, SQLite (built-in), Nginx, Docker
- **SKUs:** 9 live in Stripe sandbox (`acct_1TKokv1qr5vz2Ef0`)
- **Admin UI:** `/admin.html`
- **Status:** Built, packaged, ready for VPS deploy

### 4. Notion Execution OS
- **Deals Master DB:** `6b68a34e-465f-4cbc-bf61-8f8b55b3fc12`
- **Integration:** Portal `/api/notion-sync` + Apps Script `logPaymentLinkToNotion()`
- **Status:** Integration code built — requires NOTION_TOKEN in `.env`

---

## SCRIPT PROPERTIES TO SET (Google Apps Script)

Go to: Extensions → Apps Script → Project Settings → Script Properties

| Property | Value |
|---|---|
| `ACP_PORTAL_URL` | `https://pay.ascensionenergies.com` (or `http://localhost:3000` for dev) |
| `ACP_ADMIN_TOKEN` | Match `ADMIN_TOKEN` in server `.env` |
| `NOTION_TOKEN` | `secret_...` from Notion integration |
| `NOTION_DEALS_DB` | `6b68a34e-465f-4cbc-bf61-8f8b55b3fc12` |
| `ACP_SENDER_EMAIL` | `josh.t@ascensionenergies.com` |

---

## PORTAL .env ADDITIONS (append to existing .env)

```
# Notion Integration
NOTION_TOKEN=secret_YOUR_NOTION_INTEGRATION_TOKEN
NOTION_DEALS_DB=6b68a34e-465f-4cbc-bf61-8f8b55b3fc12

# Google Sheets inbound webhook secret (match in Apps Script)
GOOGLE_SHEETS_WEBHOOK_SECRET=your-shared-secret

# Notification webhook — set to Apps Script web app URL
NOTIFICATION_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## DEPLOY SEQUENCE (COMPLETE)

### Step 1 — Apps Script (Google Workspace)
```
1. Open ACP Operations Hub Google Sheet
2. Extensions → Apps Script
3. + New file → StripeIntegration.gs → paste contents
4. Set Script Properties (table above)
5. Run: setupStripeIntegrationTriggers()
6. Deploy as Web App (for Stripe webhook receiver):
   Deploy → New deployment → Web App
   Execute as: Me | Access: Anyone
   Copy the deployment URL → paste as NOTIFICATION_WEBHOOK_URL in portal .env
```

### Step 2 — Portal server.js update
```
1. Open acp-payment-portal/server.js
2. Paste contents of server.patch.js BEFORE app.listen()
3. Add NOTION_TOKEN, GOOGLE_SHEETS_WEBHOOK_SECRET to .env
```

### Step 3 — VPS Deploy
```
ssh root@VPS_IP
cd /opt/acp-portal
git pull / scp updated files
docker compose restart
# Stripe webhook: add NOTIFICATION_WEBHOOK_URL pointing to Apps Script web app URL
```

### Step 4 — Stripe Webhook Registration
```
Stripe Dashboard → Developers → Webhooks → Add endpoint
URL: https://pay.ascensionenergies.com/webhook
Events: checkout.session.completed, checkout.session.expired, payment_intent.payment_failed
Copy whsec_... → .env STRIPE_WEBHOOK_SECRET
docker compose restart
```

### Step 5 — Test (Sandbox)
```
1. Submit a test Fee Proposal form entry
2. Confirm payment link email received
3. Click link → use test card 4242 4242 4242 4242
4. Confirm: Fee Register updated, JT notified, Notion comment added
5. Admin: /admin.html → confirm ledger entry
```

---

## DATA MATURITY PHASE MAP (ACP Blueprint Alignment)

| Phase | Timeline | ACP Blueprint | Integration Status |
|---|---|---|---|
| **Capture** | Weeks 1-2 | 10 Forms live, data entry via forms only | ✅ Forms → Sheets live |
| **Aggregate** | Weeks 3-4 | Cross-sheet lookups, dashboard tab | ✅ + Stripe Ledger tab added |
| **Analyse** | Weeks 5-8 | Funnel charts, fee realisation waterfall | 🔄 Stripe data feeds fee realisation |
| **ELT Dashboard** | Weeks 9-12 | Executive summary, predictive forecasting | 🔄 Portal admin feeds ELT layer |

---

## CURRENT MANDATE PAYMENT LINK STATUS

| Mandate | Next Fee Event | SKU | Action |
|---|---|---|---|
| EdgeMode/EDGM | RCF mobilisation | ACP-FEE-MOB | Generate via portal once LOE executed |
| Barnwell Canada | Arrangement fee (CE1) | ACP-FEE-ARR | Generate on first closing event |
| Aventurine/WH2022 | Bridge fee (Kirat) | ACP-FEE-ARR | Blocked — subordination deed unresolved |
| PetroAlpha/Oleum | Mobilisation | ACP-FEE-MOB | Blocked — Oleum legal counsel required |
| DT Cloud/DTL | Setup + retainer | ACP-FEE-SET + ACP-FEE-RET | Ready — awaiting LOE execution |
| INARU | Arrangement | ACP-FEE-ARR | Blocked — KYC gate |

---

*Ascension Capital Partners | Confidential | ACN 674 649 417*
*Document: ACP-ARCH-INTEGRATION-v1.0-2026-04-11*
