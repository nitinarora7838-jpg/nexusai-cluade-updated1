'use client';

import { motion } from 'framer-motion';
import { TriangleAlert as AlertTriangle, Users, Warehouse, Building2, Shield, Smartphone, TrendingUp } from 'lucide-react';

const USE_CASES = [
  {
    icon: AlertTriangle,
    title: 'Workplace Safety',
    desc: 'PPE detection, restricted zone alerts, unsafe behavior flagging',
    metric: '80%',
    metricLabel: 'Incident Reduction',
    color: '#FF6B6B',
  },
  {
    icon: Users,
    title: 'Retail Analytics',
    desc: 'Footfall counting, heatmaps, queue monitoring, dwell analysis',
    metric: '45%',
    metricLabel: 'Revenue Growth',
    color: '#4ECDC4',
  },
  {
    icon: Warehouse,
    title: 'Logistics & Warehousing',
    desc: 'Dock occupancy, forklift safety, inventory counting, aisle monitoring',
    metric: '99%',
    metricLabel: 'Inventory Accuracy',
    color: '#45B7D1',
  },
  {
    icon: Building2,
    title: 'Office Occupancy',
    desc: 'Desk tracking, meeting room availability, space optimization',
    metric: '35%',
    metricLabel: 'Energy Savings',
    color: '#96CEB4',
  },
  {
    icon: Shield,
    title: 'Security & Perimeter',
    desc: '24/7 intrusion detection, unauthorized access alerts, facial recognition',
    metric: '99.9%',
    metricLabel: 'Detection Accuracy',
    color: '#FFEAA7',
  },
  {
    icon: Smartphone,
    title: 'Parking Management',
    desc: 'Space detection, unauthorized parking alerts, occupancy-based pricing',
    metric: '99%',
    metricLabel: 'Space Accuracy',
    color: '#A8E6CF',
  },
  {
    icon: TrendingUp,
    title: 'Traffic Monitoring',
    desc: 'Vehicle counting, accident detection, signal optimization',
    metric: '42%',
    metricLabel: 'Congestion Reduction',
    color: '#FF8B94',
  },
];

export default function MonitoringUseCases() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]" />
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#00D4FF]/3 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="tag-pill inline-block mb-4">Use Cases</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5" style={{ fontFamily: 'var(--font-space)' }}>
            <span className="text-white">Intelligence for Every</span>
            <br />
            <span className="gradient-text">Environment & Vertical</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Nexus AI Monitoring adapts to industry-specific safety standards, operational requirements, and compliance frameworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 card-hover"
              >
                {/* Gradient glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${useCase.color}10, transparent 70%)` }}
                />

                {/* Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: `${useCase.color}18`, border: `1px solid ${useCase.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: useCase.color }} />
                  </div>

                  {/* Title & desc */}
                  <h3 className="font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">{useCase.desc}</p>

                  {/* Metric card */}
                  <div
                    className="rounded-lg p-3 text-center"
                    style={{ background: `${useCase.color}12`, border: `1px solid ${useCase.color}25` }}
                  >
                    <div className="text-lg font-extrabold" style={{ color: useCase.color }}>
                      {useCase.metric}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {useCase.metricLabel}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: useCase.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-strong rounded-2xl border border-white/10 p-10 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Deploy AI Monitoring?</h3>
            <p className="text-slate-400 mb-6">
              See how intelligent monitoring can transform your operations. Our team will assess your environment and design a custom deployment plan.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] hover:shadow-lg hover:shadow-[#00D4FF]/20 transition-all"
            >
              Schedule Monitoring Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
