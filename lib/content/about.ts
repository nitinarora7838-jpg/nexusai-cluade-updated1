import { Target, Eye, Lightbulb, type LucideIcon } from 'lucide-react';
import type { AccentKind } from '@/lib/theme';
import { accentFromIndex } from '@/lib/theme';

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: AccentKind;
}

export interface StatItem {
  val: string;
  label: string;
}

const VALUE_DEFS: Omit<ValueItem, 'accent'>[] = [
  { icon: Target,    title: 'Enterprise-First',      desc: 'Every product is built for the complexity and scale of enterprise environments, not retrofitted from consumer tools.' },
  { icon: Eye,       title: 'Radical Transparency',  desc: 'Every AI decision is explainable, auditable, and traceable — because trust is the foundation of enterprise AI.' },
  { icon: Lightbulb, title: 'Continuous Innovation', desc: "We don't deploy AI and walk away. Our platform evolves continuously with your business and the AI frontier." },
];

export const ABOUT_VALUES: ValueItem[] = VALUE_DEFS.map((item, i) => ({
  ...item,
  accent: accentFromIndex(i),
}));

export const ABOUT_STATS: StatItem[] = [
  { val: '2025',   label: 'Founded' },
  { val: '40+',    label: 'Enterprise Clients' },
  { val: '18+',    label: 'Countries Served' },
  { val: '$120M+', label: 'Client Value Generated' },
];
