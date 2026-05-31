export type FooterLinkCategory = 'Products' | 'Services' | 'Industries' | 'Company';

export const FOOTER_LINKS: Record<FooterLinkCategory, string[]> = {
  Products: ['AI Payroll', 'AI PMO Copilot', 'Workflow Engine', 'Analytics Dashboard', 'Support Agent'],
  Services: ['AI Consulting', 'AI Transformation', 'Product Development', 'Enterprise Integration'],
  Industries: ['Finance', 'Healthcare', 'Retail', 'Logistics', 'SaaS', 'Manufacturing'],
  Company: ['About', 'Careers', 'Blog', 'Press', 'Contact'],
};

export const FOOTER_LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Security'] as const;

export const FOOTER_SOCIAL = ['LinkedIn', 'Twitter', 'GitHub'] as const;
export const FOOTER_SOCIAL_SHORT = ['Li', 'Tw', 'Gh'] as const;

export const FOOTER_EMAIL = 'ai@nexus-aisolution.com';
