import Link from 'next/link';
import styles from './Sections.module.css';

interface CtaBandProps {
  title: string;
  body: string;
  cta?: string;
  href?: string;
  sub?: string;
}

export default function CtaBand({
  title,
  body,
  cta = 'Initiate Contact',
  href = '/contact',
  sub = 'Or direct · joshuating53@outlook.com',
}: CtaBandProps) {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.ctaBandInner}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="rule"/>Partner-to-partner
          </div>
          <h2
            className={styles.ctaTitle}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className={styles.ctaBody}>{body}</p>
        </div>
        <div className={styles.ctaRight}>
          <Link href={href} className="btn btnPrimary" style={{ padding: '16px 32px' }}>
            {cta} <span>→</span>
          </Link>
          <div className={styles.ctaSub}>{sub}</div>
        </div>
      </div>
    </section>
  );
}
