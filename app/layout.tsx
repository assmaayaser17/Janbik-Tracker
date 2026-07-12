import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : 'https://janbiktracker.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'جنبك · لوحة تتبّع التهيئة والإطلاق',
  description:
    'أداة عمل فريق التهيئة والإطلاق · متابعة تقدّم البايلوت أمام مجلس الإدارة',
  openGraph: {
    title: 'جنبك · لوحة تتبّع التهيئة والإطلاق',
    description:
      'أداة عمل فريق التهيئة والإطلاق · متابعة تقدّم البايلوت أمام مجلس الإدارة',
    type: 'website',
    url: siteUrl,
    siteName: 'JANBIK Tracker',
    locale: 'ar-SA',
    alternateLocale: ['en-US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'جنبك · لوحة تتبّع التهيئة والإطلاق',
    description:
      'أداة عمل فريق التهيئة والإطلاق · متابعة تقدّم البايلوت أمام مجلس الإدارة',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JANBIK Onboarding Tracker',
  url: siteUrl,
  description:
    'Live onboarding and launch tracker for pilot progress, with team data and board-ready status updates.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
