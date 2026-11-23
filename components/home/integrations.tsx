import { Section, SectionHeading } from '@/components/section';
import { integrations } from '@/lib/home-content';

export function Integrations() {
  return (
    <Section id="integrations" labelledBy="integrations-heading">
      <SectionHeading
        id="integrations-heading"
        title="Works with the tools you already use"
        intro="We connect the AI to your existing systems, so your team keeps working the way it does today."
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {integrations.map((name) => (
          <li
            key={name}
            className="flex min-h-[56px] items-center justify-center rounded-xl border border-line bg-surface px-4 text-center text-sm font-medium text-body"
          >
            {name}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-muted">If your tool has an API, we can usually connect it.</p>
    </Section>
  );
}
