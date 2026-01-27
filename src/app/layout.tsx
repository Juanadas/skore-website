import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://skore.com'),
  title: {
    default: 'SKORE - Evidence-Based Organizational Tools',
    template: '%s | SKORE',
  },
  description: 'Translating organizational science into practical tools you can use Monday morning. Free resources for HR professionals, managers, and organizational leaders.',
  keywords: [
    'organizational science',
    'HR tools',
    'employee engagement',
    'performance management',
    'organizational effectiveness',
    'evidence-based management',
  ],
  authors: [{ name: 'SKORE' }],
  creator: 'SKORE',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skore.com',
    siteName: 'SKORE',
    title: 'SKORE - Evidence-Based Organizational Tools',
    description: 'Translating organizational science into practical tools you can use Monday morning.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKORE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKORE - Evidence-Based Organizational Tools',
    description: 'Translating organizational science into practical tools you can use Monday morning.',
    images: ['/og-image.jpg'],
    creator: '@skore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        
        {/* Main content with padding for fixed nav */}
        <main className="flex-1 pt-16">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}