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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://skore-website.vercel.app'),
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
  
  // Favicon y App Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
    ],
  },
  
  // Manifest para PWA
  manifest: '/site.webmanifest',
  
  // Theme color
  themeColor: '#2563eb',
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skore-website.vercel.app',
    siteName: 'SKORE',
    title: 'SKORE - Evidence-Based Organizational Tools',
    description: 'Translating organizational science into practical tools you can use Monday morning.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKORE - Evidence-Based Organizational Tools',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'SKORE - Evidence-Based Organizational Tools',
    description: 'Translating organizational science into practical tools you can use Monday morning.',
    images: ['/og-image.jpg'],
    creator: '@skore',
  },
  
  // Robots
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
  
  // Verification tags
  verification: {
    google: '_PfWPLQuMHBZ85miod0ljwSoGWhyS7ySDVlwwLPEwiQ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload del logo para mejor performance */}
        <link
          rel="preload"
          href="/images/logo.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body 
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
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