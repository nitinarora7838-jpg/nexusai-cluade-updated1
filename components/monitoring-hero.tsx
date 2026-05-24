'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Camera, CircleAlert as AlertCircle, Eye, Shield, TrendingUp, CircleCheck as CheckCircle2, ArrowRight } from 'lucide-react';

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

function CameraFeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass border border-white/10">
      {/* Mock camera feed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,212,255,0.05) 25%, rgba(0,212,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,212,255,0.05) 75%, rgba(0,212,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,212,255,0.05) 25%, rgba(0,212,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,212,255,0.05) 75%, rgba(0,212,255,0.05) 76%, transparent 77%, transparent)',
        backgroundSize: '50px 50px'
      }} />

      {/* Detection boxes animated */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute top-8 left-8 w-32 h-24 border-2 border-[#00D4FF] rounded-lg"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
        className="absolute top-1/3 right-1/4 w-28 h-20 border-2 border-[#6C63FF] rounded-lg"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.6 }}
        className="absolute bottom-8 right-8 w-40 h-16 border-2 border-[#00D4FF] rounded-lg"
      />

      {/* Alert indicator */}
      <motion.div
        className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-lg px-3 py-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-xs font-semibold text-red-300">Alert</span>
      </motion.div>

      {/* Info cards overlay */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-lg p-3 border border-white/10">
            <div className="text-xs text-slate-500 mb-1">Detections</div>
            <div className="text-lg font-bold text-[#00D4FF]">8</div>
          </div>
          <div className="glass rounded-lg p-3 border border-white/10">
            <div className="text-xs text-slate-500 mb-1">Alerts</div>
            <div className="text-lg font-bold text-red-400">2</div>
          </div>
          <div className="glass rounded-lg p-3 border border-white/10">
            <div className="text-xs text-slate-500 mb-1">Status</div>
            <div className="text-lg font-bold text-green-400">Live</div>
          </div>
        </div>
      </motion.div>
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
