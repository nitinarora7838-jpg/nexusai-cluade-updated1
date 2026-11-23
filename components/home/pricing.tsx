import { Section, SectionHeading } from '@/components/section';
import { pricingParts } from '@/lib/home-content';

export function Pricing() {
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        eyebrow="Pricing"
        title="How pricing works"
        intro="Simple and predictable, in three parts."
      />
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {pricingParts.map((part, i) => (
          <li key={part.title} className="glass-card rounded-xl p-6">
            <span className="font-mono text-[0.72rem] font-medium text-brand" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-[1.15rem] font-semibold tracking-[-0.01em]">{part.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{part.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-body">We share exact pilot pricing after the free consultation.</p>
    </Section>
  );
}
