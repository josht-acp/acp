/* ACP Website Wireframes — Pages */
/* eslint-disable react/prop-types */

const {
  Mark, A, NavDesktop, NavMobile, Footer, PageBar, SecHead,
  HeroLeft, HeroCentred, HeroAsym, MetricsStrip, VerticalsGrid,
  Pillars, Insights, CtaBand, VERTICALS, MOUNTAIN
} = window;

/* ═══════════════════════════════════════════════
   01 · HOMEPAGE — Desktop
   ═══════════════════════════════════════════════ */
const HomePage = ({heroVariant='left'}) => {
  const Hero = heroVariant==='centred'?HeroCentred:heroVariant==='asym'?HeroAsym:HeroLeft;
  return (
    <div className="wf-page wf-page-desktop" data-screen-label="01 Homepage">
      <PageBar code="PAGE 01" name="HOMEPAGE — /"/>
      <NavDesktop active="Home"/>
      <Hero/>
      <MetricsStrip/>
      <VerticalsGrid/>
      <Pillars/>
      <Insights/>
      <CtaBand
        title="Partner-to-partner <em>conversations.</em>"
        body="All engagement begins with a direct call. We do not publish fees or allocation terms. We do not respond to inbound capital-raise requests without a personal introduction or executed NDA. If that fits your process, we would like to talk."
      />
      <Footer/>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   02 · ABOUT — Desktop
   ═══════════════════════════════════════════════ */
const AboutPage = () => (
  <div className="wf-page wf-page-desktop" data-screen-label="02 About">
    <PageBar code="PAGE 02" name="ABOUT — /about"/>
    <NavDesktop active="About"/>

    <section className="wf-hero" style={{position:'relative',padding:'100px 56px 80px'}}>
      <div className="wf-hero-peak" style={{opacity:0.45}}/>
      <div className="wf-hero-peak-scrim"/>
      <div className="wf-hero-inner">
        <div className="wf-eyebrow"><span className="wf-rule"/>About · Firm Overview</div>
        <h1 className="wf-hero-title" style={{fontSize:68}}>An institutional platform built for the <em>transition economy.</em></h1>
      </div>
      <A n="1" top={120} right={40}>About hero uses the same Everest peak motif at reduced opacity — visually de-escalated vs. homepage hero.</A>
    </section>

    <section className="wf-section">
      <div className="wf-body-grid">
        <div>
          <div className="wf-eyebrow" style={{marginBottom:24}}><span className="wf-rule"/><span className="wf-num">01</span> · Doctrine</div>
          <div className="wf-pullquote">"We operate with the discipline of an institutional investor, the documentation standards of a <em>tier-1 investment bank,</em> and the agility of a partnership."</div>
          <p style={{marginTop:32,fontSize:15,lineHeight:1.75,color:'var(--acp-pearl)'}}>
            Ascension Capital Partners operates as a principal-led, fee-only, zero-capital institutional alternatives advisor. Our mandate is narrow and deliberate: originate, structure and syndicate institutional capital for sustainable real assets and transition infrastructure across APAC, EMEA, the Middle East and the Americas.
          </p>
          <p style={{marginTop:18,fontSize:15,lineHeight:1.75,color:'var(--acp-silver)'}}>
            The firm was founded on the view that the binding constraint in institutional alternatives has moved from origination to execution velocity, and that a focused, principal-led platform operating at market-standard documentation grade can compete with — and often outpace — capital-first advisors operating across a broader footprint.
          </p>
        </div>
        <div>
          <div className="wf-mono-label" style={{marginBottom:18}}>Operating Standards</div>
          <ul className="wf-standards">
            <li>LMA / LSTA credit<span className="mono">Canonical</span></li>
            <li>ICMA GBP 2025<span className="mono">Where labelled</span></li>
            <li>IFC Performance Standards<span className="mono">Sovereign-adjacent</span></li>
            <li>ILPA 3.0<span className="mono">Alignment</span></li>
            <li>SFDR Art. 8 / 9<span className="mono">EU mandates</span></li>
            <li>EU Taxonomy · DNSH<span className="mono">Where applicable</span></li>
          </ul>
        </div>
      </div>
      <A n="2" top={80} right={-240} width={220}>7:5 text + operating-standards panel. Standards carry a mono caveat on the right — signals precision without visual weight.</A>
    </section>

    <section className="wf-section-full">
      <div className="wf-section-inner">
        <SecHead num="02" eye="Scope" title="What we are <em>not.</em>" desc="Clarity by negation. These are the boundaries of our practice — they define what we will not engage on, whatever the counterparty." />
        <div className="wf-not-grid">
          <div className="wf-not"><div className="wf-not-t">Not a fund manager.</div><div className="wf-not-d">We do not manage pooled capital. Arrangement, syndication and advisory only.</div></div>
          <div className="wf-not"><div className="wf-not-t">Not a retail platform.</div><div className="wf-not-d">We transact exclusively with qualified institutional counterparties.</div></div>
          <div className="wf-not"><div className="wf-not-t">Not a generalist.</div><div className="wf-not-d">We lead with impact, transition and real assets. No consumer, no crypto, no retail.</div></div>
        </div>
      </div>
    </section>

    <section className="wf-section" style={{position:'relative'}}>
      <SecHead num="03" eye="Leadership" title="Principal-led, <em>by design.</em>" desc="Three partners. Each engagement is led and owned by a named principal — no associates-as-cover, no outsourced origination." />
      <div className="wf-team-grid">
        <div className="wf-team-card">
          <div className="wf-team-portrait wf-portrait-jt"/>
          <div className="wf-mono-label" style={{marginTop:20}}>Executive Managing Partner</div>
          <h3 className="wf-team-name">Joshua Ting</h3>
          <div className="wf-team-role">Global Head · Alternatives &amp; Private Markets</div>
          <p className="wf-team-bio">Leads origination, structuring and distribution across the platform. 12+ years institutional experience; USD 10bn+ cumulative transactions across UK, US, Australia, Middle East and Europe.</p>
          <div className="wf-team-stats">
            <div><div className="n">USD 10bn+</div><div className="l">Cumulative</div></div>
            <div><div className="n">12+ yrs</div><div className="l">Institutional</div></div>
          </div>
        </div>
        <div className="wf-team-card">
          <div className="wf-team-portrait wf-portrait-2"/>
          <div className="wf-mono-label" style={{marginTop:20}}>Managing Partner · Placeholder</div>
          <h3 className="wf-team-name">[Partner 02]</h3>
          <div className="wf-team-role">[Role / Regional or Vertical Head]</div>
          <p className="wf-team-bio">[Short bio — origination focus, sectors covered, prior institutional roles, cumulative transaction experience. Supply to populate.]</p>
          <div className="wf-team-stats">
            <div><div className="n">USD —</div><div className="l">Cumulative</div></div>
            <div><div className="n">— yrs</div><div className="l">Institutional</div></div>
          </div>
        </div>
        <div className="wf-team-card">
          <div className="wf-team-portrait wf-portrait-3"/>
          <div className="wf-mono-label" style={{marginTop:20}}>Managing Partner · Placeholder</div>
          <h3 className="wf-team-name">[Partner 03]</h3>
          <div className="wf-team-role">[Role / Regional or Vertical Head]</div>
          <p className="wf-team-bio">[Short bio — structuring and distribution focus, documentation expertise, institutional relationships. Supply to populate.]</p>
          <div className="wf-team-stats">
            <div><div className="n">USD —</div><div className="l">Cumulative</div></div>
            <div><div className="n">— yrs</div><div className="l">Institutional</div></div>
          </div>
        </div>
      </div>
      <A n="3" top={40} right={-240} width={220}>Three-partner team grid. Placeholder cards for partners 02 &amp; 03 — supply names, roles, bios, portraits.</A>
    </section>

    <section className="wf-section">
      <SecHead num="04" eye="Entity & Regulatory" title="Registered in NSW. <em>Governed under English law.</em>" />
      <div className="wf-body-grid">
        <div>
          <div className="wf-mono-label" style={{marginBottom:12}}>Legal entity</div>
          <p style={{fontSize:14,lineHeight:1.75,color:'var(--acp-pearl)'}}>
            Ascension Capital Partners trades as APEX Consulting Partners Pty Ltd <span style={{fontFamily:'var(--font-mono)',color:'var(--acp-gold-light)'}}>(ACN 674 649 417)</span>. Registered in New South Wales, Australia.
          </p>
        </div>
        <div>
          <div className="wf-mono-label" style={{marginBottom:12}}>Governing law</div>
          <p style={{fontSize:14,lineHeight:1.75,color:'var(--acp-pearl)'}}>
            Mandate documentation principally governed by England &amp; Wales with arbitration under the rules of the London Court of International Arbitration.
          </p>
        </div>
      </div>
    </section>

    <CtaBand title="Ready to begin a <em>conversation.</em>" body="We respond to qualified institutional enquiries within 48 hours." cta="Initiate Contact"/>
    <Footer/>
  </div>
);

/* ═══════════════════════════════════════════════
   03 · VERTICAL PAGE TEMPLATE (factory)
   ═══════════════════════════════════════════════ */

const VERTICAL_CONTENT = {
  'energy-transition':{
    code:'PAGE 03',
    label:'Energy Transition',
    title:'Energy Transition <em>· institutional capital,</em> institutionally papered.',
    body:'Institutional capital deployed across grid-connected clean energy, storage and decarbonisation infrastructure with long-dated contracted cashflows. Senior secured, mezzanine and equity across solar, wind, BESS, geothermal, CHP and CCU.',
    ticket:'USD 5m – USD 200m',
    instruments:'Senior · Mezz · Equity',
    sectors:'Solar · Wind · BESS · Geothermal · CHP · CCU',
    metrics:'DSCR · LLCR · Offtake tenor',
    criteria:[
      ['Offtake tenor','Contracted revenue with investment-grade or multilateral counterparties, minimum 10-year weighted average tenor.'],
      ['Interconnection','Executed interconnection agreement or clear path to energisation within 24 months of FID.'],
      ['DSCR coverage','Base-case DSCR ≥ 1.35x under P90 generation assumptions with stressed merchant tail.'],
    ],
  },
  'digital-infrastructure':{
    code:'PAGE 04',
    label:'Digital Infrastructure',
    title:'Digital Infrastructure <em>· institutional capital,</em> institutionally papered.',
    body:'Capital formation for AI-ready data centre and cloud infrastructure. Equity, senior debt and ABL facilities for greenfield, brownfield-conversion and modular DC platforms. Power-first underwriting, interconnect certainty, tenant-agnostic optionality, real-asset security.',
    ticket:'USD 20m – USD 1bn+',
    instruments:'Equity · Senior · ABL',
    sectors:'Hyperscale · Colo · Modular · Brownfield',
    metrics:'Power secured · Interconnect · PUE',
    criteria:[
      ['Power secured','Binding utility commitment or executed PPA for full build-out load; contingent allocations do not qualify.'],
      ['Tenant flexibility','Site viable across multiple tenant classes (hyperscale, colocation, enterprise) — no single-tenant concentration risk.'],
      ['Asset-backed security','Real-asset collateral package including land, improvements and power rights.'],
    ],
  },
  'private-credit':{
    code:'PAGE 05',
    label:'Private Credit',
    title:'Private Credit <em>· institutional capital,</em> institutionally papered.',
    body:'Institutional private credit with first-lien security across renewables, energy, digital infrastructure and real assets. LMA/LSTA-standard documentation. Bridge, unitranche and senior facility expertise. Target gross yield 11–16%.',
    ticket:'USD 2m (bridge) – USD 250m (senior co-lead anchor)',
    instruments:'Senior · Unitranche · Bridge',
    sectors:'Cross-vertical, real-asset backed',
    metrics:'Gross yield · LTV · DSCR · Covenants',
    criteria:[
      ['First-lien security','Enforceable first-ranking security over real assets or contracted cash flows; no unsecured or second-lien exposure.'],
      ['Documentation grade','LMA / LSTA standard. Financial covenants, equity-cure mechanics, step-up pricing. No cov-lite.'],
      ['Sponsor quality','Institutional or family-office sponsor with demonstrable alignment and fresh equity at close.'],
    ],
  },
  'critical-minerals':{
    code:'PAGE 06',
    label:'Critical Minerals',
    title:'Critical Minerals <em>· institutional capital,</em> institutionally papered.',
    body:'Offtake-backed project finance for transition minerals — nickel, cobalt, copper, lithium, rare earths. ECA-eligible, DFI-alignable, IFC Performance Standards governance from day one. Ticket size USD 5–25m. Contracted offtake, enhanced ESG overlay, multi-party governance.',
    ticket:'USD 5m – USD 25m',
    instruments:'PF senior · ECA-wrapped · DFI co-invest',
    sectors:'Ni · Co · Cu · Li · REEs',
    metrics:'Offtake · ESG score · IFC alignment',
    criteria:[
      ['Contracted offtake','Binding take-or-pay or equivalent with Tier-1 industrial counterparty for ≥ 60% of nameplate.'],
      ['IFC Performance Standards','Full IFC PS compliance from FID. Independent lender\'s E&S advisor engaged.'],
      ['Multi-party governance','ECA, DFI, or sovereign-adjacent participation materially enhances credit and governance posture.'],
    ],
  },
  'impact-real-assets':{
    code:'PAGE 07',
    label:'Impact Real Assets',
    title:'Impact Real Assets <em>· institutional capital,</em> institutionally papered.',
    body:'Principal-aligned capital into real assets where financial returns and measurable impact compound. Senior living, agri-sustainability, social infrastructure, regenerative and circular economy. Senior debt, mezzanine, pref equity, green bonds, structured notes.',
    ticket:'USD 5m – USD 200m',
    instruments:'Senior · Mezz · Pref · Green Bonds · Notes',
    sectors:'Senior living · Agri · Social infra · Regenerative',
    metrics:'Impact KPI · SFDR · DSCR',
    criteria:[
      ['Measurable impact','SFDR Article 8 or 9 classification with quantified annual impact reporting against a public framework.'],
      ['Returns discipline','Base-case IRR ≥ 11% (equity) or contracted yield ≥ 7% (debt); impact does not subsidise financial underwriting.'],
      ['Institutional sponsor','Track record delivering at institutional scale. No first-fund, no retail syndication.'],
    ],
  },
};

const VerticalPage = ({slug='energy-transition'}) => {
  const v = VERTICAL_CONTENT[slug];
  return (
    <div className="wf-page wf-page-desktop" data-screen-label={`03 Vertical · ${v.label}`}>
      <PageBar code={v.code} name={`VERTICAL — /capabilities/${slug}`}/>
      <NavDesktop active="Capabilities"/>

      <section className="wf-section" style={{paddingTop:72,paddingBottom:56}}>
        <div className="wf-mono-label" style={{marginBottom:24}}>Capabilities  ·  Vertical  ·  <span style={{color:'var(--acp-gold-light)'}}>{v.label}</span></div>
        <h1 className="wf-hero-title" style={{fontSize:60,maxWidth:1100,margin:'0 0 16px'}} dangerouslySetInnerHTML={{__html:v.title}}/>
      </section>

      <section className="wf-section" style={{paddingTop:0,position:'relative'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:56,alignItems:'start',paddingTop:48,borderTop:'1px solid var(--acp-gold-hair)'}}>
          <div>
            <div className="wf-eyebrow" style={{marginBottom:24}}><span className="wf-rule"/>Overview</div>
            <p style={{fontSize:17,lineHeight:1.75,color:'var(--acp-pearl)',maxWidth:680,margin:0}}>{v.body}</p>
            <p style={{fontSize:14,lineHeight:1.75,color:'var(--acp-silver)',maxWidth:680,marginTop:24}}>
              Mandates structured to LMA/LSTA documentation with DSCR-driven underwriting, DSRA and offtake-backed revenue where available. ECA-wrap and DFI co-investment on qualifying transactions.
            </p>
          </div>
          <div className="wf-fact">
            <div className="wf-fact-label">Facility profile</div>
            <div className="wf-fact-row"><span className="k">Ticket size</span><span className="v">{v.ticket}</span></div>
            <div className="wf-fact-row"><span className="k">Instruments</span><span className="v">{v.instruments}</span></div>
            <div className="wf-fact-row"><span className="k">Sectors</span><span className="v">{v.sectors}</span></div>
            <div className="wf-fact-row"><span className="k">Key metrics</span><span className="v">{v.metrics}</span></div>
            <div className="wf-fact-row"><span className="k">Documentation</span><span className="v">LMA / LSTA standard</span></div>
            <div className="wf-fact-row"><span className="k">Coverage</span><span className="v">APAC · EMEA · Americas</span></div>
          </div>
        </div>
        <A n="1" top={60} right={-240} width={220}>Reusable vertical template. Facility profile card is the structural anchor — same keys across all 5 verticals, different values.</A>
      </section>

      <section className="wf-section-full" style={{position:'relative'}}>
        <div className="wf-section-inner">
          <SecHead num="02" eye="What We Screen For" title="Three criteria. <em>Non-negotiable.</em>" desc="We do not engage on mandates that fail any of the three. No waivers, no exceptions on documentation grade." />
          <div className="wf-pillars">
            {v.criteria.map(([t,d],i)=>(
              <div key={i} className="wf-pillar">
                <div className="wf-pillar-phase">Criterion 0{i+1}</div>
                <div className="wf-pillar-title" style={{fontSize:28}}>{t}</div>
                <div className="wf-pillar-desc">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <A n="2" top={60} right={20} width={220}>Copy-doc placeholders filled with plausible institutional criteria — flag to user for content-team review.</A>
      </section>

      <section className="wf-section" style={{position:'relative'}}>
        <SecHead num="03" eye="Representative Mandates" title="Select <em>engagements.</em>" desc="Indicative only. Counterparty names withheld under standing confidentiality." />
        <table className="wf-table">
          <thead>
            <tr>
              <th style={{width:'30%'}}>Mandate</th>
              <th>Sector</th>
              <th>Region</th>
              <th>Role</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Utility-scale solar PF</td><td>Solar · PV</td><td>APAC</td><td>Sole Arranger</td><td className="mono">USD 140m</td><td><span className="wf-chip closed">Closed</span></td></tr>
            <tr><td>BESS co-investment</td><td>Storage</td><td>EMEA</td><td>Co-Advisor</td><td className="mono">USD 75m</td><td><span className="wf-chip live">Live</span></td></tr>
            <tr><td>Grid-connected wind platform</td><td>Wind</td><td>Americas</td><td>MLA</td><td className="mono">USD 220m</td><td><span className="wf-chip live">Live</span></td></tr>
            <tr><td>CHP + CCU programme</td><td>CHP / CCU</td><td>UK</td><td>Lead Arranger</td><td className="mono">GBP 650m+</td><td><span className="wf-chip closed">Closed</span></td></tr>
          </tbody>
        </table>
        <A n="3" top={60} right={-240} width={220}>Transactions table — mono for size column (technical), chips for status. Green dot "Live" is the only semantic colour on the page.</A>
      </section>

      <CtaBand
        title="Initiate contact <em>directly.</em>"
        body="We respond within 48 hours on qualified enquiries. Engagement begins with an executed NDA; mandate letters follow under LMA/LSTA-style documentation."
        cta="Request Institutional Access"
      />
      <Footer/>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   04 · CONTACT — Desktop
   ═══════════════════════════════════════════════ */
const ContactPage = () => (
  <div className="wf-page wf-page-desktop" data-screen-label="04 Contact">
    <PageBar code="PAGE 08" name="CONTACT — /contact"/>
    <NavDesktop active="Contact"/>

    <section className="wf-hero" style={{position:'relative',padding:'100px 56px 64px'}}>
      <div className="wf-hero-peak" style={{opacity:0.4}}/>
      <div className="wf-hero-peak-scrim"/>
      <div className="wf-hero-inner">
        <div className="wf-eyebrow"><span className="wf-rule"/>Contact · Principal-to-Principal</div>
        <h1 className="wf-hero-title">Let's talk.</h1>
        <p className="wf-hero-sub">We respond to every qualified institutional enquiry within 48 hours. If you are a sponsor seeking capital, an allocator seeking mandates, or a strategic partner seeking alliance — reach out.</p>
      </div>
    </section>

    <section className="wf-section" style={{position:'relative'}}>
      <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:56,alignItems:'start'}}>
        <div>
          <div className="wf-eyebrow" style={{marginBottom:24}}><span className="wf-rule"/><span className="wf-num">01</span> · Enquiry Form</div>
          <div className="wf-form">
            <div className="wf-form-row">
              <div className="wf-field"><label>Name · Required</label><div className="input">Full name</div></div>
              <div className="wf-field"><label>Firm · Required</label><div className="input">Institution</div></div>
            </div>
            <div className="wf-form-row">
              <div className="wf-field"><label>Role · Required</label><div className="input">Title</div></div>
              <div className="wf-field"><label>Email · Required · firm domain only</label><div className="input" style={{color:'var(--acp-steel)'}}>you@firm.com</div></div>
            </div>
            <div className="wf-form-row">
              <div className="wf-field"><label>Phone · Optional</label><div className="input">+ country · mobile</div></div>
              <div className="wf-field"><label>Engagement Type · Required</label>
                <div className="input" style={{justifyContent:'space-between',display:'flex'}}><span>Select one</span><span style={{color:'var(--acp-gold)'}}>▾</span></div>
              </div>
            </div>
            <div className="wf-field"><label>Message · 140–500 chars · Required</label>
              <div className="input tall" style={{color:'var(--acp-steel)'}}>Brief description of mandate, allocation interest, or strategic context. We read every enquiry.</div>
            </div>
            <div className="wf-checkbox">
              <div className="box"/>
              <div><strong style={{color:'var(--acp-pearl)',fontWeight:500}}>Confidentiality acknowledgement.</strong><br/>I confirm this enquiry is made in a professional capacity and consent to confidential handling under ACP standard terms.</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:24,paddingTop:20,borderTop:'1px solid var(--acp-gold-hair)'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--acp-steel)'}}>All fields marked required</span>
              <button className="wf-btn wf-btn-primary">Submit enquiry <span className="arr">→</span></button>
            </div>
          </div>
        </div>

        <div>
          <div className="wf-eyebrow" style={{marginBottom:24}}><span className="wf-rule"/><span className="wf-num">02</span> · Direct</div>
          <div className="wf-fact" style={{padding:28}}>
            <div className="wf-fact-label">Executive Managing Partner</div>
            <div style={{fontFamily:'var(--font-display)',fontSize:28,fontWeight:400,color:'var(--acp-white)',marginBottom:6}}>Joshua Ting</div>
            <div style={{fontFamily:'var(--font-display)',fontSize:15,fontStyle:'italic',color:'var(--acp-gold-light)',marginBottom:18}}>Global Head of Alternatives &amp; Private Markets</div>
            <div className="wf-fact-row"><span className="k">Mobile</span><span className="v" style={{fontFamily:'var(--font-mono)'}}>+61 451 338 533</span></div>
            <div className="wf-fact-row"><span className="k">Email</span><span className="v" style={{fontFamily:'var(--font-mono)',fontSize:11}}>joshuating53@outlook.com</span></div>
          </div>
          <div className="wf-fact" style={{padding:28,marginTop:20}}>
            <div className="wf-fact-label">Registered Office</div>
            <div style={{fontSize:14,lineHeight:1.75,color:'var(--acp-pearl)'}}>
              Ascension Capital Partners<br/>
              t/a APEX Consulting Partners Pty Ltd<br/>
              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--acp-gold-light)'}}>ACN 674 649 417</span><br/><br/>
              Suite 3, 1 Cary Street<br/>
              Drummoyne NSW 2047<br/>
              Australia
            </div>
          </div>
        </div>
      </div>
      <A n="1" top={60} right={-240} width={220}>Form validates institutional email domains only. Server-side check; inline error micro-copy specified.</A>
      <A n="2" top={380} right={-240} width={220}>Right rail = direct contact. Consistent card treatment: gold-gradient spine + hairline border.</A>
    </section>

    <section className="wf-section-full">
      <div className="wf-section-inner">
        <div className="wf-eyebrow" style={{marginBottom:32}}><span className="wf-rule"/><span className="wf-num">03</span> · Form States Reference</div>
        <div className="wf-insight-grid">
          {[
            ['Success','Received. We respond to qualified institutional enquiries within 48 hours.','var(--acp-success)'],
            ['Domain validation','We respond to institutional email addresses only. Please use your firm domain.','var(--acp-warning)'],
            ['Submit failure',"The enquiry didn't reach us. Please try again, or email directly.",'var(--acp-error)'],
          ].map(([t,d,c])=>(
            <div key={t} className="wf-fact" style={{padding:24}}>
              <div className="wf-fact-label" style={{color:c,marginBottom:12}}>● {t}</div>
              <div style={{fontSize:14,lineHeight:1.65,color:'var(--acp-pearl)',fontStyle:'italic'}}>"{d}"</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer/>
  </div>
);

/* ═══════════════════════════════════════════════
   MOBILE PAGES — thin wrappers using same components
   ═══════════════════════════════════════════════ */
const MobileWrap = ({label, code, name, children}) => (
  <div className="wf-page wf-page-mobile" data-screen-label={label}>
    <PageBar code={code} name={name} mobile/>
    <NavMobile/>
    {children}
    <Footer/>
  </div>
);

const HomePageMobile = () => (
  <MobileWrap label="01 Homepage · Mobile" code="01 · MOBILE" name="/">
    <section className="wf-hero" style={{position:'relative'}}>
      <div className="wf-hero-peak" style={{opacity:0.6}}/>
      <div className="wf-hero-peak-scrim"/>
      <div className="wf-hero-inner">
        <div className="wf-eyebrow" style={{fontSize:9}}><span className="wf-rule"/>Principal-Led · Global</div>
        <h1 className="wf-hero-title">Capital <em>arranged</em> for the transition economy.</h1>
        <p className="wf-hero-sub">Institutional principal-led alternatives advisory. LMA / LSTA / ICMA standards on every mandate.</p>
        <div className="wf-hero-actions">
          <button className="wf-btn wf-btn-primary">Request Access <span className="arr">→</span></button>
          <button className="wf-btn wf-btn-ghost">Q1 Market Letter</button>
        </div>
        <div className="wf-hero-stats">
          <div><div className="n">USD 10bn+</div><div className="l">Cumulative transactions</div></div>
          <div><div className="n">USD 5.8bn+</div><div className="l">Live mandate programme</div></div>
          <div><div className="n">12+ yrs</div><div className="l">Institutional track record</div></div>
        </div>
      </div>
    </section>
    <section className="wf-section">
      <div className="wf-eyebrow" style={{marginBottom:20}}><span className="wf-rule"/>By the Numbers</div>
      <div className="wf-metrics">
        <div className="wf-metric"><div className="v">USD 10bn+</div><div className="l">Cumulative led</div></div>
        <div className="wf-metric"><div className="v">USD 5.8bn+</div><div className="l">Live mandate</div></div>
        <div className="wf-metric"><div className="v">7</div><div className="l">Verticals</div></div>
        <div className="wf-metric"><div className="v">4</div><div className="l">Regions</div></div>
      </div>
    </section>
    <section className="wf-section">
      <SecHead num="03" eye="Verticals" title="Seven verticals. <em>One platform.</em>"/>
      <div className="wf-vert-grid">
        {VERTICALS.slice(0,5).map(([n,t,d])=>(
          <div key={n} className="wf-vert-card"><div className="spine"/>
            <div className="wf-vert-num">{n} · Vertical</div>
            <div className="wf-vert-title">{t}</div>
            <div className="wf-vert-desc">{d}</div>
            <div className="wf-vert-arrow">Explore →</div>
          </div>
        ))}
      </div>
    </section>
    <Pillars/>
    <CtaBand title="Partner-to-partner <em>conversations.</em>" body="All engagement begins with a direct call." cta="Initiate Contact" sub="joshuating53@outlook.com"/>
  </MobileWrap>
);

const AboutMobile = () => (
  <MobileWrap label="02 About · Mobile" code="02 · MOBILE" name="/about">
    <section className="wf-hero" style={{position:'relative',padding:'48px 20px 56px'}}>
      <div className="wf-hero-peak" style={{opacity:0.4}}/>
      <div className="wf-hero-peak-scrim"/>
      <div className="wf-hero-inner">
        <div className="wf-eyebrow"><span className="wf-rule"/>About</div>
        <h1 className="wf-hero-title">An institutional platform built for the <em>transition economy.</em></h1>
      </div>
    </section>
    <section className="wf-section">
      <div className="wf-eyebrow" style={{marginBottom:20}}><span className="wf-rule"/>Doctrine</div>
      <div className="wf-pullquote">"Discipline of an institutional investor, documentation of a <em>tier-1 bank,</em> agility of a partnership."</div>
      <p style={{marginTop:20,fontSize:14,lineHeight:1.7,color:'var(--acp-pearl)'}}>Principal-led, fee-only, zero-capital. Originate, structure, syndicate institutional capital for sustainable real assets and transition infrastructure.</p>
    </section>
    <section className="wf-section-full"><div className="wf-section-inner">
      <SecHead num="02" eye="Scope" title="What we are <em>not.</em>"/>
      <div className="wf-not-grid">
        <div className="wf-not"><div className="wf-not-t">Not a fund manager.</div><div className="wf-not-d">No pooled capital.</div></div>
        <div className="wf-not"><div className="wf-not-t">Not retail.</div><div className="wf-not-d">Institutional counterparties only.</div></div>
        <div className="wf-not"><div className="wf-not-t">Not a generalist.</div><div className="wf-not-d">Transition, impact, real assets.</div></div>
      </div>
    </div></section>
    <section className="wf-section">
      <SecHead num="03" eye="Leadership" title="Principal-led, <em>by design.</em>"/>
      <div className="wf-team-grid">
        <div className="wf-team-card">
          <div className="wf-team-portrait wf-portrait-jt"/>
          <div className="wf-mono-label" style={{marginTop:16}}>Executive Managing Partner</div>
          <h3 className="wf-team-name">Joshua Ting</h3>
          <div className="wf-team-role">Global Head · Alternatives &amp; Private Markets</div>
          <p className="wf-team-bio">12+ yrs institutional. USD 10bn+ cumulative transactions across UK, US, AU, ME, EU.</p>
        </div>
        <div className="wf-team-card">
          <div className="wf-team-portrait wf-portrait-2"/>
          <div className="wf-mono-label" style={{marginTop:16}}>Managing Partner · Placeholder</div>
          <h3 className="wf-team-name">[Partner 02]</h3>
          <div className="wf-team-role">[Role / Regional or Vertical Head]</div>
          <p className="wf-team-bio">[Short bio — supply to populate.]</p>
        </div>
        <div className="wf-team-card">
          <div className="wf-team-portrait wf-portrait-3"/>
          <div className="wf-mono-label" style={{marginTop:16}}>Managing Partner · Placeholder</div>
          <h3 className="wf-team-name">[Partner 03]</h3>
          <div className="wf-team-role">[Role / Regional or Vertical Head]</div>
          <p className="wf-team-bio">[Short bio — supply to populate.]</p>
        </div>
      </div>
    </section>
    <CtaBand title="Initiate a <em>conversation.</em>" body="48hr response on qualified enquiries." cta="Contact"/>
  </MobileWrap>
);

const VerticalMobile = ({slug='energy-transition'}) => {
  const v = VERTICAL_CONTENT[slug];
  return (
    <MobileWrap label={`03 Vertical · Mobile · ${v.label}`} code={v.code+' · M'} name={`/capabilities/${slug}`}>
      <section className="wf-section">
        <div className="wf-mono-label" style={{marginBottom:16,fontSize:9}}>Capabilities · <span style={{color:'var(--acp-gold-light)'}}>{v.label}</span></div>
        <h1 className="wf-hero-title" dangerouslySetInnerHTML={{__html:v.title}}/>
      </section>
      <section className="wf-section" style={{paddingTop:0}}>
        <div style={{paddingTop:32,borderTop:'1px solid var(--acp-gold-hair)'}}>
          <div className="wf-eyebrow" style={{marginBottom:20}}><span className="wf-rule"/>Overview</div>
          <p style={{fontSize:15,lineHeight:1.7,color:'var(--acp-pearl)',margin:0}}>{v.body}</p>
        </div>
        <div className="wf-fact" style={{marginTop:24}}>
          <div className="wf-fact-label">Facility Profile</div>
          <div className="wf-fact-row"><span className="k">Ticket</span><span className="v">{v.ticket}</span></div>
          <div className="wf-fact-row"><span className="k">Instruments</span><span className="v">{v.instruments}</span></div>
          <div className="wf-fact-row"><span className="k">Sectors</span><span className="v">{v.sectors}</span></div>
          <div className="wf-fact-row"><span className="k">Metrics</span><span className="v">{v.metrics}</span></div>
        </div>
      </section>
      <section className="wf-section-full"><div className="wf-section-inner">
        <SecHead num="02" eye="We Screen For" title="Three criteria."/>
        <div className="wf-pillars">
          {v.criteria.map(([t,d],i)=>(
            <div key={i} className="wf-pillar">
              <div className="wf-pillar-phase">Criterion 0{i+1}</div>
              <div className="wf-pillar-title">{t}</div>
              <div className="wf-pillar-desc">{d}</div>
            </div>
          ))}
        </div>
      </div></section>
      <CtaBand title="Initiate <em>directly.</em>" body="48-hour response on qualified enquiries." cta="Request Access"/>
    </MobileWrap>
  );
};

const ContactMobile = () => (
  <MobileWrap label="04 Contact · Mobile" code="08 · MOBILE" name="/contact">
    <section className="wf-hero" style={{position:'relative',padding:'48px 20px 40px'}}>
      <div className="wf-hero-peak" style={{opacity:0.35}}/>
      <div className="wf-hero-peak-scrim"/>
      <div className="wf-hero-inner">
        <div className="wf-eyebrow"><span className="wf-rule"/>Contact</div>
        <h1 className="wf-hero-title">Let's talk.</h1>
        <p className="wf-hero-sub">48-hour response on qualified institutional enquiries.</p>
      </div>
    </section>
    <section className="wf-section">
      <div className="wf-eyebrow" style={{marginBottom:16}}><span className="wf-rule"/>Enquiry Form</div>
      <div className="wf-form" style={{padding:20}}>
        <div className="wf-field"><label>Name · Required</label><div className="input">Full name</div></div>
        <div className="wf-field"><label>Firm · Required</label><div className="input">Institution</div></div>
        <div className="wf-field"><label>Role · Required</label><div className="input">Title</div></div>
        <div className="wf-field"><label>Email · Firm domain</label><div className="input" style={{color:'var(--acp-steel)'}}>you@firm.com</div></div>
        <div className="wf-field"><label>Engagement type</label><div className="input" style={{justifyContent:'space-between',display:'flex'}}><span>Select</span><span style={{color:'var(--acp-gold)'}}>▾</span></div></div>
        <div className="wf-field"><label>Message · 140–500 chars</label><div className="input tall" style={{color:'var(--acp-steel)'}}>Brief description.</div></div>
        <div className="wf-checkbox"><div className="box"/><div>Confidentiality acknowledgement.</div></div>
        <button className="wf-btn wf-btn-primary" style={{width:'100%',justifyContent:'center'}}>Submit <span className="arr">→</span></button>
      </div>
      <div className="wf-fact" style={{marginTop:24}}>
        <div className="wf-fact-label">Direct · Executive Managing Partner</div>
        <div style={{fontFamily:'var(--font-display)',fontSize:24,color:'var(--acp-white)',marginBottom:16}}>Joshua Ting</div>
        <div className="wf-fact-row"><span className="k">Mobile</span><span className="v" style={{fontFamily:'var(--font-mono)',fontSize:11}}>MOBILE</span></div>
        <div className="wf-fact-row"><span className="k">Email</span><span className="v" style={{fontFamily:'var(--font-mono)',fontSize:10}}>joshuating53@outlook.com</span></div>
      </div>
    </section>
  </MobileWrap>
);

/* ═══════════════════════════════════════════════
   09 · TRANSACTIONS — Desktop & Mobile
   ═══════════════════════════════════════════════ */
const TXN_REGIONS = ['ALL','APAC','EMEA','AMERICAS','GLOBAL / MULTI-REGION'];
const TXN_TYPES   = ['ALL','DEBT ADVISORY','PROJECT FINANCE','M&A ADVISORY','ECM / PLACEMENT','TECHNICAL ADVISORY'];

const TRANSACTIONS = [
  { size:'US$1.8M',  region:'APAC',        type:'Debt Advisory',     status:'LIVE',
    role:'Sole Debt Advisor', asset:'Offtake Ltd · Bitumen Fleet Revolver', desc:'Two-vessel revolving cargo facility secured against receivables. Running an ECA-wrap option alongside the base trade-bank syndication.', date:'Q1 2026' },
  { size:'US$295M',  region:'EMEA',        type:'Project Finance',   status:'LIVE',
    role:'Sole Debt Advisor', asset:'Project HTS · 450 MW Solar + BESS', desc:'Non-recourse senior PF for Iberian solar with co-located storage. ECA-eligible, IFC PS-aligned. We lead structuring, lender outreach and CA certification.', date:'Q1 2026' },
  { size:'US$75M',   region:'APAC',        type:'Project Finance',   status:'LIVE',
    role:'Lead Arranger', asset:'Project Adventure · Run-of-River Hydro', desc:'Senior facility for civils and turbine supply under a 20-year PPA. ECA-eligibility workstream in parallel with commercial lender engagement.', date:'Q1 2026' },

  { size:'A$8.3BN',  region:'APAC',        type:'M&A Advisory',      status:'CLOSED',
    role:'Sell-Side Lead', asset:'Market Cycles Ltd · Platform Divestment', desc:'Sell-side on a renewables and storage platform owned by an ASX-listed sponsor. Cross-border bidder process; signed and announced in twelve weeks.', date:'Q4 2025' },
  { size:'US$5.1BN', region:'EMEA',        type:'M&A Advisory',      status:'CLOSED',
    role:'Buy-Side Lead', asset:'Provo Group · Project Kilkenny', desc:'Buy-side on a programmatic bolt-on of regional digital infra assets. Core-plus thesis, single-bidder close, minimal exclusivity leakage.', date:'Q4 2025' },
  { size:'US$750M',  region:'AMERICAS',    type:'ECM / Placement',   status:'CLOSED',
    role:'Joint Book-Runner', asset:'GS Calvert · The Forge', desc:'Equity placement for a greenfield hyperscale campus. Book covered 4.2×; joint book-runner on pricing and allocation.', date:'Q3 2025' },

  { size:'US$4.7BN', region:'AMERICAS',    type:'Project Finance',   status:'CLOSED',
    role:'Co-Lead · Senior Debt', asset:'Project Horizon · Cross-Border Rail PPP', desc:'Senior debt syndication for a multi-jurisdiction rail concession. DFIs alongside commercial banks; structured to investment-grade.', date:'Q3 2025' },
  { size:'US$4.6BN', region:'EMEA',        type:'Debt Advisory',     status:'CLOSED',
    role:'Sole Debt Advisor', asset:'Project Autobahn · Pisa AX WBS', desc:'Whole-business securitisation refinancing of a toll concession. Rating-agency led, 30-year amortisation, covenant-light in the senior.', date:'Q3 2025' },
  { size:'US$10.6BN',region:'GLOBAL / MULTI-REGION', type:'M&A Advisory', status:'CLOSED',
    role:'Financial Adviser to Bidder', asset:'Project Tatra · Take-Private', desc:'Take-private of an LSE-listed infrastructure investment trust. APAC assets, EU holdco, UK offer mechanics. Signed in sixteen weeks.', date:'Q2 2025' },

  { size:'US$620M',  region:'APAC',        type:'Technical Advisory',status:'CLOSED',
    role:'Owner’s Engineer', asset:'Project Meridian · 500 kV Interconnect', desc:'Owner\u2019s engineer and financial-close support. Lender-engineer coordination and drawdown certification through COD.', date:'Q2 2025' },
  { size:'US$185M',  region:'EMEA',        type:'ECM / Placement',   status:'CLOSED',
    role:'Cornerstone Lead', asset:'Helios Renewables Holdco', desc:'Pre-IPO cornerstone round. Sovereign and long-only sleeve; we led book-building and set the allocation policy.', date:'Q1 2025' },
  { size:'US$95M',   region:'APAC',        type:'Debt Advisory',     status:'CLOSED',
    role:'Sole Placement Agent', asset:'Project Atlas · PF Mezz', desc:'Mezzanine tranche behind a senior refinancing. 13.5% gross, six-year bullet, placed with a single specialist credit fund.', date:'Q1 2025' },
];

const TxnCard = ({t}) => (
  <div className="wf-txn-card">
    <div className="wf-txn-head">
      <div className="wf-txn-meta">
        <span className="wf-txn-type">{t.type}</span>
        <span className="wf-txn-dot">·</span>
        <span className="wf-txn-region">{t.region}</span>
      </div>
      <span className={'wf-chip ' + (t.status==='LIVE'?'live':'closed')}>{t.status}</span>
    </div>
    <div className="wf-txn-size">{t.size}</div>
    <div className="wf-txn-date">{t.date}</div>
    <div className="wf-txn-asset">{t.asset}</div>
    <div className="wf-txn-desc">{t.desc}</div>
    <div className="wf-txn-foot">
      <span className="wf-txn-foot-k">ROLE</span>
      <span className="wf-txn-foot-v">{t.role || 'Sole Advisor'}</span>
    </div>
  </div>
);

const TransactionsPage = () => {
  const [region, setRegion] = React.useState('APAC');
  const [ttype,  setType]   = React.useState('ALL');
  const filtered = TRANSACTIONS.filter(t =>
    (region==='ALL' || t.region===region) &&
    (ttype ==='ALL' || t.type.toUpperCase()===ttype)
  );
  return (
    <div className="wf-page wf-page-desktop" data-screen-label="09 Transactions">
      <PageBar code="PAGE 09" name="TRANSACTIONS — /transactions"/>
      <NavDesktop active="Transactions"/>

      <section className="wf-section" style={{paddingBottom:20}}>
        <div className="wf-eyebrow" style={{marginBottom:24}}><span className="wf-rule"/>Track Record</div>
        <h1 className="wf-hero-title" style={{fontSize:96,marginBottom:18}}>Transactions.</h1>
        <p style={{maxWidth:820,fontSize:16,lineHeight:1.65,color:'var(--acp-silver)',marginBottom:36}}>
          A representative slice of mandates we've led or co-led. Names masked where obligations persist; sizes rounded; terms abbreviated. Filter by region or by what we were hired to do.
        </p>

        <div className="wf-filter-label">Region</div>
        <div className="wf-filter-row">
          {TXN_REGIONS.map(r => (
            <button key={r} className={'wf-pill ' + (region===r?'on':'')} onClick={()=>setRegion(r)}>{r}</button>
          ))}
        </div>

        <div className="wf-filter-label" style={{marginTop:28}}>Mandate Type</div>
        <div className="wf-filter-row">
          {TXN_TYPES.map(r => (
            <button key={r} className={'wf-pill ' + (ttype===r?'on':'')} onClick={()=>setType(r)}>{r}</button>
          ))}
        </div>
      </section>

      <section className="wf-section" style={{paddingTop:40,paddingBottom:80}}>
        <div className="wf-txn-grid">
          {filtered.map((t,i) => <TxnCard key={i} t={t}/>)}
        </div>
        {filtered.length===0 && (
          <div style={{padding:60,textAlign:'center',border:'1px dashed var(--acp-gold-hair)',color:'var(--acp-steel)',fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'0.1em',textTransform:'uppercase'}}>
            Nothing on the books matching that cut. Try a wider region.
          </div>
        )}
      </section>

      <section className="wf-section" style={{paddingTop:0}}>
        <div className="wf-metrics" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
          <div className="wf-metric"><div className="v">US$10BN+</div><div className="l">Cumulative value led or co-led</div></div>
          <div className="wf-metric"><div className="v">US$5.8BN</div><div className="l">On the books right now</div></div>
          <div className="wf-metric"><div className="v">12</div><div className="l">Live mandates across the desk</div></div>
          <div className="wf-metric"><div className="v">4</div><div className="l">Regions · named counterparties only</div></div>
        </div>
      </section>

      <CtaBand
        title="Small queue. <em>Short memos.</em>"
        body="We take on a limited number of mandates per quarter and staff each one at partner level. If the asset is real and the timing is yours, get on a call. Response inside two business days."
        cta="Open a Conversation"
      />
      <Footer/>
    </div>
  );
};

const TransactionsMobile = () => {
  const [region, setRegion] = React.useState('APAC');
  const [ttype,  setType]   = React.useState('ALL');
  const filtered = TRANSACTIONS.filter(t =>
    (region==='ALL' || t.region===region) &&
    (ttype ==='ALL' || t.type.toUpperCase()===ttype)
  );
  return (
    <MobileWrap label="09 Transactions · Mobile" code="09 · MOBILE" name="/transactions">
      <section className="wf-section" style={{padding:'48px 20px 24px'}}>
        <div className="wf-eyebrow" style={{marginBottom:16}}><span className="wf-rule"/>Track Record</div>
        <h1 className="wf-hero-title" style={{fontSize:44,marginBottom:12}}>Transactions.</h1>
        <p style={{fontSize:14,lineHeight:1.6,color:'var(--acp-silver)',marginBottom:24}}>
          A slice of what we've led. Names masked, sizes rounded, terms abbreviated. Filter by region or mandate type.
        </p>
        <div className="wf-filter-label">Region</div>
        <div className="wf-filter-row wf-filter-row-m">
          {TXN_REGIONS.map(r => (
            <button key={r} className={'wf-pill ' + (region===r?'on':'')} onClick={()=>setRegion(r)}>{r}</button>
          ))}
        </div>
        <div className="wf-filter-label" style={{marginTop:20}}>Mandate Type</div>
        <div className="wf-filter-row wf-filter-row-m">
          {TXN_TYPES.map(r => (
            <button key={r} className={'wf-pill ' + (ttype===r?'on':'')} onClick={()=>setType(r)}>{r}</button>
          ))}
        </div>
      </section>
      <section className="wf-section" style={{padding:'8px 20px 40px'}}>
        <div className="wf-txn-grid wf-txn-grid-m">
          {filtered.map((t,i) => <TxnCard key={i} t={t}/>)}
        </div>
      </section>
      <CtaBand title="Small queue. <em>Short memos.</em>" body="Partner-staffed mandates. Response inside two business days." cta="Open a Conversation"/>
    </MobileWrap>
  );
};

Object.assign(window, {
  HomePage, AboutPage, VerticalPage, ContactPage,
  HomePageMobile, AboutMobile, VerticalMobile, ContactMobile,
  TransactionsPage, TransactionsMobile,
  VERTICAL_CONTENT
});
