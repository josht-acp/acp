/* EOS Hub — surface registry · v8.0 */
/* eslint-disable */

window.EOS_BLOCKS = [
  { id:'FO', name:'Front Office', code:'F O',  tagline:'Revenue generation',        count:11 },
  { id:'MO', name:'Middle Office', code:'M O', tagline:'Risk · Compliance · Monitoring', count:8 },
  { id:'BO', name:'Back Office', code:'B O',   tagline:'Operations · Finance · Tech · EA', count:10 },
  { id:'IC', name:'Investment Committee', code:'I C', tagline:'Governance · Decisioning', count:2 },
  { id:'REL', name:'Relationship Office', code:'R E L', tagline:'Counterparty capital', count:3 },
  { id:'IR', name:'Investor Relations', code:'I R', tagline:'LP · Fund reporting', count:1 },
  { id:'HR', name:'People Office', code:'H R', tagline:'HR · Team build', count:1 },
  { id:'BD', name:'Business Development', code:'B D', tagline:'Capital formation', count:1 },
  { id:'KM', name:'Knowledge Management', code:'K M', tagline:'Deal intelligence vault', count:1 },
  { id:'FIN', name:'Finance', code:'F I N', tagline:'Cash · Runway · Forecast', count:1 },
  { id:'OPS', name:'Operations', code:'O P S', tagline:'Systems · Vendors · Stack', count:1 },
  { id:'PM', name:'Portfolio Monitoring', code:'P M', tagline:'Post-mortem · Learning', count:1 },
  { id:'EX', name:'Exit Readiness', code:'E X', tagline:'Strategic optionality', count:1 },
];

