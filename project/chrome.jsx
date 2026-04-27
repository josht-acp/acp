/* ACP Website Wireframes — Shared chrome + primitives
   Hi-fi, dark-first, per ACP design system. */

/* global React */
const { useState, useEffect } = React;

/* ═══════════════════ PRIMITIVES ═══════════════════ */

window.Eyebrow = function Eyebrow({ n, children, gold = true }) {
  return (
    <div className="wf-eyebrow" style={{color: gold?'var(--acp-gold)':'var(--acp-silver)'}}>
      <span className="wf-rule"/>
      {n && <span className="wf-num">{n}</span>}
      <span>{children}</span>
    </div>
  );
};

window.Annot = function Annot({ n, children, side='right' }) {
  return (
    <div className={`wf-annot wf-annot-${side}`}>
      <span className="wf-annot-num">{String(n).padStart(2,'0')}</span>
      <span className="wf-annot-body">{children}</span>
    </div>
  );
};

/* ═══════════════════ NAV (desktop + mobile) ═══════════════════ */

window.ACPNav = function ACPNav({ current='Home', mobile=false }) {
  const links = ['About','Capabilities','Transactions','Thesis','Resources','Team','Contact'];
  if (mobile) {
    return (
      <div className="wf-nav wf-nav-mobile">
        <div className="wf-brand-mobile">
          <Mark size={22}/>
          <div className="wf-wordmark-sm">Ascension <em>Capital Partners</em></div>
        </div>
        <div className="wf-nav-burger">
          <span/><span/><span/>
        </div>
      </div>
    );
  }
  return (
    <nav className="wf-nav">
      <div className="wf-nav-inner">
        <div className="wf-brand">
          <Mark size={30}/>
          <div className="wf-wordmark">
            <div>Ascension <span>Capital</span> Partners</div>
            <em>Institutional · Principal-Led · Global</em>
          </div>
        </div>
        <ul className="wf-nav-links">
          {links.map(l => (
            <li key={l}><a className={l===current?'active':''}>{l}</a></li>
          ))}
        </ul>
        <div className="wf-nav-right">
          <a className="wf-nav-portal">Client Portal →</a>
          <a className="wf-nav-cta">Enquire →</a>
        </div>
      </div>
    </nav>
  );
};

/* Hexagonal Ascent mark, simplified inline */
window.Mark = function Mark({ size=32 }) {
  return (
    <svg className="wf-mark" width={size} height={size} viewBox="0 0 120 120" fill="none">
      <path d="M60 10L100 33V79L60 110L20 79V33L60 10Z" stroke="url(#mg1)" strokeWidth="3"/>
      <path d="M60 26L88 42V70L60 90L32 70V42L60 26Z" stroke="#C9A84C" strokeWidth="1" opacity="0.35"/>
      <path d="M44 68L60 38L76 68H44Z" fill="url(#mg2)"/>
      <line x1="60" y1="38" x2="60" y2="22" stroke="#C9A84C" strokeWidth="1" opacity="0.35"/>
      <defs>
        <linearGradient id="mg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9A7B2E"/><stop offset="0.5" stopColor="#C9A84C"/><stop offset="1" stopColor="#E2C97E"/></linearGradient>
        <linearGradient id="mg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9A84C"/><stop offset="1" stopColor="#E2C97E"/></linearGradient>
      </defs>
    </svg>
  );
};

/* ═══════════════════ FOOTER ═══════════════════ */

window.ACPFooter = function ACPFooter({ mobile=false }) {
  const cols = [
    { h: 'Capabilities', items: ['Energy Transition','Digital Infrastructure','Private Credit','Critical Minerals & Commodities','Impact Real Assets','Capital Markets','M&A Advisory'] },
    { h: 'Platform',     items: ['Transactions','Resources','Team','Client Portal','LP Portal'] },
    { h: 'Contact',      items: ['joshuating53@outlook.com','+61 451 338 533','Suite 3, 1 Cary Street','Drummoyne NSW 2047 · Australia'] },
  ];
  return (
    <footer className={`wf-footer ${mobile?'wf-footer-mobile':''}`}>
      <div className="wf-footer-inner">
        <div className="wf-footer-lead">
          <div className="wf-footer-brand">ASCENSION CAPITAL PARTNERS</div>
          <div className="wf-footer-legal">
            t/a APEX Consulting Partners Pty Ltd<br/>
            ACN 674 649 417 · Sydney, NSW · Australia<br/>
            Wholesale / professional investors only
          </div>
          <div className="wf-footer-iso">
            <span className="wf-chip">LMA / LSTA</span>
            <span className="wf-chip">ICMA GBP 2025</span>
            <span className="wf-chip">IFC PS</span>
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h} className="wf-footer-col">
            <div className="wf-footer-label">{c.h}</div>
            {c.items.map(i => <a key={i}>{i}</a>)}
          </div>
        ))}
      </div>
      <div className="wf-footer-disclaimer">
        Nothing on this website constitutes an offer, solicitation or recommendation to buy or sell any financial product. Materials available on request to qualified institutional counterparties only, under executed NDA and KYC/AML clearance.
      </div>
      <div className="wf-footer-baseline">
        <span>© 2026 Ascension Capital Partners</span>
        <span>Ascension Capital Partners | Confidential</span>
        <span>Confidentiality · Privacy · Regulatory</span>
      </div>
    </footer>
  );
};

/* ═══════════════════ ARTBOARD WRAPPER ═══════════════════ */

/* Page container for desktop pages */
window.DesktopPage = function DesktopPage({ code, name, children }) {
  return (
    <div className="wf-page wf-page-desktop">
      <div className="wf-page-bar">
        <span><span className="wf-dot"/>{code}</span>
        <span>{name}</span>
        <span>Desktop · 1440 × auto</span>
      </div>
      {children}
    </div>
  );
};

window.MobilePage = function MobilePage({ code, name, children }) {
  return (
    <div className="wf-page wf-page-mobile">
      <div className="wf-page-bar wf-page-bar-mobile">
        <span><span className="wf-dot"/>{code}</span>
        <span>{name}</span>
        <span>Mobile · 390 × auto</span>
      </div>
      {children}
    </div>
  );
};
