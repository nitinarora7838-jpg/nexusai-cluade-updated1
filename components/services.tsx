'use client';

import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  SectionHeader,
  MarketingCard,
  AccentIcon,
} from '@/components/marketing';
import { SERVICES } from '@/lib/content/services';
import { getAccentStyles, staggerDelay, viewportOnceNear } from '@/lib/theme';

export default function Services() {
  return (
    <MarketingSection id="services" ariaLabelledBy="services-heading" bg="slate">
      <SectionGridBg opacity={25} />
      <SectionBlurOrbs orbs={[{ className: 'top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-teal-100/40 blur-[120px]' }]} />

      <SectionContainer>
        <SectionHeader
          label="Services"
          headingId="services-heading"
          titlePrimary="Everything You Need to"
          titleAccent="Lead the AI Revolution"
          description="From strategy to deployment, our expert teams deliver the full spectrum of enterprise AI services."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const styles = getAccentStyles(svc.accent);
            return (
              <MarketingCard
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnceNear}
                {...staggerDelay(i)}
                className={`group ${svc.wide ? 'lg:col-span-2' : ''}`}
                padding="lg"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 20% 50%, ${styles.glow}, transparent 70%)` }}
                  aria-hidden="true"
                />
                <AccentIcon accent={svc.accent} icon={Icon} className="mb-4 sm:mb-5" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{svc.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{svc.desc}</p>
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${styles.hex}60, transparent)` }}
                  aria-hidden="true"
                />
              </MarketingCard>
            );
          })}
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
