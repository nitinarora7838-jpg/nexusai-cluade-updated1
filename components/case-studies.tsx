'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionHeader,
} from '@/components/marketing';
import { CASE_STUDIES } from '@/lib/content/case-studies';
import { accentBadgeStyle, getAccentStyles, marketing } from '@/lib/theme';

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const c = CASE_STUDIES[active];
  const styles = getAccentStyles(c.accent);

  return (
    <MarketingSection id="case-studies" ariaLabelledBy="cases-heading" bg="slate">
      <SectionGridBg opacity={25} />

      <SectionContainer>
        <SectionHeader
          label="Case Studies"
          headingId="cases-heading"
          titlePrimary="Real Results from"
          titleAccent="Real Enterprise Clients"
          description="Measurable ROI delivered across industries."
        />

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <nav aria-label="Case study selector" className="space-y-1 sm:space-y-2">
            {CASE_STUDIES.map((item, i) => {
              const itemStyles = getAccentStyles(item.accent);
              return (
                <button
                  key={item.company}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={active === i ? 'true' : undefined}
                  aria-label={`View ${item.company} case study`}
                  className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-200 flex items-center justify-between group focus-visible:outline-2 focus-visible:outline-teal-600 ${
                    active === i ? `${marketing.cardSm} shadow-sm` : 'hover:bg-white/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                      style={
                        active === i
                          ? accentBadgeStyle(itemStyles.hex)
                          : { background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }
                      }
                      aria-hidden="true"
                    >
                      {item.logo}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">{item.company}</div>
                      <div className="text-xs text-slate-500 truncate">{item.industry}</div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-all ${active === i ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          <motion.article
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
            aria-label={`${c.company} case study details`}
            className={`lg:col-span-2 ${marketing.cardStatic} p-5 sm:p-8`}
          >
            <ul className="flex gap-2 mb-4 sm:mb-5 flex-wrap" aria-label="Case study tags">
              {c.tags.map(tag => (
                <li key={tag} className="text-xs px-2.5 py-1 rounded-full border" style={accentBadgeStyle(styles.hex)}>
                  {tag}
                </li>
              ))}
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{c.headline}</h3>
            <p className="text-slate-600 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">{c.description}</p>

            <dl className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {c.metrics.map(m => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className={`rounded-xl p-3 sm:p-4 text-center border ${getAccentStyles(c.accent).metric}`}>
                    <Icon className={`w-4 h-4 mx-auto mb-2 ${styles.text}`} aria-hidden="true" />
                    <dd className={`text-lg sm:text-xl font-extrabold ${styles.text}`}>{m.value}</dd>
                    <dt className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mt-0.5">{m.label}</dt>
                  </div>
                );
              })}
            </dl>

            <a
              href={`/case-studies/${c.slug}`}
              className={`inline-flex items-center gap-2 text-sm font-semibold group focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.text}`}
            >
              Read Full Case Study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.article>
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
