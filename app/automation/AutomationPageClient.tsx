'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Zap, Shield, Eye, Lock, FileText,
  AlertTriangle, CheckCircle2, Activity, Users, CreditCard,
  MessageSquare, Database, Cloud, BarChart3, Calendar, Mail,
  type LucideIcon,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────
interface Node { id: string; label: string; icon: LucideIcon; x: number; y: number; color: string; isCenter?: boolean; size?: 'lg' | 'sm'; }
interface Metric { value: number; suffix: string; label: string; sub: string; color: string; }
interface AutomationCard { icon: LucideIcon; title: string; description: string; steps: string[]; color: string; badge: string; }
interface TrustItem { icon: LucideIcon; title: string; desc: string; }

// ─── Data ────────────────────────────────────────────────────────────
const NODES: Node[] = [
  { id: 'nexus',    label: 'Nexus AI',   icon: Zap,          x: 50, y: 50, color: '#00D4FF', isCenter: true, size: 'lg' },
  { id: 'slack',    label: 'Slack',      icon: MessageSquare, x: 20, y: 15, color: '#6C63FF' },
  { id: 'crm',      label: 'CRM',        icon: Database,      x: 80, y: 15, color: '#00D4FF' },
  { id: 'erp',      label: 'ERP',        icon: Cloud,         x: 8,  y: 50, color: '#6C63FF' },
  { id: 'payroll',  label: 'Payroll',    icon: CreditCard,    x: 92, y: 50, color: '#00D4FF' },
  { id: 'hrms',     label: 'HRMS',       icon: Users,         x: 20, y: 84, color: '#6C63FF' },
  { id: 'finance',  label: 'Finance',    icon: BarChart3,     x: 80, y: 84, color: '#00D4FF' },
  { id: 'analytics',label: 'Analytics',  icon: Activity,      x: 50, y: 8,  color: '#6C63FF' },
];

const CONNECTIONS: [string, string][] = [
  ['slack','nexus'],['crm','nexus'],['erp','nexus'],
  ['payroll','nexus'],['hrms','nexus'],['finance','nexus'],['analytics','nexus'],
];

const METRICS: Metric[] = [
  { value: 12,   suffix: 'M+',  label: 'Workflows Processed',  sub: 'this month',    color: '#00D4FF' },
  { value: 99.9, suffix: '%',   label: 'Uptime SLA',           sub: 'last 12 months',color: '#6C63FF' },
  { value: 847,  suffix: 'ms',  label: 'Avg Response Time',    sub: 'per automation',color: '#00D4FF' },
  { value: 68,   suffix: '%',   label: 'Cost Reduction',       sub: 'vs manual ops', color: '#6C63FF' },
  { value: 3200, suffix: '+',   label: 'Active AI Agents',     sub: 'running now',   color: '#00D4FF' },
];

const AUTOMATIONS: AutomationCard[] = [
  {
    icon: CreditCard,
    title: 'Payroll Automation',
    badge: 'Finance',
    color: '#00D4FF',
    description: 'End-to-end payroll processing with AI compliance checks, anomaly detection, and auto-filing across 150+ jurisdictions.',
    steps: ['HRMS triggers payroll run','AI validates & calculates tax','Anomaly scan + compliance check','Auto-file & distribute payslips'],
  },
  {
    icon: Users,
    title: 'Employee Onboarding',
    badge: 'HR',
    color: '#6C63FF',
    description: 'Orchestrate IT provisioning, training, document signing, and benefits enrollment across 12 systems — triggered by a single HRIS event.',
    steps: ['Offer accepted in HRMS','IT provisions accounts & hardware','Training paths assigned via LMS','Day-1 readiness confirmed'],
  },
  {
    icon: AlertTriangle,
    title: 'Intelligent Escalation',
    badge: 'Operations',
    color: '#00D4FF',
    description: 'AI monitors every workflow in real time, detects anomalies, predicts escalation needs, and routes to the right human before SLA breach.',
    steps: ['Workflow deviation detected','AI risk-scores the incident','Auto-routes to correct team','Resolution logged & learned'],
  },
  {
    icon: Shield,
    title: 'Compliance Workflows',
    badge: 'Legal',
    color: '#6C63FF',
    description: 'Continuous compliance monitoring across all processes — auto-generating audit trails, flagging violations, and triggering remediation tasks.',
    steps: ['Policy change detected','Affected workflows mapped','Compliance gap auto-flagged','Remediation workflow triggered'],
  },
  {
    icon: BarChart3,
    title: 'Executive Reporting',
    badge: 'Analytics',
    color: '#00D4FF',
    description: 'AI aggregates data across every system, generates board-ready reports with AI narrative, and delivers to stakeholders automatically.',
    steps: ['Data pulled from all sources','AI generates narrative summary','Board pack built in minutes','Distributed on schedule'],
  },
  {
    icon: Cloud,
    title: 'ERP Orchestration',
    badge: 'Enterprise',
    color: '#6C63FF',
    description: 'Seamlessly orchestrate procurement, inventory, finance, and operations across SAP, Oracle, and Microsoft Dynamics — in real time.',
    steps: ['Purchase event triggered','Multi-system sync initiated','Approval routed by AI','ERP records auto-updated'],
  },
];

