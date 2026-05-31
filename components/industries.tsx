'use client';

import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionHeader,
  MarketingCard,
  AccentIcon,
  MetricBlock,
} from '@/components/marketing';
import { INDUSTRIES } from '@/lib/content/industries';
import { getAccentStyles, staggerDelay, viewportOnceNear } from '@/lib/theme';

export default function Industries() {
  return (
    <MarketingSection id="industries" ariaLabelledBy="industries-heading" bg="white">
      <SectionGridBg opacity={35} />

      <SectionContainer>
        <SectionHeader
          label="Industries"
          headingId="industries-heading"
          titlePrimary="AI Intelligence for"
          titleAccent="Every Industry Vertical"
          description="Purpose-built AI solutions tailored to the unique challenges and compliance requirements of your sector."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {INDUSTRIES.map((ind, i) => {
            const styles = getAccentStyles(ind.accent);
            return (
              <MarketingCard
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnceNear}
                {...staggerDelay(i)}
                className="group"
                aria-label={`${ind.name} industry solutions`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${styles.hex}12, transparent 60%)` }}
                  aria-hidden="true"
                />
                <AccentIcon accent={ind.accent} icon={ind.icon} className="mb-3 sm:mb-4" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{ind.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 sm:mb-5">{ind.desc}</p>
                <MetricBlock accent={ind.accent} value={ind.metric} label={ind.metricLabel} />
              </MarketingCard>
            );
          })}
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
