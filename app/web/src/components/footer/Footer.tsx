import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.lead}>
          <div className={styles.brand}>ASCENSION CAPITAL PARTNERS</div>
          <div className={styles.legal}>
            t/a APEX Consulting Partners Pty Ltd<br/>
            <span className={styles.acn}>ACN 674 649 417</span><br/>
            Suite 3, 1 Cary Street, Drummoyne NSW 2047, Australia
          </div>
          <div className={styles.chips}>
            <span className={styles.chip}>LMA / LSTA</span>
            <span className={styles.chip}>ICMA GBP 2025</span>
            <span className={styles.chip}>IFC Performance</span>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.colLabel}>Capabilities</div>
          <Link href="/capabilities/energy-transition">Energy Transition</Link>
          <Link href="/capabilities/digital-infrastructure">Digital Infrastructure</Link>
          <Link href="/capabilities/private-credit">Private Credit</Link>
          <Link href="/capabilities/critical-minerals">Critical Minerals &amp; Commodities</Link>
          <Link href="/capabilities/impact-real-assets">Impact Real Assets</Link>
          <Link href="/capabilities">Capital Markets</Link>
        </div>

        <div className={styles.col}>
          <div className={styles.colLabel}>Platform</div>
          <Link href="/transactions">Transactions</Link>
          <Link href="/platform-memorandum">Platform Memorandum</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about#team">Team</Link>
          <Link href="/portal">Client Portal →</Link>
          <Link href="/portal/lp">LP Portal →</Link>
        </div>

        <div className={styles.col}>
          <div className={styles.colLabel}>Contact</div>
          <a href="mailto:joshuating53@outlook.com" className={styles.mono}>joshuating53@outlook.com</a>
          <a href="tel:+61451338533" className={styles.mono}>+61 451 338 533</a>
          <div className={styles.nda}>
            Materials available to qualified institutional counterparties only, under executed NDA.
          </div>
        </div>
      </div>

      <div className={styles.disclaimer}>
        Nothing on this website constitutes an offer, solicitation or recommendation to buy or sell any financial product.
        Ascension Capital Partners operates as a principal-led alternatives advisor; it does not manage pooled capital,
        does not accept retail mandates, and responds only to qualified institutional enquiries.
      </div>

      <div className={styles.baseline}>
        <span>© 2026 Ascension Capital Partners | Confidential</span>
        <span>Confidentiality · Privacy · Regulatory</span>
        <span>Sydney · NSW · Australia</span>
      </div>
    </footer>
  );
}
