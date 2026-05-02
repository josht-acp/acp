import Link from 'next/link';
import { VERTICALS } from '@/lib/data';
import styles from './Sections.module.css';

export default function VerticalsGrid() {
  return (
    <section className="section" style={{ position: 'relative' }}>
      <div className={`sectionHead`}>
        <div>
          <div className="eyebrow"><span className="rule"/><span className="num">03</span> · Verticals</div>
          <h2 className="sectionTitle">
            Seven verticals. <em>One integrated platform.</em>
          </h2>
        </div>
        <p className="sectionDesc">
          Each vertical is led by a dedicated origination desk with proprietary mandate flow.
          Documentation is market-standard; underwriting is principal-grade.
        </p>
      </div>

      <div className={styles.vertGrid}>
        {VERTICALS.slice(0, 4).map(v => (
          <Link key={v.slug} href={`/capabilities/${v.slug}`} className={styles.vertCard}>
            <div className={styles.spine}/>
            <div className={styles.vertNum}>{v.num} · Vertical</div>
            <div className={styles.vertTitle}>{v.title}</div>
            <div className={styles.vertDesc}>{v.desc}</div>
            <div className={styles.vertArrow}>Explore →</div>
          </Link>
        ))}
      </div>

      <div className={styles.vertGridThree} style={{ marginTop: 1 }}>
        {VERTICALS.slice(4).map(v => (
          <Link key={v.slug} href={`/capabilities/${v.slug}`} className={styles.vertCard}>
            <div className={styles.spine}/>
            <div className={styles.vertNum}>{v.num} · Vertical</div>
            <div className={styles.vertTitle}>{v.title}</div>
            <div className={styles.vertDesc}>{v.desc}</div>
            <div className={styles.vertArrow}>Explore →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
