'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const TRUST_BADGES = [
  'SOC 2 Type II Certified',
  'ISO 27001',
  'GDPR Compliant',
  'Enterprise SLA 99.9%',
  'White-Glove Onboarding',
] as const;

function NeuralBg() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = canvas.width  = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.3)';
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const alpha = 0.15 * (1 - d / 150);
            const g = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            g.addColorStop(0, `rgba(0,212,255,${alpha})`);
            g.addColorStop(1, `rgba(108,99,255,${alpha})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
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

export default function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0B1120, #0d1535, #0B1120)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
      <NeuralBg />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07), rgba(108,99,255,0.05), transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="tag-pill mb-5 sm:mb-6">Get Started Today</div>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 sm:mb-6 leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            <span className="text-white">Ready To Transform</span>
            <br />
            <span className="gradient-text">Your Business With AI?</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-400 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 500+ enterprises already operating at the speed of AI.
            Your transformation starts with a single conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-[#0B1120] rounded-xl overflow-hidden w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
              <Calendar className="relative w-4 h-4" aria-hidden="true" />
              <span className="relative">Schedule Strategy Call</span>
            </a>
            <a
              href="#products"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-xl glass border border-white/10 hover:border-[#00D4FF]/30 transition-all w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start AI Transformation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>

          {/* Trust badges */}
          <ul
            className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center"
            aria-label="Certifications and guarantees"
          >
            {TRUST_BADGES.map(badge => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-xs text-slate-500 font-medium"
              >
                <div className="w-1 h-1 rounded-full bg-[#00D4FF]/50" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
