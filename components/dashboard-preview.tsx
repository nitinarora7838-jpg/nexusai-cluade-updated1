'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  SectionHeader,
  AccentIcon,
} from '@/components/marketing';
import {
  ACTIVITY_DOT,
  DASHBOARD_ACTIVITIES,
  DASHBOARD_BAR_DATA,
  DASHBOARD_BOTTOM_STATS,
  DASHBOARD_KPIS,
  DASHBOARD_MONTHS,
} from '@/lib/content/dashboard';
import { ACCENT_HEX, getAccentStyles, marketing } from '@/lib/theme';

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const prefersReduced = useReducedMotion();
  return (
    <div className="flex items-end gap-1 h-12 sm:h-16" role="presentation">
      {data.map((v, i) => (
        <motion.div
          key={i}
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

export default function DashboardPreview() {
  const [_tick, setTick] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  return (
    <MarketingSection id="dashboard" ariaLabelledBy="dashboard-heading">
      <SectionGridBg opacity={40} />
      <SectionBlurOrbs
        orbs={[
          {
            className:
              'top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] rounded-full bg-cyan-100/40 blur-[120px]',
          },
        ]}
      />

      <SectionContainer>
        <SectionHeader
          label="AI Dashboard"
          headingId="dashboard-heading"
          titlePrimary="Mission Control for"
          titleAccent="Enterprise Intelligence"
          description="A unified command center that gives executives real-time visibility into every AI-powered process."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${marketing.cardStatic} overflow-hidden`}
          role="img"
          aria-label="Nexus AI enterprise dashboard showing real-time KPIs, automation volume chart, and live activity feed"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div
              className="absolute left-0 right-0 h-px opacity-10"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT_HEX.primary}, transparent)`,
                animation: prefersReduced ? 'none' : 'scanLine 4s linear infinite',
              }}
            />
          </div>

          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
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
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Key performance indicators">
              {DASHBOARD_KPIS.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${marketing.cardMuted} p-3 sm:p-4`}
                >
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <dt className="text-xs text-slate-500 font-medium leading-tight">{kpi.label}</dt>
                    <span
                      className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.up ? 'text-emerald-600' : 'text-cyan-600'}`}
                      aria-label={`${kpi.change} change`}
                    >
                      {kpi.up ? (
                        <TrendingUp className="w-3 h-3" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="w-3 h-3" aria-hidden="true" />
                      )}
                      {kpi.change}
                    </span>
                  </div>
                  <dd className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">{kpi.value}</dd>
                  <MiniChart data={kpi.data} color={getAccentStyles(kpi.accent).hex} />
                </motion.div>
              ))}
            </dl>

            <div className="grid lg:grid-cols-3 gap-3 sm:gap-4">
              <div className={`lg:col-span-2 ${marketing.cardMuted} p-4 sm:p-5`}>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Automation Volume</h3>
                    <p className="text-xs text-slate-500">Last 12 months</p>
                  </div>
                  <div className="text-xs text-teal-600 font-semibold" aria-label="67% year-over-year growth">
                    +67% YoY
                  </div>
                </div>
                <BarChart data={DASHBOARD_BAR_DATA} color={ACCENT_HEX.primary} />
                <div className="flex justify-between mt-2" aria-hidden="true">
                  {DASHBOARD_MONTHS.map(m => (
                    <span key={m} className="text-[9px] text-slate-600">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${marketing.cardMuted} p-4 sm:p-5`}>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Activity className="w-4 h-4 text-cyan-600" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-slate-900">Live Activity</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {DASHBOARD_ACTIVITIES.map((a, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${ACTIVITY_DOT[a.type]}`}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-slate-700 leading-tight">{a.msg}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">
                          <time>{a.time}</time>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3" aria-label="Platform statistics">
              {DASHBOARD_BOTTOM_STATS.map(stat => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`${marketing.cardMuted} px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3`}
                  >
                    <AccentIcon accent={stat.accent} icon={Icon} size="sm" rounded="lg" />
                    <div>
                      <dd className="text-xs sm:text-sm font-bold text-slate-900">{stat.val}</dd>
                      <dt className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">{stat.label}</dt>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </motion.div>
      </SectionContainer>
    </MarketingSection>
  );
}
