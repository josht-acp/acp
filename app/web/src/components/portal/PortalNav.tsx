'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './PortalNav.module.css';

const Mark = () => (
  <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="pg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9A7B2E"/>
        <stop offset="0.5" stopColor="#C9A84C"/>
        <stop offset="1" stopColor="#E2C97E"/>
      </linearGradient>
    </defs>
    <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="none" stroke="url(#pg)" strokeWidth="1.5"/>
    <path d="M32 18 L42 44 L32 38 L22 44 Z" fill="url(#pg)"/>
  </svg>
);

const NAV = [
  { href: '/portal/overview',      label: 'Overview' },
  { href: '/portal/holdings',      label: 'Fund Holdings' },
  { href: '/portal/capital-calls', label: 'Capital Calls' },
  { href: '/portal/documents',     label: 'Data Room' },
  { href: '/portal/messages',      label: 'Messages' },
];

export default function PortalNav() {
  const pathname = usePathname();

  if (pathname === '/portal') return null; // login page — no nav

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Mark/>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Ascension Capital Partners</span>
            <span className={styles.brandSub}>LP Portal</span>
          </div>
        </div>

        <div className={styles.links}>
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`${styles.link} ${pathname === n.href ? styles.active : ''}`}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className={styles.right}>
          <div className={styles.lpName}>Macquarie Pension Trust</div>
          <button
            className={styles.logout}
            onClick={async () => {
              const token = localStorage.getItem('acp-portal-token');
              if (token) {
                await fetch('/api/v1/auth/logout', {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${token}` },
                });
                localStorage.removeItem('acp-portal-token');
              }
              window.location.href = '/portal';
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
