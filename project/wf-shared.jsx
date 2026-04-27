/* ACP Website Wireframes — shared chrome & primitives */
/* eslint-disable react/prop-types */

const MOUNTAIN = 'assets/mountain-hero.jpg';

// Hexagonal ascent mark (inline SVG, gold-on-dark)
const Mark = ({size=28}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="acp-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9A7B2E"/>
        <stop offset="0.5" stopColor="#C9A84C"/>
        <stop offset="1" stopColor="#E2C97E"/>
      </linearGradient>
    </defs>
    <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="url(#acp-g)" strokeWidth="1.5"/>
    <polygon points="32,12 48,22 48,42 32,52 16,42 16,22" fill="none" stroke="url(#acp-g)" strokeWidth="1" opacity="0.6"/>
    <path d="M32 18 L42 44 L32 38 L22 44 Z" fill="url(#acp-g)"/>
  </svg>
);

const NAV_LINKS = ['About','Capabilities','Transactions','Thesis','Resources','Team','Contact'];

// ── Annotation marker (reusable, positioned absolutely) ─────
const A = ({n, top, left, right, bottom, children, width=220}) => (
  <div className="wf-annot" style={{top, left, right, bottom, maxWidth:width}}>
    <span className="wf-annot-num">{n}</span>
    <span className="wf-annot-body">{children}</span>
  </div>
);

// ── Desktop nav ─────
const NavDesktop = ({active='Home'}) => (
  <nav className="wf-nav">
    <div className="wf-nav-inner">
      <div className="wf-brand">
        <div className="wf-mark"><Mark size={32}/></div>
        <div className="wf-wordmark">
          <span>Ascension</span> Capital Partners
          <em>Institutional · Principal-Led · Global</em>
        </div>
      </div>
      <ul className="wf-nav-links">
        {NAV_LINKS.map(l => <li key={l}><a className={active===l?'active':''}>{l}</a></li>)}
      </ul>
      <div className="wf-nav-right">
        <span className="wf-nav-portal">Client Portal →</span>
        <button className="wf-nav-cta">Enquire</button>
      </div>
    </div>
  </nav>
);

// ── Mobile nav ─────
const NavMobile = () => (
  <nav className="wf-nav-mobile">
    <div className="wf-brand-mobile">
      <Mark size={24}/>
      <div className="wf-wordmark-sm">
        Ascension Capital Partners
        <em>Institutional · Global</em>
      </div>
    </div>
    <div className="wf-nav-burger"><span/><span/><span/></div>
  </nav>
);

// ── Footer ─────
const Footer = () => (
  <footer className="wf-footer">
    <div className="wf-footer-inner">
      <div className="wf-footer-lead">
        <div className="wf-footer-brand">ASCENSION CAPITAL PARTNERS</div>
        <div className="wf-footer-legal">
          t/a APEX Consulting Partners Pty Ltd<br/>
          <span style={{fontFamily:'var(--font-mono)',letterSpacing:'0.12em'}}>ACN 674 649 417</span><br/>
          Suite 3, 1 Cary Street, Drummoyne NSW 2047, Australia
        </div>
        <div className="wf-footer-iso">
          <span className="wf-chip">LMA / LSTA</span>
          <span className="wf-chip">ICMA GBP 2025</span>
          <span className="wf-chip">IFC Performance</span>
        </div>
      </div>
      <div className="wf-footer-col">
        <div className="wf-footer-label">Capabilities</div>
        <a>Energy Transition</a>
        <a>Digital Infrastructure</a>
        <a>Private Credit</a>
        <a>Critical Minerals & Commodities</a>
        <a>Impact Real Assets</a>
        <a>Capital Markets</a>
      </div>
      <div className="wf-footer-col">
        <div className="wf-footer-label">Platform</div>
        <a>Transactions</a>
        <a>Platform Memorandum</a>
        <a>Resources</a>
        <a>Team</a>
        <a>Client Portal →</a>
        <a>LP Portal →</a>
      </div>
      <div className="wf-footer-col">
        <div className="wf-footer-label">Contact</div>
        <a style={{fontFamily:'var(--font-mono)',fontSize:12}}>joshuating53@outlook.com</a>
        <a style={{fontFamily:'var(--font-mono)',fontSize:12}}>+61 451 338 533</a>
        <div style={{marginTop:18,padding:14,border:'1px solid var(--acp-gold-hair)',background:'rgba(201,168,76,0.03)',fontSize:11,lineHeight:1.6,color:'var(--acp-silver)'}}>
          Materials available to qualified institutional counterparties only, under executed NDA.
        </div>
      </div>
    </div>
    <div className="wf-footer-disclaimer">
      Nothing on this website constitutes an offer, solicitation or recommendation to buy or sell any financial product. Ascension Capital Partners operates as a principal-led alternatives advisor; it does not manage pooled capital, does not accept retail mandates, and responds only to qualified institutional enquiries.
    </div>
    <div className="wf-footer-baseline">
      <span>© 2026 Ascension Capital Partners | Confidential</span>
      <span>Confidentiality · Privacy · Regulatory</span>
      <span>Sydney · NSW · Australia</span>
    </div>
  </footer>
);

