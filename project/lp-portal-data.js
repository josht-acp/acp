/* LP Portal — seed data · Macquarie Pension Trust POV */
/* eslint-disable */

window.LP = {
  name: 'Ms Meera Patel',
  initials: 'MP',
  role: 'Head of Alternatives',
  firm: 'Macquarie Pension Trust',
};

window.FUNDS = [
  {
    id: 'pc1',
    code: 'ACP-PCO-I',
    name: 'ACP Private Credit Opportunities I, LP',
    vintage: '2024',
    life: '8-year life',
    ccy: 'AUD',
    status: 'DEPLOYING',
    commitment: 50.0,   // A$ m
    called: 27.5,       // A$ m
    reserved: 9.2,      // A$ m
    uncalled: 13.3,     // A$ m
    nav: 30.1,          // A$ m
    distributed: 10.5,  // A$ m
    irr: 15.6,          // %
    tvpi: 1.48,
    dpi: 0.38,
    rvpi: 1.10,
  },
  {
    id: 'et2',
    code: 'ACP-ETDI-II',
    name: 'ACP Energy Transition & DC Infrastructure II, LP',
    vintage: '2025',
    life: '10-year life',
    ccy: 'AUD',
    status: 'INVESTING',
    commitment: 25.0,
    called: 21.2,
    reserved: 3.6,
    uncalled: 0.2,
    nav: 22.8,
    distributed: 7.8,
    irr: 13.2,
    tvpi: 1.43,
    dpi: 0.37,
    rvpi: 1.06,
  },
];

window.CALLS = [
  { id:'CC-006', fund:'Fund II', date:'5 May 2026',   amount:1.875, pct:7.5,  status:'pending' },
  { id:'CC-005', fund:'Fund I',  date:'12 Feb 2026',  amount:4.000, pct:8.0,  status:'paid' },
  { id:'CC-004', fund:'Fund II', date:'18 Dec 2025',  amount:3.125, pct:12.5, status:'paid' },
  { id:'CC-003', fund:'Fund I',  date:'4 Oct 2025',   amount:5.500, pct:11.0, status:'paid' },
  { id:'CC-002', fund:'Fund I',  date:'22 Jun 2025',  amount:8.000, pct:16.0, status:'paid' },
  { id:'CC-001', fund:'Fund I',  date:'15 Mar 2025',  amount:10.000,pct:20.0, status:'paid' },
];

window.COINVEST = [
  { id:'orion', code:'OR', name:'Orion Data Centre Platform — Primary',
    sector:'Digital Infrastructure', geo:'Sydney & Melbourne',
    dealSize:'A$ 450M', lpAllocation:'A$ 50.0M',
    equity:'A$ 34.0M', nav:'A$ 36.8M', irr:'15.6%', status:'OFFERED' },
  { id:'titan', code:'TI', name:'Titan Critical Minerals — Senior Secured Facility',
    sector:'Critical Minerals', geo:'WA, Australia',
    dealSize:'A$ 95M', lpAllocation:'A$ 15.0M',
    equity:'—', nav:'—', irr:'Target 12.5%', status:'OPEN' },
  { id:'polaris', code:'PO', name:'Polaris Renewables — Development Equity',
    sector:'Energy Transition', geo:'NSW & Qld',
    dealSize:'A$ 280M', lpAllocation:'A$ 22.0M',
    equity:'—', nav:'—', irr:'Target 18.0%', status:'EARLY LOOK' },
];

window.DOCS = [
  { type:'PDF', name:'Q1 2026 Quarterly Report — Fund I', date:'21 Apr 2026', size:'14.2 MB', tag:'Signed by GP' },
  { type:'PDF', name:'Valuation Letter Q1 2026 — Fund I & II', date:'21 Apr 2026', size:'2.1 MB' },
  { type:'PDF', name:'Capital Call Notice #6 — Fund II', date:'18 Apr 2026', size:'340 KB' },
  { type:'PDF', name:'Orion DC Platform — Co-Invest Memo', date:'17 Apr 2026', size:'8.8 MB', tag:'Confidential' },
  { type:'PDF', name:'AMMA Statement FY2025 — Macquarie Pension Trust', date:'12 Apr 2026', size:'480 KB' },
  { type:'PDF', name:'LPA Amendment No. 2 — Fund I', date:'5 Mar 2026', size:'1.2 MB', tag:'Executed' },
];

window.MESSAGES = [
  { from:'Joshua Ting · Managing Partner', date:'21 Apr 2026', body:'Q1 report attached. Fund I is tracking 140 bps ahead of underwrite on deployed IRR; Fund II has two new pipeline items flagged in Co-Invest. Call Friday if helpful — 48 hrs on any questions.' },
  { from:'Joshua Ting · Managing Partner', date:'18 Apr 2026', body:'Capital Call #6 issued for Fund II — A$ 1.875M due 5 May (7.5% of commitment). Wire instructions unchanged. Contact the GP if value dates need to shift for cash management.' },
];

window.VINTAGES = [
  { year:'2024', acp:15.6, bench:11.2 },
  { year:'2025', acp:13.2, bench:10.8 },
];
