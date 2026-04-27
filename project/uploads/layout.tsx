import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ascension Capital Partners | Global Alternatives & Private Markets",
  description: "Institutional alternatives advisory and capital placement across energy transition, infrastructure, private credit, upstream O&G, and M&A. Ascension Capital Partners t/a APEX Consulting Partners Pty Ltd.",
  keywords: "alternatives advisory, private markets, energy transition, infrastructure finance, private credit, M&A, capital placement",
  openGraph: {
    title: "Ascension Capital Partners",
    description: "Institutional alternatives advisory and capital placement platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