// ── Page meta strip ─────
const PageBar = ({code, name, mobile}) => (
  <div className={'wf-page-bar'+(mobile?' wf-page-bar-mobile':'')}>
    <span><span className="wf-dot"/>{code}</span>
    <span>{name}</span>
    <span>{mobile?'Mobile · 390':'Desktop · 1440'}</span>
  </div>
);

// Section head (eyebrow + h1 + desc)
const SecHead = ({num, eye, title, desc}) => (
  <header className="wf-section-head">
    <div>
      <div className="wf-eyebrow"><span className="wf-rule"/><span className="wf-num">{num}</span> · {eye}</div>
      <h1 className="wf-h1" dangerouslySetInnerHTML={{__html:title}}/>
    </div>
    {desc && <p className="wf-section-desc">{desc}</p>}
  </header>
);

// ── Hero variations (3) ─────
const HeroLeft = () => (
  <section className="wf-hero" style={{position:'relative'}}>
    <div className="wf-hero-peak"/>
    <div className="wf-hero-peak-scrim"/>
    <div className="wf-hero-peak-glow"/>
    <div className="wf-hero-radial"/>
    <div className="wf-hero-inner">
      <div className="wf-eyebrow"><span className="wf-rule"/>Institutional · Principal-Led · Global</div>
      <h1 className="wf-hero-title">Capital <em>arranged</em><br/>for the transition economy.</h1>
      <p className="wf-hero-sub">Ascension Capital Partners is an institutional principal-led global alternatives M&amp;A advisory and capital arranging platform. We originate, structure and syndicate institutional capital for sustainable real assets and transition infrastructure — partner-grade, fee-only, LMA / LSTA / ICMA standards on every mandate.</p>
      <div className="wf-hero-actions">
        <button className="wf-btn wf-btn-primary">Request Institutional Access <span className="arr">→</span></button>
        <button className="wf-btn wf-btn-ghost">Read the Q1 2026 Market Letter</button>
      </div>
      <div className="wf-hero-stats">
        <div><div className="n">USD 10bn+</div><div className="l">Cumulative transactions</div></div>
        <div><div className="n">USD 5.8bn+</div><div className="l">Live mandate programme</div></div>
        <div><div className="n">7 · 4 · 12yr</div><div className="l">Verticals · Regions · Track record</div></div>
      </div>
    </div>
    <A n="1" top={120} right={40} width={210}>Hero variant A — left-aligned editorial. Blue-hour mountain with left-scrim gradient per Brand Suite. Two-line break forces gold italic emphasis on "arranged".</A>
    <A n="2" top={380} right={40} width={210}>Primary CTA in gold-gradient fill (canonical); secondary as ghost. Arrow glyph is Unicode →, never raster.</A>
    <A n="3" bottom={110} right={40} width={210}>Three-stat sub-bar replaces the standalone metrics section — compresses "By the Numbers" copy without losing the institutional proof.</A>
  </section>
);

