# ACP Fee Billing Portal
## Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd | ACN 674 649 417

---

## What This Is

A self-hosted Stripe-powered fee billing portal for Ascension Capital Partners.
Generates secure Stripe Checkout sessions for all 9 ACP fee SKUs, records
payments in a local SQLite ledger, and exposes a JSON admin API.

---

## Stripe Sandbox — SKU Registry (Test Mode)

| SKU             | Product ID                | Price ID                        | Type      |
|-----------------|---------------------------|---------------------------------|-----------|
| ACP-FEE-ARR     | prod_UJRqNCkIjtx211       | price_1TKoxd1qr5vz2Ef0YjYWVy2n | Variable  |
| ACP-FEE-SUC     | prod_UJRqObREwhRWsA       | price_1TKoxg1qr5vz2Ef0B3T101dg | Variable  |
| ACP-FEE-MOB     | prod_UJRqyGI04eOHjN       | price_1TKoxj1qr5vz2Ef0YSBvL5RY | $2,500    |
| ACP-FEE-PLC     | prod_UJRqXqTYdyIH1b       | price_1TKoxm1qr5vz2Ef0o92280Ce | Variable  |
| ACP-FEE-RET     | prod_UJRqt3n0TieqyE       | price_1TKoxq1qr5vz2Ef0BwzZs2Qk | $5,000/mo |
| ACP-FEE-EQY     | prod_UJRqLSpQbYyAF2       | price_1TKoxt1qr5vz2Ef03dS40WI8 | Variable  |
| ACP-FEE-CSH     | prod_UJRqqbIe4ygeCZ       | price_1TKoyp1qr5vz2Ef0ls7vsQbJ | Variable  |
| ACP-FEE-TL      | prod_UJRqjVoWTElZWi       | price_1TKoyr1qr5vz2Ef0VcGWxHTo | Variable  |
| ACP-FEE-SET     | prod_UJRq522Qjw8idH       | price_1TKoyu1qr5vz2Ef0kFcbqcXB | $2,500    |

---

## Quick Start — Local Development

```bash
# 1. Clone / copy this directory to your machine

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env — add your Stripe test keys

# 4. Start the server
npm start
# → http://localhost:3000
```

---

## VPS Deployment (Recommended: Docker + Nginx)

### Requirements
- VPS running Ubuntu 22.04+ (DigitalOcean, Hetzner, Vultr)
- Docker + Docker Compose installed
- Domain pointed to VPS IP (e.g. pay.ascensionenergies.com)
- Certbot for SSL

### Step-by-Step

```bash
# 1. SSH into VPS
ssh root@YOUR_VPS_IP

# 2. Install Docker
curl -fsSL https://get.docker.com | sh
apt install docker-compose-plugin -y

# 3. Clone / upload project
git clone YOUR_REPO /opt/acp-portal
# OR: scp -r ./acp-payment-portal root@YOUR_VPS_IP:/opt/acp-portal
cd /opt/acp-portal

# 4. Configure environment
cp .env.example .env
nano .env
# Set:
#   STRIPE_SECRET_KEY=sk_test_...   (or sk_live_ for production)
#   STRIPE_PUBLISHABLE_KEY=pk_test_...
#   STRIPE_WEBHOOK_SECRET=whsec_...  (from Stripe Dashboard → Webhooks)
#   BASE_URL=https://pay.ascensionenergies.com
#   ADMIN_TOKEN=your-secure-random-token
#   NODE_ENV=production

# 5. Start with Docker Compose
docker compose up -d

# 6. Install Nginx + Certbot
apt install nginx certbot python3-certbot-nginx -y
certbot --nginx -d pay.ascensionenergies.com

# 7. Install Nginx config
cp nginx.conf /etc/nginx/sites-available/acp-portal
# Edit domain name if different
nano /etc/nginx/sites-available/acp-portal
ln -s /etc/nginx/sites-available/acp-portal /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 8. Register Stripe Webhook
# Stripe Dashboard → Developers → Webhooks → Add endpoint
# URL: https://pay.ascensionenergies.com/webhook
# Events to listen for:
#   checkout.session.completed
#   checkout.session.expired
#   payment_intent.payment_failed
#   invoice.payment_succeeded
# Copy the signing secret → paste as STRIPE_WEBHOOK_SECRET in .env
# docker compose restart
```

### Going Live (Test → Production)

```bash
# In .env, swap:
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
# Remove the SANDBOX badge from public/index.html header

docker compose restart
```

---

## API Reference

All API calls require JSON body. Admin routes require header: `x-admin-token: YOUR_TOKEN`

### GET /api/skus
Returns all 9 ACP fee SKUs with metadata.

### POST /api/checkout
Creates a Stripe Checkout session and returns redirect URL.

```json
{
  "sku_code":     "ACP-FEE-ARR",
  "mandate_ref":  "ACP-EDGM-2026",
  "client_name":  "EdgeMode Ltd",
  "client_email": "charlie@edgemode.com",
  "amount_usd":   75000,
  "notes":        "Arrangement fee — RCF financial close"
}
```

Response:
```json
{
  "session_id":    "cs_test_...",
  "checkout_url":  "https://checkout.stripe.com/pay/cs_test_...",
  "internal_id":   "uuid-...",
  "amount_usd":    75000,
  "sku_code":      "ACP-FEE-ARR",
  "mandate_ref":   "ACP-EDGM-2026"
}
```

### POST /api/payment-link (Admin)
Generates a reusable Stripe Payment Link for a given SKU.

### GET /api/sessions (Admin)
Lists all payment sessions. Query params: `?mandate=ACP-EDGM-2026&status=paid&limit=50`

### GET /api/ledger (Admin)
Returns full fee ledger with total collected.

### GET /api/status/:session_id
Returns current payment status for a Stripe checkout session.

### GET /health
Health check — returns server status, Stripe mode, DB status.

---

## Database Schema

**payment_sessions** — one row per checkout session created
**payment_events** — full webhook event log
**fee_ledger** — confirmed paid fees (append-only)

Export ledger to CSV for Xero/accounting:
```bash
sqlite3 db/acp_payments.db -csv "SELECT * FROM fee_ledger;" > ledger_export.csv
```

---

## Test Card Numbers (Sandbox)

| Card Number          | Result    |
|----------------------|-----------|
| 4242 4242 4242 4242  | Success   |
| 4000 0000 0000 0002  | Declined  |
| 4000 0025 0000 3155  | 3DS Auth  |

Expiry: any future date. CVC: any 3 digits.

---

## Architecture Diagram

```
Client Browser
     │
     ▼
[Nginx / SSL]  ←── HTTPS pay.ascensionenergies.com
     │
     ▼
[Node.js Express :3000]
     ├── GET  /             → ACP Branded Portal (index.html)
     ├── POST /api/checkout → Create Stripe Checkout Session
     ├── POST /webhook      → Stripe Event Handler
     ├── GET  /api/sessions → Admin: Payment Ledger
     └── GET  /health       → Health Check
          │
          ▼
    [Stripe API]          [SQLite DB]
    Checkout Sessions     payment_sessions
    Products & Prices     payment_events
    Webhooks              fee_ledger
```

---

## Contacts

Joshua Ting — Executive Managing Partner
Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd
M: +61 451 338 533 | E: josh.t@ascensionenergies.com
