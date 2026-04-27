# Ascension Capital Partners — Application

Monorepo containing the ACP marketing website and LP investor portal.

```
app/
  web/      Next.js 14 (App Router) — marketing site + LP portal UI
  server/   Fastify 4 — REST API + auth + LP data
  db/       PostgreSQL schema, migrations, seed data
```

---

## Prerequisites

- Node.js 20+
- PostgreSQL 16 (or Docker)
- A Resend account for transactional email (https://resend.com)

---

## Quick start (local dev)

### 1. Start Postgres

```bash
# Docker (easiest)
docker run -d \
  --name acp-db \
  -e POSTGRES_DB=acp \
  -e POSTGRES_USER=acp \
  -e POSTGRES_PASSWORD=acp_dev \
  -p 5432:5432 \
  postgres:16-alpine
```

### 2. Configure the API server

```bash
cd app/server
cp .env.example .env
# Edit .env — set JWT_SECRET, SMTP_* values at minimum
```

### 3. Run schema migrations + seed

```bash
cd app/server
npm install
npm run db:migrate
npm run db:seed
```

The seed creates:
- **Fund I** (vintage 2019) and **Fund II** (vintage 2022)
- Demo LP user: `demo@macquarie.com` (Macquarie Pension Trust / Sarah Chen)
- Sample commitments, capital calls, documents, and a GP message

### 4. Start the API server

```bash
npm run dev
# Listening on http://localhost:4000
```

### 5. Configure the web app

```bash
cd app/web
cp .env.local.example .env.local
npm install
npm run dev
# Listening on http://localhost:3000
```

---

## LP Portal — testing the magic link flow

1. Go to `http://localhost:3000/portal`
2. Enter `demo@macquarie.com`
3. The server prints the magic link to stdout in development (email is still sent if SMTP is configured)
4. Visit the link — you'll be redirected to `/portal/overview`

---

## Docker Compose (full stack)

```bash
cd app
cp server/.env.example server/.env
# Edit server/.env

docker compose up --build
```

Services:
| Service | URL |
|---------|-----|
| Web     | http://localhost:3000 |
| API     | http://localhost:4000 |
| Postgres | localhost:5432 |

---

## Environment variables

### `app/server/.env`

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Postgres connection string |
| `JWT_SECRET` | Yes | Long random string for signing JWTs |
| `PORT` | No | API port (default 4000) |
| `SMTP_HOST` | Yes | SMTP hostname (use `smtp.resend.com`) |
| `SMTP_PORT` | Yes | SMTP port (465 for Resend) |
| `SMTP_USER` | Yes | SMTP username (`resend` for Resend) |
| `SMTP_PASS` | Yes | Resend API key |
| `SMTP_FROM` | Yes | From address for outbound email |
| `NOTIFY_EMAIL` | Yes | GP inbox for contact form notifications |
| `APP_URL` | Yes | Public base URL (for magic links) |

### `app/web/.env.local`

| Variable | Default | Description |
|----------|---------|-------------|
| `API_URL` | `http://localhost:4000` | Backend URL (Next.js proxy) |

---

## API routes

### Public

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/request-link` | Request magic link email |
| GET | `/api/v1/auth/verify?token=xxx` | Verify token, issue JWT |
| POST | `/api/v1/auth/logout` | Revoke session |
| POST | `/api/v1/contact` | Contact form submission |

### LP Portal (Bearer JWT required)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/lp/overview` | Portfolio summary + fund holdings |
| GET | `/api/v1/lp/capital-calls` | Capital call history |
| GET | `/api/v1/lp/documents` | Data room document list |
| GET | `/api/v1/lp/documents/:id/download` | Pre-signed download URL |
| GET | `/api/v1/lp/messages` | GP ↔ LP messages |
| POST | `/api/v1/lp/messages` | Send a message to GP |

---

## Production deployment (Hetzner CX32)

See `project/backend-architecture.html` for the full infrastructure recommendation:
- Hetzner CX32 (4 vCPU / 8 GB) — ~€15/month
- Caddy as reverse proxy with automatic HTTPS
- PostgreSQL 16 on the same box
- Cloudflare for CDN + DDoS protection
- Resend for transactional email