const HeroCentred = () => (
  <section className="wf-hero" style={{position:'relative'}}>
    <div className="wf-hero-peak wf-hero-peak-centred"/>
    <div className="wf-hero-scrim wf-hero-scrim-centred"/>
    <div className="wf-hero-radial"/>
    <div className="wf-hero-inner wf-hero-inner-centred">
      <div className="wf-eyebrow"><span className="wf-rule"/>Institutional · Principal-Led · Global<span className="wf-rule"/></div>
      <h1 className="wf-hero-title wf-hero-title-centred">Capital <em>arranged</em> for the<br/>transition economy.</h1>
      <p className="wf-hero-sub wf-hero-sub-centred">Institutional principal-led global alternatives M&amp;A advisory and capital arranging. Partner-grade, fee-only, LMA / LSTA / ICMA standards on every mandate.</p>
      <div className="wf-hero-actions wf-hero-actions-centred">
        <button className="wf-btn wf-btn-primary">Request Institutional Access <span className="arr">→</span></button>
        <button className="wf-btn wf-btn-ghost">Q1 2026 Market Letter</button>
      </div>
      <div className="wf-hero-stats wf-hero-stats-centred">
        <div><div className="n">USD 10bn+</div><div className="l">Cumulative</div></div>
        <div className="wf-hero-stats-div"/>
        <div><div className="n">USD 5.8bn+</div><div className="l">Live mandates</div></div>
        <div className="wf-hero-stats-div"/>
        <div><div className="n">12+ yr</div><div className="l">Track record</div></div>
      </div>
    </div>
    <A n="1" top={120} left={40} width={220}>Hero variant B — centred editorial. Mountain imagery behind with radial scrim (not left-to-right). Best for section homepages or campaign pages.</A>
    <A n="2" top={120} right={40} width={220}>Eyebrow flanked by rules on both sides — subtle symmetry cue. All typography tokens identical to variant A.</A>
  </section>
);

const HeroAsym = () => (
  <section className="wf-hero-asym" style={{position:'relative'}}>
    <div className="wf-hero-asym-grid">
      <div>
        <div className="wf-eyebrow" style={{marginBottom:18}}><span className="wf-rule"/>Q1 2026 · Market Letter</div>
        <h1 className="wf-hero-title wf-hero-title-asym">The binding constraint has moved from <em>origination</em><br/>to <em>execution velocity.</em></h1>
        <p className="wf-hero-sub">A focused, principal-led platform operating at market-standard documentation grade can compete with — and often outpace — capital-first advisors. Our mandate is narrow: originate, structure, syndicate.</p>
        <div className="wf-hero-actions">
          <button className="wf-btn wf-btn-primary">Request Access <span className="arr">→</span></button>
          <button className="wf-btn wf-btn-ghost">Initiate Contact</button>
        </div>
        <div className="wf-hero-asym-letter">
          <div className="wf-mono-label">Latest Memorandum</div>
          <div className="wf-asym-letter-title">"Capital formation through a fragmenting cycle."</div>
          <div style={{fontSize:13,color:'var(--acp-silver)'}}>A short note on institutional capital velocity in Q1 2026.</div>
          <div className="wf-mini-cta">Read the letter →</div>
        </div>
      </div>
      <div>
        <div className="wf-hero-asym-image" style={{backgroundImage:`url(assets/everest-peak-clean.png)`, backgroundColor:'#06080F', backgroundSize:'contain', backgroundRepeat:'no-repeat', backgroundPosition:'center bottom', filter:'saturate(0.85) brightness(0.95)', border:'none'}}/>
        <div className="wf-hero-asym-stats">
          <div className="wf-asym-stat"><div className="n">USD 10bn+</div><div className="l">Cumulative transactions led</div></div>
          <div className="wf-asym-stat"><div className="n">USD 5.8bn+</div><div className="l">Live mandate programme</div></div>
          <div className="wf-asym-stat"><div className="n">7 verticals</div><div className="l">Proprietary origination</div></div>
          <div className="wf-asym-stat"><div className="n">12+ years</div><div className="l">Institutional track record</div></div>
        </div>
      </div>
    </div>
    <A n="1" top={40} left={40} width={220}>Hero variant C — asymmetric editorial. Reads as a market-letter cover. Recommended when a long-form POV leads the narrative.</A>
    <A n="2" top={200} right={40} width={220}>Image + 4-stat mosaic treats proof as a signature object. Stats card has 3px gold spine; border is hairline gold only.</A>
  </section>
);

