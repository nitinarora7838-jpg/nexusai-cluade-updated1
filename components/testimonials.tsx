'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  SectionHeader,
} from '@/components/marketing';
import { TESTIMONIALS } from '@/lib/content/testimonials';
import { ACCENT_HEX, accentBadgeStyle, getAccentStyles, marketing } from '@/lib/theme';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReduced = useReducedMotion();

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go, prefersReduced]);

  const t = TESTIMONIALS[current];
  const avatarStyle = accentBadgeStyle(getAccentStyles(t.accent).hex);

  return (
    <MarketingSection id="testimonials" ariaLabelledBy="testimonials-heading">
      <SectionGridBg opacity={20} />
      <SectionBlurOrbs
        orbs={[
          {
            className:
              'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-teal-100/30 blur-[120px]',
          },
        ]}
      />

      <SectionContainer narrow>
        <SectionHeader
          label="Testimonials"
          headingId="testimonials-heading"
          titlePrimary="Trusted by "
          titleAccent="Enterprise Leaders"
        />

        <div aria-roledescription="carousel" aria-label="Customer testimonials">
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
              className={`${marketing.cardStatic} p-7 sm:p-10 md:p-14 text-center`}
            >
              <div className="flex justify-center gap-1 mb-5 sm:mb-6" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <footer className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm sm:text-base font-bold"
                  style={{
                    ...avatarStyle,
                    border: `2px solid ${getAccentStyles(t.accent).hex}40`,
                  }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <cite className="not-italic">
                  <div className="font-semibold text-slate-900 text-sm sm:text-base">{t.name}</div>
                  <div className="text-xs sm:text-sm text-slate-500">
                    {t.title}, {t.company}
                  </div>
                </cite>
              </footer>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className={marketing.iconBtn}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <div role="tablist" aria-label="Select testimonial" className="flex gap-2">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial from ${item.name}`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="rounded-full transition-all focus-visible:outline-2 focus-visible:outline-teal-600"
                  style={{
                    width: i === current ? '20px' : '8px',
                    height: '8px',
                    background: i === current ? ACCENT_HEX.primary : '#cbd5e1',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className={marketing.iconBtn}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
