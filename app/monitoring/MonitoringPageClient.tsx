'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Camera, Shield, AlertTriangle, Eye,
  CheckCircle2, Activity, Users, Zap, Bell, FileText, Lock,
  HardHat, MapPin, Wifi, BarChart3, Calendar, Mail,
  type LucideIcon,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────
interface Metric  { value: number; suffix: string; label: string; sub: string; color: string; }
interface Feature { icon: LucideIcon; title: string; description: string; color: string; badge: string; points: string[]; }
interface Alert   { time: string; type: string; msg: string; zone: string; severity: 'high' | 'medium' | 'low'; }


// ─── Data ────────────────────────────────────────────────────────────
const METRICS: Metric[] = [
  { value: 48,   suffix: '',   label: 'Active Cameras',       sub: 'across all facilities',  color: '#00D4FF' },
  { value: 214,  suffix: '',   label: 'People Monitored',     sub: 'in real time, right now', color: '#6C63FF' },
  { value: 97.4, suffix: '%',  label: 'Facility Compliance',  sub: 'across all sites',        color: '#00D4FF' },
  { value: 5,    suffix: '',   label: 'Alerts Today',         sub: 'auto-escalated',          color: '#EF4444' },
  { value: 31,   suffix: '',   label: 'Incidents Prevented',  sub: 'this week',               color: '#10B981' },
  { value: 99.2, suffix: '%',  label: 'AI Accuracy',          sub: 'detection rate',          color: '#6C63FF' },
];

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: 'PPE & Safety Gear Detection',
    badge: 'Compliance',
    color: '#00D4FF',
    description: 'AI instantly identifies missing protective equipment — helmets, vests, gloves, masks — and triggers alerts before an incident occurs, across any facility type.',
    points: ['Sub-second detection', 'Works in low light', 'Multi-PPE classification', 'Auto-escalate violations'],
  },
  {
    icon: Lock,
    title: 'Virtual Perimeters & Intrusion Alerts',
    badge: 'Access Control',
    color: '#EF4444',
    description: 'Draw digital boundaries around any restricted area — server rooms, labs, loading docks, operating theatres. Any unauthorised entry triggers an instant alert with identity and timestamp.',
    points: ['No hardware sensors needed', 'Instant breach alerts', 'Identity-linked events', 'Full tamper-proof audit trail'],
  },
  {
    icon: Users,
    title: 'Spatial Analytics & Incident Prevention',
    badge: 'Safety',
    color: '#6C63FF',
    description: 'Continuous monitoring of crowd density, occupancy thresholds, slip-and-fall risk, and unusual behavioural patterns to prevent incidents across offices, hospitals, and campuses.',
    points: ['Slip & fall risk detection', 'Crowd density alerts', 'Occupancy tracking', 'Near-miss event logging'],
  },
  {
    icon: Bell,
    title: 'Real-Time Multi-Channel Alerts',
    badge: 'Operations',
    color: '#F59E0B',
    description: 'Instant notifications delivered to the right person, via the right channel — SMS, email, Slack, Teams, or in-app push — the moment any security or safety event is detected.',
    points: ['SMS + email + push', 'Slack & Teams integration', 'Priority-based escalation', 'Smart suppression rules'],
  },
  {
    icon: FileText,
    title: 'Enterprise Compliance & Audit Trails',
    badge: 'Legal & HR',
    color: '#10B981',
    description: 'AI-generated incident reports and tamper-proof audit logs that satisfy healthcare, corporate, insurance, and industrial regulatory requirements — produced automatically, every day.',
    points: ['OSHA / HSE / ISO ready', 'Healthcare HIPAA-aligned', 'Auto-generated reports', 'Regulatory dashboards'],
  },
  {
    icon: BarChart3,
    title: 'Unified Multi-Camera Intelligence',
    badge: 'Enterprise Platform',
    color: '#6C63FF',
    description: 'One AI brain synchronised across 500+ cameras, any brand, any protocol. Cross-camera person tracking follows individuals and events seamlessly across your entire estate.',
    points: ['500+ cameras, any brand', 'Cross-facility tracking', 'RTSP / ONVIF / cloud feeds', 'Edge + cloud hybrid'],
  },
];

