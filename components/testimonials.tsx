'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  company: string;
  avatar: string;
  color: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen', title: 'Chief Digital Officer', company: 'Global Finance Corp',
    avatar: 'SC', color: '#00D4FF', rating: 5,
    quote: 'Nexus AI transformed our entire back-office operations in under 90 days. The ROI was undeniable from month one. Their AI Workflow Engine eliminated thousands of manual hours and the team\'s confidence in automation has completely shifted.',
  },
  {
    name: 'Marcus Thompson', title: 'VP of Operations', company: 'RetailPlex International',
    avatar: 'MT', color: '#6C63FF', rating: 5,
    quote: 'The AI PMO Copilot alone justified the investment. We went from weekly status meetings that took 3 hours to a real-time dashboard that every stakeholder can access. Risk visibility has never been this good.',
  },
  {
    name: 'Dr. Priya Sharma', title: 'CTO', company: 'MedTech Solutions',
    avatar: 'PS', color: '#00D4FF', rating: 5,
    quote: 'Healthcare AI requires absolute precision. Nexus AI\'s payroll and compliance automation handles the complexity of multi-state healthcare regulations flawlessly. We haven\'t had a compliance incident since deployment.',
  },
  {
    name: 'James Okonkwo', title: 'Head of AI & Automation', company: 'TechVenture SaaS',
    avatar: 'JO', color: '#6C63FF', rating: 5,
    quote: 'The AI Support Agent handles the volume that would have required 40 additional hires. It understands context, learns from every interaction, and escalates to humans at exactly the right moment.',
  },
  {
    name: 'Lisa Martinez', title: 'CFO', company: 'Logistics Prime',
    avatar: 'LM', color: '#00D4FF', rating: 5,
    quote: 'Our finance team was drowning in reporting. Nexus AI automated 80% of our monthly close process. The AI-generated executive summaries save our team 20 hours every reporting cycle, and accuracy has actually improved.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReduced = useReducedMotion();

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance — respect reduced motion
  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go, prefersReduced]);

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#111827]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#6C63FF]/4 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="tag-pill mb-4">Testimonials</div>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            <span className="text-white">Trusted by </span>
            <span className="gradient-text">Enterprise Leaders</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: prefersReduced ? 0 : direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: prefersReduced ? 0 : -direction * 60 }}
              transition={{ duration: 0.4 }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${current + 1} of ${TESTIMONIALS.length}`}
              className="glass-strong rounded-2xl border border-white/10 p-7 sm:p-10 md:p-14 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5 sm:mb-6" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <footer className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm sm:text-base font-bold"
                  style={{
                    background: `${t.color}20`,
                    border: `2px solid ${t.color}40`,
                    color: t.color,
                  }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <cite className="not-italic">
                  <div className="font-semibold text-white text-sm sm:text-base">{t.name}</div>
                  <div className="text-xs sm:text-sm text-slate-500">{t.title}, {t.company}</div>
                </cite>
              </footer>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00D4FF]/40 transition-all focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Dot indicators */}
            <div role="tablist" aria-label="Select testimonial" className="flex gap-2">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial from ${item.name}`}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="rounded-full transition-all focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
                  style={{
                    width: i === current ? '20px' : '8px',
                    height: '8px',
                    background: i === current ? '#00D4FF' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00D4FF]/40 transition-all focus-visible:outline-2 focus-visible:outline-[#00D4FF]"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
