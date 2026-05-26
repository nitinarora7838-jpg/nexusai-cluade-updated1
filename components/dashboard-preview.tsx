'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap, AlertTriangle, type LucideIcon } from 'lucide-react';

// ─── Sub-components ─────────────────────────────────────────────────
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max   = Math.max(...data);
  const min   = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const pts   = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarChart({ data, color }: { data: number[]; color: string }) {
  const max           = Math.max(...data);
  const prefersReduced = useReducedMotion();
  return (
    <div className="flex items-end gap-1 h-12 sm:h-16" role="presentation">
      {data.map((v, i) => (
        <motion.div key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={prefersReduced ? { duration: 0 } : { delay: i * 0.05, duration: 0.6 }}
          className="flex-1 rounded-sm min-h-[2px]"
          style={{ background: `linear-gradient(180deg, ${color}, ${color}60)` }}
        />
      ))}
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────
interface KPI { label: string; value: string; change: string; up: boolean; data: number[]; color: string; }
interface ActivityItem { type: 'success' | 'info' | 'warning'; msg: string; time: string; }
interface StatItem { label: string; val: string; color: string; icon: LucideIcon; }

const KPIs: KPI[] = [
  { label: 'Active AI Agents',      value: '247',    change: '+12',   up: true,  data: [40,45,42,55,60,58,72,68,80,90,85,95],          color: '#00D4FF' },
  { label: 'Tasks Automated Today', value: '18,492', change: '+8.3%', up: true,  data: [200,240,210,280,300,290,350,340,400,380,420,440],color: '#6C63FF' },
  { label: 'Avg Response Time',     value: '124ms',  change: '-18%',  up: false, data: [200,180,190,170,160,165,150,145,135,130,128,124],color: '#00D4FF' },
  { label: 'Cost Savings (MTD)',    value: '$2.4M',  change: '+23%',  up: true,  data: [50,80,100,120,140,160,180,190,210,220,235,240],  color: '#6C63FF' },
];

const ACTIVITIES: ActivityItem[] = [
  { type: 'success', msg: 'Payroll batch processed — 8,200 employees',          time: '2s ago' },
  { type: 'info',    msg: 'Workflow "Invoice Approval" triggered by CRM event', time: '8s ago' },
  { type: 'success', msg: 'AI report generated: Q4 Financial Summary',          time: '23s ago'},
  { type: 'warning', msg: 'Anomaly detected in ERP sync — auto-resolved',       time: '1m ago' },
  { type: 'info',    msg: 'New AI agent deployed to support queue',              time: '2m ago' },
  { type: 'success', msg: 'HR onboarding workflow completed: 12 new employees', time: '4m ago' },
];

const BOTTOM_STATS: StatItem[] = [
  { label: 'Workflows Active', val: '1,247', color: '#00D4FF', icon: Zap         },
  { label: 'AI Agents Online', val: '247',   color: '#6C63FF', icon: Activity    },
  { label: 'Data Points / sec',val: '48K',   color: '#00D4FF', icon: TrendingUp  },
  { label: 'Alerts Resolved',  val: '99.8%', color: '#6C63FF', icon: AlertTriangle },
];

const BAR_DATA    = [30, 50, 40, 70, 60, 80, 75, 90, 85, 95, 88, 100];
const MONTHS      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ACTIVITY_DOT: Record<ActivityItem['type'], string> = {
  success: 'bg-green-400',
  warning: 'bg-yellow-400',
  info:    'bg-[#00D4FF]',
};

// ─── Component ─────────────────────────────────────────────────────
export default function DashboardPreview() {
  const [_tick, setTick] = useState(0);
  const prefersReduced   = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <section id="dashboard" aria-labelledby="dashboard-heading" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#00D4FF]/3 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <div className="tag-pill mb-4">AI Dashboard</div>
          <h2 id="dashboard-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
            <span className="text-white">Mission Control for</span><br />
            <span className="gradient-text">Enterprise Intelligence</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            A unified command center that gives executives real-time visibility into every AI-powered process.
          </p>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative glass-strong rounded-2xl border border-white/10 overflow-hidden"
          role="img" aria-label="Nexus AI enterprise dashboard showing real-time KPIs, automation volume chart, and live activity feed">

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute left-0 right-0 h-px opacity-10"
              style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)', animation: prefersReduced ? 'none' : 'scanLine 4s linear infinite' }} />
          </div>

          {/* Titlebar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/70" />
              </div>
              <span className="text-xs text-slate-500 font-mono hidden sm:block">nexus-ai.dashboard.live</span>
            </div>
            <div className="flex items-center gap-2" aria-label="Dashboard status: Live">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-glow" aria-hidden="true" />
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* KPIs */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Key performance indicators">
              {KPIs.map((kpi, i) => (
                <motion.div key={kpi.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-3 sm:p-4 border border-white/5">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <dt className="text-xs text-slate-500 font-medium leading-tight">{kpi.label}</dt>
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.up ? 'text-green-400' : 'text-[#00D4FF]'}`} aria-label={`${kpi.change} change`}>
                      {kpi.up ? <TrendingUp className="w-3 h-3" aria-hidden="true" /> : <TrendingDown className="w-3 h-3" aria-hidden="true" />}
                      {kpi.change}
                    </span>
                  </div>
                  <dd className="text-lg sm:text-xl font-extrabold text-white mb-2">{kpi.value}</dd>
                  <MiniChart data={kpi.data} color={kpi.color} />
                </motion.div>
              ))}
            </dl>

            {/* Main row */}
            <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Bar chart */}
              <div className="lg:col-span-2 glass rounded-xl border border-white/5 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Automation Volume</h3>
                    <p className="text-xs text-slate-500">Last 12 months</p>
                  </div>
                  <div className="text-xs text-[#00D4FF] font-semibold" aria-label="67% year-over-year growth">+67% YoY</div>
                </div>
                <BarChart data={BAR_DATA} color="#00D4FF" />
                <div className="flex justify-between mt-2" aria-hidden="true">
                  {MONTHS.map(m => <span key={m} className="text-[9px] text-slate-600">{m}</span>)}
                </div>
              </div>

              {/* Activity feed */}
              <div className="glass rounded-xl border border-white/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Activity className="w-4 h-4 text-[#00D4FF]" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-white">Live Activity</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {ACTIVITIES.map((a, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${ACTIVITY_DOT[a.type]}`} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-slate-300 leading-tight">{a.msg}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5"><time>{a.time}</time></p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom stats */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3" aria-label="Platform statistics">
              {BOTTOM_STATS.map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-white/5 flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${stat.color}18` }} aria-hidden="true">
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <dd className="text-xs sm:text-sm font-bold text-white">{stat.val}</dd>
                      <dt className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">{stat.label}</dt>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
