import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aurum — Allocated gold for the Korean diaspora',
  description:
    'Recurring physical gold accumulation, allocated in Singapore, Lloyd\'s insured. For Koreans abroad who want assets outside Korean custody, with a clean way to gift across generations.',
  metadataBase: new URL('https://aurum.example'),
  openGraph: {
    title: 'Aurum — Quietly compounds. Permanently stays.',
    description:
      'Allocated physical gold for the Korean diaspora. Singapore vault. Lloyd\'s insured. Heritage-grade gifting.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