const LIVE_ALERTS: Alert[] = [
  { time: '14:23:07', type: 'TAILGATING ALERT',   msg: 'Unauthorised piggyback entry detected behind badge holder',  zone: 'Corporate HQ — Main Lobby',          severity: 'high'   },
  { time: '14:21:44', type: 'FALL RISK DETECTED',  msg: 'Patient movement anomaly near wet floor — no staff nearby', zone: 'City Hospital — Ward 3 Corridor',     severity: 'high'   },
  { time: '14:19:31', type: 'INTRUSION ALERT',     msg: 'Unauthorised access to restricted server room',             zone: 'Office Tower — IT Floor, Level 8',    severity: 'high'   },
  { time: '14:17:08', type: 'BLOCKED EXIT',        msg: 'Emergency exit obstruction detected — pallet in pathway',   zone: 'Warehouse — Zone B Loading Dock',     severity: 'medium' },
  { time: '14:15:52', type: 'OCCUPANCY BREACH',    msg: 'Maximum room capacity exceeded — fire safety threshold',    zone: 'School Campus — Main Auditorium',     severity: 'low'    },
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
    const dots: Dot[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.22)';
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const a = 0.1 * (1 - dist / 150);
            const g = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
            g.addColorStop(0, `rgba(0,212,255,${a})`);
            g.addColorStop(1, `rgba(108,99,255,${a})`);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.5;
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

// ─── Animated Counter ────────────────────────────────────────────────
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

// ─── HD Image Camera View — no filter, accurate AI detection boxes ────
interface CamBox {
  id: string; label: string; color: string;
  x: number; y: number; w: number; h: number;
  conf: number; alert?: boolean;
}
interface Camera {
  src: string; name: string; zone: string; id: string;
  boxes: CamBox[];
  objectPosition?: string;
}

const CAMERAS: Camera[] = [
  {
    // cam1: 2 workers on brickwork — front worker yellow helmet, back worker blue helmet (both compliant)
    src: '/cameras/cam1.jpg',
    name: 'CAM-01 · ENTRANCE',
    zone: 'Zone A — Main Gate',
    id: 'A01',
    objectPosition: 'center center',
    boxes: [
      { id: 'w1', label: 'Helmet Detected ✓', color: '#22C55E', x: 42, y: 8,  w: 42, h: 82, conf: 99 },
      { id: 'w2', label: 'Helmet Detected ✓', color: '#22C55E', x: 6,  y: 30, w: 20, h: 36, conf: 94 },
      { id: 'eq', label: 'Power Tool Active',  color: '#6C63FF', x: 43, y: 62, w: 25, h: 28, conf: 95 },
    ],
  },
  {
    // cam2: 5+ workers on rebar concrete slab — all workers have helmets + hi-vis (fully compliant)
    src: '/cameras/cam2.jpg',
    name: 'CAM-02 · ZONE-A',
    zone: 'Zone A — Main Work Area',
    id: 'A02',
    objectPosition: 'center center',
    boxes: [
      { id: 'w1', label: 'Helmet Detected ✓', color: '#22C55E', x: 20, y: 12, w: 24, h: 68, conf: 98 },
      { id: 'w2', label: 'Helmet Detected ✓', color: '#22C55E', x: 48, y: 8,  w: 24, h: 72, conf: 97 },
      { id: 'w3', label: 'Helmet Detected ✓', color: '#22C55E', x: 74, y: 20, w: 20, h: 55, conf: 93 },
      { id: 'w4', label: 'Worker Detected',   color: '#00D4FF', x: 0,  y: 28, w: 18, h: 48, conf: 88 },
      { id: 'rz', label: 'Active Work Zone',  color: '#00D4FF', x: 0,  y: 3,  w: 100, h: 94, conf: 99 },
    ],
  },
  {
    // cam4: 4 workers on red scaffolding — hi-vis vests, NO helmets visible
    src: '/cameras/cam4.jpg',
    name: 'CAM-04 · PERIMETER',
    zone: 'Zone C — Site Perimeter',
    id: 'C04',
    objectPosition: 'center 35%',
    boxes: [
      { id: 'w1', label: 'NO HELMET — ALERT', color: '#EF4444', x: 40, y: 3,  w: 22, h: 20, conf: 97, alert: true },
      { id: 'w2', label: 'NO HELMET — ALERT', color: '#EF4444', x: 28, y: 25, w: 24, h: 20, conf: 95, alert: true },
      { id: 'w3', label: 'NO HELMET — ALERT', color: '#EF4444', x: 30, y: 48, w: 24, h: 18, conf: 94, alert: true },
      { id: 'w4', label: 'Worker Detected',   color: '#00D4FF', x: 25, y: 68, w: 22, h: 20, conf: 88 },
      { id: 'fh', label: 'FALL HAZARD ZONE',  color: '#EF4444', x: 5,  y: 2,  w: 88, h: 95, conf: 99, alert: true },
    ],
  },
  {
    // cam5: 2 workers shoveling — both wearing yellow hard hats + hi-vis vests (PPE compliant)
    src: '/cameras/cam5.jpg',
    name: 'CAM-05 · SCAFFOLD',
    zone: 'Zone D — Scaffold Area',
    id: 'D05',
    objectPosition: 'center 38%',
    boxes: [
      { id: 'w1', label: 'Helmet Detected ✓',    color: '#22C55E', x: 22, y: 5,  w: 24, h: 58, conf: 99 },
      { id: 'w2', label: 'Helmet Detected ✓',    color: '#22C55E', x: 50, y: 3,  w: 20, h: 52, conf: 98 },
      { id: 'ppe', label: 'PPE ZONE — COMPLIANT', color: '#22C55E', x: 15, y: 2,  w: 60, h: 93, conf: 97 },
    ],
  },
  {
    // cam6: open-plan office — multiple employees at desks, person descending stairs
    src: '/cameras/cam6.jpg',
    name: 'CAM-06 · OFFICE FLOOR',
    zone: 'Zone E — Corporate HQ',
    id: 'E06',
    objectPosition: 'center center',
    boxes: [
      { id: 'p1',  label: 'Employee Detected',          color: '#00D4FF', x: 2,  y: 28, w: 14, h: 58, conf: 95 },
      { id: 'p2',  label: 'Employee Detected',          color: '#00D4FF', x: 22, y: 22, w: 22, h: 65, conf: 97 },
      { id: 'p3',  label: 'Employee Detected',          color: '#00D4FF', x: 40, y: 8,  w: 20, h: 68, conf: 96 },
      { id: 'p4',  label: 'Employee Detected',          color: '#00D4FF', x: 57, y: 25, w: 16, h: 55, conf: 91 },
      { id: 'p5',  label: 'Movement Detected',          color: '#6C63FF', x: 78, y: 4,  w: 17, h: 52, conf: 93 },
      { id: 'wz',  label: 'Active Workspace — 7 People', color: '#00D4FF', x: 1,  y: 2,  w: 96, h: 94, conf: 99 },
    ],
  },
  {
    // cam7: hospital corridor — nurse pushing patient in wheelchair, doctor in background
    src: '/cameras/cam7.jpg',
    name: 'CAM-07 · HOSPITAL CORRIDOR',
    zone: 'Zone F — City Hospital',
    id: 'F07',
    objectPosition: 'center center',
    boxes: [
      { id: 'pt',  label: 'Patient Detected',           color: '#00D4FF', x: 28, y: 22, w: 32, h: 68, conf: 98 },
      { id: 'ns',  label: 'Staff — Mask Compliant ✓',   color: '#22C55E', x: 32, y: 8,  w: 26, h: 52, conf: 97 },
      { id: 'dr',  label: 'Staff Detected ✓',           color: '#22C55E', x: 44, y: 18, w: 16, h: 42, conf: 92 },
      { id: 'cz',  label: 'Clinical Zone Active',       color: '#6C63FF', x: 4,  y: 4,  w: 88, h: 90, conf: 99 },
    ],
  },
  {
    // cam8: electronics store — suspect concealing item in backpack, theft alert active
    src: '/cameras/cam8.webp',
    name: 'CAM-08 · RETAIL — ELECTRONICS',
    zone: 'Zone G — Loss Prevention',
    id: 'G08',
    objectPosition: 'center 30%',
    boxes: [
      { id: 'sp',  label: 'Suspect Tracked',              color: '#EF4444', x: 30, y: 2,  w: 55, h: 92, conf: 97, alert: true },
      { id: 'it',  label: 'THEFT ALERT — Item Concealed', color: '#EF4444', x: 36, y: 54, w: 28, h: 34, conf: 99, alert: true },
      { id: 'lp',  label: 'Loss Prevention Zone',         color: '#EF4444', x: 2,  y: 2,  w: 94, h: 94, conf: 99, alert: true },
    ],
  },
  {
    // cam9: retail clothing store overhead — staff + 2 customers tracked, all identified
    src: '/cameras/cam9.webp',
    name: 'CAM-09 · RETAIL — FLOOR',
    zone: 'Zone H — Retail Floor',
    id: 'H09',
    objectPosition: 'center center',
    boxes: [
      { id: 'st',  label: 'Staff Detected ✓',   color: '#F59E0B', x: 18, y: 8,  w: 26, h: 85, conf: 99 },
      { id: 'c1',  label: 'Customer Detected',  color: '#22C55E', x: 43, y: 3,  w: 22, h: 70, conf: 99 },
      { id: 'c2',  label: 'Customer Detected',  color: '#22C55E', x: 65, y: 18, w: 24, h: 72, conf: 99 },
      { id: 'rf',  label: 'Retail Floor Monitor', color: '#00D4FF', x: 2, y: 2,  w: 95, h: 94, conf: 99 },
    ],
  },
];

function ConstructionCameraView() {
  const prefersReduced = useReducedMotion();
  const [camIdx, setCamIdx]   = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [scanY, setScanY]     = useState(0);
  const [tick, setTick]       = useState(0);

  // Cycle cameras every 9 s with crossfade
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCamIdx(i => (i + 1) % CAMERAS.length);
        setOpacity(1);
      }, 700);
    }, 9000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  // Scan beam
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setScanY(y => (y + 1) % 101), 30);
    return () => clearInterval(id);
  }, [prefersReduced]);

  // Cycle active detection box
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setTick(t => t + 1), 1800);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const cam      = CAMERAS[camIdx];
  const activeId = cam.boxes[tick % cam.boxes.length].id;

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">

      {/* ── HD construction site image — zero filter, original colours ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={cam.src}
        src={cam.src}
        alt={cam.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity, transition: 'opacity 0.7s ease', objectPosition: cam.objectPosition ?? 'center center' }}
      />

      {/* Subtle top-to-bottom vignette only — keeps image fully visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.35) 100%)' }}
      />

      {/* Sweep scan beam */}
      {!prefersReduced && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none z-10"
          style={{
            top: `${scanY}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.35) 30%, rgba(0,212,255,0.55) 50%, rgba(0,212,255,0.35) 70%, transparent 100%)',
            boxShadow: '0 0 5px rgba(0,212,255,0.2)',
          }}
        />
      )}

      {/* ── AI Bounding Boxes — positioned on actual workers/items ── */}
      {cam.boxes.map(box => {
        const isActive = !prefersReduced && box.id === activeId;
        return (
          <div
            key={box.id}
            className="absolute"
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.w}%`,
              height: `${box.h}%`,
              border: `1.5px solid ${isActive || box.alert ? box.color : box.color + '55'}`,
              boxShadow: isActive || box.alert
                ? `0 0 14px ${box.color}50, inset 0 0 10px ${box.color}08`
                : 'none',
              transition: 'all 0.45s ease',
              zIndex: 20,
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: box.color }} />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: box.color }} />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: box.color }} />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: box.color }} />

            {/* Label tag */}
            <div
              className="absolute -top-5 left-0 text-[8px] font-bold px-1.5 py-0.5 whitespace-nowrap rounded-sm leading-none"
              style={{ background: box.color, color: '#000407' }}
            >
              {box.label}
            </div>

            {/* Confidence score */}
            <div className="absolute -bottom-4 right-0 text-[7px] font-mono" style={{ color: box.color }}>
              {box.conf}%
            </div>

            {/* Alert pulse ring — border only, no fill so image stays visible */}
            {box.alert && !prefersReduced && (
              <div
                className="absolute inset-0 rounded-sm animate-ping"
                style={{ border: `2px solid ${box.color}`, opacity: 0.5 }}
              />
            )}

            {/* Active detection glow fill */}
            {isActive && (
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: [0.04, 0.13, 0.04] }}
                transition={{ repeat: Infinity, duration: 1.1 }}
                style={{ background: box.color }}
              />
            )}
          </div>
        );
      })}

      {/* ── Top HUD bar ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 z-30"
        style={{ background: 'linear-gradient(180deg, rgba(1,6,18,0.94) 0%, transparent 100%)' }}
      >
        <div className="flex items-center gap-1.5">
          {!prefersReduced ? (
            <motion.span
              className="flex items-center gap-1 text-[9px] font-bold text-red-400"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              REC
            </motion.span>
          ) : (
            <span className="flex items-center gap-1 text-[9px] font-bold text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              REC
            </span>
          )}
          <span className="text-[8px] text-slate-600">·</span>
          <span className="text-[9px] font-mono text-[#00D4FF]">{cam.name}</span>
          <span className="text-[8px] text-slate-600">·</span>
          <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">{cam.zone}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-semibold">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            AI ACTIVE
          </span>
          <span className="text-[9px] font-mono text-slate-500">14:23:07</span>
        </div>
      </div>

      {/* ── Bottom HUD bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 z-30"
        style={{ background: 'linear-gradient(0deg, rgba(1,6,18,0.94) 0%, transparent 100%)' }}
      >
        <div className="flex gap-3 sm:gap-5">
          {[
            { l: 'WORKERS',    v: '7/7', c: '#00D4FF' },
            { l: 'ANOMALIES',  v: '2',   c: '#EF4444' },
            { l: 'ALERTS',     v: '1',   c: '#EF4444' },
            { l: 'COMPLIANCE', v: '94%', c: '#10B981' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-[7px] sm:text-[8px] text-slate-600">{s.l}</div>
              <div className="text-[9px] sm:text-[11px] font-bold font-mono" style={{ color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
        <div className="text-[8px] text-slate-600 font-mono hidden sm:block">nexus://monitor.live</div>
      </div>

      {/* ── Violation alert badge — only shown when this camera has an alert box ── */}
      {!prefersReduced && cam.boxes.some(b => b.alert) && (
        <motion.div
          className="absolute top-10 right-3 z-30 flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold text-white"
          style={{ background: 'rgba(239,68,68,0.9)', border: '1px solid rgba(239,68,68,0.6)' }}
          animate={{ opacity: [1, 0.38, 1] }}
          transition={{ repeat: Infinity, duration: 1.3 }}
        >
          <AlertTriangle className="w-2.5 h-2.5" />
          VIOLATION DETECTED
        </motion.div>
      )}

      {/* ── Camera thumbnail strip ── */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        {CAMERAS.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              setOpacity(0);
              setTimeout(() => { setCamIdx(idx); setOpacity(1); }, 400);
            }}
            className="w-12 h-8 rounded overflow-hidden border transition-all duration-300 focus-visible:outline-none"
            style={{
              borderColor: idx === camIdx ? '#00D4FF' : 'rgba(255,255,255,0.08)',
              boxShadow: idx === camIdx ? '0 0 8px rgba(0,212,255,0.5)' : 'none',
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center text-[6px] font-mono font-bold tracking-wide"
              style={{
                background: idx === camIdx ? 'rgba(0,212,255,0.2)' : 'rgba(2,8,20,0.85)',
                color: idx === camIdx ? '#00D4FF' : '#475569',
              }}
            >
              {c.id}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Fade animation ───────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

// ─── Main page ────────────────────────────────────────────────────────
export default function MonitoringPageClient() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

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
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-red-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Live Monitoring
            </span>
            <a
              href="https://calendly.com/nitinarora81788/30min"
              target="_blank" rel="noopener noreferrer"
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
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-25" />
        <NeuralCanvas />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07), rgba(239,68,68,0.03), transparent 65%)' }}
          aria-hidden="true"
        />
        {/* Scanline */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.012) 3px, rgba(0,212,255,0.012) 4px)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <motion.div style={{ opacity: heroOpacity, y: heroY }}>
              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  Universal Vision AI Platform
                </span>
              </motion.div>

              <motion.h1
                initial="hidden" animate="show" variants={fadeUp} custom={1}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-space)' }}
              >
                <span className="text-white">One AI Brain.</span>
                <br />
                <span style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 60%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}
                  className="animate-gradient-x">
                  Every Space. Every Risk.
                </span>
              </motion.h1>

              <motion.p
                initial="hidden" animate="show" variants={fadeUp} custom={2}
                className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
              >
                Plug Nexus AI into your existing CCTV infrastructure — offices, hospitals, schools, warehouses, campuses — and instantly unlock real-time security analytics, compliance automation, and autonomous incident detection. No new hardware. Any camera brand.
              </motion.p>

              {/* Mini stats */}
              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3}
                className="grid grid-cols-3 gap-3 mb-10 max-w-md">
                {[
                  { v: '99.2%', l: 'Detection accuracy' },
                  { v: '<1s',   l: 'Alert response time' },
                  { v: '500+',  l: 'Camera brands supported' },
                ].map(s => (
                  <div key={s.l} className="glass rounded-xl p-3 border border-white/5 text-center">
                    <div className="text-lg font-bold" style={{ color: '#00D4FF' }}>{s.v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4}
                className="flex flex-col sm:flex-row gap-3">
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

            {/* Right — Live camera view */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative glass rounded-3xl border border-white/[0.07] p-4 sm:p-6 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.04), rgba(108,99,255,0.03), rgba(11,17,32,0.9))' }}>
                {/* Title bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono ml-2">nexus://cam-feed.live</span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-red-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <ConstructionCameraView />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-2 sm:-right-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-white/10"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                aria-label="2 safety alerts active"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Live Incidents</div>
                    <div className="text-base font-bold text-red-400">5 Active</div>
                  </div>
                </div>
              </motion.div>
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
          LIVE METRICS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1428]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <div className="tag-pill mb-4">Live Intelligence</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Real Numbers. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Real Intelligence.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {METRICS.map((m, i) => (
              <motion.div key={m.label}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass rounded-2xl p-5 border text-center relative overflow-hidden group"
                style={{ borderColor: `${m.color}20` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${m.color}10, transparent 70%)` }} />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m.color }} />
                <div className="text-2xl sm:text-3xl font-extrabold mb-1" style={{ color: m.color }}>
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </div>
                <div className="text-xs font-semibold text-white mb-0.5">{m.label}</div>
                <div className="text-[10px] text-slate-600">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16">
            <div className="tag-pill mb-4">How It Works</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Deploy in Days. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Monitor Forever.
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              No new hardware. No rip-and-replace. Plug into your existing camera infrastructure and go live in 72 hours.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Connect Any Camera',  desc: 'Integrate any IP camera via RTSP, ONVIF, or cloud API. Compatible with all major brands — Hikvision, Dahua, Axis, Bosch, and more.', color: '#00D4FF', icon: Camera },
              { n: '02', title: 'AI Analyses Live',    desc: 'Our vision AI processes every frame in real time — detecting people, objects, behaviours, and anomalies across your entire facility estate.', color: '#6C63FF', icon: Eye },
              { n: '03', title: 'Instant Alerts Fire', desc: 'Multi-channel notifications reach the right responder immediately via SMS, email, Slack, Teams, or in-app dashboard — under one second.', color: '#EF4444', icon: Bell },
              { n: '04', title: 'Enterprise Audit Trails', desc: 'Auto-generated compliance reports and tamper-proof incident logs built for healthcare, corporate, insurance, and industrial regulatory frameworks.', color: '#10B981', icon: FileText },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.n}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${step.color}40, transparent)` }} />
                  <div className="text-5xl font-extrabold mb-4 opacity-10" style={{ color: step.color }}>{step.n}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}>
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE CARDS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-[#0d1428]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <div className="tag-pill mb-4">AI Capabilities</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Every Risk. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Detected Autonomously.
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
              Six enterprise-grade AI modules that secure people, protect assets, and automate compliance — across offices, hospitals, warehouses, schools, and beyond.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="glass rounded-2xl border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }} />
                  <div className="p-6 sm:p-7 flex-1">
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
                    <div className="space-y-2">
                      {card.points.map((pt, pi) => (
                        <div key={pi} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: card.color }} />
                          <span className="text-xs text-slate-400">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 sm:px-7 py-3 border-t border-white/5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-500">Active on all camera feeds</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LIVE DASHBOARD PANELS
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B1120]" />
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), rgba(239,68,68,0.03), transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <div className="tag-pill mb-4">Live Dashboard</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Full Visibility. </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Zero Blind Spots.
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left panel — stats */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="glass rounded-2xl border border-white/8 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00D4FF]" />
                <span className="text-sm font-semibold text-white">Facility Intelligence Panel</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: 'Active Camera Feeds',    value: '48 / 48',   bar: 100, color: '#00D4FF' },
                  { label: 'Facility Compliance',   value: '97.4%',     bar: 97,  color: '#10B981' },
                  { label: 'PPE Compliance Rate',   value: '98.3%',     bar: 98,  color: '#6C63FF' },
                  { label: 'AI Detection Accuracy', value: '99.2%',     bar: 99,  color: '#00D4FF' },
                  { label: 'Perimeter Breach Today',value: '2 alerts',  bar: 12,  color: '#EF4444' },
                  { label: 'People On-Site Now',    value: '214',       bar: 72,  color: '#6C63FF' },
                ].map((row, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">{row.label}</span>
                      <span className="font-semibold" style={{ color: row.color }}>{row.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: row.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right panel — incident feed */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="glass rounded-2xl border border-white/8 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold text-white">Live Incident Feed</span>
                <span className="ml-auto text-xs text-slate-500">Today</span>
              </div>
              <div className="divide-y divide-white/5">
                {LIVE_ALERTS.map((alert, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.4, ease: 'easeOut' }}
                    className="px-5 py-3.5 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                    <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${alert.severity === 'high' ? 'bg-red-400 animate-pulse' : alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold" style={{ color: alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#3B82F6' }}>
                          {alert.type}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono">{alert.time}</span>
                      </div>
                      <div className="text-xs text-slate-300 mb-0.5">{alert.msg}</div>
                      <div className="text-[10px] text-slate-600 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        {alert.zone}
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                      style={{
                        background: alert.severity === 'high' ? 'rgba(239,68,68,0.15)' : alert.severity === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                        color: alert.severity === 'high' ? '#EF4444' : alert.severity === 'medium' ? '#F59E0B' : '#3B82F6',
                      }}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/5 text-center">
                <span className="text-xs text-[#00D4FF] hover:underline cursor-pointer">View full incident log →</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENTERPRISE TRUST
      ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1428]" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <div className="tag-pill mb-4">Enterprise Trust</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Built for </span>
              <span style={{ background: 'linear-gradient(135deg,#00D4FF,#6C63FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Any Enterprise Environment.
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Shield,   title: 'Multi-Standard Compliant', desc: 'Every alert and detection is logged and exportable for OSHA, HSE, HIPAA, ISO 45001, and corporate audit requirements.',  color: '#00D4FF' },
              { icon: Lock,     title: 'SOC 2 Type II Certified', desc: 'Enterprise-grade security. All video streams are encrypted in transit and at rest. Zero data leaves your perimeter without consent.', color: '#6C63FF' },
              { icon: Eye,      title: '24/7 Autonomous Watch',   desc: 'AI never sleeps. Continuous monitoring across all cameras, all shifts, all facilities — offices, wards, warehouses, and campuses.', color: '#00D4FF' },
              { icon: Activity, title: '99.9% Uptime SLA',        desc: 'Carrier-grade infrastructure with automatic failover. No gaps in your security net — guaranteed by SLA.',                         color: '#6C63FF' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-wrap justify-center gap-3">
            {['OSHA / HSE Compliant', 'HIPAA Aligned', 'SOC 2 Type II', 'GDPR Compliant', 'ISO 27001', 'ISO 45001', '99.9% SLA', 'Edge + Cloud'].map(badge => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-slate-400 glass border border-white/8">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #060d1f, #0d1535, #060d1f)' }} />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <NeuralCanvas />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.09), rgba(239,68,68,0.04), transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,212,255,0.015) 3px, rgba(0,212,255,0.015) 4px)' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)', color: '#00D4FF' }}>
              <Shield className="w-3 h-3" />
              Zero-Risk Deployment
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ fontFamily: 'var(--font-space)' }}>
              <span className="text-white">Secure Every Space.</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #6C63FF 50%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto' }}
                className="animate-gradient-x">
                Prevent Every Risk.
              </span>
              <br />
              <span className="text-white">Automate Every Watch.</span>
            </h2>

            <p className="text-base sm:text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Every unmonitored corridor is a liability. Every unsecured entrance is a threat. Every compliance gap costs you. The time to act is before the incident — not after. Nexus AI plugs into your existing cameras and starts protecting your people, assets, and operations from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a href="https://calendly.com/nitinarora81788/30min" target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-[#0B1120] rounded-xl overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
                <Calendar className="relative w-5 h-5" />
                <span className="relative">Book a Live Demo</span>
              </a>
              <a href="mailto:ai@nexus-aisolution.com"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-xl glass border border-white/10 hover:border-[#00D4FF]/30 transition-colors">
                <Mail className="w-5 h-5" />
                Email Our Team
              </a>
              <Link href="/"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white rounded-xl glass border border-white/10 hover:border-[#6C63FF]/30 transition-colors">
                <Zap className="w-5 h-5" />
                Explore Enterprise Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
              {['No new hardware required', 'Live in 72 hours', 'Any camera brand supported', 'White-glove onboarding included'].map(t => (
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