const TRUST_ITEMS: TrustItem[] = [
  { icon: FileText, title: 'Immutable Audit Logs',      desc: 'Every workflow execution, decision, and data movement is logged, timestamped, and tamper-proof.' },
  { icon: Shield,   title: 'Compliance-First by Design',desc: 'SOC 2 Type II, ISO 27001, GDPR, and HIPAA compliance baked into every automation layer.' },
  { icon: Eye,      title: 'Full Observability',         desc: 'Real-time dashboards, anomaly detection, and execution tracing across every workflow and AI agent.' },
  { icon: Lock,     title: 'Role-Based Governance',      desc: 'Granular access controls, approval workflows, and environment segregation across all enterprise users.' },
];

// ─── Neural Canvas Background ────────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.width  = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    let rafId: number;

    type Dot = { x: number; y: number; vx: number; vy: number };
    const dots: Dot[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.25)';
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const a = 0.12 * (1 - dist / 160);
            const g = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
            g.addColorStop(0, `rgba(0,212,255,${a})`);
            g.addColorStop(1, `rgba(108,99,255,${a})`);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, [prefersReduced]);

  if (prefersReduced) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

// ─── Live Orchestration SVG ───────────────────────────────────────────
function OrchestrationDiagram() {
  const [tick, setTick] = useState(0);
  const prefersReduced  = useReducedMotion();
  const activeIdx       = tick % CONNECTIONS.length;

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), rgba(108,99,255,0.04), transparent 70%)',
      }} aria-hidden="true" />

      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,212,255,0.4)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </radialGradient>
        </defs>

        {/* Orbit rings */}
        <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.3" strokeDasharray="2 3" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(108,99,255,0.05)" strokeWidth="0.2" />

        {/* Connection lines */}
        {CONNECTIONS.map(([from, to], i) => {
          const f = NODES.find(n => n.id === from)!;
          const t2 = NODES.find(n => n.id === to)!;
          const isActive = !prefersReduced && i === activeIdx;
          const pathId = `path-${i}`;
          return (
            <g key={i}>
              <path
                id={pathId}
                d={`M${f.x},${f.y} Q${(f.x + t2.x) / 2 + (Math.random() > 0.5 ? 5 : -5)},${(f.y + t2.y) / 2} ${t2.x},${t2.y}`}
                fill="none"
                stroke={isActive ? f.color : 'rgba(255,255,255,0.05)'}
                strokeWidth={isActive ? '0.5' : '0.2'}
                filter={isActive ? 'url(#glow)' : undefined}
              />
              {isActive && (
                <>
                  {/* Data packet going to center */}
                  <circle r="0.9" fill={f.color} opacity="0.9">
                    <animateMotion dur="1.4s" repeatCount="1" path={`M${f.x},${f.y} Q${(f.x + t2.x) / 2},${(f.y + t2.y) / 2} ${t2.x},${t2.y}`} />
                  </circle>
                  {/* Return packet */}
                  <circle r="0.6" fill="#6C63FF" opacity="0.7">
                    <animateMotion dur="1.4s" begin="0.5s" repeatCount="1" path={`M${t2.x},${t2.y} Q${(f.x + t2.x) / 2},${(f.y + t2.y) / 2} ${f.x},${f.y}`} />
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const Icon   = node.icon;
          const active = !prefersReduced && CONNECTIONS[activeIdx]?.includes(node.id);
          const isCenter = node.isCenter;
          const r      = isCenter ? 7 : 5;

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Pulse ring */}
              {active && (
                <circle r={r + 3} fill="none" stroke={node.color} strokeWidth="0.4" opacity="0.4">
                  <animate attributeName="r" values={`${r + 1};${r + 5};${r + 1}`} dur="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="1s" repeatCount="indefinite" />
                </circle>
              )}
              {isCenter && (
                <circle r={r + 5} fill="url(#centerGlow)" opacity={active ? '1' : '0.5'} />
              )}
              {/* Node circle */}
              <circle
                r={r}
                fill={active ? `${node.color}30` : 'rgba(15,22,40,0.9)'}
                stroke={active ? node.color : 'rgba(255,255,255,0.12)'}
                strokeWidth={isCenter ? '0.6' : '0.4'}
                filter={active ? 'url(#glow)' : undefined}
              />
              {/* Label */}
              <text
                y={r + 4}
                textAnchor="middle"
                fill="rgba(148,163,184,0.9)"
                fontSize="3.2"
                fontWeight="500"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating status chips */}
      <motion.div
        className="absolute top-4 right-0 glass border border-white/10 rounded-xl px-3 py-2 text-xs"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-slate-300 font-medium">7 systems live</span>
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 glass border border-white/10 rounded-xl px-3 py-2 text-xs"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          <span className="text-slate-300 font-medium">AI orchestrating</span>
        </span>
      </motion.div>
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────
function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 50;
    const step  = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current * 10) / 10);
    }, duration / steps);
    return () => clearInterval(id);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Main page ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function AutomationPageClient() {
  const { scrollYProgress } = useScroll();
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY        = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-x-hidden">

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Nexus AI
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-green-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live Orchestration
            </span>
            <a
              href="https://calendly.com/nitinarora81788/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#0B1120] rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]"
            >
              Book Demo <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-25" />
        <NeuralCanvas />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07), rgba(108,99,255,0.05), transparent 65%)' }}
          aria-hidden="true"
        />

        {/* Scanline overlay for JARVIS feel */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.012) 3px, rgba(0,212,255,0.012) 4px)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left content */}
            <motion.div style={{ opacity: heroOpacity, y: heroY }}>
              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                  Enterprise AI Orchestration
                </span>
              </motion.div>

              <motion.h1
                initial="hidden" animate="show" variants={fadeUp} custom={1}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                <span className="text-white">AI-Powered</span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 60%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}
                  className="animate-gradient-x">
                  Enterprise
                </span>
                <br />
                <span className="text-white">Orchestration.</span>
              </motion.h1>

              <motion.p
                initial="hidden" animate="show" variants={fadeUp} custom={2}
                className="text-base sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-xl"
              >
                One AI brain. Every enterprise system. Zero manual intervention. Nexus AI orchestrates your entire technology stack in real time — so your business operates at the speed of intelligence.
              </motion.p>

              {/* Mini stats */}
              <motion.div
                initial="hidden" animate="show" variants={fadeUp} custom={3}
                className="grid grid-cols-3 gap-3 mb-10 max-w-md"
              >
                {[
                  { v: '12M+',  l: 'Workflows / mo' },
                  { v: '99.9%', l: 'Uptime SLA' },
                  { v: '<1s',   l: 'Avg latency' },
                ].map(s => (
                  <div key={s.l} className="glass rounded-xl p-3 border border-white/5 text-center">
                    <div className="text-lg font-bold" style={{ color: '#00D4FF' }}>{s.v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial="hidden" animate="show" variants={fadeUp} custom={4}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a href="https://calendly.com/nitinarora81788/30min" target="_blank" rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#0B1120] rounded-xl overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
                  <Calendar className="relative w-4 h-4" />
                  <span className="relative">Book a Live Demo</span>
                </a>
                <a href="mailto:ai@nexus-aisolution.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl glass border border-white/10 hover:border-[#00D4FF]/30 transition-colors">
                  <Mail className="w-4 h-4" />
                  Email Our Team
                </a>
              </motion.div>
            </motion.div>

            {/* Right — Orchestration Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative glass rounded-3xl border border-white/[0.07] p-6 sm:p-8 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.04), rgba(108,99,255,0.03), rgba(11,17,32,0.9))' }}>
                {/* Header bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono ml-2">nexus://orchestration.live</span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <OrchestrationDiagram />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs text-slate-600">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00D4FF]/40 to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — 4 steps
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1428]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <div className="tag-pill mb-4">How It Works</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">One Platform. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Infinite Workflows.
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Nexus AI plugs into your existing stack and begins orchestrating autonomously — no rip-and-replace, no months of setup.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Connect',    desc: 'Plug into 500+ enterprise tools via pre-built connectors. Your stack stays intact.',  color: '#00D4FF' },
              { n: '02', title: 'Map',        desc: 'AI maps your workflows, discovers automation opportunities, and models decision trees.', color: '#6C63FF' },
              { n: '03', title: 'Orchestrate',desc: 'AI executes, routes, and coordinates tasks across all connected systems in real time.',  color: '#00D4FF' },
              { n: '04', title: 'Optimise',   desc: 'Every execution teaches the AI. Workflows improve continuously without human effort.',   color: '#6C63FF' },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${step.color}40, transparent)` }} />
                <div className="text-5xl font-extrabold mb-4 opacity-10" style={{ color: step.color }}>{step.n}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}>
                  <Zap className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LIVE METRICS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), rgba(108,99,255,0.04), transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="tag-pill mb-4">Real-Time Intelligence</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">The Numbers </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Speak for Themselves.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass rounded-2xl p-5 sm:p-6 border text-center relative overflow-hidden group"
                style={{ borderColor: `${m.color}20` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${m.color}10, transparent 70%)` }}
                />
                {/* Pulse dot */}
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m.color }} />
                <div className="text-2xl sm:text-3xl xl:text-4xl font-extrabold mb-1" style={{ color: m.color }}>
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mb-0.5">{m.label}</div>
                <div className="text-[10px] text-slate-600">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AUTOMATION SHOWCASES
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-[#0d1428]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="tag-pill mb-4">Enterprise Automations</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">From Trigger to Outcome. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Fully Autonomous.
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Six mission-critical enterprise workflows that Nexus AI orchestrates end-to-end without human intervention.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUTOMATIONS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="glass rounded-2xl border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden flex flex-col"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />

                  <div className="p-6 sm:p-7 flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                        <Icon className="w-5 h-5" style={{ color: card.color }} />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${card.color}12`, color: card.color, border: `1px solid ${card.color}20` }}>
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{card.description}</p>

                    {/* Flow steps */}
                    <div className="space-y-2">
                      {card.steps.map((step, si) => (
                        <div key={si} className="flex items-center gap-2.5">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: `${card.color}20`, color: card.color }}>
                            {si + 1}
                          </div>
                          <span className="text-xs text-slate-400">{step}</span>
                          {si < card.steps.length - 1 && (
                            <div className="ml-2.5 absolute" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom status bar */}
                  <div className="px-6 sm:px-7 py-3 border-t border-white/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-500">Fully automated · Zero human steps</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENTERPRISE TRUST
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.06), transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <div className="tag-pill mb-4">Enterprise Trust</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Governed. Audited. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Trusted.
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Enterprise-grade security and compliance aren't an afterthought — they're the foundation every automation is built on.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {TRUST_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const c    = i % 2 === 0 ? '#00D4FF' : '#6C63FF';
              return (
                <motion.div
                  key={item.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${c}15`, border: `1px solid ${c}25` }}>
                    <Icon className="w-5 h-5" style={{ color: c }} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Compliance badges */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'HIPAA Ready', 'CCPA Compliant', '99.9% SLA'].map(badge => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-slate-400 glass border border-white/8">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Orchestrate Your Future
      ══════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #060d1f, #0d1535, #060d1f)' }} />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <NeuralCanvas />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.09), rgba(108,99,255,0.06), transparent 65%)' }}
        />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.015) 3px, rgba(0,212,255,0.015) 4px)' }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            {/* Glowing tag */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00D4FF' }}>
              <Zap className="w-3 h-3" />
              The Future of Enterprise Operations
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Orchestrate</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 50%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}
                className="animate-gradient-x">
                Your Future.
              </span>
            </h2>

            <p className="text-base sm:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Every hour your enterprise runs on manual processes is an hour your competitors are pulling ahead. The window to lead with AI is now — and it starts with a single conversation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a href="https://calendly.com/nitinarora81788/30min" target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-[#0B1120] rounded-xl overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
                <Calendar className="relative w-5 h-5" />
                <span className="relative">Schedule Your Strategy Call</span>
              </a>
              <a href="mailto:ai@nexus-aisolution.com"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-xl glass border border-white/10 hover:border-[#00D4FF]/30 transition-colors">
                <Mail className="w-5 h-5" />
                Email Our Team
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
              {['No credit card required', 'Live demo in 48 hrs', 'Proof of concept in 2 weeks', 'White-glove onboarding'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#00D4FF]/60" />{t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
