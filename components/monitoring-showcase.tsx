'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Activity, TriangleAlert as AlertTriangle, Eye, TrendingUp } from 'lucide-react';

// ── per-camera config ────────────────────────────────────────────────
interface BoxDef { top: string; left: string; w: string; h: string; color: string; label: string; conf?: string; pulse?: boolean }
interface CamConfig {
  id: number;
  name: string;
  location: string;
  status: 'LIVE' | 'ALERT' | 'OK';
  statusColor: string;
  boxes: BoxDef[];
  scanColor: string;
  showScan?: boolean;
  /** Stock video (Pexels CDN — free for commercial use). Replace with self-hosted /public/cameras/*.mp4 for production. */
  videoSrc: string;
}

const CAM_CONFIGS: CamConfig[] = [
  {
    id: 1, name: 'Camera 1', location: 'Outdoor Zone — Garden', status: 'OK', statusColor: '#96CEB4',
    scanColor: '#0891b2',
    videoSrc: '/cameras/cam1-entrance.mp4',
    boxes: [
      { top: '8%',  left: '18%', w: '58%', h: '80%', color: '#0891b2',  label: 'PERSON', conf: '96%' },
      { top: '55%', left: '8%',  w: '22%', h: '30%', color: '#FFEAA7',  label: 'PLANT',  conf: '82%' },
    ],
  },
  {
    id: 2, name: 'Camera 2', location: 'Conference Room — Zone A', status: 'OK', statusColor: '#96CEB4',
    scanColor: '#059669',
    videoSrc: '/cameras/cam2-zone-a.mp4',
    boxes: [
      { top: '4%',  left: '32%', w: '34%', h: '38%', color: '#059669',  label: 'PERSON', conf: '94%' },
      { top: '40%', left: '4%',  w: '28%', h: '52%', color: '#059669',  label: 'PERSON', conf: '91%' },
      { top: '38%', left: '68%', w: '28%', h: '54%', color: '#059669',  label: 'PERSON', conf: '93%' },
      { top: '50%', left: '38%', w: '24%', h: '24%', color: '#FFEAA7',  label: 'LAPTOP', conf: '99%' },
    ],
  },
  {
    id: 3, name: 'Camera 3', location: 'Mobile Patrol — Unit 7', status: 'LIVE', statusColor: '#0891b2',
    scanColor: '#0891b2',
    videoSrc: '/cameras/cam3-dock.mp4',
    boxes: [
      { top: '52%', left: '14%', w: '68%', h: '44%', color: '#FFEAA7',  label: 'VEHICLE', conf: '99%' },
      { top: '60%', left: '72%', w: '20%', h: '28%', color: '#0891b2',  label: 'HAND',    conf: '87%' },
    ],
  },
  {
    id: 4, name: 'Camera 4', location: 'Perimeter — Highway', status: 'ALERT', statusColor: '#FF6B6B',
    scanColor: '#FF6B6B', showScan: true,
    videoSrc: '/cameras/cam4-perimeter.mp4',
    boxes: [
      { top: '38%', left: '60%', w: '24%', h: '38%', color: '#FF6B6B',  label: 'VEHICLE', conf: '98%', pulse: true },
      { top: '52%', left: '40%', w: '18%', h: '26%', color: '#0891b2',  label: 'VEHICLE', conf: '93%' },
      { top: '60%', left: '22%', w: '16%', h: '22%', color: '#0891b2',  label: 'VEHICLE', conf: '89%' },
      { top: '46%', left: '78%', w: '16%', h: '20%', color: '#0891b2',  label: 'VEHICLE', conf: '85%' },
    ],
  },
];

