import Link from 'next/link';
import styles from './Hero.module.css';

export default function HeroLeft() {
  return (
    <section className={styles.hero}>
      <div className={styles.peak}/>
      <div className={styles.peakScrim}/>
      <div className={styles.peakGlow}/>
      <div className={styles.radial}/>

      <div className={styles.inner}>
        <div className="eyebrow">
          <span className="rule"/>
          Institutional · Principal-Led · Global
        </div>

        <h1 className={styles.title}>
          Capital <em>arranged</em><br/>
          for the transition economy.
        </h1>

        <p className={styles.sub}>
          Ascension Capital Partners is an institutional principal-led global alternatives M&amp;A advisory
          and capital arranging platform. We originate, structure and syndicate institutional capital for
          sustainable real assets and transition infrastructure — partner-grade, fee-only, LMA / LSTA /
          ICMA standards on every mandate.
        </p>

        <div className={styles.actions}>
          <Link href="/contact" className={`btn btnPrimary ${styles.btnLg}`}>
            Request Institutional Access <span>→</span>
          </Link>
          <Link href="/resources/q1-2026" className={`btn btnGhost`}>
            Read the Q1 2026 Market Letter
          </Link>
        </div>

        <div className={styles.stats}>
          <div>
            <div className={styles.statNum}>USD 10bn+</div>
            <div className={styles.statLabel}>Cumulative transactions</div>
          </div>
          <div>
            <div className={styles.statNum}>USD 5.8bn+</div>
            <div className={styles.statLabel}>Live mandate programme</div>
          </div>
          <div>
            <div className={styles.statNum}>7 · 4 · 12yr</div>
            <div className={styles.statLabel}>Verticals · Regions · Track record</div>
          </div>
        </div>
      </div>
    </section>
  );
}
