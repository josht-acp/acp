// db/init.js — ACP Payment Portal Database Initialisation
require('dotenv').config();
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DB_PATH || './db/acp_payments.db';
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS payment_sessions (
    id              TEXT PRIMARY KEY,
    session_id      TEXT UNIQUE NOT NULL,
    mandate_ref     TEXT NOT NULL,
    client_name     TEXT NOT NULL,
    client_email    TEXT NOT NULL,
    fee_type        TEXT NOT NULL,
    sku_code        TEXT NOT NULL,
    amount_cents    INTEGER NOT NULL,
    currency        TEXT NOT NULL DEFAULT 'usd',
    status          TEXT NOT NULL DEFAULT 'pending',
    stripe_customer TEXT,
    stripe_pi       TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at    TEXT,
    metadata        TEXT
  );

  CREATE TABLE IF NOT EXISTS payment_events (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    session_ref     TEXT NOT NULL,
    event_type      TEXT NOT NULL,
    stripe_event_id TEXT,
    payload         TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (session_ref) REFERENCES payment_sessions(id)
  );

  CREATE TABLE IF NOT EXISTS fee_ledger (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    mandate_ref     TEXT NOT NULL,
    client_name     TEXT NOT NULL,
    sku_code        TEXT NOT NULL,
    fee_type        TEXT NOT NULL,
    amount_usd      REAL NOT NULL,
    currency        TEXT NOT NULL,
    status          TEXT NOT NULL,
    stripe_session  TEXT,
    invoice_date    TEXT NOT NULL DEFAULT (datetime('now')),
    notes           TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_mandate ON payment_sessions(mandate_ref);
  CREATE INDEX IF NOT EXISTS idx_sessions_status  ON payment_sessions(status);
  CREATE INDEX IF NOT EXISTS idx_ledger_mandate   ON fee_ledger(mandate_ref);
`);

console.log('✅ ACP Payment Portal — Database initialised:', dbPath);
db.close();
