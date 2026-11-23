import { Section, SectionHeading } from '@/components/section';
import { pricingParts } from '@/lib/home-content';

export function Pricing() {
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeading
        id="pricing-heading"
        title="How pricing works"
        intro="Simple and predictable, in three parts."
      />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {pricingParts.map((part, i) => (
          <li key={part.title} className="rounded-2xl border border-line bg-surface p-6">
            <span className="text-sm font-semibold text-brand" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold">{part.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{part.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-body">We share exact pilot pricing after the free consultation.</p>
    </Section>
  );
}
