// ============================================================
// ACP FORMS → STRIPE INTEGRATION LAYER  v1.0
// Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd
// ACN 674 649 417
//
// PURPOSE:
//   Extends the ACP Forms Automation Blueprint (v2.0) to:
//   1. Auto-generate Stripe checkout sessions on Fee Proposal submission
//   2. Email the counterparty a payment link directly from Google Workspace
//   3. Log payment links to the Fee Register sheet
//   4. Receive Stripe webhook confirmations → update Fee Register
//   5. Push payment confirmations → Notion Deals Master
//
// INSTALL:
//   1. Open ACP Operations Hub Google Sheet
//   2. Extensions → Apps Script
//   3. Paste this file as a new script file: "StripeIntegration.gs"
//   4. Set Script Properties (see CONFIGURATION below)
//   5. Run setupStripeIntegrationTriggers() once to register triggers
//
// DEPENDENCIES:
//   - Existing ACP Forms Automation Blueprint v2.0 (Apps Script v2.0)
//   - ACP Fee Billing Portal (Node.js) deployed and running
//   - CONFIG object from main Apps Script file (must be present)
// ============================================================

// ─── CONFIGURATION ──────────────────────────────────────────
// Set these in Extensions → Apps Script → Project Settings → Script Properties
// DO NOT hardcode keys here — use Script Properties

function getStripeConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    // ACP Fee Billing Portal base URL (your VPS or localhost for dev)
    portalBaseUrl:  props.getProperty('ACP_PORTAL_URL')     || 'http://localhost:3000',
    adminToken:     props.getProperty('ACP_ADMIN_TOKEN')    || '',

    // Notion integration (for payment confirmation sync)
    notionToken:    props.getProperty('NOTION_TOKEN')       || '',
    notionDealsDb:  props.getProperty('NOTION_DEALS_DB')    || '6b68a34e-465f-4cbc-bf61-8f8b55b3fc12',

    // Email config — JT's sending address
    senderEmail:    props.getProperty('ACP_SENDER_EMAIL')   || 'josh.t@ascensionenergies.com',
    senderName:     'Ascension Capital Partners',

    // Sheet names (must match your Ops Hub sheet tabs)
    feeRegisterSheet: 'Fee Register',
    invoicesSheet:    'Invoices',
    pipelineSheet:    'Pipeline Master',
  };
}

// ACP Fee SKU mapping — mirrors server.js FEE_SKUS
const ACP_FEE_SKUS = {
  'Arrangement Fee':  'ACP-FEE-ARR',
  'Success Fee':      'ACP-FEE-SUC',
  'Mobilisation Fee': 'ACP-FEE-MOB',
  'Placement Fee':    'ACP-FEE-PLC',
  'Retainer Fee':     'ACP-FEE-RET',
  'Equity Earnout':   'ACP-FEE-EQY',
  'Cash Strip':       'ACP-FEE-CSH',
  'Tail Fee':         'ACP-FEE-TL',
  'Setup Fee':        'ACP-FEE-SET',
};

// ─── TRIGGER SETUP ───────────────────────────────────────────
/**
 * Run once to register the form submission trigger on the Fee Proposal form.
 * Safe to run multiple times — checks for existing triggers first.
 */
function setupStripeIntegrationTriggers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove any existing stripe integration triggers to avoid duplicates
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'onFeeProposalSubmitStripe')
    .forEach(t => ScriptApp.deleteTrigger(t));

  // Register new form submit trigger on Fee Register sheet
  ScriptApp.newTrigger('onFeeProposalSubmitStripe')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();

  Logger.log('✅ Stripe integration trigger registered: onFeeProposalSubmitStripe');
  SpreadsheetApp.getUi().alert('✅ Stripe Integration Active\n\nFee Proposal submissions will now auto-generate Stripe payment links.');
}

// ─── MAIN TRIGGER: Fee Proposal Form Submission ──────────────
/**
 * Fires on every Google Form submission to the Ops Hub spreadsheet.
 * Routes fee proposal submissions to Stripe checkout generation.
 *
 * Attaches to: formSubmit trigger on ACP Operations Hub spreadsheet
 */
