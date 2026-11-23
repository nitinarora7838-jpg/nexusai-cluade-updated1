import { ShieldCheck } from 'lucide-react';
import { Section, SectionHeading } from '@/components/section';
import { trustPoints } from '@/lib/home-content';

export function Trust() {
  return (
    <Section id="trust" tone="surface" labelledBy="trust-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <SectionHeading
          id="trust-heading"
          title="Trust and data"
          intro="Your customers should feel respected, and your data should stay yours."
        />
        <ul className="space-y-4">
          {trustPoints.map((point) => (
            <li key={point} className="flex gap-3 rounded-2xl border border-line bg-ink p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <span className="leading-relaxed text-body">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
