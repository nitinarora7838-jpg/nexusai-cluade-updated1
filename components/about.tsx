'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, ArrowRight, type LucideIcon } from 'lucide-react';

interface Value { icon: LucideIcon; title: string; desc: string; color: string; }
interface Stat  { val: string; label: string; }

const VALUES: Value[] = [
  { icon: Target,    title: 'Enterprise-First',      desc: 'Every product is built for the complexity and scale of enterprise environments, not retrofitted from consumer tools.', color: '#00D4FF' },
  { icon: Eye,       title: 'Radical Transparency',  desc: 'Every AI decision is explainable, auditable, and traceable — because trust is the foundation of enterprise AI.',       color: '#6C63FF' },
  { icon: Lightbulb, title: 'Continuous Innovation', desc: "We don't deploy AI and walk away. Our platform evolves continuously with your business and the AI frontier.",          color: '#00D4FF' },
];

const STATS: Stat[] = [
  { val: '2025',   label: 'Founded'               },
  { val: '40+',    label: 'Enterprise Clients'     },
  { val: '18+',    label: 'Countries Served'       },
  { val: '$120M+', label: 'Client Value Generated' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[#00D4FF]/3 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="tag-pill mb-4 sm:mb-5">About Nexus AI</div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-6 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">We&apos;re Building the</span><br />
              <span className="gradient-text">Future of Enterprise AI</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg">
              Nexus AI was founded on a singular belief: that every enterprise deserves access to transformative AI that actually works in production.
            </p>
            <p className="text-slate-500 leading-relaxed mb-7 sm:mb-8 text-sm sm:text-base">
              We combine deep enterprise experience with cutting-edge AI research to build systems that don&apos;t
              just automate tasks — they learn, adapt, and continuously improve. Our team of AI engineers,
              enterprise architects, and domain experts has deployed AI solutions across 500+ organizations worldwide.
            </p>

            <dl className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10" aria-label="Company statistics">
              {STATS.map(stat => (
                <div key={stat.label} className="glass rounded-xl p-3 sm:p-4 border border-white/5">
                  <dd className="text-xl sm:text-2xl font-extrabold gradient-text mb-1">{stat.val}</dd>
                  <dt className="text-xs text-slate-500 font-medium">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <a href="#contact" className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]">
              Partner With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Right — values */}
          <div className="space-y-3 sm:space-y-4">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.title}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="group glass rounded-2xl p-4 sm:p-6 border border-white/5 hover:border-white/10 card-hover overflow-hidden relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 50%, ${val.color}08, transparent 60%)` }} aria-hidden="true" />
                  <div className="flex gap-3 sm:gap-4 items-start relative">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${val.color}18`, border: `1px solid ${val.color}30` }} aria-hidden="true">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: val.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1.5 text-sm sm:text-base">{val.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-5 sm:p-6 border border-[#00D4FF]/15"
              style={{ background: 'rgba(0,212,255,0.04)' }}>
              <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-4">
                &ldquo;We don&apos;t build AI tools. We build AI-powered operating systems for enterprises — platforms
                that make your entire organization more intelligent, adaptive, and competitive.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(0,212,255,0.15)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.3)' }}
                  aria-hidden="true">AN</div>
                <cite className="not-italic">
                  <div className="text-sm font-semibold text-white">Alex Nexus</div>
                  <div className="text-xs text-slate-500">CEO &amp; Co-Founder, Nexus AI</div>
                </cite>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
