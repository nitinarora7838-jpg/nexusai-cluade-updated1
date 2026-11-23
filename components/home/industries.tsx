import { IconBadge } from '@/components/icon-badge';
import { Section, SectionHeading } from '@/components/section';
import { industries } from '@/lib/home-content';

export function Industries() {
  return (
    <Section id="industries" tone="band" labelledBy="industries-heading">
      <SectionHeading
        id="industries-heading"
        eyebrow="Industries"
        title="Use cases by industry"
        intro="A few of the jobs AI can take over in your industry."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li key={industry.name} className="glass-card glass-card-hover rounded-xl p-6">
            <div className="flex items-center gap-3">
              <IconBadge icon={industry.icon} />
              <h3 className="text-[1.08rem] font-semibold tracking-[-0.01em]">{industry.name}</h3>
            </div>
            <ul className="mt-5 grid gap-[9px] border-t border-line pt-4 text-[0.88rem]">
              {industry.jobs.map((job) => (
                <li key={job} className="flex gap-2.5 text-body">
                  <span className="font-mono text-brand" aria-hidden="true">
                    →
                  </span>
                  {job}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
