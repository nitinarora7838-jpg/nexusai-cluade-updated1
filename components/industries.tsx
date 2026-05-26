'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Heart, ShoppingBag, Truck, Globe, Shield, Factory, Users, type LucideIcon } from 'lucide-react';

interface Industry {
  icon: LucideIcon;
  name: string;
  desc: string;
  metric: string;
  metricLabel: string;
  color: string;
}

const INDUSTRIES: Industry[] = [
  { icon: TrendingUp, name: 'Finance',       desc: 'Automate compliance, fraud detection, and financial reporting with AI precision.',          metric: '89%',  metricLabel: 'Faster Reporting',   color: '#00D4FF' },
  { icon: Heart,      name: 'Healthcare',    desc: 'Streamline patient workflows, clinical documentation, and regulatory compliance.',           metric: '65%',  metricLabel: 'Admin Reduction',    color: '#6C63FF' },
  { icon: ShoppingBag,name: 'Retail',        desc: 'Demand forecasting, inventory optimization, and personalized customer experiences.',         metric: '3.2×', metricLabel: 'Revenue Growth',     color: '#00D4FF' },
  { icon: Truck,      name: 'Logistics',     desc: 'Route optimization, shipment tracking, and predictive maintenance at scale.',               metric: '40%',  metricLabel: 'Cost Reduction',     color: '#6C63FF' },
  { icon: Globe,      name: 'SaaS',          desc: 'AI-powered product analytics, churn prediction, and automated customer success.',           metric: '2.8×', metricLabel: 'NRR Improvement',    color: '#00D4FF' },
  { icon: Shield,     name: 'Insurance',     desc: 'Claims automation, risk assessment, and underwriting intelligence powered by AI.',          metric: '72%',  metricLabel: 'Claims Automation',  color: '#6C63FF' },
  { icon: Factory,    name: 'Manufacturing', desc: 'Predictive maintenance, quality control AI, and supply chain optimization.',               metric: '55%',  metricLabel: 'Downtime Reduction', color: '#00D4FF' },
  { icon: Users,      name: 'HR & Payroll',  desc: 'End-to-end HR automation from talent acquisition to payroll processing.',                  metric: '80%',  metricLabel: 'Process Automation', color: '#6C63FF' },
];

export default function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-heading" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <div className="tag-pill mb-4">Industries</div>
          <h2 id="industries-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            <span className="text-white">AI Intelligence for</span><br />
            <span className="gradient-text">Every Industry Vertical</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Purpose-built AI solutions tailored to the unique challenges and compliance requirements of your sector.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.article key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative glass rounded-2xl p-5 sm:p-6 card-hover border border-white/5 hover:border-white/10 overflow-hidden"
                aria-label={`${ind.name} industry solutions`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${ind.color}12, transparent 60%)` }} aria-hidden="true" />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                  style={{ background: `${ind.color}18`, border: `1px solid ${ind.color}30` }} aria-hidden="true">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: ind.color }} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 sm:mb-5">{ind.desc}</p>
                <div className="rounded-xl p-2.5 sm:p-3 text-center" style={{ background: `${ind.color}10`, border: `1px solid ${ind.color}20` }}>
                  <div className="text-lg sm:text-xl font-extrabold" style={{ color: ind.color }}>{ind.metric}</div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{ind.metricLabel}</div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
