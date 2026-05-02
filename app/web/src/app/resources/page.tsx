import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { INSIGHTS } from '@/lib/data';
import styles from './resources.module.css';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'The Ascent — Ascension Capital Partners',
  description: 'Market letters, sector perspectives and deal anatomies from the ACP origination desk. Published quarterly; circulated under NDA to retained counterparties.',
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className="eyebrow"><span className="rule"/>Thought Leadership</div>
          <h1 className={styles.heroTitle}>
            Latest from <em>the Ascent.</em>
          </h1>
          <p className={styles.heroSub}>
            Market letters, sector perspectives and deal anatomies from the ACP origination desk.
            Published quarterly; circulated under NDA to retained counterparties.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="section">
        <div className={styles.grid}>
          {INSIGHTS.map((item, i) => (
            <article key={item.id} className={`${styles.card} ${i === 0 ? styles.cardFeatured : ''}`}>
              <div
                className={styles.cardImg}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(10,14,26,0.25) 0%, rgba(10,14,26,0.75) 100%), url(${item.img})`,
                }}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardSub}>{item.sub}</p>
                <Link href={`/resources/${item.id}`} className={styles.cta}>
                  Read the Memo →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.note}>
          <span className={styles.noteLine}/>
          <p>
            Full circulation list requires an executed NDA. Counterparties on retain receive each letter
            on day of publication. To request access, use the contact form.
          </p>
        </div>
      </section>

      <CtaBand
        title="Partner-to-partner <em>conversations.</em>"
        body="All engagement begins with a direct call. We do not publish fees or allocation terms. We do not respond to inbound capital-raise requests without a personal introduction or executed NDA. If that fits your process, we would like to talk."
      />
    </>
  );
}
