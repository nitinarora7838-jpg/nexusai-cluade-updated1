import {
  TrendingUp,
  Activity,
  Zap,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import type { AccentKind } from '@/lib/theme';
import { accentFromIndex } from '@/lib/theme';

export interface DashboardKpi {
  label: string;
  value: string;
  change: string;
  up: boolean;
  data: number[];
  accent: AccentKind;
}

export interface DashboardActivity {
  type: 'success' | 'info' | 'warning';
  msg: string;
  time: string;
}

export interface DashboardStat {
  label: string;
  val: string;
  accent: AccentKind;
  icon: LucideIcon;
}

export const DASHBOARD_KPIS: DashboardKpi[] = [
  {
    label: 'Active AI Agents',
    value: '247',
    change: '+12',
    up: true,
    data: [40, 45, 42, 55, 60, 58, 72, 68, 80, 90, 85, 95],
    accent: 'healthcare',
  },
  {
    label: 'Tasks Automated Today',
    value: '18,492',
    change: '+8.3%',
    up: true,
    data: [200, 240, 210, 280, 300, 290, 350, 340, 400, 380, 420, 440],
    accent: 'agriculture',
  },
  {
    label: 'Avg Response Time',
    value: '124ms',
    change: '-18%',
    up: false,
    data: [200, 180, 190, 170, 160, 165, 150, 145, 135, 130, 128, 124],
    accent: 'healthcare',
  },
  {
    label: 'Cost Savings (MTD)',
    value: '$2.4M',
    change: '+23%',
    up: true,
    data: [50, 80, 100, 120, 140, 160, 180, 190, 210, 220, 235, 240],
    accent: 'agriculture',
  },
];

export const DASHBOARD_ACTIVITIES: DashboardActivity[] = [
  { type: 'success', msg: 'Payroll batch processed — 8,200 employees', time: '2s ago' },
  { type: 'info', msg: 'Workflow "Invoice Approval" triggered by CRM event', time: '8s ago' },
  { type: 'success', msg: 'AI report generated: Q4 Financial Summary', time: '23s ago' },
  { type: 'warning', msg: 'Anomaly detected in ERP sync — auto-resolved', time: '1m ago' },
  { type: 'info', msg: 'New AI agent deployed to support queue', time: '2m ago' },
  { type: 'success', msg: 'HR onboarding workflow completed: 12 new employees', time: '4m ago' },
];

const BOTTOM_STAT_DEFS: Omit<DashboardStat, 'accent'>[] = [
  { label: 'Workflows Active', val: '1,247', icon: Zap },
  { label: 'AI Agents Online', val: '247', icon: Activity },
  { label: 'Data Points / sec', val: '48K', icon: TrendingUp },
  { label: 'Alerts Resolved', val: '99.8%', icon: AlertTriangle },
];

export const DASHBOARD_BOTTOM_STATS: DashboardStat[] = BOTTOM_STAT_DEFS.map((item, i) => ({
  ...item,
  accent: accentFromIndex(i),
}));

export const DASHBOARD_BAR_DATA = [30, 50, 40, 70, 60, 80, 75, 90, 85, 95, 88, 100];
export const DASHBOARD_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const ACTIVITY_DOT: Record<DashboardActivity['type'], string> = {
  success: 'bg-green-400',
  warning: 'bg-yellow-400',
  info: 'bg-cyan-500',
};
