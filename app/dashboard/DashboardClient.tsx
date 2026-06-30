'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Shield, Bell, BarChart2, Settings, LayoutDashboard,
  AlertTriangle, CheckCircle2, Users, Activity, Search, Zap,
  Brain, AlertCircle, FileText, Menu, Filter, Download,
  ChevronRight, RefreshCw, Info, Cpu, MapPin,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────
type AlertType = 'critical' | 'warning' | 'info';
type CamStatus = 'recording' | 'online' | 'offline';

interface CamData {
  id: string;
  name: string;
  zone: string;
  src: string;
  isVideo: boolean;
  status: CamStatus;
  persons: number;
  events: number;
  compliance: number;
  alert?: string;
}

interface AlertData {
  id: string;
  time: string;
  cam: string;
  type: AlertType;
  message: string;
  zone: string;
  resolved: boolean;
}

// ─── Static data ─────────────────────────────────────────────────
const CAMERAS: CamData[] = [
  { id: 'CAM-01', name: 'Main Entrance',  zone: 'Zone A',    src: '/cameras/cam1-entrance.mp4',  isVideo: true,  status: 'recording', persons: 12, events: 47, compliance: 100 },
  { id: 'CAM-02', name: 'Zone A Floor',   zone: 'Zone A',    src: '/cameras/cam2-zone-a.mp4',    isVideo: true,  status: 'recording', persons: 7,  events: 23, compliance: 87,  alert: 'PPE VIOLATION' },
  { id: 'CAM-03', name: 'Loading Dock',   zone: 'Zone C',    src: '/cameras/cam3-dock.mp4',      isVideo: true,  status: 'recording', persons: 4,  events: 31, compliance: 94 },
  { id: 'CAM-04', name: 'Perimeter N',    zone: 'Perimeter', src: '/cameras/cam4-perimeter.mp4', isVideo: true,  status: 'recording', persons: 1,  events: 8,  compliance: 75,  alert: 'BREACH DETECTED' },
  { id: 'CAM-05', name: 'Warehouse A',    zone: 'Zone B',    src: '/cameras/cam5.jpg',           isVideo: false, status: 'online',    persons: 3,  events: 12, compliance: 100 },
  { id: 'CAM-06', name: 'Office Floor',   zone: 'Zone D',    src: '/cameras/cam6.jpg',           isVideo: false, status: 'online',    persons: 8,  events: 19, compliance: 96 },
  { id: 'CAM-07', name: 'Server Room',    zone: 'Secure',    src: '/cameras/cam7.jpg',           isVideo: false, status: 'online',    persons: 1,  events: 3,  compliance: 100 },
  { id: 'CAM-08', name: 'Parking Lot',    zone: 'External',  src: '/cameras/cam8.webp',          isVideo: false, status: 'online',    persons: 9,  events: 55, compliance: 91 },
  { id: 'CAM-09', name: 'Emergency Exit', zone: 'Zone B',    src: '/cameras/cam9.webp',          isVideo: false, status: 'online',    persons: 0,  events: 7,  compliance: 100 },
];

const ALERTS_INIT: AlertData[] = [
  { id: 'A001', time: '14:32:08', cam: 'CAM-02', type: 'critical', message: 'PPE violation — worker without helmet detected',       zone: 'Zone A',    resolved: false },
  { id: 'A002', time: '14:31:55', cam: 'CAM-04', type: 'critical', message: 'Perimeter breach — unauthorized access attempt',      zone: 'Perimeter', resolved: false },
  { id: 'A003', time: '14:29:40', cam: 'CAM-01', type: 'warning',  message: 'Crowd density threshold exceeded (14 persons)',       zone: 'Zone A',    resolved: false },
  { id: 'A004', time: '14:25:12', cam: 'CAM-03', type: 'info',     message: 'Forklift entered restricted pedestrian zone',         zone: 'Zone C',    resolved: true  },
  { id: 'A005', time: '14:20:33', cam: 'CAM-06', type: 'warning',  message: 'Worker idle duration exceeded limit (8+ minutes)',    zone: 'Zone D',    resolved: true  },
  { id: 'A006', time: '14:15:08', cam: 'CAM-08', type: 'info',     message: 'Vehicle dwell time exceeded 30-minute threshold',     zone: 'External',  resolved: true  },
  { id: 'A007', time: '14:08:21', cam: 'CAM-07', type: 'warning',  message: 'Unauthorized access attempt — server room door',      zone: 'Secure',    resolved: true  },
  { id: 'A008', time: '14:02:45', cam: 'CAM-05', type: 'info',     message: 'New employee profile registered in Zone B',           zone: 'Zone B',    resolved: true  },
];

