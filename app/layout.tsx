import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/constants/site';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import ScrollProgress from '@/components/motion/scroll-progress';
import Background from '@/components/motion/background';
import CursorWrapper from '@/components/motion/cursor-wrapper';

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-sans',
});

export const viewport: Viewport = {
  themeColor: '#050505',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: 'Chauhan Mohammed Hasnain — Computer Science Student & Web Developer',
  description: SITE.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Chauhan Mohammed Hasnain — Computer Science Student & Web Developer',
    description: SITE.description,
    url: SITE.siteUrl,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chauhan Mohammed Hasnain — Computer Science Student & Web Developer',
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-bg min-h-screen text-text">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Background />
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="relative z-10">{children}</main>
        <Footer />
        <CursorWrapper />
      </body>
    </html>
  );
}
