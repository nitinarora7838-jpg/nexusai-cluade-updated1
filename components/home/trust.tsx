import { ShieldCheck } from 'lucide-react';
import { Section, SectionHeading } from '@/components/section';
import { trustPoints } from '@/lib/home-content';

export function Trust() {
  return (
    <Section id="trust" tone="band" labelledBy="trust-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="trust-heading"
          eyebrow="Responsible AI"
          title="Trust and data"
          intro="Your customers should feel respected, and your data should stay yours."
          align="left"
        />
        <ul className="grid gap-3">
          {trustPoints.map((point) => (
            <li key={point} className="glass-card flex gap-3 rounded-xl p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="leading-relaxed text-body">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