const HOURLY = [
  { h: '07', v: 12 }, { h: '08', v: 28 }, { h: '09', v: 45 },
  { h: '10', v: 38 }, { h: '11', v: 62 }, { h: '12', v: 51 },
  { h: '13', v: 74 }, { h: '14', v: 89 }, { h: '15', v: 67 },
  { h: '16', v: 43 }, { h: '17', v: 31 }, { h: '18', v: 19 },
];

const ZONES = [
  { id: 'Zone A',    cams: 2, persons: 19, compliance: 93, alert: true  },
  { id: 'Zone B',    cams: 2, persons: 3,  compliance: 100, alert: false },
  { id: 'Zone C',    cams: 1, persons: 4,  compliance: 94,  alert: false },
  { id: 'Zone D',    cams: 1, persons: 8,  compliance: 96,  alert: false },
  { id: 'Perimeter', cams: 1, persons: 1,  compliance: 75,  alert: true  },
  { id: 'Secure',    cams: 1, persons: 1,  compliance: 100, alert: false },
  { id: 'External',  cams: 1, persons: 9,  compliance: 91,  alert: false },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',    badge: 0 },
  { icon: Camera,          label: 'Live Cameras', badge: 0 },
  { icon: Bell,            label: 'Alerts',       badge: 3 },
  { icon: BarChart2,       label: 'Analytics',    badge: 0 },
  { icon: Shield,          label: 'Compliance',   badge: 0 },
  { icon: FileText,        label: 'Reports',      badge: 0 },
  { icon: Settings,        label: 'Settings',     badge: 0 },
];

// ─── Helpers ─────────────────────────────────────────────────────
function alertColor(t: AlertType) {
  return t === 'critical' ? '#FF6B6B' : t === 'warning' ? '#FFEAA7' : '#00D4FF';
}
function alertBg(t: AlertType) {
  return t === 'critical' ? 'rgba(255,107,107,0.07)' : t === 'warning' ? 'rgba(255,234,167,0.07)' : 'rgba(0,212,255,0.07)';
}
function complianceColor(v: number) {
  return v >= 95 ? '#96CEB4' : v >= 85 ? '#FFEAA7' : '#FF6B6B';
}

// ─── HUD Corner Brackets ─────────────────────────────────────────
function HudCorners({ color = 'rgba(0,212,255,0.55)', size = 10, offset = 5 }: { color?: string; size?: number; offset?: number }) {
  return (
    <>
      {(['tl', 'tr', 'bl', 'br'] as const).map(c => (
        <div key={c} className="absolute pointer-events-none" style={{
          width: size, height: size,
          top:    c.startsWith('t') ? offset : undefined,
          bottom: c.startsWith('b') ? offset : undefined,
          left:   c.endsWith('l')   ? offset : undefined,
          right:  c.endsWith('r')   ? offset : undefined,
          borderTop:    c.startsWith('t') ? `1.5px solid ${color}` : undefined,
          borderBottom: c.startsWith('b') ? `1.5px solid ${color}` : undefined,
          borderLeft:   c.endsWith('l')   ? `1.5px solid ${color}` : undefined,
          borderRight:  c.endsWith('r')   ? `1.5px solid ${color}` : undefined,
        }} />
      ))}
    </>
  );
}

