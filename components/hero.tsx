'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { PrimaryLink, SecondaryLink } from '@/components/marketing';

interface Stat { value: number; suffix: string; label: string; decimal?: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; r: number; alpha: number; }

const STATS: Stat[] = [
  { value: 40,   suffix: '+',  label: 'Enterprise Clients'    },
  { value: 250,  suffix: 'M+', label: 'Transactions Automated' },
  { value: 99.9, suffix: '%',  label: 'Uptime SLA', decimal: true },
  { value: 3,    suffix: 'x',  label: 'Avg Productivity Gain'  },
];

const LOGOS = ['Accenture', 'Deloitte', 'KPMG', 'PwC', 'McKinsey', 'BCG'];

function ParticleCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let rafId: number;

    const count = window.innerWidth < 768 ? 40 : 80;

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,148,136,${p.alpha * 0.6})`;
        ctx.fill();
      }

      if (window.innerWidth >= 768) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(13,148,136,${0.04 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

function AnimatedCounter({ value, suffix, decimal }: { value: number; suffix: string; decimal?: boolean }) {
  const [count, setCount]      = useState(0);
  const ref                    = useRef<HTMLDivElement>(null);
  const prefersReduced         = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) { setCount(value); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / 1800, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          setCount(parseFloat((eased * value).toFixed(decimal ? 1 : 0)));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(value);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, decimal, prefersReduced]);

  return (
    <div ref={ref} aria-label={`${value}${suffix}`}>
      {decimal ? count.toFixed(1) : count}
      {suffix}
    </div>
  );
}

export default function Hero() {
  const { scrollY }    = useScroll();
  const prefersReduced = useReducedMotion();

  const y1      = useTransform(scrollY, [0, 500], prefersReduced ? [0, 0] : [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, prefersReduced ? 1 : 0]);

  return (
    <section
      aria-label="Hero — Nexus AI Enterprise Platform"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      <div className="absolute inset-0 animated-gradient" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-60"  aria-hidden="true" />
      <ParticleCanvas />

      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-100/60 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-100/60 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center pt-28 pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 flex-wrap justify-center"
        >
          <div className="tag-pill">Enterprise AI Platform</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight mb-8 text-slate-900"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Enterprise AI Solutions
          <br />
          <span className="gradient-text">That Transform Business</span>
          <br />
          Operations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2"
        >
          Nexus AI builds intelligent automation systems, AI agents, and enterprise transformation
          platforms that accelerate growth and productivity across every vertical.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20 px-4"
        >
          <PrimaryLink href="#contact" size="lg" fullWidth className="group sm:w-auto">
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </PrimaryLink>
          <SecondaryLink href="#products" size="lg" fullWidth className="group sm:w-auto">
            <Play className="w-4 h-4 text-teal-600" aria-hidden="true" />
            Explore Solutions
          </SecondaryLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-2xl overflow-hidden mb-12 sm:mb-16 border border-slate-200"
          role="list"
          aria-label="Platform statistics"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              role="listitem"
              className="bg-white px-4 sm:px-6 py-5 sm:py-6 text-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold gradient-text mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} decimal={s.decimal} />
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
          aria-label="Trusted by"
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            Trusted by world-class enterprises
          </p>
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center" role="list">
            {LOGOS.map(logo => (
              <li key={logo}>
                <span className="text-slate-400 font-semibold text-sm hover:text-slate-600 transition-colors tracking-wide">
                  {logo}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
