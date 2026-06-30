import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'AI Monitoring Intelligence Dashboard | Nexus AI',
  description:
    'Real-time AI camera monitoring dashboard — intelligent detection, live alerts, zone compliance tracking, and analytics powered by Nexus AI.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
