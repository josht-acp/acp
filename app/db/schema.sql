-- ═══════════════════════════════════════════════════════════════
-- ACP LP Portal — PostgreSQL Schema
-- Node: Hetzner CX32 Sydney · Postgres 16
-- Auth: Magic-link (no passwords)
-- RLS: Per-LP row-level security on all data tables
-- ═══════════════════════════════════════════════════════════════

BEGIN;

-- ── Extensions ───────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. users (LP contacts) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        NOT NULL UNIQUE,
  name          TEXT        NOT NULL,
  firm          TEXT,
  role          TEXT,
  phone         TEXT,
  ip_allowlist  TEXT[],                   -- CIDR blocks; null = unrestricted
  active        BOOLEAN     NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login    TIMESTAMPTZ
);

-- ── 2. magic_links ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS magic_links (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT        NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '15 minutes'),
  used_at    TIMESTAMPTZ,
  ip         TEXT
);
CREATE INDEX IF NOT EXISTS magic_links_token_idx ON magic_links(token);

-- ── 3. sessions ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  jwt_jti    TEXT        NOT NULL UNIQUE,  -- JWT ID for revocation
  ip         TEXT,
  ua         TEXT,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '30 days'),
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 4. funds ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS funds (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT    NOT NULL UNIQUE,   -- e.g. 'ACP-I', 'ACP-II'
  name        TEXT    NOT NULL,
  vintage     INT,
  currency    TEXT    NOT NULL DEFAULT 'AUD',
  target_size BIGINT,                    -- in cents
  status      TEXT    NOT NULL DEFAULT 'open'  -- open | closed | harvesting
);

-- ── 5. lp_commitments ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lp_commitments (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES users(id),
  fund_id       UUID        NOT NULL REFERENCES funds(id),
  commitment    BIGINT      NOT NULL,    -- cents
  called        BIGINT      NOT NULL DEFAULT 0,
  distributed   BIGINT      NOT NULL DEFAULT 0,
  nav           BIGINT      NOT NULL DEFAULT 0,
  tvpi          NUMERIC(6,2),
  dpi           NUMERIC(6,2),
  rvpi          NUMERIC(6,2),
  irr           NUMERIC(6,2),           -- percent
  as_of_date    DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, fund_id)
);

-- ── 6. capital_calls ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS capital_calls (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  fund_id       UUID        NOT NULL REFERENCES funds(id),
  user_id       UUID        NOT NULL REFERENCES users(id),
  call_number   INT         NOT NULL,
  amount        BIGINT      NOT NULL,    -- cents
  due_date      DATE        NOT NULL,
  paid_date     DATE,
  status        TEXT        NOT NULL DEFAULT 'pending',  -- pending | paid | overdue
  notice_url    TEXT,                    -- signed S3 URL to notice PDF
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 7. documents ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        REFERENCES users(id),   -- null = all LPs
  fund_id       UUID        REFERENCES funds(id),    -- null = firm-wide
  title         TEXT        NOT NULL,
  category      TEXT        NOT NULL,  -- quarterly_report | nda | subscription | k1 | notice | other
  s3_key        TEXT        NOT NULL UNIQUE,
  size_bytes    INT,
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  visible_from  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 8. messages ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES users(id),
  direction     TEXT        NOT NULL,   -- 'gp_to_lp' | 'lp_to_gp'
  subject       TEXT        NOT NULL,
  body          TEXT        NOT NULL,
  read_at       TIMESTAMPTZ,
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 9. audit_log ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_log (
  id          BIGSERIAL   PRIMARY KEY,
  user_id     UUID        REFERENCES users(id),
  action      TEXT        NOT NULL,   -- e.g. 'doc.download', 'auth.login', 'call.viewed'
  resource    TEXT,                   -- e.g. document id, page name
  ip          TEXT,
  ua          TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS audit_log_user_idx    ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS audit_log_created_idx ON audit_log(created_at DESC);

-- ── 10. enquiries (contact form) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  firm        TEXT        NOT NULL,
  role        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  engagement  TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  ip          TEXT,
  status      TEXT        NOT NULL DEFAULT 'new',  -- new | reviewed | actioned
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
