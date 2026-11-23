import { Section, SectionHeading } from '@/components/section';
import { integrations } from '@/lib/home-content';

export function Integrations() {
  return (
    <Section id="integrations" labelledBy="integrations-heading">
      <SectionHeading
        id="integrations-heading"
        eyebrow="Integrations"
        title="Works with the tools you already use"
        intro="We connect the AI to your existing systems, so your team keeps working the way it does today."
      />
      <ul className="mx-auto mt-11 flex max-w-[860px] flex-wrap justify-center gap-2">
        {integrations.map((name) => (
          <li key={name} className="glass-chip rounded-full px-[14px] py-2 font-mono text-[0.78rem] text-ice">
            {name}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-muted">If your tool has an API, we can usually connect it.</p>
    </Section>
  );
}
