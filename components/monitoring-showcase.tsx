'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Activity, TriangleAlert as AlertTriangle, Eye, TrendingUp } from 'lucide-react';

function AnalyticsCard({ stat, color, delay }: { stat: { label: string; value: string }; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-4 border border-white/5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs text-slate-600 font-medium">{stat.label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{stat.value}</div>
    </motion.div>
  );
}

function LiveActivityFeed() {
  const [times, setTimes] = useState<number[]>([]);

  useEffect(() => {
    setTimes([12, 8, 23, 1].map(() => Math.floor(Math.random() * 60)));
  }, []);

  const activities = [
    { type: 'alert', msg: 'Unauthorized access detected — Main Entrance', color: '#FF6B6B' },
    { type: 'info', msg: 'High occupancy zone detected — Area C', color: '#4ECDC4' },
    { type: 'success', msg: 'PPE compliance verified — 247 workers', color: '#96CEB4' },
    { type: 'warning', msg: 'Movement detected in restricted area', color: '#FFEAA7' },
  ];

  return (
    <div className="glass rounded-2xl border border-white/8 p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-[#00D4FF]" />
        <h4 className="font-semibold text-white text-sm">Live Activity Feed</h4>
      </div>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3 items-start pb-3 border-b border-white/5 last:border-0"
          >
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300 leading-tight">{a.msg}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">{times[i] ?? 0}s ago</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function MonitoringShowcase() {
  const [activeTab, setActiveTab] = useState('live');

  const stats = [
    { label: 'Active Cameras', value: '247', color: '#00D4FF' },
    { label: 'AI Detections', value: '1.2K', color: '#6C63FF' },
    { label: 'Alerts Today', value: '8', color: '#FF6B6B' },
    { label: 'Uptime', value: '99.9%', color: '#96CEB4' },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#0B1120] to-[#0B1120]" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#6C63FF]/4 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="tag-pill inline-block mb-4">Platform Overview</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5" style={{ fontFamily: 'var(--font-space)' }}>
            <span className="text-white">Enterprise Monitoring</span>
            <br />
            <span className="gradient-text">Command Center</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A unified platform for managing AI-powered monitoring across unlimited cameras and locations.
          </p>
        </motion.div>

        {/* Dashboard showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-slate-500 font-mono">nexus-ai.monitoring.cloud</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">LIVE</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 px-6 py-4 border-b border-white/5">
            {['Live View', 'Analytics', 'Alerts', 'Reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-xs font-semibold uppercase tracking-wider pb-2 transition-all border-b-2 ${
                  activeTab === tab.toLowerCase()
                    ? 'text-[#00D4FF] border-[#00D4FF]'
                    : 'text-slate-600 border-transparent hover:text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <AnalyticsCard key={stat.label} stat={stat} color={stat.color} delay={i * 0.1} />
              ))}
            </div>

            {/* Main grid */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Camera grid */}
              <div className="lg:col-span-2 space-y-4">
                <div className="text-sm font-semibold text-white mb-3">Multi-Camera Live Feed</div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-video rounded-xl overflow-hidden glass border border-white/5 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900" />
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,212,255,0.05) 25%, rgba(0,212,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,212,255,0.05) 75%, rgba(0,212,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,212,255,0.05) 25%, rgba(0,212,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,212,255,0.05) 75%, rgba(0,212,255,0.05) 76%, transparent 77%, transparent)',
                        backgroundSize: '40px 40px'
                      }} />
                      <div className="absolute top-2 left-2 text-[9px] text-slate-500 font-mono">Camera {i}</div>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-20"
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <LiveActivityFeed />
            </div>

            {/* Bottom metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {[
                { icon: Eye, label: 'Objects Tracked', val: '2,847' },
                { icon: AlertTriangle, label: 'Alerts Triggered', val: '23' },
                { icon: TrendingUp, label: 'Occupancy Peak', val: '94%' },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-white/3 border border-white/5">
                    <Icon className="w-4 h-4 text-[#00D4FF] flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-600">{m.label}</div>
                      <div className="text-sm font-bold text-white">{m.val}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Real-Time Processing',
              desc: 'Sub-second AI inference on edge hardware or cloud',
              icon: '⚡',
            },
            {
              title: 'Unlimited Scalability',
              desc: 'Add cameras and locations without system upgrades',
              icon: '📈',
            },
            {
              title: 'Full Compliance',
              desc: 'Data privacy, audit trails, and regulatory compliance',
              icon: '✓',
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass rounded-xl p-5 border border-white/5 text-center"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-semibold text-white text-sm mb-2">{f.title}</h4>
              <p className="text-xs text-slate-500">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
