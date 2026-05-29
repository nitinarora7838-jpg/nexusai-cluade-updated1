'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, TrendingUp, Clock, DollarSign, Users, ChevronRight, type LucideIcon } from 'lucide-react';

interface Metric   { icon: LucideIcon; value: string; label: string; }
interface CaseStudy {
  company: string; industry: string; logo: string; color: string;
  headline: string; description: string;
  metrics: Metric[]; tags: string[]; slug: string;
}

const CASES: CaseStudy[] = [
  {
    company: 'Global Finance Corp', industry: 'Financial Services', logo: 'GFC', color: '#00D4FF', slug: 'global-finance-corp',
    headline: 'Reduced manual workflows by 75%',
    description: 'Deployed Nexus AI Workflow Engine to automate 140+ manual financial processes, eliminating 12,000 hours of manual work per quarter.',
    metrics: [
      { icon: TrendingUp, value: '75%',   label: 'Workflow Reduction'  },
      { icon: Clock,      value: '12K hrs',label: 'Time Saved / Quarter'},
      { icon: DollarSign, value: '$4.2M', label: 'Annual Savings'      },
    ],
    tags: ['Workflow Automation', 'Finance', 'Compliance'],
  },
  {
    company: 'MedTech Solutions', industry: 'Healthcare', logo: 'MTS', color: '#6C63FF', slug: 'medtech-solutions',
    headline: 'Automated payroll processing for 8,000 employees',
    description: 'Nexus AI Payroll Intelligence handles multi-state payroll, benefits deductions, and regulatory compliance with 99.97% accuracy.',
    metrics: [
      { icon: Users,      value: '8,000',   label: 'Employees Automated' },
      { icon: TrendingUp, value: '99.97%',  label: 'Accuracy Rate'       },
      { icon: Clock,      value: '3 days → 2 hrs', label: 'Processing Time' },
    ],
    tags: ['Payroll', 'Healthcare', 'HR Automation'],
  },
  {
    company: 'RetailPlex International', industry: 'Retail', logo: 'RPI', color: '#00D4FF', slug: 'retailplex-international',
    headline: 'Increased operational efficiency by 3×',
    description: 'AI-powered inventory management, demand forecasting, and automated vendor communications transformed their entire supply chain.',
    metrics: [
      { icon: TrendingUp, value: '3×',   label: 'Efficiency Gain'   },
      { icon: DollarSign, value: '$8.1M',label: 'Inventory Savings' },
      { icon: Clock,      value: '60%',  label: 'Faster Fulfillment'},
    ],
    tags: ['Analytics', 'Retail', 'Supply Chain'],
  },
  {
    company: 'Logistics Prime', industry: 'Logistics', logo: 'LP', color: '#6C63FF', slug: 'logistics-prime',
    headline: 'Reduced reporting effort by 80%',
    description: 'Nexus AI Reporting System automated 200+ monthly reports across 15 departments with AI-generated insights and exec-ready summaries.',
    metrics: [
      { icon: Clock,      value: '80%',  label: 'Reporting Reduction'},
      { icon: TrendingUp, value: '200+', label: 'Reports Automated'  },
      { icon: Users,      value: '15',   label: 'Departments Served' },
    ],
    tags: ['Reporting', 'Analytics', 'Logistics'],
  },
  {
    company: 'TechVenture SaaS', industry: 'SaaS', logo: 'TVS', color: '#00D4FF', slug: 'techventure-saas',
    headline: 'AI handling 85% of enterprise support tickets',
    description: 'Custom AI Support Agent trained on product knowledge handles complex enterprise queries with human-level accuracy, 24/7.',
    metrics: [
      { icon: TrendingUp, value: '85%',    label: 'Ticket Resolution'    },
      { icon: Clock,      value: '< 8 sec',label: 'Avg Response Time'    },
      { icon: DollarSign, value: '$2.8M',  label: 'Support Cost Savings' },
    ],
    tags: ['AI Agents', 'Support', 'SaaS'],
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section
      id="case-studies"
      aria-labelledby="cases-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#111827]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="tag-pill mb-4">Case Studies</div>
          <h2
            id="cases-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            <span className="text-white">Real Results from</span>
            <br />
            <span className="gradient-text">Real Enterprise Clients</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Measurable ROI delivered across industries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Sidebar list */}
          <nav aria-label="Case study selector" className="space-y-1 sm:space-y-2">
            {CASES.map((item, i) => (
              <button
                key={item.company}
                type="button"
                onClick={() => setActive(i)}
                aria-current={active === i ? 'true' : undefined}
                aria-label={`View ${item.company} case study`}
                className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-200 flex items-center justify-between group focus-visible:outline-2 focus-visible:outline-[#00D4FF] ${
                  active === i
                    ? 'glass-strong border border-white/15 bg-white/5'
                    : 'hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: active === i ? `${item.color}20` : 'rgba(255,255,255,0.05)',
                      color:      active === i ? item.color         : '#94a3b8',
                      border:     active === i ? `1px solid ${item.color}30` : '1px solid transparent',
                    }}
                    aria-hidden="true"
                  >
                    {item.logo}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{item.company}</div>
                    <div className="text-xs text-slate-500 truncate">{item.industry}</div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 flex-shrink-0 transition-all ${active === i ? 'text-[#00D4FF]' : 'text-slate-600 group-hover:text-slate-400'}`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </nav>

          {/* Detail panel */}
          <motion.article
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
            aria-label={`${c.company} case study details`}
            className="lg:col-span-2 glass rounded-2xl border border-white/[0.08] p-5 sm:p-8"
          >
            {/* Tags */}
            <ul className="flex gap-2 mb-4 sm:mb-5 flex-wrap" aria-label="Case study tags">
              {c.tags.map(tag => (
                <li
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{c.headline}</h3>
            <p className="text-slate-400 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">{c.description}</p>

            {/* Metrics */}
            <dl className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {c.metrics.map(m => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="rounded-xl p-3 sm:p-4 text-center"
                    style={{ background: `${c.color}08`, border: `1px solid ${c.color}18` }}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-2" style={{ color: c.color }} aria-hidden="true" />
                    <dd className="text-lg sm:text-xl font-extrabold" style={{ color: c.color }}>{m.value}</dd>
                    <dt className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mt-0.5">{m.label}</dt>
                  </div>
                );
              })}
            </dl>

            <a
              href={`/case-studies/${c.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold group focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: c.color }}
            >
              Read Full Case Study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
