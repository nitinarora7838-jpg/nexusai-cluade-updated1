export const siteConfig = {
  name: 'Nexus AI',
  url: 'https://www.nexus-aisolution.com',
  email: 'ai@nexus-aisolution.com',
  title: 'Nexus AI | AI Voice Agents, Voice Chat & Business Automation',
  description:
    'Nexus AI builds AI voice agents, website voice chat and business automation for growing businesses. We set it up, connect it to your tools and run it for you.',
  shortDescription:
    'Done-for-you AI voice agents, website voice chat and business automation.',
} as const;

/** The AI Voice Agents tab opens the dedicated Nexus AI Voice site. */
export const voiceSiteUrl = 'https://voice.nexus-aisolution.com';

export const mainNav = [
  { label: 'AI Automation', href: '/automation' },
  { label: 'AI Voice Chat', href: '/voice-chat' },
  { label: 'AI Voice Agents', href: voiceSiteUrl },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'FAQ', href: '/#faq' },
] as const;

export const ctaLabel = 'Book a free consultation';
export const ctaHref = '/contact';
