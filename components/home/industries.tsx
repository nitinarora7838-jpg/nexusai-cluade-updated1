import { IconBadge } from '@/components/icon-badge';
import { Section, SectionHeading } from '@/components/section';
import { industries } from '@/lib/home-content';

export function Industries() {
  return (
    <Section id="industries" tone="surface" labelledBy="industries-heading">
      <SectionHeading
        id="industries-heading"
        title="Use cases by industry"
        intro="A few of the jobs AI can take over in your industry."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li key={industry.name} className="rounded-2xl border border-line bg-ink p-6">
            <div className="flex items-center gap-3">
              <IconBadge icon={industry.icon} className="h-10 w-10" />
              <h3 className="text-lg font-semibold">{industry.name}</h3>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm">
              {industry.jobs.map((job) => (
                <li key={job} className="flex gap-2.5 text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
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
