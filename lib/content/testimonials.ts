import type { AccentKind } from '@/lib/theme';
import { accentFromIndex } from '@/lib/theme';

export interface Testimonial {
  name: string;
  title: string;
  company: string;
  avatar: string;
  accent: AccentKind;
  quote: string;
  rating: number;
}

const TESTIMONIAL_DEFS: Omit<Testimonial, 'accent'>[] = [
  {
    name: 'Sarah Chen',
    title: 'Chief Digital Officer',
    company: 'Global Finance Corp',
    avatar: 'SC',
    rating: 5,
    quote:
      "Nexus AI transformed our entire back-office operations in under 90 days. The ROI was undeniable from month one. Their AI Workflow Engine eliminated thousands of manual hours and the team's confidence in automation has completely shifted.",
  },
  {
    name: 'Marcus Thompson',
    title: 'VP of Operations',
    company: 'RetailPlex International',
    avatar: 'MT',
    rating: 5,
    quote:
      'The AI PMO Copilot alone justified the investment. We went from weekly status meetings that took 3 hours to a real-time dashboard that every stakeholder can access. Risk visibility has never been this good.',
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'CTO',
    company: 'MedTech Solutions',
    avatar: 'PS',
    rating: 5,
    quote:
      "Healthcare AI requires absolute precision. Nexus AI's payroll and compliance automation handles the complexity of multi-state healthcare regulations flawlessly. We haven't had a compliance incident since deployment.",
  },
  {
    name: 'James Okonkwo',
    title: 'Head of AI & Automation',
    company: 'TechVenture SaaS',
    avatar: 'JO',
    rating: 5,
    quote:
      'The AI Support Agent handles the volume that would have required 40 additional hires. It understands context, learns from every interaction, and escalates to humans at exactly the right moment.',
  },
  {
    name: 'Lisa Martinez',
    title: 'CFO',
    company: 'Logistics Prime',
    avatar: 'LM',
    rating: 5,
    quote:
      'Our finance team was drowning in reporting. Nexus AI automated 80% of our monthly close process. The AI-generated executive summaries save our team 20 hours every reporting cycle, and accuracy has actually improved.',
  },
];

export const TESTIMONIALS: Testimonial[] = TESTIMONIAL_DEFS.map((item, i) => ({
  ...item,
  accent: accentFromIndex(i),
}));