function onFeeProposalSubmitStripe(e) {
  try {
    const cfg     = getStripeConfig();
    const range   = e.range;
    const sheet   = range.getSheet();

    // Only process Fee Register / Fee Proposal submissions
    if (sheet.getName() !== cfg.feeRegisterSheet) return;

    const row     = range.getRow();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values  = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Map headers → values
    const data = {};
    headers.forEach((h, i) => { data[h] = values[i]; });

    Logger.log('Fee Proposal submission received: ' + JSON.stringify(data));

    // Extract key fields (adjust header names to match your form exactly)
    const mandateRef   = data['Mandate Reference'] || data['Deal Name'] || 'UNKNOWN';
    const clientName   = data['Client / Counterparty Name'] || data['Counterparty Name'] || '';
    const clientEmail  = data['Client Email'] || data['Counterparty Email'] || '';
    const feeTypeRaw   = data['Fee Type'] || data['Fee SKU'] || '';
    const amountRaw    = data['Fee Amount (AUD)'] || data['Fee Amount'] || data['Amount'] || 0;
    const notes        = data['Notes'] || data['Invoice Reference'] || '';

    // Validate required fields
    if (!clientEmail || !mandateRef) {
      Logger.log('⚠️  Missing client email or mandate ref — skipping Stripe generation');
      return;
    }

    // Resolve SKU code
    const skuCode = resolveSku(feeTypeRaw);
    if (!skuCode) {
      Logger.log('⚠️  Could not resolve SKU for fee type: ' + feeTypeRaw);
      return;
    }

    // Convert AUD → USD (approximate — update rate or use forex API)
    const amountUsd = convertToUsd(parseFloat(amountRaw) || 0, 'AUD');

    // Generate Stripe checkout session via ACP Portal API
    const checkoutResult = createStripeCheckout({
      cfg,
      sku_code:     skuCode,
      mandate_ref:  mandateRef,
      client_name:  clientName,
      client_email: clientEmail,
      amount_usd:   amountUsd,
      notes:        notes,
    });

    if (!checkoutResult.success) {
      Logger.log('❌ Stripe checkout creation failed: ' + checkoutResult.error);
      notifyJtOfError(cfg, mandateRef, clientName, checkoutResult.error);
      return;
    }

    Logger.log('✅ Stripe session created: ' + checkoutResult.checkout_url);

    // Update Fee Register row with payment link
    updateFeeRegisterRow(sheet, row, headers, {
      'Payment Link':    checkoutResult.checkout_url,
      'Stripe Session':  checkoutResult.session_id,
      'Payment Status':  'Link Sent',
      'Link Sent Date':  new Date().toISOString().substring(0, 10),
    });

    // Email the counterparty with the payment link
    sendPaymentLinkEmail({
      cfg,
      to:           clientEmail,
      clientName,
      mandateRef,
      feeType:      feeTypeRaw,
      amountUsd,
      checkoutUrl:  checkoutResult.checkout_url,
      notes,
    });

    // Log to Notion Deals Master (non-blocking)
    try { logPaymentLinkToNotion(cfg, { mandateRef, skuCode, amountUsd, clientName, checkoutResult }); } catch(_) {}

  } catch (err) {
    Logger.log('❌ onFeeProposalSubmitStripe error: ' + err.message);
  }
}

