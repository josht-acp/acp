// ScriptPropertiesSetup.gs
// Run this ONCE to set all required Script Properties for the ACP Stripe integration.
// After running, delete this file from the Apps Script project (contains no secrets — just keys).
//
// BEFORE RUNNING:
//   Replace placeholder values below with your actual credentials.
//   Never commit actual secret values to version control.
//
// HOW TO RUN:
//   Extensions → Apps Script → select setScriptProperties → Run

function setScriptProperties() {
  const props = PropertiesService.getScriptProperties();

  props.setProperties({
    // ── ACP Fee Billing Portal ────────────────────────────────
    'ACP_PORTAL_URL':   'https://pay.ascensionenergies.com',
    // During local dev: 'http://localhost:3000'

    'ACP_ADMIN_TOKEN':  'REPLACE_WITH_YOUR_ADMIN_TOKEN',
    // Must match ADMIN_TOKEN in portal .env

    // ── Google Workspace ──────────────────────────────────────
    'ACP_SENDER_EMAIL': 'josh.t@ascensionenergies.com',

    // ── Notion ────────────────────────────────────────────────
    'NOTION_TOKEN':     'REPLACE_WITH_secret_...',
    // Get from: notion.so → Settings → Connections → Develop integrations → New integration
    // Grant access to: Deals Master database

    'NOTION_DEALS_DB':  '6b68a34e-465f-4cbc-bf61-8f8b55b3fc12',
    // Deals Master database ID — already known, do not change

    // ── Shared Webhook Secret ─────────────────────────────────
    'SHEETS_WEBHOOK_SECRET': 'REPLACE_WITH_RANDOM_SECRET',
    // Must match GOOGLE_SHEETS_WEBHOOK_SECRET in portal .env
  });

  Logger.log('✅ Script Properties set successfully');
  SpreadsheetApp.getUi().alert('✅ Script Properties configured.\n\nDelete ScriptPropertiesSetup.gs now — it is no longer needed.');
}

// Diagnostic: print current properties (values masked)
function checkScriptProperties() {
  const props = PropertiesService.getScriptProperties().getProperties();
  const keys  = Object.keys(props);
  const output = keys.map(k => `${k}: ${props[k] ? '*** SET ***' : '❌ MISSING'}`).join('\n');
  Logger.log('Script Properties:\n' + output);
  SpreadsheetApp.getUi().alert('Script Properties Status:\n\n' + output);
}
