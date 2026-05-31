import {
  TrendingUp, Heart, ShoppingBag, Truck, Globe, Shield, Factory, Users,
  type LucideIcon,
} from 'lucide-react';
import type { AccentKind } from '@/lib/theme';

export interface IndustryItem {
  icon: LucideIcon;
  name: string;
  desc: string;
  metric: string;
  metricLabel: string;
  accent: AccentKind;
}

export const INDUSTRIES: IndustryItem[] = [
  { icon: TrendingUp,  name: 'Finance',       desc: 'Automate compliance, fraud detection, and financial reporting with AI precision.',         metric: '89%',  metricLabel: 'Faster Reporting',   accent: 'healthcare' },
  { icon: Heart,       name: 'Healthcare',    desc: 'Streamline patient workflows, clinical documentation, and regulatory compliance.',          metric: '65%',  metricLabel: 'Admin Reduction',    accent: 'healthcare' },
  { icon: ShoppingBag, name: 'Retail',        desc: 'Demand forecasting, inventory optimization, and personalized customer experiences.',        metric: '3.2×', metricLabel: 'Revenue Growth',     accent: 'agriculture' },
  { icon: Truck,       name: 'Logistics',     desc: 'Route optimization, shipment tracking, and predictive maintenance at scale.',              metric: '40%',  metricLabel: 'Cost Reduction',     accent: 'agriculture' },
  { icon: Globe,       name: 'SaaS',          desc: 'AI-powered product analytics, churn prediction, and automated customer success.',          metric: '2.8×', metricLabel: 'NRR Improvement',    accent: 'healthcare' },
  { icon: Shield,      name: 'Insurance',     desc: 'Claims automation, risk assessment, and underwriting intelligence powered by AI.',         metric: '72%',  metricLabel: 'Claims Automation',  accent: 'healthcare' },
  { icon: Factory,     name: 'Manufacturing', desc: 'Predictive maintenance, quality control AI, and supply chain optimization.',              metric: '55%',  metricLabel: 'Downtime Reduction', accent: 'agriculture' },
  { icon: Users,       name: 'HR & Payroll',  desc: 'End-to-end HR automation from talent acquisition to payroll processing.',                 metric: '80%',  metricLabel: 'Process Automation', accent: 'agriculture' },
];