// ─── STRIPE API CALL ─────────────────────────────────────────
function createStripeCheckout({ cfg, sku_code, mandate_ref, client_name, client_email, amount_usd, notes }) {
  try {
    const payload = {
      sku_code, mandate_ref, client_name, client_email,
      amount_usd: amount_usd > 0 ? amount_usd : undefined,
      notes,
    };

    const response = UrlFetchApp.fetch(cfg.portalBaseUrl + '/api/checkout', {
      method:      'post',
      contentType: 'application/json',
      payload:     JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    const code = response.getResponseCode();
    const body = JSON.parse(response.getContentText());

    if (code !== 200) {
      return { success: false, error: body.error || 'HTTP ' + code };
    }
    return { success: true, ...body };

  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ─── PAYMENT LINK EMAIL ──────────────────────────────────────
function sendPaymentLinkEmail({ cfg, to, clientName, mandateRef, feeType, amountUsd, checkoutUrl, notes }) {
  const subject = `[Ascension Capital Partners] Payment Request — ${mandateRef}`;
  const formattedAmount = '$' + amountUsd.toLocaleString('en-US', { minimumFractionDigits: 2 }) + ' USD';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; }
  .header { background: #000; padding: 24px 32px; border-bottom: 3px solid #C5A55A; }
  .header h1 { color: #C5A55A; font-size: 18px; margin: 0; letter-spacing: 0.05em; }
  .header p { color: #9B9B9B; font-size: 11px; margin: 4px 0 0; }
  .body { padding: 32px; background: #fff; border-left: 4px solid #C5A55A; }
  .fee-box { background: #000; color: #fff; padding: 20px 24px; border-radius: 4px; margin: 24px 0; }
  .fee-box .label { font-size: 10px; color: #9B9B9B; text-transform: uppercase; letter-spacing: 0.08em; }
  .fee-box .amount { font-size: 28px; font-weight: bold; color: #C5A55A; margin: 4px 0; }
  .fee-box .detail { font-size: 12px; color: #ccc; }
  .btn { display: inline-block; background: #C5A55A; color: #000 !important; padding: 14px 32px; text-decoration: none; font-weight: bold; border-radius: 3px; font-size: 14px; margin: 8px 0; }
  .footer { padding: 20px 32px; font-size: 10px; color: #9B9B9B; border-top: 1px solid #eee; }
  p { line-height: 1.6; font-size: 14px; }
</style>
</head>
<body>
<div class="header">
  <h1>ASCENSION CAPITAL PARTNERS</h1>
  <p>t/a APEX Consulting Partners Pty Ltd &nbsp;|&nbsp; ACN 674 649 417</p>
</div>
<div class="body">
  <p>Dear ${clientName || 'Valued Client'},</p>
  <p>Please find below a secure payment link in respect of the following fee obligation under Mandate Reference <strong>${mandateRef}</strong>.</p>

  <div class="fee-box">
    <div class="label">Fee Type</div>
    <div class="detail">${feeType}</div>
    <div class="label" style="margin-top:12px;">Amount Due</div>
    <div class="amount">${formattedAmount}</div>
    ${notes ? `<div class="detail" style="margin-top:8px;">Reference: ${notes}</div>` : ''}
  </div>

  <p>Payment is processed securely via Stripe. Click the button below to complete your payment:</p>
  <p><a class="btn" href="${checkoutUrl}">Pay Now — ${formattedAmount}</a></p>

  <p style="font-size:12px; color:#9B9B9B; margin-top:16px;">
    This link is unique to your transaction and expires after 24 hours.
    If you have any queries regarding this payment, please contact us directly.
  </p>

  <p>
    Yours faithfully,<br /><br />
    <strong>Joshua Ting</strong><br />
    Executive Managing Partner<br />
    Global Head of Alternatives & Private Markets<br />
    <br />
    Ascension Capital Partners<br />
    t/a APEX Consulting Partners Pty Ltd | ACN 674 649 417<br />
    M: +61 451 338 533<br />
    E: josh.t@ascensionenergies.com
  </p>
</div>
<div class="footer">
  This email and any attachments are confidential. If received in error, please delete and notify the sender.<br />
  Payment processed via Stripe. All amounts in USD unless otherwise stated.
</div>
</body>
</html>`;

  GmailApp.sendEmail(to, subject, '', {
    from:     cfg.senderEmail,
    name:     cfg.senderName,
    htmlBody: htmlBody,
    replyTo:  cfg.senderEmail,
  });

  Logger.log('✅ Payment link email sent to: ' + to);
}

// ─── FEE REGISTER UPDATE ─────────────────────────────────────
function updateFeeRegisterRow(sheet, row, headers, updates) {
  Object.entries(updates).forEach(([key, value]) => {
    const colIndex = headers.indexOf(key);
    if (colIndex >= 0) {
      sheet.getRange(row, colIndex + 1).setValue(value);
    } else {
      // Column doesn't exist — append it
      const newCol = sheet.getLastColumn() + 1;
      sheet.getRange(1, newCol).setValue(key);
      sheet.getRange(row, newCol).setValue(value);
    }
  });
}

// ─── NOTION SYNC ─────────────────────────────────────────────
function logPaymentLinkToNotion(cfg, { mandateRef, skuCode, amountUsd, clientName, checkoutResult }) {
  if (!cfg.notionToken) return;

  // Search for the deal in Notion Deals Master by mandate reference
  const searchUrl = 'https://api.notion.com/v1/databases/' + cfg.notionDealsDb + '/query';
  const searchBody = {
    filter: {
      property: 'Deal Name',
      title: { contains: mandateRef },
    },
  };

  const searchResp = UrlFetchApp.fetch(searchUrl, {
    method:  'post',
    headers: {
      'Authorization':  'Bearer ' + cfg.notionToken,
      'Content-Type':   'application/json',
      'Notion-Version': '2022-06-28',
    },
    payload: JSON.stringify(searchBody),
    muteHttpExceptions: true,
  });

  const searchData = JSON.parse(searchResp.getContentText());
  if (!searchData.results || searchData.results.length === 0) {
    Logger.log('Notion: No deal found for mandate ref: ' + mandateRef);
    return;
  }

  const pageId = searchData.results[0].id;

  // Append a comment / update the page with payment link info
  const commentUrl  = 'https://api.notion.com/v1/comments';
  const commentBody = {
    parent: { page_id: pageId },
    rich_text: [{
      type: 'text',
      text: {
        content: `[ACP-FEE-PORTAL] Payment link generated for ${skuCode} — $${amountUsd.toFixed(2)} USD | Client: ${clientName} | Session: ${checkoutResult.session_id}`,
      },
    }],
  };

  UrlFetchApp.fetch(commentUrl, {
    method:  'post',
    headers: {
      'Authorization':  'Bearer ' + cfg.notionToken,
      'Content-Type':   'application/json',
      'Notion-Version': '2022-06-28',
    },
    payload: JSON.stringify(commentBody),
    muteHttpExceptions: true,
  });

  Logger.log('✅ Notion deal updated: ' + pageId);
}

// ─── STRIPE WEBHOOK RECEIVER (HTTP POST endpoint) ────────────
/**
 * Stripe sends webhook events to: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 * This function receives payment confirmations and updates the Fee Register.
 *
 * Deploy as: Extensions → Apps Script → Deploy → New deployment → Web app
 * Execute as: Me | Who has access: Anyone
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Expected payload from ACP Portal notification webhook:
    // { event, mandate_ref, sku_code, amount_usd, client, ts }
    if (data.event === 'payment_received') {
      markPaymentConfirmedInSheet(data);
      updateNotionOnPayment(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ received: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('doPost error: ' + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function markPaymentConfirmedInSheet(data) {
  const cfg    = getStripeConfig();
  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  const sheet  = ss.getSheetByName(cfg.feeRegisterSheet);
  if (!sheet) return;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const allData = sheet.getDataRange().getValues();

  // Find row matching mandate_ref
  for (let i = 1; i < allData.length; i++) {
    const row = allData[i];
    const mandateCol = headers.indexOf('Mandate Reference');
    if (mandateCol >= 0 && row[mandateCol] === data.mandate_ref) {
      updateFeeRegisterRow(sheet, i + 1, headers, {
        'Payment Status':    'PAID',
        'Payment Date':      new Date().toISOString().substring(0, 10),
        'Amount Received':   data.amount_usd,
        'Fee Status':        'Invoiced — Collected',
      });
      Logger.log('✅ Fee Register updated — PAID: ' + data.mandate_ref);
      notifyJtPaymentReceived(cfg, data);
      return;
    }
  }
}

function updateNotionOnPayment(data) {
  const cfg = getStripeConfig();
  if (!cfg.notionToken || !data.mandate_ref) return;

  // Update Deals Master fee status in Notion
  const searchUrl = 'https://api.notion.com/v1/databases/' + cfg.notionDealsDb + '/query';
  const resp = UrlFetchApp.fetch(searchUrl, {
    method:  'post',
    headers: { 'Authorization': 'Bearer ' + cfg.notionToken, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28' },
    payload: JSON.stringify({ filter: { property: 'Deal Name', title: { contains: data.mandate_ref } } }),
    muteHttpExceptions: true,
  });

  const results = JSON.parse(resp.getContentText()).results || [];
  if (!results.length) return;

  const pageId = results[0].id;
  UrlFetchApp.fetch('https://api.notion.com/v1/pages/' + pageId, {
    method:  'patch',
    headers: { 'Authorization': 'Bearer ' + cfg.notionToken, 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28' },
    payload: JSON.stringify({
      properties: {
        'Fee Status': { select: { name: 'Collected' } },
      },
    }),
    muteHttpExceptions: true,
  });

  Logger.log('✅ Notion deal fee status → Collected: ' + data.mandate_ref);
}

// ─── JT NOTIFICATIONS ─────────────────────────────────────────
function notifyJtPaymentReceived(cfg, data) {
  const subject = `[ACP FEE PORTAL] ✅ Payment Received — ${data.mandate_ref}`;
  const body    = `Payment confirmed via Stripe.\n\nMandate: ${data.mandate_ref}\nSKU: ${data.sku_code}\nAmount: $${data.amount_usd} USD\nClient: ${data.client}\nTimestamp: ${data.ts}\n\nFee Register updated. Notion synced.\n\n—\nAscension Capital Partners | Automated Notification`;
  GmailApp.sendEmail(cfg.senderEmail, subject, body, { name: 'ACP Fee Portal Automation' });
}

function notifyJtOfError(cfg, mandateRef, clientName, error) {
  const subject = `[ACP FEE PORTAL] ⚠️ Stripe Error — ${mandateRef}`;
  const body    = `Stripe checkout creation failed.\n\nMandate: ${mandateRef}\nClient: ${clientName}\nError: ${error}\n\nManual action required.\n\n—\nAscension Capital Partners | Automated Notification`;
  GmailApp.sendEmail(cfg.senderEmail, subject, body, { name: 'ACP Fee Portal Automation' });
}

// ─── MANUAL UTILITIES ─────────────────────────────────────────

/**
 * Run manually: generate a Stripe payment link for a specific row in the Fee Register.
 * Select the row first, then run this function from the Apps Script editor.
 */
function generateStripeForSelectedRow() {
  const cfg    = getStripeConfig();
  const sheet  = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const row    = sheet.getActiveRange().getRow();
  if (row <= 1) { SpreadsheetApp.getUi().alert('Select a data row (not the header).'); return; }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values  = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  const data    = {};
  headers.forEach((h, i) => { data[h] = values[i]; });

  const mandateRef  = data['Mandate Reference'] || '';
  const clientName  = data['Client / Counterparty Name'] || data['Counterparty Name'] || '';
  const clientEmail = data['Client Email'] || data['Counterparty Email'] || '';
  const feeTypeRaw  = data['Fee Type'] || data['Fee SKU'] || '';
  const amountRaw   = data['Fee Amount (AUD)'] || data['Fee Amount'] || 0;
  const notes       = data['Notes'] || '';

  if (!clientEmail || !mandateRef) {
    SpreadsheetApp.getUi().alert('Missing client email or mandate reference in this row.');
    return;
  }

  const skuCode  = resolveSku(feeTypeRaw);
  const amountUsd = convertToUsd(parseFloat(amountRaw) || 0, 'AUD');

  const result = createStripeCheckout({ cfg, sku_code: skuCode, mandate_ref: mandateRef, client_name: clientName, client_email: clientEmail, amount_usd: amountUsd, notes });

  if (!result.success) {
    SpreadsheetApp.getUi().alert('❌ Stripe Error:\n' + result.error);
    return;
  }

  updateFeeRegisterRow(sheet, row, headers, {
    'Payment Link':   result.checkout_url,
    'Stripe Session': result.session_id,
    'Payment Status': 'Link Generated',
    'Link Sent Date': new Date().toISOString().substring(0, 10),
  });

  SpreadsheetApp.getUi().alert(`✅ Payment Link Generated\n\n${result.checkout_url}\n\nRow updated. Send this link to ${clientEmail}.`);
}

/**
 * Admin: pull the full fee ledger from ACP Portal into the Invoices sheet.
 */
function syncLedgerFromPortal() {
  const cfg = getStripeConfig();
  if (!cfg.adminToken) { SpreadsheetApp.getUi().alert('Admin token not set in Script Properties.'); return; }

  const resp = UrlFetchApp.fetch(cfg.portalBaseUrl + '/api/ledger', {
    headers: { 'x-admin-token': cfg.adminToken },
    muteHttpExceptions: true,
  });

  if (resp.getResponseCode() !== 200) {
    SpreadsheetApp.getUi().alert('❌ Portal API error: ' + resp.getContentText());
    return;
  }

  const data = JSON.parse(resp.getContentText());
  const ledger = data.ledger || [];
  if (!ledger.length) { SpreadsheetApp.getUi().alert('No paid transactions in ledger yet.'); return; }

  const ss     = SpreadsheetApp.getActiveSpreadsheet();
  let sheet    = ss.getSheetByName('ACP Stripe Ledger');
  if (!sheet) { sheet = ss.insertSheet('ACP Stripe Ledger'); }

  // Write headers + data
  const headers = ['#', 'Invoice Date', 'Mandate Ref', 'Client', 'SKU', 'Fee Type', 'Amount USD', 'Currency', 'Status', 'Stripe Session'];
  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#000000').setFontColor('#C5A55A');

  const rows = ledger.map((r, i) => [
    i + 1, r.invoice_date?.substring(0, 10) || '', r.mandate_ref, r.client_name,
    r.sku_code, r.fee_type, r.amount_usd, r.currency?.toUpperCase(), r.status, r.stripe_session || '',
  ]);
  if (rows.length) sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

  // Total row
  const totalRow = sheet.getLastRow() + 1;
  sheet.getRange(totalRow, 1).setValue('TOTAL COLLECTED');
  sheet.getRange(totalRow, 7).setValue(data.total_collected_usd);
  sheet.getRange(totalRow, 1, 1, headers.length).setFontWeight('bold').setBackground('#C5A55A').setFontColor('#000000');

  SpreadsheetApp.getUi().alert(`✅ Ledger synced — ${ledger.length} transactions | Total: $${data.total_collected_usd} USD`);
}

// ─── HELPERS ──────────────────────────────────────────────────
function resolveSku(feeTypeString) {
  if (!feeTypeString) return 'ACP-FEE-SET';
  // Direct SKU code passed
  if (feeTypeString.startsWith('ACP-FEE-')) return feeTypeString;
  // Label lookup
  const str = feeTypeString.trim();
  return ACP_FEE_SKUS[str] || Object.entries(ACP_FEE_SKUS).find(([k]) => str.toLowerCase().includes(k.toLowerCase()))?.[1] || 'ACP-FEE-SET';
}

function convertToUsd(amount, fromCurrency) {
  // Approximate FX rates — update or replace with live API call
  const rates = { AUD: 0.64, GBP: 1.27, EUR: 1.08, CAD: 0.74, USD: 1.00 };
  return parseFloat((amount * (rates[fromCurrency] || 1.0)).toFixed(2));
}

// ─── MENU ─────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚡ ACP Stripe')
    .addItem('Generate Link for Selected Row', 'generateStripeForSelectedRow')
    .addItem('Sync Ledger from Portal', 'syncLedgerFromPortal')
    .addSeparator()
    .addItem('Setup Integration Triggers', 'setupStripeIntegrationTriggers')
    .addToUi();
}
