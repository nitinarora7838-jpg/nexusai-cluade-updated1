import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyPageClient from './CaseStudyPageClient';

const META: Record<string, { title: string; description: string }> = {
  'global-finance-corp': {
    title: 'Global Finance Corp — Reduced Manual Workflows by 75%',
    description: 'How Nexus AI eliminated 12,000 hours of manual financial work every quarter and saved $4.2M annually for Global Finance Corp.',
  },
  'medtech-solutions': {
    title: 'MedTech Solutions — Payroll for 8,000 Employees in 2 Hours',
    description: 'How Nexus AI Payroll Intelligence delivered 99.97% accuracy across a 12-state healthcare workforce, reducing processing from 3 days to 2 hours.',
  },
  'retailplex-international': {
    title: 'RetailPlex International — 3× Efficiency, $8.1M Inventory Savings',
    description: 'How Nexus AI transformed RetailPlex\'s supply chain with AI-powered demand forecasting and automated procurement across 380 stores.',
  },
  'logistics-prime': {
    title: 'Logistics Prime — 200+ Reports Automated, 80% Less Reporting Effort',
    description: 'How Nexus AI replaced Logistics Prime\'s 3,200-hour monthly reporting marathon with real-time AI intelligence across 15 departments.',
  },
  'techventure-saas': {
    title: 'TechVenture SaaS — 85% of Support Tickets Resolved by AI',
    description: 'How a custom Nexus AI Support Agent handles enterprise queries in under 8 seconds, saving TechVenture SaaS $2.8M annually.',
  },
};

const VALID_SLUGS = Object.keys(META);

export function generateStaticParams() {
  return VALID_SLUGS.map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = META[params.slug];
  if (!m) return { title: 'Case Study | Nexus AI' };
  return {
    title: `${m.title} | Nexus AI`,
    description: m.description,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  if (!VALID_SLUGS.includes(params.slug)) notFound();
  return <CaseStudyPageClient slug={params.slug} />;
}
