import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

// ─── Fonts ─────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

// ─── Metadata (Next.js 13 compatible) ─────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://nexusai.com'),
  title: {
    default: 'Nexus AI — Enterprise AI Solutions & Transformation',
    template: '%s | Nexus AI',
  },
  description:
    'Nexus AI builds intelligent automation systems, AI agents, and enterprise transformation platforms that accelerate growth, cut costs, and drive productivity across every vertical.',
  keywords: [
    'enterprise AI',
    'AI automation',
    'workflow automation',
    'AI consulting',
    'enterprise transformation',
    'AI payroll',
    'AI PMO',
    'machine learning',
  ],
  authors: [{ name: 'Nexus AI', url: 'https://nexusai.com' }],
  creator: 'Nexus AI',
  // themeColor lives in metadata in Next.js 13 (not a separate viewport export)
  themeColor: '#0B1120',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexusai.com',
    siteName: 'Nexus AI',
    title: 'Nexus AI — Enterprise AI Solutions & Transformation',
    description:
      'Intelligent automation systems, AI agents, and enterprise platforms that accelerate growth across every vertical.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nexus AI — Enterprise AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexus AI — Enterprise AI Solutions',
    description: 'Intelligent automation and AI transformation for enterprise.',
    images: ['/og-image.png'],
    creator: '@nexusai',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Layout ────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {/* Skip-to-content link for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#00D4FF] focus:text-[#0B1120] focus:font-semibold focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