// ── Metrics strip ─────
const MetricsStrip = () => (
  <section className="wf-section">
    <div className="wf-eyebrow" style={{marginBottom:32}}><span className="wf-rule"/><span className="wf-num">02</span> · By the Numbers</div>
    <div className="wf-metrics">
      <div className="wf-metric"><div className="v">USD 10bn+</div><div className="l">Cumulative transactions led across UK, US, Australia, Middle East and Europe</div></div>
      <div className="wf-metric"><div className="v">USD 5.8bn+</div><div className="l">Live institutional mandate programme across 20+ named assets</div></div>
      <div className="wf-metric"><div className="v">7</div><div className="l">Verticals with proprietary origination</div></div>
      <div className="wf-metric"><div className="v">4</div><div className="l">Regions · institutional counterparties only</div></div>
      <div className="wf-metric"><div className="v">12+ yrs</div><div className="l">Institutional track record in PC, PF, infrastructure</div></div>
    </div>
  </section>
);

// ── Verticals grid ─────
const VERTICALS = [
  ['01','Energy Transition','Grid-connected clean energy, storage and decarbonisation. Senior secured, mezz and equity. USD 5–200m.'],
  ['02','Digital Infrastructure','AI-ready DCs. Power-first underwriting, interconnect certainty, tenant-agnostic optionality. USD 20m – 1bn+.'],
  ['03','Private Credit','First-lien across renewables, infra, real assets. LMA/LSTA standard. Target gross yield 11–16%. USD 2–250m.'],
  ['04','Critical Minerals & Commodities','Offtake-backed PF — Ni, Co, Cu, Li, rare earths and strategic commodities. ECA-eligible, DFI-alignable. USD 5–25m.'],
  ['05','Impact Real Assets','Senior living, agri-sustainability, social infra, regenerative. Returns + measurable impact compound. USD 5–200m.'],
  ['06','Capital Markets','Green bonds · structured notes · syndication to institutional credit funds and DFIs.'],
  ['07','Strategic Capital','Diversified, cross-vertical programme mandates for platform sponsors.'],
];

