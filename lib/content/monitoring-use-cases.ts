import {
  TriangleAlert as AlertTriangle,
  Users,
  Warehouse,
  Building2,
  Shield,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { AccentKind } from '@/lib/theme';
import { accentFromIndex } from '@/lib/theme';

export interface MonitoringUseCaseItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  accent: AccentKind;
}

const USE_CASE_DEFS: Omit<MonitoringUseCaseItem, 'accent'>[] = [
  { icon: AlertTriangle, title: 'Workplace Safety',        desc: 'PPE detection, restricted zone alerts, unsafe behavior flagging',              metric: '80%',  metricLabel: 'Incident Reduction' },
  { icon: Users,         title: 'Retail Analytics',        desc: 'Footfall counting, heatmaps, queue monitoring, dwell analysis',                metric: '45%',  metricLabel: 'Revenue Growth' },
  { icon: Warehouse,     title: 'Logistics & Warehousing', desc: 'Dock occupancy, forklift safety, inventory counting, aisle monitoring',        metric: '99%',  metricLabel: 'Inventory Accuracy' },
  { icon: Building2,     title: 'Office Occupancy',        desc: 'Desk tracking, meeting room availability, space optimization',               metric: '35%',  metricLabel: 'Energy Savings' },
  { icon: Shield,        title: 'Security & Perimeter',    desc: '24/7 intrusion detection, unauthorized access alerts, facial recognition',     metric: '99.9%',metricLabel: 'Detection Accuracy' },
  { icon: Smartphone,    title: 'Parking Management',      desc: 'Space detection, unauthorized parking alerts, occupancy-based pricing',        metric: '99%',  metricLabel: 'Space Accuracy' },
  { icon: TrendingUp,    title: 'Traffic Monitoring',      desc: 'Vehicle counting, accident detection, signal optimization',                    metric: '42%',  metricLabel: 'Congestion Reduction' },
];

export const MONITORING_USE_CASES: MonitoringUseCaseItem[] = USE_CASE_DEFS.map((item, i) => ({
  ...item,
  accent: accentFromIndex(i),
}));
