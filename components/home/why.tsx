import { IconBadge } from '@/components/icon-badge';
import { Section, SectionHeading } from '@/components/section';
import { whyPoints } from '@/lib/home-content';

export function Why() {
  return (
    <Section id="why" tone="surface" labelledBy="why-heading">
      <SectionHeading id="why-heading" title="Why Nexus AI" intro="A partner that does the work, not another tool to learn." />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {whyPoints.map((point) => (
          <li key={point.title} className="flex gap-4 rounded-2xl border border-line bg-ink p-6">
            <IconBadge icon={point.icon} />
            <div>
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{point.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
