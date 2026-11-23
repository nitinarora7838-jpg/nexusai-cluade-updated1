import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ChatWidget } from '@/components/chat/chat-widget';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StarField } from '@/components/layout/star-field';
import { VoiceTransition } from '@/components/layout/voice-transition';
import { siteConfig, voiceSiteUrl } from '@/lib/site';
import './globals.css';

// Self-hosted fonts (no network call at build time)
const inter = localFont({
  src: './fonts/Inter.woff2',
  variable: '--font-inter',
  weight: '300 900',
  display: 'swap',
});

const spaceGrotesk = localFont({
  src: './fonts/SpaceGrotesk.woff2',
  variable: '--font-space',
  weight: '300 700',
  display: 'swap',
});

// Small labels and figures (same as the voice site)
const jetBrainsMono = localFont({
  src: './fonts/JetBrainsMono.woff2',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Nexus AI',
  },
  description: siteConfig.description,
  keywords: [
    'AI automation',
    'AI voice agents',
    'AI voice agent for business',
    'AI voice chat for websites',
    'multilingual voice AI',
    'AI calling agent',
    'AI phone answering',
    'AI receptionist',
    'WhatsApp Business automation',
    'done-for-you AI',
  ],
  authors: [{ name: 'Nexus AI', url: siteConfig.url }],
  creator: 'Nexus AI',
  themeColor: '#020409',
  viewport: 'width=device-width, initial-scale=1',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* The AI Voice Agents tab opens the voice site: connect early so it appears quickly. */}
        <link rel="preconnect" href={voiceSiteUrl} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-solid focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <StarField />
        <SiteHeader />
        <main id="main-content" className="relative z-[1]">
          {children}
        </main>
        <SiteFooter />
        <ChatWidget />
        <VoiceTransition />
      </body>
    </html>
  );
}