// corner-bracket decoration
function Brackets({ color }: { color: string }) {
  const s = { stroke: color, strokeWidth: 1.5, fill: 'none' };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* TL */}<polyline points="0,12 0,0 12,0" {...s} />
      {/* TR */}<polyline points="calc(100% - 12),0 100%,0 100%,12" {...s} style={{ ...s, stroke: color }} />
      {/* BL */}<polyline points="0,calc(100% - 12) 0,100% 12,100%" {...s} />
      {/* BR */}<polyline points="calc(100% - 12),100% 100%,100% 100%,calc(100% - 12)" {...s} />
    </svg>
  );
}

function DetectionBox({ box, prefersReduced, driftSeed }: { box: BoxDef; prefersReduced: boolean | null; driftSeed: number }) {
  const drift = prefersReduced ? {} : {
    x: [0, 3 + (driftSeed % 4), -2, 0],
    y: [0, -2, 2 + (driftSeed % 3), 0],
    ...(box.pulse ? { opacity: [0.75, 1, 0.75] } : {}),
  };
  return (
    <motion.div
      className="absolute border rounded-sm"
      style={{
        top: box.top, left: box.left, width: box.w, height: box.h,
        borderColor: box.color,
        boxShadow: `0 0 8px ${box.color}66, inset 0 0 8px ${box.color}20`,
      }}
      animate={drift}
      transition={{ repeat: Infinity, duration: 3 + driftSeed * 0.4, ease: 'easeInOut' }}
    >
      {/* label badge sitting on top edge */}
      <div className="absolute -top-3 left-0 text-[7px] font-bold px-1 py-0.5 rounded-sm leading-none whitespace-nowrap"
        style={{ background: box.color, color: '#0B1120', letterSpacing: '0.05em' }}>
        {box.label}{box.conf && <span className="opacity-70 ml-1">{box.conf}</span>}
      </div>
      {/* corner ticks */}
      {(['tl','tr','bl','br'] as const).map(c => (
        <div key={c} className="absolute" style={{
          width: 6, height: 6,
          top:    c.startsWith('t') ? -1 : undefined,
          bottom: c.startsWith('b') ? -1 : undefined,
          left:   c.endsWith('l')  ? -1 : undefined,
          right:  c.endsWith('r')  ? -1 : undefined,
          borderTop:    c.startsWith('t') ? `2px solid ${box.color}` : undefined,
          borderBottom: c.startsWith('b') ? `2px solid ${box.color}` : undefined,
          borderLeft:   c.endsWith('l')  ? `2px solid ${box.color}` : undefined,
          borderRight:  c.endsWith('r')  ? `2px solid ${box.color}` : undefined,
        }} />
      ))}
    </motion.div>
  );
}

