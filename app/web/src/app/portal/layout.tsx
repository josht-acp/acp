import type { Metadata } from 'next';
import '@/styles/globals.css';
import PortalNav from '@/components/portal/PortalNav';

export const metadata: Metadata = {
  title: 'LP Portal — Ascension Capital Partners',
  description: 'Ascension Capital Partners LP Investor Portal',
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PortalNav/>
        <main style={{ paddingTop: 0 }}>{children}</main>
      </body>
    </html>
  );
}
