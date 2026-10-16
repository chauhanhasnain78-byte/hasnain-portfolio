import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants/site';
import { Navbar } from '@/components/layout/navbar';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { Scene } from '@/components/three/scene';
import { SignatureIntro } from '@/components/motion/signature-intro';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: SITE_CONFIG.seo.title,
  description: SITE_CONFIG.seo.description,
  openGraph: {
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans antialiased">
        <a href="#home" className="skip-link">
          Skip to main content
        </a>
        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          <Scene />
          <SignatureIntro />
          <main id="main-content">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
