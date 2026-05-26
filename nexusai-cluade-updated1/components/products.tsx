'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, BarChart3, Workflow, Headphones, FileText,
  Cpu, TrendingUp, Users, ArrowRight, CheckCircle2, Camera,
  type LucideIcon,
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────
interface Product {
  icon: LucideIcon;
  name: string;
  tag: string;
  color: string;
  description: string;
  features: string[];
  slug: string;
}

// ─── Data ──────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    icon: Brain,
    name: 'AI Payroll Intelligence',
    tag: 'Payroll',
    color: '#00D4FF',
    slug: 'ai-payroll-intelligence',
    description: 'End-to-end payroll automation with AI compliance checks, anomaly detection, and real-time reporting.',
    features: ['Automated tax calculations', 'Compliance monitoring', 'Anomaly detection', 'Multi-jurisdiction support'],
  },
  {
    icon: Cpu,
    name: 'AI PMO Copilot',
    tag: 'PMO',
    color: '#6C63FF',
    slug: 'ai-pmo-copilot',
    description: 'AI-powered project management intelligence that tracks milestones, risks, and resource optimization.',
    features: ['Risk prediction', 'Resource optimization', 'Portfolio analytics', 'Automated reporting'],
  },
  {
    icon: Workflow,
    name: 'AI Workflow Engine',
    tag: 'Automation',
    color: '#00D4FF',
    slug: 'ai-workflow-engine',
    description: 'Orchestrate complex business workflows with intelligent routing, conditional logic, and AI decision engines.',
    features: ['Visual workflow builder', 'AI decision nodes', 'API integrations', 'Real-time monitoring'],
  },
  {
    icon: BarChart3,
    name: 'AI Analytics Dashboard',
    tag: 'Analytics',
    color: '#6C63FF',
    slug: 'ai-analytics-dashboard',
    description: 'Transform raw data into actionable intelligence with predictive analytics and AI-generated insights.',
    features: ['Predictive analytics', 'NL queries', 'Custom KPI tracking', 'Executive summaries'],
  },
  {
    icon: Headphones,
    name: 'AI Customer Support Agent',
    tag: 'Support',
    color: '#00D4FF',
    slug: 'ai-customer-support-agent',
    description: 'Deploy intelligent AI agents that resolve 80% of customer inquiries autonomously with human-like accuracy.',
    features: ['Multi-channel support', 'Sentiment analysis', 'Auto-escalation', 'Knowledge base sync'],
  },
  {
    icon: TrendingUp,
    name: 'AI Automation Studio',
    tag: 'Low-Code',
    color: '#6C63FF',
    slug: 'ai-automation-studio',
    description: 'No-code automation builder powered by AI suggestions, with enterprise-grade reliability and scalability.',
    features: ['Drag-drop builder', 'AI suggestions', '500+ connectors', 'Enterprise SLA'],
  },
  {
    icon: FileText,
    name: 'AI Reporting System',
    tag: 'Reports',
    color: '#00D4FF',
    slug: 'ai-reporting-system',
    description: 'Automated report generation with AI narrative writing, scheduled delivery, and dynamic visualizations.',
    features: ['Auto-generation', 'AI narrative', 'Scheduled delivery', 'Dynamic charts'],
  },
  {
    icon: Users,
    name: 'AI Productivity Assistant',
    tag: 'Productivity',
    color: '#6C63FF',
    slug: 'ai-productivity-assistant',
    description: 'An intelligent workplace AI that manages tasks, schedules, communications, and knowledge retrieval.',
    features: ['Smart scheduling', 'Task automation', 'Knowledge retrieval', 'Team collaboration'],
  },
  {
    icon: Camera,
    name: 'AI Monitoring Intelligence',
    tag: 'Monitoring',
    color: '#00D4FF',
    slug: 'ai-monitoring-intelligence',
    description: 'Transform existing cameras into intelligent monitoring systems with real-time AI analytics and alerts.',
    features: ['Plug-and-play integration', 'Real-time alerts', 'Multi-camera management', 'Compliance reporting'],
  },
];

// ─── Card component ─────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const Icon = product.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.55 }}
      className="group relative glass rounded-2xl p-5 sm:p-6 card-hover border border-white/5 hover:border-white/10 shimmer-effect overflow-hidden flex flex-col"
      aria-label={product.name}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${product.color}12, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${product.color}18`, border: `1px solid ${product.color}30` }}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" style={{ color: product.color }} />
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: `${product.color}15`, color: product.color, border: `1px solid ${product.color}25` }}
        >
          {product.tag}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-white mb-2">{product.name}</h3>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4 sm:mb-5 flex-1">
        {product.description}
      </p>

      <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6" aria-label={`${product.name} features`}>
        {product.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: product.color }}
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={`/products/${product.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all group/link focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ color: product.color }}
        aria-label={`Learn more about ${product.name}`}
      >
        Learn More
        <ArrowRight
          className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"
          aria-hidden="true"
        />
      </a>
    </motion.article>
  );
}

// ─── Section ────────────────────────────────────────────────────────
export default function Products() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#111827]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-px bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="tag-pill mb-4">AI Products</div>
          <h2
            id="products-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            <span className="text-white">Intelligent Platforms</span>
            <br />
            <span className="gradient-text">Built for Enterprise</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            A comprehensive suite of AI-powered products that modernize every aspect of your enterprise operations.
          </p>
        </motion.div>

        {/* Product grid — 1 col mobile, 2 sm, 4 lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
