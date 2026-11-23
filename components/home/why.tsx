import { IconBadge } from '@/components/icon-badge';
import { Section, SectionHeading } from '@/components/section';
import { whyPoints } from '@/lib/home-content';

export function Why() {
  return (
    <Section id="why" tone="band" labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        eyebrow="Why us"
        title="Why Nexus AI"
        highlight="Nexus AI"
        intro="A partner that does the work, not another tool to learn."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {whyPoints.map((point) => (
          <li key={point.title} className="glass-card glass-card-hover flex gap-4 rounded-xl p-6">
            <IconBadge icon={point.icon} />
            <div>
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">{point.title}</h3>
              <p className="mt-1.5 text-[0.93rem] leading-relaxed text-muted">{point.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
