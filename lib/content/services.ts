import {
  Brain, Rocket, Code, Settings, Sparkles, Plug, TrendingUp, LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';
import type { AccentKind } from '@/lib/theme';
import { accentFromIndex } from '@/lib/theme';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  accent: AccentKind;
  wide?: boolean;
}

const SERVICE_DEFS: Omit<ServiceItem, 'accent'>[] = [
  { icon: Brain,           title: 'AI Consulting',           desc: 'Strategic AI roadmapping and architecture consulting for enterprise transformation initiatives.', wide: true },
  { icon: Rocket,          title: 'AI Transformation',       desc: 'End-to-end organizational AI transformation from strategy to deployment.' },
  { icon: Code,            title: 'AI Product Development',  desc: 'Custom AI product engineering with rapid prototyping and enterprise delivery.' },
  { icon: Settings,        title: 'Workflow Automation',     desc: 'Automate complex business processes with intelligent, self-healing workflows.' },
  { icon: Sparkles,        title: 'Generative AI Solutions', desc: 'Deploy LLM-powered solutions for content, code, analysis, and decision support.' },
  { icon: Plug,            title: 'Enterprise Integration',  desc: 'Seamless integration across your entire technology stack with bidirectional data sync.' },
  { icon: TrendingUp,      title: 'AI Analytics',            desc: 'Convert operational data into strategic intelligence with predictive AI models.' },
  { icon: LayoutDashboard, title: 'Intelligent Dashboards',  desc: 'Executive-grade dashboards with real-time AI insights and automated reporting.', wide: true },
];

export const SERVICES: ServiceItem[] = SERVICE_DEFS.map((item, i) => ({
  ...item,
  accent: accentFromIndex(i),
}));
