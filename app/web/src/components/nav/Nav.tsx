'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Nav.module.css';

const Mark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="acp-g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9A7B2E"/>
        <stop offset="0.5" stopColor="#C9A84C"/>
        <stop offset="1" stopColor="#E2C97E"/>
      </linearGradient>
    </defs>
    <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="url(#acp-g)" strokeWidth="1.5"/>
    <polygon points="32,12 48,22 48,42 32,52 16,42 16,22" fill="none" stroke="url(#acp-g)" strokeWidth="1" opacity="0.6"/>
    <path d="M32 18 L42 44 L32 38 L22 44 Z" fill="url(#acp-g)"/>
  </svg>
);

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            <div className={styles.mark}><Mark size={32}/></div>
            <div className={styles.wordmark}>
              <span>Ascension</span> Capital Partners
              <em>Institutional · Principal-Led · Global</em>
            </div>
          </Link>

          <ul className={styles.links}>
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={isActive(l.href) ? styles.active : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.right}>
            <Link href="/portal" className={styles.portalLink}>Client Portal →</Link>
            <Link href="/contact" className={styles.cta}>Enquire</Link>
          </div>

          <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/portal" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Client Portal</Link>
          <Link href="/contact" className={`${styles.mobileLink} ${styles.mobileCta}`} onClick={() => setMenuOpen(false)}>Enquire →</Link>
        </div>
      )}
    </>
  );
}
