import Link from 'next/link';
import type { Metadata } from 'next';
import { VERTICALS } from '@/lib/data';
import CtaBand from '@/components/sections/CtaBand';
import styles from './capabilities.module.css';

export const metadata: Metadata = {
  title: 'Capabilities — Ascension Capital Partners',
  description: 'Seven verticals with proprietary origination across energy transition, digital infrastructure, private credit, critical minerals, and impact real assets.',
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroPeak}/>
        <div className={styles.heroPeakScrim}/>
        <div className={styles.heroInner}>
          <div className="eyebrow"><span className="rule"/>Capabilities</div>
          <h1 className={styles.heroTitle}>Seven verticals. <em>One integrated platform.</em></h1>
          <p className={styles.heroSub}>
            Each vertical is led by a dedicated origination desk with proprietary mandate flow.
            Documentation is market-standard; underwriting is principal-grade.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={styles.grid}>
          {VERTICALS.map(v => (
            <Link key={v.slug} href={`/capabilities/${v.slug}`} className={styles.card}>
              <div className={styles.spine}/>
              <div className={styles.cardNum}>{v.num} · Vertical</div>
              <div className={styles.cardTitle}>{v.title}</div>
              <div className={styles.cardDesc}>{v.desc}</div>
              <div className={styles.cardMeta}>
                <span>Ticket: {v.ticket}</span>
                <span className={styles.arrow}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Each vertical is a <em>separate origination desk.</em>"
        body="We do not cross-contaminate mandates or allocation pools. Each vertical has its own counterparty relationships, underwriting standards, and distribution channels."
        cta="Initiate Contact"
      />
    </>
  );
}
