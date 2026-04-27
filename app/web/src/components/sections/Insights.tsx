import Image from 'next/image';
import Link from 'next/link';
import { INSIGHTS } from '@/lib/data';
import styles from './Sections.module.css';

export default function Insights() {
  return (
    <section className="section">
      <div className="sectionHead">
        <div>
          <div className="eyebrow"><span className="rule"/><span className="num">05</span> · Thought Leadership</div>
          <h2 className="sectionTitle">Latest from <em>the Ascent.</em></h2>
        </div>
        <p className="sectionDesc">
          Market letters · sector perspectives · deal anatomies.
          Published quarterly; circulated under NDA to retained counterparties.
        </p>
      </div>

      <div className={styles.insightGrid}>
        {INSIGHTS.map(item => (
          <div key={item.id} className={styles.insightCard}>
            <div className={styles.insightImg} style={{ backgroundImage: `linear-gradient(180deg, rgba(10,14,26,0.4), rgba(10,14,26,0.7)), url(${item.img})` }}/>
            <div className={styles.insightBody}>
              <div className={styles.insightMeta}>{item.category} · {item.date}</div>
              <div className={styles.insightTitle}>{item.title}</div>
              <div className={styles.insightSub}>{item.sub}</div>
              <Link href={`/resources/${item.id}`} className={styles.insightCta}>Read the Memo →</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
