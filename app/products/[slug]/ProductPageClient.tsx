'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronRight,
  Zap, Shield, Globe, AlertTriangle, Calculator, Activity,
  GitBranch, Lock, Layout, Brain, MessageSquare, Sliders,
  Bell, Database, Layers, Heart, ArrowUpCircle, BookOpen,
  MousePointer, Lightbulb, Plug, Copy, Share2, Edit3, Clock,
  Search, Mail, Mic, CheckSquare, Calendar, Monitor, Eye,
  AlertOctagon, PieChart, Target, DollarSign, BarChart2,
  Users, FileText, TrendingUp, Workflow, BarChart3, Headphones,
  Cpu, Camera, type LucideIcon,
} from 'lucide-react';
import type { ProductData } from '@/lib/products-data';
import { PRODUCTS_DATA } from '@/lib/products-data';

// ─── Icon map ───────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Calculator, Shield, AlertTriangle, Globe, BarChart2, Users,
  AlertOctagon, PieChart, Target, DollarSign, FileText,
  Layout, Brain, Zap, Activity, GitBranch, Lock,
  TrendingUp, MessageSquare, Sliders, Bell, Database,
  Layers, Heart, ArrowUpCircle, BookOpen,
  MousePointer, Lightbulb, Plug, Copy, Share2, Edit3, Clock,
  Search, Mail, Mic, CheckSquare, Calendar,
  Monitor, Eye, BarChart3, Workflow, Headphones, Cpu, Camera,
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.55 } }),
};

export default function ProductPageClient({ product }: { product: ProductData }) {
  const {
    name, tag, tagline, heroDescription, color, accentColor,
    stats, features, useCases, steps, industries,
    ctaHeadline, ctaSubtext, slug,
  } = product;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">

      {/* ── Nav bar ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B1120]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Nexus AI
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="mailto:ai@nexus-aisolution.com"
              title="Email us: ai@nexus-aisolution.com"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full hidden sm:flex transition-opacity hover:opacity-80"
              style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Support
            </a>
            <a
              href="https://calendly.com/nitinarora81788/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#0B1120] rounded-lg"
              style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }}
            >
              Book Demo
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${color}12, ${accentColor}08, transparent 70%)` }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <motion.div
            initial="hidden" animate="show" variants={fadeUp}
            className="flex items-center gap-2 text-xs text-slate-600 mb-8"
          >
            <span>Products</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color }}>{name}</span>
          </motion.div>

          {/* Tag */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0.5}>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
            >
              {tag}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden" animate="show" variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-tight max-w-5xl"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            <span className="text-white">{name}</span>
            <br />
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2 block"
              style={{
                background: `linear-gradient(135deg, ${color}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {tagline}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden" animate="show" variants={fadeUp} custom={2}
            className="text-base sm:text-xl text-slate-400 max-w-3xl leading-relaxed mb-10"
          >
            {heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden" animate="show" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <a
              href="https://calendly.com/nitinarora81788/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-[#0B1120] rounded-xl overflow-hidden"
            >
              <span className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }} />
              <span className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }} />
              <Calendar className="relative w-4 h-4" />
              <span className="relative">Book a Free Demo</span>
            </a>
            <a
              href="mailto:ai@nexus-aisolution.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-white rounded-xl border border-white/10 hover:border-white/25 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Our Team
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden" animate="show" variants={fadeUp} custom={4}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 sm:p-6 border text-center"
                style={{ borderColor: i % 2 === 0 ? `${color}20` : `${accentColor}20` }}
              >
                <div
                  className="text-3xl sm:text-4xl font-extrabold mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${accentColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-snug">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-[#111827]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="tag-pill mb-4">Core Capabilities</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Everything You Need to </span>
              <span style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Deploy with Confidence
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = ICON_MAP[feature.icon] ?? Zap;
              const c = i % 2 === 0 ? color : accentColor;
              return (
                <motion.div
                  key={feature.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="glass rounded-2xl p-6 sm:p-7 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${c}15`, border: `1px solid ${c}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: c }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accentColor}08, transparent 70%)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="tag-pill mb-4">Real-World Impact</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Built for Every </span>
              <span style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Business Challenge
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-2">{uc.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{uc.description}</p>
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {uc.outcome}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-[#111827]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14"
          >
            <div className="tag-pill mb-4">Implementation</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Up and Running </span>
              <span style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                in Days, Not Months
              </span>
            </h2>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="flex gap-5 sm:gap-6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${color}20, ${accentColor}20)`,
                    border: `1px solid ${color}30`,
                    color,
                  }}
                >
                  {step.step}
                </div>
                <div className="glass rounded-2xl p-5 sm:p-6 border border-white/5 flex-1">
                  <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-6">
              Purpose-Built for Your Industry
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map(ind => (
                <span
                  key={ind}
                  className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 glass border border-white/5"
                >
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d1535, #0B1120, #0d1535)' }} />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${color}10, ${accentColor}06, transparent 70%)` }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="tag-pill mb-5">Get Started Today</div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-space)' }}
            >
              <span className="text-white">{ctaHeadline.split(' ').slice(0, Math.ceil(ctaHeadline.split(' ').length / 2)).join(' ')} </span>
              <span style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {ctaHeadline.split(' ').slice(Math.ceil(ctaHeadline.split(' ').length / 2)).join(' ')}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {ctaSubtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/nitinarora81788/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-[#0B1120] rounded-xl overflow-hidden"
              >
                <span className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }} />
                <span className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }} />
                <Calendar className="relative w-4 h-4" />
                <span className="relative">Schedule a Free Demo</span>
              </a>
              <a
                href="mailto:ai@nexus-aisolution.com"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white rounded-xl glass border border-white/10 hover:border-white/25 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email ai@nexus-aisolution.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Other Products ── */}
      <section className="py-14 sm:py-16 border-t border-white/5 bg-[#080e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-6">
            Explore Other Solutions
          </p>
          <div className="flex flex-wrap gap-3">
            {PRODUCTS_DATA.filter(p => p.slug !== slug).map(p => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-400 glass border border-white/5 hover:border-white/15 hover:text-white transition-all"
              >
                {p.name}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