// ─── Camera Card ─────────────────────────────────────────────────
function CameraCard({ cam, selected, onClick }: { cam: CamData; selected: boolean; onClick: () => void }) {
  const hasAlert = !!cam.alert;
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        selected
          ? 'ring-2 ring-[#00D4FF]/60 shadow-[0_0_24px_rgba(0,212,255,0.22)]'
          : hasAlert
          ? 'ring-1 ring-[#FF6B6B]/50 shadow-[0_0_16px_rgba(255,107,107,0.15)]'
          : 'ring-1 ring-white/8 hover:ring-white/15'
      }`}
    >
      <div className="relative aspect-video bg-[#060d1a]">
        {cam.isVideo ? (
          <video
            src={cam.src}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'grayscale(0.45) contrast(1.06) brightness(0.88) saturate(0.55)' }}
          />
        ) : (
          <img
            src={cam.src}
            alt={cam.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'grayscale(0.45) contrast(1.06) brightness(0.82) saturate(0.55)' }}
          />
        )}

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 38%, rgba(6,13,26,0.78) 100%)',
        }} />

        {/* Scan grid overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        <HudCorners />

        {/* Top bar */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: cam.status === 'recording' ? '#FF4444' : '#00D4FF' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <span className="text-[7px] font-mono font-bold tracking-widest text-white/70 uppercase">
              {cam.status === 'recording' ? 'REC' : cam.status}
            </span>
          </div>
          <span className="text-[7px] font-mono text-[#00D4FF]/85 bg-black/55 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#00D4FF]/20">
            {cam.id}
          </span>
        </div>

        {/* Alert badge */}
        {hasAlert && (
          <motion.div
            className="absolute top-7 right-2 flex items-center gap-1 bg-red-500/20 border border-red-400/60 rounded px-1.5 py-0.5 backdrop-blur-sm pointer-events-none"
            animate={{ boxShadow: ['0 0 0 0 rgba(255,107,107,0.5)', '0 0 0 5px rgba(255,107,107,0)', '0 0 0 0 rgba(255,107,107,0)'] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
            <span className="text-[6px] font-bold text-red-200 tracking-wider">{cam.alert}</span>
          </motion.div>
        )}

        {/* Bottom info strip */}
        <div className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 pt-8 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] font-semibold text-white leading-tight">{cam.name}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-2 h-2 text-slate-500" />
                <span className="text-[8px] text-slate-400">{cam.zone}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[8px]">
              <div className="flex items-center gap-0.5 text-[#00D4FF]">
                <Users className="w-2 h-2" />
                <span className="font-mono font-bold">{cam.persons}</span>
              </div>
              <div className="flex items-center gap-0.5" style={{ color: complianceColor(cam.compliance) }}>
                <Shield className="w-2 h-2" />
                <span className="font-mono font-bold">{cam.compliance}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, pulse }: {
  icon: React.ElementType; label: string; value: string; sub: string; color: string; pulse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 border border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-[0.08] pointer-events-none"
        style={{ background: color, transform: 'translate(35%, -35%)' }} />
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon className="w-4.5 h-4.5" style={{ color }} />
        </div>
        {pulse && (
          <motion.div
            className="w-2 h-2 rounded-full mt-1"
            style={{ background: color }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
        )}
      </div>
      <div className="text-2xl font-extrabold text-white mb-0.5" style={{ fontFamily: 'var(--font-space)' }}>{value}</div>
      <div className="text-[11px] font-medium text-slate-400">{label}</div>
      <div className="text-[10px] mt-1" style={{ color: `${color}90` }}>{sub}</div>
    </motion.div>
  );
}

// ─── Alert Row ───────────────────────────────────────────────────
function AlertRow({ alert, onResolve }: { alert: AlertData; onResolve: (id: string) => void }) {
  const color = alertColor(alert.type);
  const Icon = alert.type === 'critical' ? AlertCircle : alert.type === 'warning' ? AlertTriangle : Info;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: alert.resolved ? 0.45 : 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="relative p-2.5 rounded-lg border border-white/5"
      style={{ background: alertBg(alert.type) }}
    >
      <div className="flex items-start gap-2">
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: `${color}18` }}>
          <Icon className="w-3 h-3" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold text-white leading-snug">{alert.message}</div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[8px] font-mono text-slate-500">{alert.time}</span>
            <span className="text-[8px] px-1.5 py-0.5 rounded font-mono font-semibold"
              style={{ background: `${color}15`, color }}>
              {alert.cam}
            </span>
            <span className="text-[8px] text-slate-500">{alert.zone}</span>
          </div>
        </div>
        {!alert.resolved ? (
          <button
            onClick={() => onResolve(alert.id)}
            className="flex-shrink-0 text-[7px] font-semibold px-2 py-1 rounded border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all uppercase tracking-wider"
          >
            Resolve
          </button>
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────
export default function DashboardClient() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState(0);
  const [selectedCam, setSelectedCam] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>(ALERTS_INIT);
  const [alertFilter, setAlertFilter] = useState<'all' | AlertType>('all');
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const resolveAlert = (id: string) =>
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));

  const activeAlerts = alerts.filter(a => !a.resolved);
  const filteredAlerts = alertFilter === 'all' ? alerts : alerts.filter(a => a.type === alertFilter);

  const totalPersons  = CAMERAS.reduce((s, c) => s + c.persons, 0);
  const totalEvents   = CAMERAS.reduce((s, c) => s + c.events, 0);
  const avgCompliance = Math.round(CAMERAS.reduce((s, c) => s + c.compliance, 0) / CAMERAS.length);

  return (
    <div className="flex h-screen bg-[#0B1120] overflow-hidden text-white" style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>

      {/* ─── Sidebar ──────────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-30 bg-black/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              key="sidebar"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="fixed lg:relative z-40 w-64 h-full flex-shrink-0 flex flex-col border-r border-white/6"
              style={{ background: 'rgba(5,10,22,0.97)', backdropFilter: 'blur(24px)' }}
            >
              {/* Logo */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/6">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 flex-shrink-0">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#6C63FF] opacity-30 blur-md" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#00D4FF] via-[#3B82F6] to-[#6C63FF]" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent" />
                    <svg className="absolute inset-0 m-auto w-[18px] h-[18px] drop-shadow" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">
                      <span className="text-white">Nexus</span>
                      <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> AI</span>
                    </div>
                    <div className="text-[8px] font-semibold tracking-widest text-slate-500 uppercase mt-0.5">Monitoring Intel</div>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  const active = activeNav === i;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveNav(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                          ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge > 0 && (
                        <span className="text-[8px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center tabular-nums">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* System status */}
              <div className="px-3 pb-4 border-t border-white/6 pt-3">
                <div className="rounded-xl p-3 border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">System Status</span>
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'AI Engine',  val: 'ACTIVE',  color: '#00D4FF' },
                      { label: 'Edge Nodes', val: '9/9 UP',  color: '#96CEB4' },
                      { label: 'Cloud Sync', val: 'LIVE',    color: '#00D4FF' },
                      { label: 'Uptime SLA', val: '99.9%',   color: '#96CEB4' },
                    ].map(s => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="text-[9px] text-slate-500">{s.label}</span>
                        <span className="text-[9px] font-semibold font-mono" style={{ color: s.color }}>{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <header
          className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/6"
          style={{ background: 'rgba(11,17,32,0.97)', backdropFilter: 'blur(12px)' }}
        >
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 min-w-0 flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Nexus AI</span>
            <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
            <span className="font-semibold text-white truncate">AI Monitoring Intelligence</span>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/8 rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search cameras, zones, events…"
              className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-40"
            />
          </div>

          {/* Live clock */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] bg-[#00D4FF]/8 border border-[#00D4FF]/20 rounded-lg px-3 py-1.5 flex-shrink-0">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] flex-shrink-0"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span className="tabular-nums">{time || '00:00:00'}</span>
          </div>

          {/* Refresh */}
          <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Notification bell */}
          <button className="relative p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
            <Bell className="w-4 h-4" />
            {activeAlerts.length > 0 && (
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[7px] font-bold text-white flex items-center justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {activeAlerts.length}
              </motion.span>
            )}
          </button>

          {/* User avatar */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#6C63FF] flex items-center justify-center text-[10px] font-bold text-[#0B1120] flex-shrink-0">
            N
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* ─── KPI row ──────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              icon={Camera}
              label="Cameras Online"
              value={`${CAMERAS.filter(c => c.status !== 'offline').length}/${CAMERAS.length}`}
              sub="All sites nominal"
              color="#00D4FF"
            />
            <StatCard
              icon={Activity}
              label="Events Today"
              value={totalEvents.toString()}
              sub="+12% vs yesterday"
              color="#6C63FF"
            />
            <StatCard
              icon={AlertCircle}
              label="Active Alerts"
              value={activeAlerts.length.toString()}
              sub={`${activeAlerts.filter(a => a.type === 'critical').length} critical unresolved`}
              color="#FF6B6B"
              pulse={activeAlerts.length > 0}
            />
            <StatCard
              icon={Shield}
              label="Compliance Score"
              value={`${avgCompliance}%`}
              sub="Above industry average"
              color="#96CEB4"
            />
          </div>

          {/* ─── Main grid: cameras + right panel ─── */}
          <div className="grid lg:grid-cols-3 gap-4">

            {/* Camera feeds */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-white">Live Camera Feeds</h2>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 font-semibold tracking-wider">
                    {CAMERAS.filter(c => c.status !== 'offline').length} ACTIVE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="text-[10px] text-[#00D4FF] hover:text-white flex items-center gap-1 transition-colors">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 2×2 primary camera grid */}
              <div className="grid grid-cols-2 gap-3">
                {CAMERAS.slice(0, 4).map(cam => (
                  <CameraCard
                    key={cam.id}
                    cam={cam}
                    selected={selectedCam === cam.id}
                    onClick={() => setSelectedCam(prev => prev === cam.id ? null : cam.id)}
                  />
                ))}
              </div>

              {/* Additional cameras strip */}
              <div className="rounded-xl border border-white/5 p-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Additional Cameras</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {CAMERAS.slice(4).map(cam => (
                    <button
                      key={cam.id}
                      onClick={() => setSelectedCam(prev => prev === cam.id ? null : cam.id)}
                      className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                        selectedCam === cam.id
                          ? 'border-[#00D4FF]/40 bg-[#00D4FF]/6'
                          : 'border-white/5 hover:border-white/12 hover:bg-white/3'
                      }`}
                    >
                      <div className="relative w-9 h-7 rounded overflow-hidden flex-shrink-0 bg-[#060d1a]">
                        <img
                          src={cam.src}
                          alt={cam.id}
                          className="w-full h-full object-cover"
                          style={{ filter: 'grayscale(0.5) brightness(0.75)' }}
                        />
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full" style={{ background: '#00D4FF' }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[8px] font-semibold text-white truncate leading-tight">{cam.name}</div>
                        <div className="text-[7px] text-slate-500 font-mono">{cam.id}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="w-1 h-1 rounded-full bg-[#00D4FF]" />
                          <span className="text-[7px] text-slate-500 truncate">{cam.zone}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel: Alerts + Zone Status */}
            <div className="space-y-3 flex flex-col">

              {/* Alert feed */}
              <div className="glass rounded-xl border border-white/5 p-3 flex flex-col flex-1" style={{ minHeight: 0, maxHeight: '22rem' }}>
                <div className="flex items-center justify-between mb-2.5 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-white">Alert Feed</h2>
                    {activeAlerts.length > 0 && (
                      <motion.span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/12 text-red-400 border border-red-500/30 tracking-wider"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6 }}
                      >
                        {activeAlerts.length} LIVE
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {(['all', 'critical', 'warning', 'info'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setAlertFilter(f)}
                        className={`text-[7px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider transition-all ${
                          alertFilter === f
                            ? 'bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 space-y-1.5 pr-0.5">
                  <AnimatePresence>
                    {filteredAlerts.map(alert => (
                      <AlertRow key={alert.id} alert={alert} onResolve={resolveAlert} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Zone status */}
              <div className="glass rounded-xl border border-white/5 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-white">Zone Status</h2>
                  <span className="text-[9px] text-slate-500 font-mono">{totalPersons} persons tracked</span>
                </div>
                <div className="space-y-2.5">
                  {ZONES.map((zone, i) => (
                    <motion.div
                      key={zone.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: zone.alert ? '#FF6B6B' : '#96CEB4' }}
                        animate={zone.alert ? { opacity: [1, 0.3, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-semibold text-white truncate">{zone.id}</span>
                          <div className="flex items-center gap-2.5 flex-shrink-0">
                            <span className="text-[8px] text-slate-500 font-mono">{zone.persons}p · {zone.cams}cam</span>
                            <span className="text-[8px] font-bold font-mono" style={{ color: complianceColor(zone.compliance) }}>
                              {zone.compliance}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-0.5 rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: complianceColor(zone.compliance) }}
                            initial={{ width: 0 }}
                            animate={{ width: `${zone.compliance}%` }}
                            transition={{ duration: 0.9, delay: i * 0.07 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Activity chart ───────────────────────── */}
          <div className="glass rounded-xl border border-white/5 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Detection Activity</h2>
                <p className="text-[10px] text-slate-500 mt-0.5">Hourly event count across all cameras — today</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: 'linear-gradient(to top,#00D4FF,#6C63FF)' }} />
                    <span className="text-[9px] text-slate-400">Detections</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#FF6B6B]/70" />
                    <span className="text-[9px] text-slate-400">High Volume</span>
                  </div>
                </div>
                <button className="text-[9px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>

            <div className="flex items-end gap-1.5 h-28">
              {HOURLY.map((d, i) => {
                const pct = d.v;
                const isHigh = d.v > 80;
                const isCurrent = i === 7;
                return (
                  <motion.div
                    key={d.h}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    style={{ transformOrigin: 'bottom' }}
                    transition={{ duration: 0.55, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: `${pct}%`,
                          background: isHigh
                            ? 'linear-gradient(to top, rgba(255,107,107,0.9), rgba(255,150,150,0.6))'
                            : isCurrent
                            ? 'linear-gradient(to top, #00D4FF, #6C63FF)'
                            : 'linear-gradient(to top, rgba(30,45,71,0.9), rgba(42,63,95,0.7))',
                          boxShadow: isCurrent ? '0 0 10px rgba(0,212,255,0.4)' : isHigh ? '0 0 6px rgba(255,107,107,0.3)' : undefined,
                        }}
                      />
                    </div>
                    <span className="text-[7px] font-mono text-slate-600 flex-shrink-0">{d.h}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ─── AI metrics strip ─────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Brain,    label: 'AI Accuracy',     value: '99.2%',  color: '#00D4FF', sub: '±0.1% this week' },
              { icon: Zap,      label: 'Alert Response',   value: '<1s',    color: '#6C63FF', sub: 'Real-time processing' },
              { icon: Users,    label: 'People Tracked',   value: String(totalPersons), color: '#96CEB4', sub: 'Across all zones' },
              { icon: Cpu,      label: 'Model Version',    value: 'v4.2.1', color: '#FFEAA7', sub: 'Updated 2h ago' },
            ].map(s => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-3 border border-white/5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] text-slate-500 truncate">{s.label}</div>
                    <div className="text-lg font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-space)' }}>{s.value}</div>
                    <div className="text-[8px] truncate" style={{ color: `${s.color}80` }}>{s.sub}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ─── Footer ───────────────────────────────── */}
          <div className="flex items-center justify-between py-3 border-t border-white/5 text-[9px]">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#00D4FF] to-[#6C63FF]" />
                <svg viewBox="0 0 24 24" fill="white" className="absolute inset-0 m-auto w-3 h-3">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="text-slate-500">Nexus AI Monitoring Intelligence Dashboard</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <span>v2.4.1</span>
              <span>© 2025 Nexus AI</span>
              <a
                href="https://www.nexus-aisolution.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D4FF]/50 hover:text-[#00D4FF] transition-colors"
              >
                nexus-aisolution.com
              </a>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