// 42 surfaces — each row is a real surface. status: LIVE|NEW|DRAFT. phase: P1|P2|CORE.
// ai = AI coverage 0–100. pdf = reference PDF in uploads/
window.EOS_SURFACES = [
  // Front Office (11)
  { code:'FO-01', eos:'EOS-01', block:'FO', name:'Pipeline Cockpit',          desc:'Weighted pipeline, stage conversion, revenue at stake', status:'LIVE', phase:'P1', ai:72, trigger:'Daily 07:00', owner:'JT', pdf:'pipeline-cockpit-acp.pdf' },
  { code:'FO-02', eos:'EOS-02', block:'FO', name:'Origination Radar',         desc:'Sector signals, new deal flow, proprietary intel',       status:'LIVE', phase:'P1', ai:84, trigger:'Continuous',  owner:'JT', pdf:'origination-radar-acp.pdf' },
  { code:'FO-03', eos:'EOS-03', block:'FO', name:'Mandate Status Board',      desc:'Active mandates, milestones, close probability',         status:'LIVE', phase:'P1', ai:58, trigger:'Weekly Mon', owner:'JT', pdf:'mandate-status-board-acp.pdf' },
  { code:'FO-04', eos:'EOS-04', block:'FO', name:'Revenue Board',             desc:'Fee realisation, SKU mix, collection ageing',            status:'LIVE', phase:'P1', ai:76, trigger:'Daily 18:00', owner:'JT', pdf:'revenue-board-acp.pdf' },
  { code:'FO-05', eos:'EOS-09', block:'FO', name:'Outreach Sequence Console', desc:'Multi-touch cadences, sponsor/investor/buyer sequences', status:'LIVE', phase:'P1', ai:88, trigger:'Continuous', owner:'JT', pdf:'outreach-console-acp.pdf' },
  { code:'FO-06', eos:'EOS-16', block:'FO', name:'Client Coverage Board',     desc:'Relationship heatmap, touchpoint cadence, warmth',       status:'LIVE', phase:'P1', ai:64, trigger:'Weekly Fri', owner:'JT', pdf:'client-coverage-board-acp.pdf' },
  { code:'FO-07', eos:'EOS-18', block:'FO', name:'Deal Room Cockpit',         desc:'Per-mandate cockpit, deliverables, counterparties',      status:'LIVE', phase:'P1', ai:62, trigger:'Per mandate', owner:'JT', pdf:'deal-room-cockpit-acp.pdf' },
  { code:'FO-08', eos:'EOS-23', block:'FO', name:'Term Sheet Composer',       desc:'Clause library, term engine, MFN/KP/MAC cascades',       status:'LIVE', phase:'P2', ai:82, trigger:'On deal entry', owner:'JT', pdf:'term-sheet-composer-acp.pdf' },
  { code:'FO-09', eos:'EOS-26', block:'FO', name:'LP Investor Portal',        desc:'Fund II portal scaffolding, DDQ UX, allocation tracker', status:'LIVE', phase:'P2', ai:48, trigger:'LP action',  owner:'JT', pdf:'lp-investor-portal-acp.pdf', live:'lp-portal.html' },
  { code:'FO-10', eos:'EOS-34', block:'FO', name:'Deal Sourcing Engine',      desc:'Sector-specific signals, funnel automation, watchlists', status:'LIVE', phase:'P1', ai:86, trigger:'Continuous', owner:'JT', pdf:'deal-sourcing-engine-acp.pdf' },
  { code:'FO-11', eos:'EOS-35', block:'FO', name:'Thematic Research Desk',    desc:'Sector theses, contrarian views, research cadence',      status:'LIVE', phase:'P1', ai:68, trigger:'Bi-weekly', owner:'JT', pdf:'thematic-research-desk-acp.pdf' },
  // Middle Office (8)
  { code:'MO-01', eos:'EOS-07', block:'MO', name:'KYC/AML Board',             desc:'Counterparty clearance, sanctions, EDD status',          status:'LIVE', phase:'P1', ai:78, trigger:'On counterparty', owner:'JT', pdf:'kyc-compliance-board-acp.pdf' },
  { code:'MO-02', eos:'EOS-08', block:'MO', name:'Portfolio Surveillance',    desc:'Covenant tracking, watchlist, escalation flags',          status:'LIVE', phase:'P1', ai:74, trigger:'Daily 06:00', owner:'JT', pdf:'portfolio-surveillance-acp.pdf' },
  { code:'MO-03', eos:'EOS-11', block:'MO', name:'Risk Committee Board',      desc:'Risk register, exposure heatmap, risk appetite',          status:'LIVE', phase:'P1', ai:52, trigger:'Monthly', owner:'JT', pdf:'risk-committee-board-acp.pdf' },
  { code:'MO-04', eos:'EOS-14', block:'MO', name:'Counsel & Legal Tracker',   desc:'Open legal items, document versions, CP status',          status:'LIVE', phase:'P1', ai:66, trigger:'On matter open', owner:'JT', pdf:'counsel-legal-tracker-acp.pdf' },
  { code:'MO-05', eos:'EOS-19', block:'MO', name:'Mandate Intake Wizard',     desc:'New mandate intake, KYC, conflict check, LoE',            status:'LIVE', phase:'P1', ai:84, trigger:'On new lead', owner:'JT', pdf:'mandate-intake-wizard-acp.pdf' },
  { code:'MO-06', eos:'EOS-24', block:'MO', name:'Covenant Calendar',         desc:'Forward covenant tests, breach probability, remediation', status:'LIVE', phase:'P2', ai:72, trigger:'Daily 06:00', owner:'JT', pdf:'covenant-calendar-acp.pdf' },
  { code:'MO-07', eos:'EOS-28', block:'MO', name:'Compliance Register',       desc:'Obligations, AFSL/FCA readiness, AUSTRAC filings',        status:'LIVE', phase:'P2', ai:56, trigger:'Weekly Mon', owner:'JT', pdf:'compliance-register-acp.pdf' },
  { code:'MO-08', eos:'EOS-36', block:'MO', name:'Valuation & Model Risk',    desc:'Model inventory, valuation challenge, IPEV alignment',    status:'LIVE', phase:'P2', ai:62, trigger:'Quarterly', owner:'JT', pdf:'valuation-model-risk-acp.pdf' },
  // Back Office (9)
  { code:'BO-01', eos:'EOS-05', block:'BO', name:'Action Tracker',            desc:'Open actions, owners, deadlines, blockers',               status:'LIVE', phase:'P1', ai:92, trigger:'Daily 07:00', owner:'JT', pdf:'action-tracker-acp.pdf' },
  { code:'BO-02', eos:'EOS-06', block:'BO', name:'Execution OS Library',      desc:'Playbooks, sequences, skill library, Notion routing',     status:'LIVE', phase:'P1', ai:96, trigger:'On routine',  owner:'JT', pdf:'execution-os-library-acp.pdf' },
  { code:'BO-03', eos:'EOS-12', block:'BO', name:'Cash & AR Dashboard',       desc:'Receipts, ageing, invoicing status, runway',              status:'LIVE', phase:'P1', ai:88, trigger:'Daily 18:00', owner:'JT', pdf:'cash-ar-dashboard-acp.pdf' },
  { code:'BO-04', eos:'EOS-13', block:'BO', name:'Meeting Prep / EA Cockpit', desc:'Calendar, briefings, pre-reads, action capture',          status:'LIVE', phase:'P1', ai:94, trigger:'Pre-meeting', owner:'JT', pdf:'meeting-prep-cockpit-acp.pdf' },
  { code:'BO-05', eos:'EOS-15', block:'BO', name:'Market Intelligence Radar', desc:'Macro, sector, geopolitical, commodity feeds',            status:'LIVE', phase:'P1', ai:82, trigger:'Continuous', owner:'JT', pdf:'market-intel-radar-acp.pdf' },
  { code:'BO-06', eos:'EOS-17', block:'BO', name:'Fee Engine / Invoice Composer', desc:'Stripe SKU taxonomy, Xero sync, fee stack',           status:'LIVE', phase:'P1', ai:98, trigger:'On fee event', owner:'JT', pdf:'fee-engine-invoice-composer-acp.pdf' },
  { code:'BO-07', eos:'EOS-20', block:'BO', name:'Agentic Org Chart',         desc:'Front/Middle/Back Office role map, AI delegation',        status:'LIVE', phase:'P1', ai:74, trigger:'Versioned',   owner:'JT', pdf:'agentic-org-chart-acp.pdf' },
  { code:'BO-08', eos:'EOS-25', block:'BO', name:"Principal's Scorecard",     desc:'JT personal OKRs, capital allocation, governance',        status:'LIVE', phase:'P1', ai:44, trigger:'Weekly Fri', owner:'JT', pdf:'principal-scorecard-acp.pdf' },
  { code:'BO-09', eos:'EOS-30', block:'BO', name:'Knowledge Base (firm-wide)',desc:'Playbook compendium, skill docs, SOP tree',               status:'LIVE', phase:'P1', ai:86, trigger:'Continuous', owner:'JT', pdf:'knowledge-base-acp.pdf' },
  // IC (2)
  { code:'IC-01', eos:'EOS-10', block:'IC', name:'IC Board Pack Generator',   desc:'IC submissions, board packs, scenario scoring',           status:'LIVE', phase:'P1', ai:78, trigger:'Pre-IC',     owner:'JT', pdf:'ic-board-pack-acp.pdf' },
  { code:'IC-02', eos:'EOS-29', block:'IC', name:'IC Minutes & Decisions Log',desc:'Historical decisions, precedent index, voting trail',     status:'LIVE', phase:'P1', ai:82, trigger:'Post-IC',    owner:'JT', pdf:'ic-minutes-log-acp.pdf' },
  // REL (3)
  { code:'REL-01', eos:'EOS-21', block:'REL', name:'Relationship Heatmap',    desc:'LPs, sponsors, counsel, advisors — warmth grid',          status:'LIVE', phase:'P1', ai:76, trigger:'Weekly Fri', owner:'JT', pdf:'relationship-heatmap-acp.pdf' },
  { code:'REL-02', eos:'EOS-32', block:'REL', name:'Capital Providers Registry', desc:'Lender universe, allocation mandates, ticket sizes',   status:'LIVE', phase:'P1', ai:68, trigger:'Monthly',    owner:'JT', pdf:'capital-providers-registry-acp.pdf' },
  { code:'REL-03', eos:'EOS-33', block:'REL', name:'Counsel & Advisor Registry', desc:'External bench, specialisms, fee rates, engagement',   status:'LIVE', phase:'P1', ai:58, trigger:'On engagement', owner:'JT', pdf:'counsel-advisor-registry-acp.pdf' },
  // IR (1)
  { code:'IR-01', eos:'EOS-37', block:'IR', name:'Investor Reporting & DDQ',  desc:'Quarterly reporting templates, DDQ answer bank, ILPA',    status:'LIVE', phase:'P2', ai:64, trigger:'Quarterly',  owner:'JT', pdf:'investor-reporting-ddq-acp.pdf' },
  // HR (1)
  { code:'HR-01', eos:'EOS-38', block:'HR', name:'Team Build & Hiring Plan',  desc:'12-role sequence, comp bands, AI leverage, equity pool',  status:'NEW',  phase:'P2', ai:38, trigger:'Triggered',  owner:'JT', pdf:'team-build-hiring-plan-acp.pdf' },
  // BD (1)
  { code:'BD-01', eos:'EOS-39', block:'BD', name:'LP Prospecting Engine',     desc:'420-LP universe, 6 cadences, 11 soft-circles A$142M',     status:'NEW',  phase:'P2', ai:80, trigger:'Continuous', owner:'JT', pdf:'lp-prospecting-engine-acp.pdf' },
  // KM (1)
  { code:'KM-01', eos:'EOS-40', block:'KM', name:'Knowledge Vault',           desc:'1,847 assets · 124 precedents · 487 comps · 312 clauses', status:'NEW',  phase:'CORE', ai:94, trigger:'Continuous', owner:'JT', pdf:'knowledge-vault-acp.pdf' },
  // FIN (1)
  { code:'FIN-01', eos:'EOS-41', block:'FIN', name:'Cash Flow & Runway Forecast', desc:'18-mo model · Bear/Base/Bull · A$2.8M Phase 2 cover', status:'NEW', phase:'P1', ai:88, trigger:'Weekly Mon', owner:'JT', pdf:'cash-ar-dashboard-acp.pdf' },
  // OPS (1)
  { code:'OPS-01', eos:'EOS-42', block:'OPS', name:'Systems & Vendor Stack',  desc:'34 vendors · A$96k TCO · 4 SPOFs mapped · replacement plan', status:'NEW', phase:'CORE', ai:62, trigger:'Monthly', owner:'JT' },
  // PM (1)
  { code:'PM-01', eos:'EOS-31', block:'PM', name:'Deal Post-Mortem Archive',  desc:'Closed deals, win/loss, lessons captured, precedent feed', status:'LIVE', phase:'P2', ai:72, trigger:'Post-close', owner:'JT', pdf:'deal-post-mortem-archive-acp.pdf' },
  // EX (1)
  { code:'EX-01', eos:'EOS-27', block:'EX', name:'Exit Readiness Dashboard',  desc:'Platform valuation drivers, acquirer universe, defensibility', status:'LIVE', phase:'P2', ai:54, trigger:'Quarterly', owner:'JT', pdf:'exit-readiness-dashboard-acp.pdf' },
  // Board governance (1) — flagged as ships-before-Fund-II-first-close in v8.0 release notes
  { code:'BG-01', eos:'EOS-22', block:'BO', name:'Board & Governance Calendar', desc:'Board meeting rhythm, governance overlay, ILPA alignment', status:'DRAFT', phase:'P2', ai:36, trigger:'Quarterly', owner:'JT', pdf:'board-governance-calendar-acp.pdf' },
];
