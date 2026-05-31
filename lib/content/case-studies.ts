import { TrendingUp, Clock, DollarSign, Users, type LucideIcon } from 'lucide-react';
import type { AccentKind } from '@/lib/theme';

export interface CaseMetric {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface CaseStudyItem {
  company: string;
  industry: string;
  logo: string;
  accent: AccentKind;
  headline: string;
  description: string;
  metrics: CaseMetric[];
  tags: string[];
  slug: string;
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    company: 'Global Finance Corp', industry: 'Financial Services', logo: 'GFC', accent: 'healthcare', slug: 'global-finance-corp',
    headline: 'Reduced manual workflows by 75%',
    description: 'Deployed Nexus AI Workflow Engine to automate 140+ manual financial processes, eliminating 12,000 hours of manual work per quarter.',
    metrics: [
      { icon: TrendingUp, value: '75%',   label: 'Workflow Reduction' },
      { icon: Clock,      value: '12K hrs', label: 'Time Saved / Quarter' },
      { icon: DollarSign, value: '$4.2M', label: 'Annual Savings' },
    ],
    tags: ['Workflow Automation', 'Finance', 'Compliance'],
  },
  {
    company: 'MedTech Solutions', industry: 'Healthcare', logo: 'MTS', accent: 'healthcare', slug: 'medtech-solutions',
    headline: 'Automated payroll processing for 8,000 employees',
    description: 'Nexus AI Payroll Intelligence handles multi-state payroll, benefits deductions, and regulatory compliance with 99.97% accuracy.',
    metrics: [
      { icon: Users,      value: '8,000', label: 'Employees Automated' },
      { icon: TrendingUp, value: '99.97%', label: 'Accuracy Rate' },
      { icon: Clock,      value: '3 days → 2 hrs', label: 'Processing Time' },
    ],
    tags: ['Payroll', 'Healthcare', 'HR Automation'],
  },
  {
    company: 'RetailPlex International', industry: 'Retail', logo: 'RPI', accent: 'agriculture', slug: 'retailplex-international',
    headline: 'Increased operational efficiency by 3×',
    description: 'AI-powered inventory management, demand forecasting, and automated vendor communications transformed their entire supply chain.',
    metrics: [
      { icon: TrendingUp, value: '3×',   label: 'Efficiency Gain' },
      { icon: DollarSign, value: '$8.1M', label: 'Inventory Savings' },
      { icon: Clock,      value: '60%',  label: 'Faster Fulfillment' },
    ],
    tags: ['Analytics', 'Retail', 'Supply Chain'],
  },
  {
    company: 'Logistics Prime', industry: 'Logistics', logo: 'LP', accent: 'agriculture', slug: 'logistics-prime',
    headline: 'Reduced reporting effort by 80%',
    description: 'Nexus AI Reporting System automated 200+ monthly reports across 15 departments with AI-generated insights and exec-ready summaries.',
    metrics: [
      { icon: Clock,      value: '80%',  label: 'Reporting Reduction' },
      { icon: TrendingUp, value: '200+', label: 'Reports Automated' },
      { icon: Users,      value: '15',   label: 'Departments Served' },
    ],
    tags: ['Reporting', 'Analytics', 'Logistics'],
  },
  {
    company: 'TechVenture SaaS', industry: 'SaaS', logo: 'TVS', accent: 'healthcare', slug: 'techventure-saas',
    headline: 'AI handling 85% of enterprise support tickets',
    description: 'Custom AI Support Agent trained on product knowledge handles complex enterprise queries with human-level accuracy, 24/7.',
    metrics: [
      { icon: TrendingUp, value: '85%',    label: 'Ticket Resolution' },
      { icon: Clock,      value: '< 8 sec', label: 'Avg Response Time' },
      { icon: DollarSign, value: '$2.8M',  label: 'Support Cost Savings' },
    ],
    tags: ['AI Agents', 'Support', 'SaaS'],
  },
];