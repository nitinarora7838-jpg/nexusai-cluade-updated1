import {
  Brain, BarChart3, Workflow, Headphones, FileText,
  Cpu, TrendingUp, Users, Camera,
  type LucideIcon,
} from 'lucide-react';
import type { AccentKind } from '@/lib/theme';

export interface ProductItem {
  icon: LucideIcon;
  name: string;
  tag: string;
  accent: AccentKind;
  description: string;
  features: string[];
  slug: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    icon: Brain,
    name: 'AI Payroll Intelligence',
    tag: 'Payroll',
    accent: 'healthcare',
    slug: 'ai-payroll-intelligence',
    description: 'End-to-end payroll automation with AI compliance checks, anomaly detection, and real-time reporting.',
    features: ['Automated tax calculations', 'Compliance monitoring', 'Anomaly detection', 'Multi-jurisdiction support'],
  },
  {
    icon: Cpu,
    name: 'AI PMO Copilot',
    tag: 'PMO',
    accent: 'agriculture',
    slug: 'ai-pmo-copilot',
    description: 'AI-powered project management intelligence that tracks milestones, risks, and resource optimization.',
    features: ['Risk prediction', 'Resource optimization', 'Portfolio analytics', 'Automated reporting'],
  },
  {
    icon: Workflow,
    name: 'AI Workflow Engine',
    tag: 'Automation',
    accent: 'healthcare',
    slug: 'ai-workflow-engine',
    description: 'Orchestrate complex business workflows with intelligent routing, conditional logic, and AI decision engines.',
    features: ['Visual workflow builder', 'AI decision nodes', 'API integrations', 'Real-time monitoring'],
  },
  {
    icon: BarChart3,
    name: 'AI Analytics Dashboard',
    tag: 'Analytics',
    accent: 'agriculture',
    slug: 'ai-analytics-dashboard',
    description: 'Transform raw data into actionable intelligence with predictive analytics and AI-generated insights.',
    features: ['Predictive analytics', 'NL queries', 'Custom KPI tracking', 'Executive summaries'],
  },
  {
    icon: Headphones,
    name: 'AI Customer Support Agent',
    tag: 'Support',
    accent: 'healthcare',
    slug: 'ai-customer-support-agent',
    description: 'Deploy intelligent AI agents that resolve 80% of customer inquiries autonomously with human-like accuracy.',
    features: ['Multi-channel support', 'Sentiment analysis', 'Auto-escalation', 'Knowledge base sync'],
  },
  {
    icon: TrendingUp,
    name: 'AI Automation Studio',
    tag: 'Low-Code',
    accent: 'agriculture',
    slug: 'ai-automation-studio',
    description: 'No-code automation builder powered by AI suggestions, with enterprise-grade reliability and scalability.',
    features: ['Drag-drop builder', 'AI suggestions', '500+ connectors', 'Enterprise SLA'],
  },
  {
    icon: FileText,
    name: 'AI Reporting System',
    tag: 'Reports',
    accent: 'healthcare',
    slug: 'ai-reporting-system',
    description: 'Automated report generation with AI narrative writing, scheduled delivery, and dynamic visualizations.',
    features: ['Auto-generation', 'AI narrative', 'Scheduled delivery', 'Dynamic charts'],
  },
  {
    icon: Users,
    name: 'AI Productivity Assistant',
    tag: 'Productivity',
    accent: 'agriculture',
    slug: 'ai-productivity-assistant',
    description: 'An intelligent workplace AI that manages tasks, schedules, communications, and knowledge retrieval.',
    features: ['Smart scheduling', 'Task automation', 'Knowledge retrieval', 'Team collaboration'],
  },
  {
    icon: Camera,
    name: 'AI Monitoring Intelligence',
    tag: 'Monitoring',
    accent: 'healthcare',
    slug: 'ai-monitoring-intelligence',
    description: 'Transform existing cameras into intelligent monitoring systems with real-time AI analytics and alerts.',
    features: ['Plug-and-play integration', 'Real-time alerts', 'Multi-camera management', 'Compliance reporting'],
  },
];
