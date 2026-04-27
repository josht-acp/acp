import type { Metadata } from 'next';
import CtaBand from '@/components/sections/CtaBand';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About — Ascension Capital Partners',
  description: 'Principal-led, fee-only, zero-capital. An institutional platform built for the transition economy.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroPeak}/>
        <div className={styles.heroPeakScrim}/>
        <div className={styles.heroInner}>
          <div className="eyebrow"><span className="rule"/>About · Firm Overview</div>
          <h1 className={styles.heroTitle}>
            An institutional platform built for the <em>transition economy.</em>
          </h1>
        </div>
      </section>

      {/* Doctrine */}
      <section className="section">
        <div className={styles.bodyGrid}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="rule"/><span className="num">01</span> · Doctrine
            </div>
            <div className={styles.pullquote}>
              "We operate with the discipline of an institutional investor, the documentation standards
              of a <em>tier-1 investment bank,</em> and the agility of a partnership."
            </div>
            <p className={styles.body}>
              Ascension Capital Partners operates as a principal-led, fee-only, zero-capital
              institutional alternatives advisor. Our mandate is narrow and deliberate: originate,
              structure and syndicate institutional capital for sustainable real assets and transition
              infrastructure across APAC, EMEA, the Middle East and the Americas.
            </p>
            <p className={styles.bodyMuted}>
              The firm was founded on the view that the binding constraint in institutional alternatives
              has moved from origination to execution velocity, and that a focused, principal-led
              platform operating at market-standard documentation grade can compete with — and often
              outpace — capital-first advisors operating across a broader footprint.
            </p>
          </div>
          <div>
            <div className="monoLabel" style={{ marginBottom: 18 }}>Operating Standards</div>
            <ul className={styles.standards}>
              {[
                ['LMA / LSTA credit', 'Canonical'],
                ['ICMA GBP 2025', 'Where labelled'],
                ['IFC Performance Standards', 'Sovereign-adjacent'],
                ['ILPA 3.0', 'Alignment'],
                ['SFDR Art. 8 / 9', 'EU mandates'],
                ['EU Taxonomy · DNSH', 'Where applicable'],
              ].map(([std, note]) => (
                <li key={std}>
                  {std}
                  <span className={styles.stdNote}>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Scope — What We Are Not */}
      <div className="sectionFull">
        <div className="sectionInner">
          <div className="sectionHead">
            <div>
              <div className="eyebrow"><span className="rule"/><span className="num">02</span> · Scope</div>
              <h2 className="sectionTitle">What we are <em>not.</em></h2>
            </div>
            <p className="sectionDesc">
              Clarity by negation. These are the boundaries of our practice — they define
              what we will not engage on, whatever the counterparty.
            </p>
          </div>
          <div className={styles.notGrid}>
            {[
              ['Not a fund manager.', 'We do not manage pooled capital. Arrangement, syndication and advisory only.'],
              ['Not a retail platform.', 'We transact exclusively with qualified institutional counterparties.'],
              ['Not a generalist.', 'We lead with impact, transition and real assets. No consumer, no crypto, no retail.'],
            ].map(([t, d]) => (
              <div key={t} className={styles.notItem}>
                <div className={styles.notTitle}>{t}</div>
                <div className={styles.notDesc}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <section className="section" id="team">
        <div className="sectionHead">
          <div>
            <div className="eyebrow"><span className="rule"/><span className="num">03</span> · Leadership</div>
            <h2 className="sectionTitle">Principal-led, <em>by design.</em></h2>
          </div>
          <p className="sectionDesc">
            Three partners. Each engagement is led and owned by a named principal —
            no associates-as-cover, no outsourced origination.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {/* Joshua Ting */}
          <div className={styles.teamCard}>
            <div className={`${styles.portrait} ${styles.portraitJT}`}/>
            <div className="monoLabel" style={{ marginTop: 20 }}>Executive Managing Partner</div>
            <h3 className={styles.teamName}>Joshua Ting</h3>
            <div className={styles.teamRole}>Global Head · Alternatives &amp; Private Markets</div>
            <p className={styles.teamBio}>
              Leads origination, structuring and distribution across the platform.
              12+ years institutional experience; USD 10bn+ cumulative transactions
              across UK, US, Australia, Middle East and Europe.
            </p>
            <div className={styles.teamStats}>
              <div><div className={styles.sn}>USD 10bn+</div><div className={styles.sl}>Cumulative</div></div>
              <div><div className={styles.sn}>12+ yrs</div><div className={styles.sl}>Institutional</div></div>
            </div>
          </div>

          {/* Partner 02 placeholder */}
          <div className={styles.teamCard}>
            <div className={`${styles.portrait} ${styles.portraitP2}`}/>
            <div className="monoLabel" style={{ marginTop: 20 }}>Managing Partner · Placeholder</div>
            <h3 className={styles.teamName}>[Partner 02]</h3>
            <div className={styles.teamRole}>[Role / Regional or Vertical Head]</div>
            <p className={styles.teamBio}>
              [Short bio — origination focus, sectors covered, prior institutional roles,
              cumulative transaction experience. Supply to populate.]
            </p>
            <div className={styles.teamStats}>
              <div><div className={styles.sn}>USD —</div><div className={styles.sl}>Cumulative</div></div>
              <div><div className={styles.sn}>— yrs</div><div className={styles.sl}>Institutional</div></div>
            </div>
          </div>

          {/* Partner 03 placeholder */}
          <div className={styles.teamCard}>
            <div className={`${styles.portrait} ${styles.portraitP3}`}/>
            <div className="monoLabel" style={{ marginTop: 20 }}>Managing Partner · Placeholder</div>
            <h3 className={styles.teamName}>[Partner 03]</h3>
            <div className={styles.teamRole}>[Role / Regional or Vertical Head]</div>
            <p className={styles.teamBio}>
              [Short bio — structuring and distribution focus, documentation expertise,
              institutional relationships. Supply to populate.]
            </p>
            <div className={styles.teamStats}>
              <div><div className={styles.sn}>USD —</div><div className={styles.sl}>Cumulative</div></div>
              <div><div className={styles.sn}>— yrs</div><div className={styles.sl}>Institutional</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Entity & Regulatory */}
      <section className="section">
        <div className="sectionHead">
          <div>
            <div className="eyebrow"><span className="rule"/><span className="num">04</span> · Entity &amp; Regulatory</div>
            <h2 className="sectionTitle">Registered in NSW. <em>Governed under English law.</em></h2>
          </div>
        </div>
        <div className={styles.bodyGrid}>
          <div>
            <div className="monoLabel" style={{ marginBottom: 12 }}>Legal entity</div>
            <p className={styles.bodySmall}>
              Ascension Capital Partners trades as APEX Consulting Partners Pty Ltd{' '}
              <span className={styles.acn}>(ACN 674 649 417)</span>. Registered in New South Wales, Australia.
            </p>
          </div>
          <div>
            <div className="monoLabel" style={{ marginBottom: 12 }}>Governing law</div>
            <p className={styles.bodySmall}>
              Mandate documentation principally governed by England &amp; Wales with arbitration
              under the rules of the London Court of International Arbitration.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to begin a <em>conversation.</em>"
        body="We respond to qualified institutional enquiries within 48 hours."
        cta="Initiate Contact"
      />
    </>
  );
}
