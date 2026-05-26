'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, CircleAlert as AlertCircle, Eye, Shield, TrendingUp, CircleCheck as CheckCircle2, ArrowRight, Activity, Brain, Users } from 'lucide-react';

function MonitoringCard({ icon: Icon, title, desc, delay }: { icon: ComponentType<{ className?: string }>; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-6 border border-white/5 hover:border-[#00D4FF]/30 transition-all"
    >
      <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/15 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[#00D4FF]" />
      </div>
      <h4 className="font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </motion.div>
  );
}

interface HeroBox {
  top: string; left: string; w: string; h: string;
  color: string; label: string; conf: string;
  status?: string;     // sub-label below main label, e.g. "FOCUSED"
  alert?: boolean;     // pulsing red box
  seed: number;
}

const HERO_BOXES: HeroBox[] = [
  { top: '15%', left: '32%', w: '34%', h: '78%', color: '#FF6B6B', label: 'E-002', conf: '98%', status: 'UNUSUAL POSTURE', alert: true,  seed: 1 },
  { top: '22%', left: '2%',  w: '22%', h: '62%', color: '#00D4FF', label: 'E-001', conf: '94%', status: 'NORMAL',          seed: 2 },
  { top: '20%', left: '72%', w: '26%', h: '70%', color: '#00D4FF', label: 'E-003', conf: '91%', status: 'NORMAL',          seed: 3 },
];

function HeroDetectionBox({ box, prefersReduced }: { box: HeroBox; prefersReduced: boolean | null }) {
  const drift = prefersReduced ? {} : {
    x: [0, 4 + box.seed, -3, 0],
    y: [0, -3, 3 + box.seed, 0],
    ...(box.alert ? { opacity: [0.8, 1, 0.8] } : {}),
  };
  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        top: box.top, left: box.left, width: box.w, height: box.h,
        border: `1.5px solid ${box.color}`,
        boxShadow: `0 0 12px ${box.color}66, inset 0 0 12px ${box.color}1a`,
      }}
      animate={drift}
      transition={{ repeat: Infinity, duration: 4 + box.seed * 0.5, ease: 'easeInOut' }}
    >
      {/* label */}
      <div className="absolute -top-5 left-0 flex items-center gap-1">
        <div className="text-[8px] font-bold px-1.5 py-0.5 rounded-sm leading-none whitespace-nowrap tracking-wider"
          style={{ background: box.color, color: '#0B1120' }}>
          {box.label} {box.conf}
        </div>
        {box.status && (
          <div className="text-[7px] font-bold px-1 py-0.5 rounded-sm leading-none whitespace-nowrap tracking-wide"
            style={{
              background: box.alert ? 'rgba(255,107,107,0.95)' : 'rgba(11,17,32,0.85)',
              color: box.alert ? '#0B1120' : box.color,
              border: `1px solid ${box.color}`,
            }}>
            {box.alert && '⚠ '}{box.status}
          </div>
        )}
      </div>
      {/* corner ticks */}
      {(['tl','tr','bl','br'] as const).map(c => (
        <div key={c} className="absolute" style={{
          width: 8, height: 8,
          top:    c.startsWith('t') ? -1 : undefined,
          bottom: c.startsWith('b') ? -1 : undefined,
          left:   c.endsWith('l')  ? -1 : undefined,
          right:  c.endsWith('r')  ? -1 : undefined,
          borderTop:    c.startsWith('t') ? `2.5px solid ${box.color}` : undefined,
          borderBottom: c.startsWith('b') ? `2.5px solid ${box.color}` : undefined,
          borderLeft:   c.endsWith('l')  ? `2.5px solid ${box.color}` : undefined,
          borderRight:  c.endsWith('r')  ? `2.5px solid ${box.color}` : undefined,
        }} />
      ))}
    </motion.div>
  );
}

