'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  AccentIcon,
  PrimaryLink,
  MarketingCard,
} from '@/components/marketing';
import { ABOUT_STATS, ABOUT_VALUES } from '@/lib/content/about';
import { fadeInLeft, fadeInUp, marketing } from '@/lib/theme';

export default function About() {
  return (
    <MarketingSection id="about" ariaLabelledBy="about-heading" bg="slate">
      <SectionGridBg opacity={30} />
      <SectionBlurOrbs orbs={[{ className: 'bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-cyan-100/40 blur-[100px]' }]} />

      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div {...fadeInLeft}>
            <div className="tag-pill mb-4 sm:mb-5">About Nexus AI</div>
            <h2 id="about-heading" className={marketing.heading} style={marketing.fontSpace}>
              <span className="text-slate-900">We&apos;re Building the</span>
              <br />
              <span className="gradient-text">Future of Enterprise AI</span>
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg">
              Nexus AI was founded on a singular belief: that every enterprise deserves access to transformative AI that actually works in production.
            </p>
            <p className="text-slate-600 leading-relaxed mb-7 sm:mb-8 text-sm sm:text-base">
              We combine deep enterprise experience with cutting-edge AI research to build systems that don&apos;t
              just automate tasks — they learn, adapt, and continuously improve. Our team of AI engineers,
              enterprise architects, and domain experts has deployed AI solutions across 500+ organizations worldwide.
            </p>

            <dl className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10" aria-label="Company statistics">
              {ABOUT_STATS.map(stat => (
                <div key={stat.label} className={marketing.cardSm + ' p-3 sm:p-4'}>
                  <dd className="text-xl sm:text-2xl font-extrabold gradient-text mb-1">{stat.val}</dd>
                  <dt className="text-xs text-slate-500 font-medium">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <PrimaryLink href="#contact" size="sm" className="group">
              Partner With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </PrimaryLink>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {ABOUT_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <MarketingCard
                  key={val.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  padding="sm"
                >
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <AccentIcon accent={val.accent} icon={Icon} />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1.5 text-sm sm:text-base">{val.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                </MarketingCard>
              );
            })}

            <motion.blockquote
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="bg-cyan-50 rounded-2xl p-5 sm:p-6 border border-cyan-200"
            >
              <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed mb-4">
                &ldquo;We don&apos;t build AI tools. We build AI-powered operating systems for enterprises — platforms
                that make your entire organization more intelligent, adaptive, and competitive.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-cyan-50 text-cyan-600 border border-cyan-200" aria-hidden="true">
                  AN
                </div>
                <cite className="not-italic">
                  <div className="text-sm font-semibold text-slate-900">Alex Nexus</div>
                  <div className="text-xs text-slate-500">CEO &amp; Co-Founder, Nexus AI</div>
                </cite>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