const VerticalsGrid = () => (
  <section className="wf-section" style={{position:'relative'}}>
    <SecHead num="03" eye="Verticals" title="Seven verticals. <em>One integrated platform.</em>" desc="Each vertical is led by a dedicated origination desk with proprietary mandate flow. Documentation is market-standard; underwriting is principal-grade." />
    <div className="wf-vert-grid">
      {VERTICALS.slice(0,4).map(([n,t,d])=>(
        <div key={n} className="wf-vert-card">
          <div className="spine"/>
          <div className="wf-vert-num">{n} · Vertical</div>
          <div className="wf-vert-title">{t}</div>
          <div className="wf-vert-desc">{d}</div>
          <div className="wf-vert-arrow">Explore →</div>
        </div>
      ))}
    </div>
    <div className="wf-vert-grid" style={{marginTop:1,gridTemplateColumns:'repeat(4,1fr)'}}>
      {VERTICALS.slice(4).map(([n,t,d])=>(
        <div key={n} className="wf-vert-card">
          <div className="spine"/>
          <div className="wf-vert-num">{n} · Vertical</div>
          <div className="wf-vert-title">{t}</div>
          <div className="wf-vert-desc">{d}</div>
          <div className="wf-vert-arrow">Explore →</div>
        </div>
      ))}
      <div className="wf-vert-card" style={{display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--acp-charcoal)'}}>
        <div className="wf-vert-num">—</div>
        <div className="wf-vert-title" style={{fontSize:20}}>All capabilities</div>
        <div className="wf-vert-desc">Full index, filtered by region, ticket size and instrument.</div>
        <div className="wf-vert-arrow">View all →</div>
      </div>
    </div>
    <A n="1" top={60} right={-240} width={220}>4+4 grid (8th tile is an index CTA). Cards share a 3px gold spine at 40% opacity; hover brings it to 100%.</A>
  </section>
);

// ── Pillars ─────
const Pillars = () => (
  <section className="wf-section-full">
    <div className="wf-section-inner">
      <SecHead num="04" eye="What We Do" title="Originate. <em>Structure.</em> Distribute." desc="Three activities, one continuous process. No handoffs, no off-market asymmetric risk transfer, no retail capital intermediation." />
      <div className="wf-pillars">
        <div className="wf-pillar"><div className="wf-pillar-phase">Phase 01 · Originate</div><div className="wf-pillar-title">Originate</div><div className="wf-pillar-desc">Proprietary mandates with mid-teens IRR potential or 11–16% gross credit yield. Deal flow from sponsor relationships, not inbound decks.</div></div>
        <div className="wf-pillar"><div className="wf-pillar-phase">Phase 02 · Structure</div><div className="wf-pillar-title">Structure</div><div className="wf-pillar-desc">LMA / LSTA / ICMA / ILPA market-standard documentation. First-lien security, DSRA, offtake-backed revenue. No bespoke one-off risk transfer.</div></div>
        <div className="wf-pillar"><div className="wf-pillar-phase">Phase 03 · Distribute</div><div className="wf-pillar-title">Distribute</div><div className="wf-pillar-desc">Qualified institutional capital: family offices, credit funds, DFIs, sovereign-adjacent and ECA-backed lenders. KYC / AML cleared.</div></div>
      </div>
    </div>
  </section>
);

// ── Insights ─────
const Insights = () => (
  <section className="wf-section">
    <SecHead num="05" eye="Thought Leadership" title="Latest from <em>the Ascent.</em>" desc="Market letters · sector perspectives · deal anatomies. Published quarterly; circulated under NDA to retained counterparties." />
    <div className="wf-insight-grid">
      <div className="wf-insight">
        <div className="wf-insight-img i1"/>
        <div className="wf-insight-body">
          <div className="wf-insight-meta">Market Letter · 14 Apr 2026</div>
          <div className="wf-insight-title">Q1 2026 Market Letter</div>
          <div className="wf-insight-sub">Capital formation through a fragmenting cycle. DM private credit spreads, EM infra velocity, energy transition in bifurcation.</div>
          <div className="wf-insight-cta">Read the Memo →</div>
        </div>
      </div>
      <div className="wf-insight">
        <div className="wf-insight-img i2"/>
        <div className="wf-insight-body">
          <div className="wf-insight-meta">Sector Perspective · 02 Apr 2026</div>
          <div className="wf-insight-title">Power-first underwriting for AI-ready DCs</div>
          <div className="wf-insight-sub">Why interconnect certainty — not tenant covenant — is the binding constraint for hyperscale infrastructure capital.</div>
          <div className="wf-insight-cta">Read the Memo →</div>
        </div>
      </div>
      <div className="wf-insight">
        <div className="wf-insight-img i3"/>
        <div className="wf-insight-body">
          <div className="wf-insight-meta">Deal Anatomy · 21 Mar 2026</div>
          <div className="wf-insight-title">Structuring an ECA-wrapped green hydrogen facility</div>
          <div className="wf-insight-sub">Senior, DSRA, offtake tenor and ECA wrap mechanics across a cross-border transition mandate.</div>
          <div className="wf-insight-cta">Read the Memo →</div>
        </div>
      </div>
    </div>
  </section>
);

// ── CTA band ─────
const CtaBand = ({title, body, cta='Initiate Contact', sub='Or direct · joshuating53@outlook.com'}) => (
  <section className="wf-cta-band">
    <div className="wf-cta-band-inner">
      <div>
        <div className="wf-eyebrow" style={{marginBottom:20}}><span className="wf-rule"/>Partner-to-partner</div>
        <h2 className="wf-h1" style={{fontSize:44,maxWidth:720,marginTop:0}} dangerouslySetInnerHTML={{__html:title}}/>
        <p style={{fontSize:15,color:'var(--acp-silver)',lineHeight:1.65,maxWidth:720,marginTop:20}}>{body}</p>
      </div>
      <div style={{textAlign:'right'}}>
        <button className="wf-btn wf-btn-primary" style={{padding:'16px 32px'}}>{cta} <span className="arr">→</span></button>
        <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--acp-gold-dark)',marginTop:16}}>{sub}</div>
      </div>
    </div>
  </section>
);

Object.assign(window, {
  Mark, A, NavDesktop, NavMobile, Footer, PageBar, SecHead,
  HeroLeft, HeroCentred, HeroAsym, MetricsStrip, VerticalsGrid,
  Pillars, Insights, CtaBand, VERTICALS, MOUNTAIN
});
