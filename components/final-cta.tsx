'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { MarketingSection, SectionContainer, SectionGridBg, PrimaryLink, SecondaryLink } from '@/components/marketing';
import { marketing } from '@/lib/theme';

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
        ctx.fillStyle = 'rgba(13,148,136,0.25)';
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const alpha = 0.12 * (1 - d / 150);
            const g = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            g.addColorStop(0, `rgba(13,148,136,${alpha})`);
            g.addColorStop(1, `rgba(8,145,178,${alpha})`);
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
    <MarketingSection ariaLabelledBy="cta-heading" bg="slate" size="lg">
      <SectionGridBg opacity={50} />
      <NeuralBg />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none bg-teal-100/40 blur-3xl" aria-hidden="true" />

      <SectionContainer cta className="text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tag-pill mb-5 sm:mb-6">Get Started Today</div>
          <h2 id="cta-heading" className={marketing.headingLg} style={marketing.fontSpace}>
            <span className="text-slate-900">Ready To Transform</span>
            <br />
            <span className="gradient-text">Your Business With AI?</span>
          </h2>
          <p className="text-base sm:text-xl text-slate-700 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 500+ enterprises already operating at the speed of AI.
            Your transformation starts with a single conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <PrimaryLink href="https://calendly.com/nitinarora81788/30min" rel="noopener noreferrer" target="_blank" size="lg" fullWidth className="group sm:w-auto">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>Schedule Strategy Call</span>
            </PrimaryLink>
            <SecondaryLink href="#products" size="lg" fullWidth className="group sm:w-auto">
              Start AI Transformation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </SecondaryLink>
          </div>

          <ul
            className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center"
            aria-label="Certifications and guarantees"
          >
            {TRUST_BADGES.map(badge => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-xs text-slate-500 font-medium"
              >
                <div className="w-1 h-1 rounded-full bg-teal-500" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </motion.div>
      </SectionContainer>
    </MarketingSection>
  );
}
