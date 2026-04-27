import type { Metadata } from 'next';
import '@/styles/globals.css';
import Nav from '@/components/nav/Nav';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Ascension Capital Partners',
  description: 'An institutional principal-led global alternatives advisory and capital arranging platform. We originate, structure and syndicate institutional capital for sustainable real assets and transition infrastructure.',
  keywords: ['institutional capital', 'alternatives', 'infrastructure', 'private credit', 'energy transition'],
  openGraph: {
    title: 'Ascension Capital Partners',
    description: 'Institutional · Principal-Led · Global',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
