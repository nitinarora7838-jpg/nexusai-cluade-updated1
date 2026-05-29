'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TrendingUp, Clock, DollarSign, Users, CheckCircle, Quote, Building2, Calendar, Globe } from 'lucide-react';
import Link from 'next/link';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Metric   { icon: typeof TrendingUp; value: string; label: string; }
interface Phase    { title: string; duration: string; items: string[]; }
interface CaseStudyData {
  slug: string;
  company: string; industry: string; logo: string; color: string; accentColor: string;
  founded: string; size: string; hq: string;
  headline: string; subheadline: string;
  challenge: { title: string; body: string; painPoints: string[]; };
  solution: { title: string; body: string; products: { name: string; desc: string; }[]; };
  results: { title: string; body: string; };
  metrics: Metric[];
  timeline: Phase[];
  quote: { text: string; author: string; role: string; };
  tags: string[];
}

// ─── Case Study Data ─────────────────────────────────────────────────────────
const CASE_STUDIES: Record<string, CaseStudyData> = {
  'global-finance-corp': {
    slug: 'global-finance-corp',
    company: 'Global Finance Corp', industry: 'Financial Services', logo: 'GFC',
    color: '#00D4FF', accentColor: '#6C63FF',
    founded: '1998', size: '4,200 employees', hq: 'New York, NY',
    headline: 'Reduced manual workflows by 75%',
    subheadline: 'How Nexus AI eliminated 12,000 hours of manual financial work every quarter — and saved $4.2M annually.',
    challenge: {
      title: 'Drowning in manual processes',
      body: 'Global Finance Corp processed thousands of financial transactions daily across AP, AR, compliance, and reconciliation — all largely by hand. With 140+ manual workflows spread across 8 departments, errors were frequent, audits were painful, and their finance team spent more time on data entry than strategic analysis.',
      painPoints: [
        '140+ manual workflows consuming 12,000+ hours per quarter',
        'Error rate of 2.3% causing downstream reconciliation failures',
        'Compliance reporting took 3 full weeks per quarter',
        'No real-time visibility into cash flow or financial position',
        'Staff burnout — 60% of team time spent on low-value tasks',
      ],
    },
    solution: {
      title: 'The Nexus AI Workflow Engine deployment',
      body: 'Nexus AI deployed its Workflow Engine across GFC\'s entire finance stack — integrating with SAP, Oracle, and their proprietary trading systems. Within 90 days, every major manual process was automated end-to-end, with AI-driven exception handling, compliance checks, and real-time dashboards replacing manual spreadsheets.',
      products: [
        { name: 'Workflow Engine',      desc: 'Automated 140+ financial processes including AP matching, AR reconciliation, and intercompany settlements.' },
        { name: 'Compliance Monitor',   desc: 'Real-time regulatory compliance checks across SOX, Basel III, and internal audit requirements.' },
        { name: 'Analytics Dashboard',  desc: 'Live financial position dashboards replacing 200+ Excel reports with AI-generated executive summaries.' },
        { name: 'Exception AI',         desc: 'Intelligent exception flagging that routes anomalies to the right human with full context in seconds.' },
      ],
    },
    results: {
      title: 'Transformation in 90 days',
      body: 'Within one quarter of full deployment, Global Finance Corp had reclaimed 12,000 hours of staff time, reduced their error rate from 2.3% to 0.04%, and cut compliance reporting from 3 weeks to 4 hours. The finance team shifted from reactive data entry to proactive strategic analysis.',
    },
    metrics: [
      { icon: TrendingUp, value: '75%',   label: 'Workflow Reduction'   },
      { icon: Clock,      value: '12K hrs', label: 'Time Saved / Quarter' },
      { icon: DollarSign, value: '$4.2M', label: 'Annual Savings'        },
      { icon: Users,      value: '0.04%', label: 'Error Rate (was 2.3%)' },
    ],
    timeline: [
      { title: 'Discovery & Integration', duration: 'Weeks 1–3',  items: ['System audit of 140+ workflows', 'SAP / Oracle API integration', 'Data mapping and validation'] },
      { title: 'Pilot Deployment',        duration: 'Weeks 4–6',  items: ['AP automation go-live (30 workflows)', 'Staff training program', 'Parallel-run validation'] },
      { title: 'Full Rollout',            duration: 'Weeks 7–10', items: ['All 140 workflows live', 'Compliance monitor activated', 'Executive dashboards deployed'] },
      { title: 'Optimisation',            duration: 'Weeks 11–12',items: ['AI model fine-tuning on GFC data', 'Exception handling calibration', 'ROI review and sign-off'] },
    ],
    quote: {
      text: 'We had been trying to fix our manual workflow problem for six years. Nexus AI solved it in 90 days. The finance team now actually has time to think.',
      author: 'Sarah Chen', role: 'CFO, Global Finance Corp',
    },
    tags: ['Workflow Automation', 'Finance', 'Compliance'],
  },

  'medtech-solutions': {
    slug: 'medtech-solutions',
    company: 'MedTech Solutions', industry: 'Healthcare', logo: 'MTS',
    color: '#6C63FF', accentColor: '#00D4FF',
    founded: '2008', size: '8,000 employees across 12 states', hq: 'Chicago, IL',
    headline: 'Payroll for 8,000 employees. From 3 days to 2 hours.',
    subheadline: 'How Nexus AI Payroll Intelligence delivered 99.97% accuracy across a 12-state, multi-benefit healthcare workforce.',
    challenge: {
      title: 'The complexity of healthcare payroll',
      body: 'MedTech Solutions operates across 12 states with 8,000 employees spanning full-time clinicians, part-time staff, contractors, and agency workers — each with different pay structures, benefits packages, union agreements, and multi-jurisdiction tax obligations. Their legacy payroll system required 3 full days of manual processing per cycle, with frequent errors triggering costly corrections and compliance penalties.',
      painPoints: [
        'Payroll processing consumed 3 full days per bi-weekly cycle',
        'Multi-state tax compliance required a dedicated 4-person team',
        '340+ benefit plan variations across employee categories',
        'Payroll errors averaging $180,000 in corrections annually',
        'No self-service portal — HR fielded 600+ payroll queries per month',
      ],
    },
    solution: {
      title: 'Nexus AI Payroll Intelligence: built for healthcare complexity',
      body: 'Nexus AI deployed Payroll Intelligence with deep integrations into MedTech\'s HRIS (Workday), scheduling system, and state tax authorities. The AI engine automatically handles multi-state tax calculations, union rule enforcement, benefit deductions, and regulatory filings — with a 99.97% accuracy rate validated against MedTech\'s own audit team.',
      products: [
        { name: 'Payroll Intelligence',   desc: 'AI-powered payroll engine handling 340+ benefit variations, multi-state taxes, and union agreements automatically.' },
        { name: 'Compliance Autopilot',   desc: 'Automated federal and state filing across all 12 jurisdictions with zero manual intervention.' },
        { name: 'Employee Self-Service',  desc: 'Mobile-first portal where staff view pay stubs, update deductions, and resolve queries without HR involvement.' },
        { name: 'Audit Trail Engine',     desc: 'Immutable audit log of every payroll decision with AI-generated explanations for anomaly reviews.' },
      ],
    },
    results: {
      title: 'Accuracy at scale — 99.97% on day one',
      body: 'From the first live payroll run, MedTech Solutions saw processing time drop from 72 hours to under 2 hours. Payroll errors fell to near-zero, saving $180K in annual corrections. HR now handles payroll queries via AI chat, down from 600 calls/month to 28.',
    },
    metrics: [
      { icon: Users,      value: '8,000',        label: 'Employees Automated'  },
      { icon: TrendingUp, value: '99.97%',        label: 'Accuracy Rate'         },
      { icon: Clock,      value: '3d → 2hrs',    label: 'Processing Time'       },
      { icon: DollarSign, value: '$180K',         label: 'Error Corrections Saved' },
    ],
    timeline: [
      { title: 'Data Migration',    duration: 'Weeks 1–4',  items: ['8,000 employee records migrated', 'Workday & state tax authority integration', 'Benefit plan mapping (340+ variations)'] },
      { title: 'Parallel Testing',  duration: 'Weeks 5–8',  items: ['3 shadow payroll cycles run in parallel', 'Discrepancy analysis and model tuning', 'HR and Payroll team training'] },
      { title: 'Live Deployment',   duration: 'Week 9',     items: ['First live payroll run: 8,000 employees', '99.97% accuracy on day one', 'Employee portal launched simultaneously'] },
      { title: 'Full Handover',     duration: 'Weeks 10–12',items: ['Legacy system decommissioned', 'Self-service portal adoption: 82% of staff', 'HR query volume down 95%'] },
    ],
    quote: {
      text: 'Payroll used to own the end of every month. Now it just... happens. The team can\'t believe how much time they\'ve gotten back. Our staff love the self-service portal.',
      author: 'Dr. James Okafor', role: 'Chief HR Officer, MedTech Solutions',
    },
    tags: ['Payroll', 'Healthcare', 'HR Automation'],
  },

  'retailplex-international': {
    slug: 'retailplex-international',
    company: 'RetailPlex International', industry: 'Retail', logo: 'RPI',
    color: '#00D4FF', accentColor: '#22C55E',
    founded: '2003', size: '12,000 employees, 380 stores', hq: 'Dallas, TX',
    headline: 'Operational efficiency up 3×. Inventory costs down $8.1M.',
    subheadline: 'How Nexus AI transformed RetailPlex\'s supply chain from reactive to predictive — across 380 stores in 22 countries.',
    challenge: {
      title: 'A supply chain built for the 2000s, not the 2020s',
      body: 'RetailPlex International was running a supply chain built on gut instinct and lagging data. Inventory planning was done monthly with spreadsheets, vendor purchase orders were manually drafted, and demand forecasting relied on last year\'s numbers. The result: chronic overstock in slow-moving categories, stockouts in high-demand SKUs, and a fulfilment operation that averaged 9 days from order to shelf.',
      painPoints: [
        '$24M+ tied up in slow-moving overstock annually',
        'Stockouts costing an estimated $6.3M in lost sales per year',
        'Vendor PO process took 4–6 days with 12+ manual approval steps',
        'Demand forecasting accuracy was only 61% — worse than random for seasonal items',
        'Fulfillment averaged 9 days — competitors were at 3–4 days',
      ],
    },
    solution: {
      title: 'AI-powered supply chain, end to end',
      body: 'Nexus AI deployed an integrated supply chain intelligence platform across all 380 RetailPlex stores. The AI ingests real-time POS data, weather, local events, competitor pricing, and social trends to produce daily demand forecasts at the SKU-store level. Vendor POs are generated, reviewed, and sent automatically. Fulfilment routing is optimised in real time.',
      products: [
        { name: 'Demand Forecasting AI',    desc: 'SKU-level daily forecasts using 40+ signals including POS trends, weather, events, and competitor data.' },
        { name: 'Automated Procurement',    desc: 'AI drafts, routes, and sends vendor POs automatically — reducing the 12-step process to a single approval.' },
        { name: 'Inventory Optimiser',      desc: 'Continuously rebalances stock levels across 380 stores to eliminate overstock and prevent stockouts.' },
        { name: 'Fulfilment Intelligence',  desc: 'Real-time routing engine that selects optimal fulfilment paths — warehouse, store, or drop-ship — per order.' },
      ],
    },
    results: {
      title: 'From 61% to 91% forecast accuracy in one quarter',
      body: 'RetailPlex saw immediate results: demand forecast accuracy jumped from 61% to 91% within the first quarter. Overstock dropped by $8.1M annually, stockout-related lost sales fell by 73%, and fulfilment time was cut from 9 days to 3.5 days. The procurement team went from managing 800 manual POs per week to reviewing 12 AI-flagged exceptions.',
    },
    metrics: [
      { icon: TrendingUp, value: '3×',    label: 'Efficiency Gain'    },
      { icon: DollarSign, value: '$8.1M', label: 'Inventory Savings'  },
      { icon: Clock,      value: '60%',   label: 'Faster Fulfilment'  },
      { icon: TrendingUp, value: '91%',   label: 'Forecast Accuracy'  },
    ],
    timeline: [
      { title: 'Data Onboarding',      duration: 'Weeks 1–3',  items: ['POS system integration across 380 stores', 'Historical sales data ingestion (3 years)', 'Vendor API connections established'] },
      { title: 'Forecasting Go-Live',  duration: 'Weeks 4–6',  items: ['Demand forecasting activated (read-only)', 'Accuracy benchmarking vs legacy system', '91% accuracy achieved by week 6'] },
      { title: 'Procurement Automation',duration:'Weeks 7–9', items: ['Automated PO generation activated', 'Vendor notification and onboarding', 'Manual POs reduced from 800 to 12/week'] },
      { title: 'Full Rollout',         duration: 'Weeks 10–12',items: ['Fulfilment intelligence activated', 'Real-time inventory rebalancing live', '$8.1M overstock reduction tracked'] },
    ],
    quote: {
      text: 'We stopped guessing. Nexus AI tells us exactly what to order, when, and from whom. Our buyers now spend their time on strategy, not spreadsheets. The $8M in inventory savings paid for the platform in the first year alone.',
      author: 'Maria Vasquez', role: 'Chief Operating Officer, RetailPlex International',
    },
    tags: ['Analytics', 'Retail', 'Supply Chain'],
  },

  'logistics-prime': {
    slug: 'logistics-prime',
    company: 'Logistics Prime', industry: 'Logistics', logo: 'LP',
    color: '#6C63FF', accentColor: '#F59E0B',
    founded: '2011', size: '6,500 employees, 28 depots', hq: 'Atlanta, GA',
    headline: 'Reporting effort cut by 80%. 200+ reports automated.',
    subheadline: 'How Nexus AI eliminated Logistics Prime\'s monthly reporting marathon and replaced it with real-time AI intelligence across 15 departments.',
    challenge: {
      title: 'Reporting was eating the business alive',
      body: 'Logistics Prime produced 200+ monthly reports covering fleet performance, route efficiency, depot operations, driver compliance, and client SLA adherence. Each report was assembled manually — pulling data from 7 systems, formatting it in Excel, and distributing it by email. Department heads spent up to 40% of their time on reporting instead of operations. By the time the reports reached decision-makers, the data was already 2–3 weeks old.',
      painPoints: [
        '200+ monthly reports consuming 3,200 staff hours per month',
        'Data pulled manually from 7 disconnected systems',
        'Reports averaged 18 days old by the time they reached executives',
        'No single source of truth — each department had its own version',
        'Client SLA breach detection took up to 2 weeks — after the breach',
      ],
    },
    solution: {
      title: 'One AI brain. 200 reports. Zero manual effort.',
      body: 'Nexus AI Reporting System connected to all 7 of Logistics Prime\'s operational systems via API, built a unified real-time data warehouse, and deployed AI agents that write, format, and distribute all 200+ reports automatically. Executives now receive daily AI-generated briefings tailored to their role, with anomalies highlighted and recommendations included.',
      products: [
        { name: 'Reporting Automation',   desc: 'All 200+ reports generated automatically with zero manual data gathering or formatting.' },
        { name: 'Real-Time Data Hub',     desc: 'Unified data warehouse connecting 7 operational systems — single source of truth across all 15 departments.' },
        { name: 'Executive AI Briefings', desc: 'Daily role-specific AI summaries delivered to each exec with KPIs, anomalies, and recommended actions.' },
        { name: 'SLA Breach Predictor',   desc: 'AI model predicting SLA breaches 48 hours in advance, enabling proactive intervention before client impact.' },
      ],
    },
    results: {
      title: '18-day-old data replaced by real-time intelligence',
      body: 'Within 60 days of deployment, all 200+ reports were fully automated. Reporting effort fell by 80%, recovering 2,560 staff hours per month. Executives now receive live dashboards instead of stale spreadsheets. The SLA Breach Predictor identified 47 at-risk deliveries in its first month — preventing breaches that would have cost $380K in penalties.',
    },
    metrics: [
      { icon: Clock,      value: '80%',  label: 'Reporting Reduction'  },
      { icon: TrendingUp, value: '200+', label: 'Reports Automated'    },
      { icon: Users,      value: '15',   label: 'Departments Served'   },
      { icon: DollarSign, value: '$380K',label: 'SLA Penalties Avoided' },
    ],
    timeline: [
      { title: 'System Integration',    duration: 'Weeks 1–3',  items: ['API connections to all 7 operational systems', 'Real-time data warehouse build', 'Historical data migration (24 months)'] },
      { title: 'Report Mapping',        duration: 'Weeks 4–5',  items: ['All 200 reports catalogued and mapped', 'AI report templates built per department', 'Stakeholder sign-off on output formats'] },
      { title: 'Automation Go-Live',    duration: 'Weeks 6–8',  items: ['First 100 reports automated', 'Executive briefing AI activated', 'Real-time dashboards deployed'] },
      { title: 'Full Handover',         duration: 'Weeks 9–10', items: ['Remaining 100+ reports automated', 'SLA Breach Predictor live', 'Legacy manual process officially retired'] },
    ],
    quote: {
      text: 'I used to dread the last week of every month. My team was buried in Excel. Now I get a smarter briefing on my phone at 7am than anything we produced manually — and it\'s live, not 18 days old.',
      author: 'Tom Bradley', role: 'VP Operations, Logistics Prime',
    },
    tags: ['Reporting', 'Analytics', 'Logistics'],
  },

  'techventure-saas': {
    slug: 'techventure-saas',
    company: 'TechVenture SaaS', industry: 'SaaS', logo: 'TVS',
    color: '#00D4FF', accentColor: '#6C63FF',
    founded: '2019', size: '320 employees, 4,200 enterprise customers', hq: 'San Francisco, CA',
    headline: '85% of support tickets resolved by AI. Under 8 seconds.',
    subheadline: 'How TechVenture SaaS deployed a custom AI Support Agent that handles enterprise-grade queries with human-level accuracy — 24 hours a day, saving $2.8M annually.',
    challenge: {
      title: 'Support couldn\'t scale with growth',
      body: 'TechVenture SaaS grew from 800 to 4,200 enterprise customers in 18 months. Support ticket volume tripled. Their 45-person support team was overwhelmed — average first response time had ballooned to 6.5 hours, CSAT scores were falling, and churn was increasing in the accounts with the most open tickets. Hiring more agents wasn\'t scalable: each fully-trained enterprise support agent cost $85K/year and took 4 months to onboard.',
      painPoints: [
        'Ticket volume tripled in 18 months — team couldn\'t keep up',
        'Average first response time: 6.5 hours (enterprise benchmark: <1 hour)',
        'CSAT score dropped from 4.6 to 3.9 over 12 months',
        'Support agent onboarding took 4 months and cost $85K per hire',
        'Enterprise churn 2.8× higher in accounts with 3+ open tickets',
      ],
    },
    solution: {
      title: 'A custom AI agent trained on TechVenture\'s entire knowledge base',
      body: 'Nexus AI built a custom AI Support Agent trained on TechVenture\'s full product documentation, support history (2.4M past tickets), engineering runbooks, and API references. The agent resolves tickets autonomously, escalates complex issues with full context pre-loaded, and learns from every interaction. It works across Zendesk, Slack, and the in-product help widget simultaneously.',
      products: [
        { name: 'AI Support Agent',       desc: 'Custom-trained on 2.4M historical tickets and full product documentation — resolves 85% of queries without human involvement.' },
        { name: 'Escalation Intelligence',desc: 'When a ticket exceeds AI confidence, it routes to the right human with full conversation context and suggested resolution pre-loaded.' },
        { name: 'Knowledge Auto-Update',  desc: 'AI scans product release notes and engineering docs daily, updating its knowledge base automatically.' },
        { name: 'CSAT Predictor',         desc: 'Predicts tickets at risk of poor CSAT before they close, triggering proactive senior agent review.' },
      ],
    },
    results: {
      title: 'From 6.5 hours to 8 seconds — on day one',
      body: 'From the first day of deployment, TechVenture\'s AI Support Agent resolved 85% of incoming tickets without human involvement, at an average response time of under 8 seconds. CSAT recovered from 3.9 to 4.7 within 60 days. The support team shifted from firefighting to handling only complex, high-value escalations — and the $2.8M annual saving came from avoiding 33 additional planned hires.',
    },
    metrics: [
      { icon: TrendingUp, value: '85%',     label: 'Ticket Resolution'     },
      { icon: Clock,      value: '< 8 sec', label: 'Avg Response Time'     },
      { icon: DollarSign, value: '$2.8M',   label: 'Support Cost Savings'  },
      { icon: Users,      value: '4.7',     label: 'CSAT Score (was 3.9)'  },
    ],
    timeline: [
      { title: 'Training Data Prep',   duration: 'Weeks 1–3',  items: ['2.4M historical tickets ingested', 'Product docs and runbooks structured', 'Knowledge graph built'] },
      { title: 'Agent Training',       duration: 'Weeks 4–6',  items: ['Custom LLM fine-tuned on TechVenture data', 'Zendesk & Slack integrations deployed', 'Shadow mode: AI answers, humans review'] },
      { title: 'Staged Rollout',       duration: 'Weeks 7–8',  items: ['AI handles Tier-1 tickets autonomously', 'Human oversight on all AI responses', '93% human approval rate in first week'] },
      { title: 'Full Deployment',      duration: 'Week 9',     items: ['AI fully autonomous on 85% of ticket volume', 'Escalation intelligence live', 'CSAT monitoring dashboard activated'] },
    ],
    quote: {
      text: 'Our enterprise customers are emailing us to say how impressed they are with our support. They don\'t know it\'s AI — they just know it\'s the fastest, most accurate support they\'ve ever received from any SaaS vendor.',
      author: 'Priya Nair', role: 'CTO, TechVenture SaaS',
    },
    tags: ['AI Agents', 'Support', 'SaaS'],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function CaseStudyPageClient({ slug }: { slug: string }) {
  const data = CASE_STUDIES[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Case study not found.</p>
          <Link href="/#case-studies" className="text-[#00D4FF] hover:underline">← Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  const { company, industry, logo, color, accentColor, founded, size, hq,
          headline, subheadline, challenge, solution, results,
          metrics, timeline, quote, tags } = data;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[0.06] bg-[#0B1120]/90 backdrop-blur-xl">
        <Link href="/#case-studies" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] hover:opacity-90 transition-opacity"
        >
          Book Demo <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${color}12, transparent)` }} />
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative max-w-5xl mx-auto">
          {/* Company badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
              {logo}
            </div>
            <div>
              <div className="text-white font-semibold">{company}</div>
              <div className="text-slate-400 text-sm">{industry}</div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex gap-2 flex-wrap mb-6">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>{tag}</span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed mb-10"
          >
            {subheadline}
          </motion.p>

          {/* Company info chips */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-4">
            {[
              { icon: Building2, label: size },
              { icon: Globe,     label: hq  },
              { icon: Calendar,  label: `Founded ${founded}` },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400 glass rounded-lg px-3 py-2 border border-white/[0.06]">
                <Icon className="w-3.5 h-3.5" style={{ color }} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Key Metrics ─────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5 sm:p-6 text-center"
                style={{ background: `${color}08`, border: `1px solid ${color}18` }}
              >
                <Icon className="w-5 h-5 mx-auto mb-3" style={{ color }} />
                <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color }}>{m.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{m.label}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Challenge ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>The Challenge</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-space)' }}>{challenge.title}</h2>
            <p className="text-slate-400 leading-relaxed">{challenge.body}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="glass rounded-2xl border border-white/[0.08] p-6">
              <div className="text-sm font-semibold text-white mb-4">Pain points</div>
              <ul className="space-y-3">
                {challenge.painPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Solution ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white/[0.015] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>The Solution</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-space)' }}>{solution.title}</h2>
            <p className="text-slate-400 leading-relaxed max-w-3xl">{solution.body}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {solution.products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-xl border border-white/[0.08] p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color }} />
                  <div className="text-sm font-semibold text-white">{p.name}</div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>The Results</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-space)' }}>{results.title}</h2>
            <p className="text-slate-400 leading-relaxed max-w-3xl">{results.body}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Implementation Timeline ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white/[0.015] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>Implementation</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: 'var(--font-space)' }}>From kickoff to live in 12 weeks</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeline.map((phase, i) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* connector line */}
                {i < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+8px)] w-4 h-px" style={{ background: `${color}40` }} />
                )}
                <div className="glass rounded-xl border border-white/[0.08] p-5 h-full">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold mb-3 flex-shrink-0"
                    style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
                    {i + 1}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">{phase.title}</div>
                  <div className="text-xs font-medium mb-3" style={{ color }}>{phase.duration}</div>
                  <ul className="space-y-1.5">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Quote className="w-8 h-8 mx-auto mb-6 opacity-40" style={{ color }} />
            <blockquote className="text-xl sm:text-2xl font-medium text-white leading-relaxed mb-6">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <div className="text-sm font-semibold text-white">{quote.author}</div>
            <div className="text-xs text-slate-500 mt-1">{quote.role}</div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-space)' }}>
              Ready to write your own case study?
            </h2>
            <p className="text-slate-400 mb-8">See how Nexus AI can deliver measurable ROI for your organisation in 90 days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] hover:opacity-90 transition-opacity"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#case-studies"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white rounded-xl border border-white/15 hover:border-white/30 transition-colors"
              >
                ← All Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
