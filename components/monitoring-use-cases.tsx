'use client';

import { motion } from 'framer-motion';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  SectionHeader,
  MarketingCard,
  AccentIcon,
  MetricBlock,
  PrimaryLink,
} from '@/components/marketing';
import { MONITORING_USE_CASES } from '@/lib/content/monitoring-use-cases';
import { fadeInUp, getAccentStyles, staggerDelay, viewportOnceNear, marketing } from '@/lib/theme';

export default function MonitoringUseCases() {
  return (
    <MarketingSection ariaLabel="Monitoring use cases" bg="white">
      <SectionGridBg opacity={25} />
      <SectionBlurOrbs orbs={[{ className: 'bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-100/40 blur-[120px]' }]} />

      <SectionContainer>
        <SectionHeader
          label="Use Cases"
          titlePrimary="Intelligence for Every"
          titleAccent="Environment & Vertical"
          description="Nexus AI Monitoring adapts to industry-specific safety standards, operational requirements, and compliance frameworks."
          headingClassName="text-4xl md:text-5xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MONITORING_USE_CASES.map((useCase, i) => {
            const styles = getAccentStyles(useCase.accent);
            return (
              <MarketingCard
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceNear}
                {...staggerDelay(i, 0.08)}
                className="group"
              >
                <AccentIcon accent={useCase.accent} icon={useCase.icon} size="lg" className="mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">{useCase.desc}</p>
                <MetricBlock accent={useCase.accent} value={useCase.metric} label={useCase.metricLabel} className="rounded-lg" />
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ${styles.line}`} />
              </MarketingCard>
            );
          })}
        </div>

        <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="mt-16 text-center">
          <div className={`${marketing.cardMuted} rounded-2xl p-10 text-center max-w-2xl mx-auto`}>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Ready to Deploy AI Monitoring?</h3>
            <p className="text-slate-700 mb-6">
              See how intelligent monitoring can transform your operations. Our team will assess your environment and design a custom deployment plan.
            </p>
            <PrimaryLink href="#contact" size="sm">Schedule Monitoring Demo</PrimaryLink>
          </div>
        </motion.div>
      </SectionContainer>
    </MarketingSection>
  );
}
