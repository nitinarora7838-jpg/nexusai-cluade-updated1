import Link from 'next/link';
import { Section, SectionHeading } from '@/components/section';
import { chooserRows } from '@/lib/home-content';
import { getService } from '@/lib/services';

export function Chooser() {
  return (
    <Section id="which-one" tone="band" labelledBy="chooser-heading">
      <SectionHeading
        id="chooser-heading"
        eyebrow="Find your fit"
        title="Which one do I need?"
        intro="Start with the problem you feel most often."
      />
      <ul className="glass-card mx-auto mt-12 max-w-[900px] divide-y divide-line rounded-xl">
        {chooserRows.map((row) => (
          <li key={row.service} className="grid gap-3 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            <p className="text-body">
              <span className="text-muted">If </span>
              {row.problem.charAt(0).toLowerCase() + row.problem.slice(1)}
            </p>
            <Link
              href={getService(row.service).href}
              className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover hover:underline hover:underline-offset-4"
            >
              <span className="font-mono" aria-hidden="true">
                →
              </span>
              {row.serviceName}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-muted">
        Most businesses combine them, and we’ll recommend the right mix on a free call.
      </p>
    </Section>
  );
}
