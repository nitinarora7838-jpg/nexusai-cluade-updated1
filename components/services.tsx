'use client';

import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
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

// ─── Card with cursor-driven 3D tilt + spotlight ─────────────────────
function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const Icon = svc.icon;
  const ref = useRef<HTMLElement>(null);

  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 7);
    rotateX.set((0.5 - py) * 7);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: `0 24px 50px -16px ${svc.color}40` }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative glass rounded-2xl p-5 sm:p-7 border border-white/5 hover:border-white/15 overflow-hidden will-change-transform ${svc.wide ? 'lg:col-span-2' : ''}`}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${svc.color}55, transparent 40%, transparent 60%, ${svc.color}30)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), ${svc.color}22, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Glowing icon tile */}
      <div
        className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
        style={{
          background: `linear-gradient(135deg, ${svc.color}26, ${svc.color}0a)`,
          border: `1px solid ${svc.color}30`,
          boxShadow: `inset 0 1px 0 ${svc.color}20`,
        }}
        aria-hidden="true"
      >
        <Icon
          className="w-4 h-4 sm:w-5 sm:h-5"
          style={{ color: svc.color, filter: `drop-shadow(0 0 6px ${svc.color}80)` }}
        />
      </div>

      <h3 className="relative text-base sm:text-lg font-bold text-white mb-2">{svc.title}</h3>
      <p className="relative text-xs sm:text-sm text-slate-500 leading-relaxed transition-colors duration-300 group-hover:text-slate-400">
        {svc.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

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
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
