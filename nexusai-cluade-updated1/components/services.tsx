'use client';

import { motion } from 'framer-motion';
import { Brain, Rocket, Code, Settings, Sparkles, Plug, TrendingUp, LayoutDashboard, type LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  wide?: boolean;
}

const SERVICES: Service[] = [
  { icon: Brain,         title: 'AI Consulting',           desc: 'Strategic AI roadmapping and architecture consulting for enterprise transformation initiatives.',                color: '#00D4FF', wide: true  },
  { icon: Rocket,        title: 'AI Transformation',       desc: 'End-to-end organizational AI transformation from strategy to deployment.',                                    color: '#6C63FF'             },
  { icon: Code,          title: 'AI Product Development',  desc: 'Custom AI product engineering with rapid prototyping and enterprise delivery.',                               color: '#00D4FF'             },
  { icon: Settings,      title: 'Workflow Automation',     desc: 'Automate complex business processes with intelligent, self-healing workflows.',                               color: '#6C63FF'             },
  { icon: Sparkles,      title: 'Generative AI Solutions', desc: 'Deploy LLM-powered solutions for content, code, analysis, and decision support.',                            color: '#00D4FF'             },
  { icon: Plug,          title: 'Enterprise Integration',  desc: 'Seamless integration across your entire technology stack with bidirectional data sync.',                      color: '#6C63FF'             },
  { icon: TrendingUp,    title: 'AI Analytics',            desc: 'Convert operational data into strategic intelligence with predictive AI models.',                             color: '#00D4FF'             },
  { icon: LayoutDashboard,title:'Intelligent Dashboards',  desc: 'Executive-grade dashboards with real-time AI insights and automated reporting.',                              color: '#6C63FF', wide: true  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#111827]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-[#00D4FF]/3 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <div className="tag-pill mb-4">Services</div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            <span className="text-white">Everything You Need to</span><br />
            <span className="gradient-text">Lead the AI Revolution</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            From strategy to deployment, our expert teams deliver the full spectrum of enterprise AI services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.article
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group relative glass rounded-2xl p-5 sm:p-7 card-hover border border-white/5 hover:border-white/10 overflow-hidden ${svc.wide ? 'lg:col-span-2' : ''}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${svc.color}10, transparent 70%)` }} aria-hidden="true" />
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
                  style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }} aria-hidden="true">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: svc.color }} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{svc.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${svc.color}60, transparent)` }} aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
