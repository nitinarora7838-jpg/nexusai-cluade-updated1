import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/section';
import { chooserRows } from '@/lib/home-content';

export function Chooser() {
  return (
    <Section id="which-one" tone="surface" labelledBy="chooser-heading">
      <SectionHeading
        id="chooser-heading"
        title="Which one do I need?"
        intro="Start with the problem you feel most often."
      />
      <ul className="mt-10 divide-y divide-line rounded-2xl border border-line bg-ink">
        {chooserRows.map((row) => (
          <li key={row.service} className="grid gap-3 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
            <p className="text-body">
              <span className="text-muted">If </span>
              {row.problem.charAt(0).toLowerCase() + row.problem.slice(1)}
            </p>
            <Link
              href={`/${row.service}`}
              className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-hover hover:underline"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              {row.serviceName}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-muted">
        Most businesses combine them, and we’ll recommend the right mix on a free call.
      </p>
    </Section>
  );
}