function CameraFeedCard({ cam }: { cam: CamConfig }) {
  const prefersReduced = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ delay: cam.id * 0.1 }}
      className="aspect-video rounded-xl overflow-hidden glass border border-white/5 relative select-none"
    >
      {/* fallback gradient (shown until video loads or if it fails) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0B1120]" />

      {/* real CCTV-style video footage */}
      {videoOk && (
        <video
          src={cam.videoSrc}
          autoPlay loop muted playsInline preload="auto"
          onError={() => setVideoOk(false)}
          onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'grayscale(0.5) contrast(1.1) brightness(0.95) saturate(0.5)',
          }}
          aria-hidden="true"
        />
      )}

      {/* surveillance vignette + color tint */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(11,17,32,0) 50%, rgba(11,17,32,0.55) 100%)',
      }} />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{
        background: `linear-gradient(135deg, ${cam.scanColor}20, transparent 50%)`,
      }} />

      {/* film grain / noise overlay (CSS-only) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        mixBlendMode: 'overlay',
      }} />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      {/* vertical scan line */}
      {cam.showScan && !prefersReduced && (
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent, ${cam.scanColor}80, transparent)` }}
          animate={{ left: ['0%', '100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        />
      )}

      {/* horizontal sweep */}
      {!prefersReduced && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${cam.scanColor}60, transparent)` }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration: 3 + cam.id * 0.5, ease: 'linear' }}
        />
      )}

      {/* detection boxes */}
      {cam.boxes.map((box, i) => (
        <DetectionBox key={i} box={box} prefersReduced={prefersReduced} driftSeed={cam.id * 3 + i} />
      ))}

      {/* bottom-left: cam name + location */}
      <div className="absolute bottom-2 left-2 flex flex-col gap-0.5">
        <span className="text-[8px] font-mono text-slate-500">{cam.name}</span>
        <span className="text-[7px] text-slate-600">{cam.location}</span>
      </div>

      {/* top-right: status badge */}
      <div className="absolute top-2 right-2 flex items-center gap-1 rounded px-1.5 py-0.5"
        style={{ background: `${cam.statusColor}20`, border: `1px solid ${cam.statusColor}50` }}>
        <motion.div className="w-1 h-1 rounded-full" style={{ background: cam.statusColor }}
          animate={!prefersReduced ? { opacity: [1, 0.3, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1 }} />
        <span className="text-[7px] font-bold" style={{ color: cam.statusColor }}>{cam.status}</span>
      </div>

      {/* top-left: rec indicator */}
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500"
          animate={!prefersReduced ? { opacity: [1, 0, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.2, delay: cam.id * 0.3 }} />
        <span className="text-[7px] font-mono text-slate-500">REC</span>
      </div>

      {/* detection count badge */}
      <div className="absolute bottom-2 right-2 text-[8px] font-semibold"
        style={{ color: cam.scanColor }}>
        {cam.boxes.length} det.
      </div>
    </motion.div>
  );
}

function AnalyticsCard({ stat, color, delay }: { stat: { label: string; value: string }; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-4 border border-slate-200 bg-slate-50"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-cyan-600" />
        <h4 className="font-semibold text-slate-900 text-sm">Live Activity Feed</h4>
      </div>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-3 items-start pb-3 border-b border-slate-200 last:border-0"
          >
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-700 leading-tight">{a.msg}</p>
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
    { label: 'Active Cameras', value: '247', color: '#0891b2' },
    { label: 'AI Detections', value: '1.2K', color: '#059669' },
    { label: 'Alerts Today', value: '8', color: '#FF6B6B' },
    { label: 'Uptime', value: '99.9%', color: '#96CEB4' },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />

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
            <span className="text-slate-900">Enterprise Monitoring</span>
            <br />
            <span className="gradient-text">Command Center</span>
          </h2>
          <p className="text-slate-700 text-lg max-w-2xl mx-auto">
            A unified platform for managing AI-powered monitoring across unlimited cameras and locations.
          </p>
        </motion.div>

        {/* Dashboard showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
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
          <div className="flex gap-6 px-6 py-4 border-b border-slate-200">
            {['Live View', 'Analytics', 'Alerts', 'Reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-xs font-semibold uppercase tracking-wider pb-2 transition-all border-b-2 ${
                  activeTab === tab.toLowerCase()
                    ? 'text-teal-600 border-teal-600'
                    : 'text-slate-500 border-transparent hover:text-slate-700'
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
                <div className="text-sm font-semibold text-slate-900 mb-3">Multi-Camera Live Feed</div>
                <div className="grid grid-cols-2 gap-4">
                  {CAM_CONFIGS.map((cam) => (
                    <CameraFeedCard key={cam.id} cam={cam} />
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <LiveActivityFeed />
            </div>

            {/* Bottom metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
              {[
                { icon: Eye, label: 'Objects Tracked', val: '2,847' },
                { icon: AlertTriangle, label: 'Alerts Triggered', val: '23' },
                { icon: TrendingUp, label: 'Occupancy Peak', val: '94%' },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <Icon className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500">{m.label}</div>
                      <div className="text-sm font-bold text-slate-900">{m.val}</div>
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
              className="bg-white rounded-xl p-5 border border-slate-200 text-center shadow-sm"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-semibold text-slate-900 text-sm mb-2">{f.title}</h4>
              <p className="text-xs text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