function CameraFeed() {
  const prefersReduced = useReducedMotion();
  const [activityIdx, setActivityIdx] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setActivityIdx(i => (i + 1) % 4), 2200);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const activityLog = [
    { time: '14:32:08', msg: 'E-002 · Zone A — unusual posture detected', color: '#FF6B6B' },
    { time: '14:32:02', msg: 'E-005 left Zone B → entered Zone C',         color: '#00D4FF' },
    { time: '14:31:55', msg: '7 employees identified across 4 zones',      color: '#96CEB4' },
    { time: '14:31:41', msg: 'Workspace compliance verified · 98%',        color: '#96CEB4' },
  ];

  // Office-wide employee roster (this camera sees 3, others are in adjacent zones)
  const ROSTER = [
    { id: 'E-001', zone: 'A', status: 'IN-FRAME',  state: 'NORMAL',          dot: '#96CEB4' },
    { id: 'E-002', zone: 'A', status: 'IN-FRAME',  state: 'UNUSUAL POSTURE', dot: '#FF6B6B', alert: true },
    { id: 'E-003', zone: 'A', status: 'IN-FRAME',  state: 'NORMAL',          dot: '#96CEB4' },
    { id: 'E-004', zone: 'B', status: 'TRACKED',   state: 'WORKING',         dot: '#00D4FF' },
    { id: 'E-005', zone: 'C', status: 'TRACKED',   state: 'WORKING',         dot: '#00D4FF' },
    { id: 'E-006', zone: 'B', status: 'BREAK',     state: 'IDLE 4m',         dot: '#FFEAA7' },
    { id: 'E-007', zone: 'D', status: 'TRACKED',   state: 'WORKING',         dot: '#00D4FF' },
  ];

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_0_60px_rgba(0,212,255,0.15)]">
      {/* Real office workspace video */}
      <video
        src="/cameras/office-workspace.mp4"
        autoPlay loop muted playsInline preload="auto"
        onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(0.4) contrast(1.08) brightness(0.92) saturate(0.55)' }}
        aria-hidden="true"
      />

      {/* CCTV vignette + tint */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(11,17,32,0) 45%, rgba(11,17,32,0.65) 100%)',
      }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.18), transparent 50%, rgba(108,99,255,0.12))',
      }} />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }} />

      {/* Subtle scan grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Vertical scan line */}
      {!prefersReduced && (
        <motion.div
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.6), transparent)' }}
          animate={{ left: ['0%', '100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
        />
      )}

      {/* Horizontal sweep */}
      {!prefersReduced && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,107,0.5), transparent)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        />
      )}

      {/* HUD corner brackets (overall frame) */}
      {(['tl','tr','bl','br'] as const).map(c => (
        <div key={c} className="absolute pointer-events-none" style={{
          width: 22, height: 22,
          top:    c.startsWith('t') ? 8 : undefined,
          bottom: c.startsWith('b') ? 8 : undefined,
          left:   c.endsWith('l')  ? 8 : undefined,
          right:  c.endsWith('r')  ? 8 : undefined,
          borderTop:    c.startsWith('t') ? '2px solid rgba(0,212,255,0.7)' : undefined,
          borderBottom: c.startsWith('b') ? '2px solid rgba(0,212,255,0.7)' : undefined,
          borderLeft:   c.endsWith('l')  ? '2px solid rgba(0,212,255,0.7)' : undefined,
          borderRight:  c.endsWith('r')  ? '2px solid rgba(0,212,255,0.7)' : undefined,
        }} />
      ))}

      {/* Detection boxes */}
      {HERO_BOXES.map((box, i) => (
        <HeroDetectionBox key={i} box={box} prefersReduced={prefersReduced} />
      ))}

      {/* Top bar — camera ID + REC + timecode */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded px-2 py-1 border border-white/10">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
              animate={!prefersReduced ? { opacity: [1, 0, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }} />
            <span className="text-[10px] font-mono text-white">REC</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-300/80 bg-black/40 backdrop-blur-sm rounded px-2 py-1 border border-white/10">
            CAM-014 · OFFICE-ZONE-A
          </span>
        </div>
        <motion.div
          className="flex items-center gap-1.5 bg-red-500/25 border border-red-400/60 rounded px-2.5 py-1 backdrop-blur-sm"
          animate={!prefersReduced ? { boxShadow: ['0 0 0 0 rgba(255,107,107,0.6)', '0 0 0 8px rgba(255,107,107,0)', '0 0 0 0 rgba(255,107,107,0)'] } : {}}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <span className="text-[10px] font-bold text-red-200 tracking-wider">UNUSUAL ACTIVITY</span>
        </motion.div>
      </div>

      {/* Right side — Employee roster panel */}
      <div className="absolute top-14 right-3 w-[168px] pointer-events-none">
        <div className="bg-black/65 backdrop-blur-md rounded-lg border border-cyan-400/30 p-2.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-cyan-300" />
              <span className="text-[9px] font-semibold text-cyan-300 tracking-wider">EMPLOYEES</span>
            </div>
            <span className="text-[9px] font-bold text-white">7/7</span>
          </div>
          <div className="space-y-1">
            {ROSTER.map((e, i) => (
              <motion.div key={e.id}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-1.5 text-[8px] leading-tight"
              >
                <motion.div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: e.dot }}
                  animate={e.alert && !prefersReduced ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1 }} />
                <span className="font-mono text-slate-200 font-bold">{e.id}</span>
                <span className="text-slate-500">Z-{e.zone}</span>
                <span className="ml-auto font-bold tracking-wide" style={{ color: e.dot }}>{e.state.length > 8 ? e.state.slice(0, 8) : e.state}</span>
              </motion.div>
            ))}
          </div>
          <div className="h-px bg-white/10 my-2" />
          {/* mini bar chart — anomaly score over time */}
          <div className="flex items-center gap-1.5 mb-1">
            <Brain className="w-2.5 h-2.5 text-cyan-300" />
            <span className="text-[8px] font-semibold text-cyan-300 tracking-wider">ANOMALY · HIGH</span>
          </div>
          <div className="flex items-end gap-px h-6">
            {[40, 55, 38, 62, 48, 70, 58, 85, 95, 78, 92, 88].map((v, i) => (
              <motion.div key={i}
                className="flex-1 rounded-t"
                style={{ background: v > 80 ? '#FF6B6B' : '#00D4FF', height: `${v}%` }}
                animate={!prefersReduced ? { height: [`${v}%`, `${Math.max(20, v - 20)}%`, `${v}%`] } : {}}
                transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom — Activity log + stats */}
      <div className="absolute bottom-0 left-0 right-0 pt-12 pb-3 px-4 bg-gradient-to-t from-black/85 via-black/60 to-transparent pointer-events-none">
        {/* live activity ticker */}
        <div className="mb-3 flex items-center gap-2">
          <Activity className="w-3 h-3 text-cyan-300" />
          <span className="text-[9px] font-semibold uppercase tracking-wider text-cyan-300">Live Detection Log</span>
        </div>
        <div className="space-y-1 mb-3 h-14 overflow-hidden">
          {activityLog.map((a, i) => (
            <motion.div key={i}
              className="flex items-center gap-2 text-[10px]"
              animate={{
                opacity: i === activityIdx ? 1 : 0.4,
                x: i === activityIdx ? 0 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-mono text-slate-500">{a.time}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: a.color }} />
              <span className="text-slate-200">{a.msg}</span>
            </motion.div>
          ))}
        </div>
        {/* stat tiles */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Users,    label: 'Monitored',  val: '7',     color: '#00D4FF' },
            { icon: Eye,      label: 'In Frame',   val: '3',     color: '#00D4FF' },
            { icon: AlertCircle, label: 'Anomalies',val: '1',    color: '#FF6B6B' },
            { icon: Shield,   label: 'Compliance', val: '98%',   color: '#96CEB4' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm rounded-md border border-white/10 px-2 py-1.5 flex items-center gap-1.5">
                <Icon className="w-3 h-3 flex-shrink-0" style={{ color: s.color }} />
                <div className="min-w-0">
                  <div className="text-[7px] uppercase tracking-wider text-slate-500 leading-none">{s.label}</div>
                  <div className="text-[11px] font-bold leading-tight" style={{ color: s.color }}>{s.val}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crosshair on the alert subject */}
      <div className="absolute pointer-events-none" style={{ top: '45%', left: '49%', transform: 'translate(-50%,-50%)' }}>
        <motion.div
          className="relative w-8 h-8"
          animate={!prefersReduced ? { rotate: [0, 360] } : {}}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        >
          <div className="absolute inset-0 border border-red-400/70 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-red-400/70" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-red-400/70" />
        </motion.div>
      </div>
    </div>
  );
}

export default function MonitoringHero() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#111827] to-[#0B1120]" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 right-1/3 w-[700px] h-[500px] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                <Camera className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span className="text-xs font-semibold text-[#00D4FF] uppercase tracking-wide">Vision AI</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ fontFamily: 'var(--font-space)' }}>
                <span className="text-white">Transform Your</span>
                <br />
                <span className="gradient-text">Cameras Into Intelligence</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Convert any existing IP camera into an AI-powered monitoring system. Real-time detection, intelligent alerts, and enterprise-grade compliance reporting — all without replacing hardware.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[
                { icon: Eye, title: 'Real-Time Detection', desc: 'AI-powered vision instantly identifies events, threats, and anomalies' },
                { icon: AlertCircle, title: 'Smart Alerts', desc: 'Configurable notifications with intelligent escalation rules' },
                { icon: Shield, title: 'Compliance Ready', desc: 'Automated audit trails and regulatory reporting built-in' },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-[#00D4FF]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-3.5 h-3.5 text-[#00D4FF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{f.title}</div>
                    <div className="text-xs text-slate-500">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] hover:shadow-lg hover:shadow-[#00D4FF]/20 transition-all"
            >
              Start Monitoring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right — Camera feed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CameraFeed />
          </motion.div>
        </div>

        {/* Core capabilities grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>
              Core Capabilities
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Enterprise-grade monitoring features designed for scale, security, and compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MonitoringCard icon={Camera} title="Plug-and-Play" desc="Works with any existing IP camera. Zero hardware changes needed." delay={0} />
            <MonitoringCard icon={TrendingUp} title="Real-Time Analytics" desc="Live heatmaps, occupancy tracking, and behavioral analysis." delay={0.1} />
            <MonitoringCard icon={Shield} title="Multi-Camera Management" desc="Unlimited sites and cameras with unified cross-location tracking." delay={0.2} />
            <MonitoringCard icon={AlertCircle} title="Instant Alerts" desc="SMS, email, and dashboard notifications with escalation rules." delay={0.3} />
            <MonitoringCard icon={CheckCircle2} title="Event Search" desc="AI-indexed video clips searchable by type, time, and zone." delay={0.4} />
            <MonitoringCard icon={TrendingUp} title="Compliance Reports" desc="Automated documentation and audit trails for regulators." delay={0.5} />
          </div>
        </motion.div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>
              Intelligence for Every Environment
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Workplace Safety', metric: '80%', label: 'Incident Reduction' },
              { title: 'Retail Analytics', metric: '45%', label: 'Foot Traffic Insights' },
              { title: 'Logistics', metric: '99%', label: 'Dock Accuracy' },
              { title: 'Security', metric: '24/7', label: 'Intrusion Detection' },
            ].map((use, i) => (
              <motion.div
                key={use.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/5 text-center hover:border-[#00D4FF]/30 transition-all"
              >
                <h4 className="font-semibold text-white mb-3">{use.title}</h4>
                <div className="text-2xl font-extrabold gradient-text mb-1">{use.metric}</div>
                <div className="text-xs text-slate-500">{use.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
