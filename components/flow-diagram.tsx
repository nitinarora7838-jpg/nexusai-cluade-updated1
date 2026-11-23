import { Fragment } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface FlowStep {
  title: string;
  text: string;
}

/** Simple left-to-right flow (top-to-bottom on mobile). */
export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <li className="flex-1 rounded-2xl border border-line bg-surface p-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand">Step {i + 1}</span>
            <p className="mt-2 font-space text-lg font-semibold leading-snug text-fg">{step.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
          {i < steps.length - 1 && (
            <li aria-hidden="true" className="flex items-center justify-center py-1 text-muted md:px-1 md:py-0">
              <ArrowDown className="h-5 w-5 md:hidden" />
              <ArrowRight className="hidden h-5 w-5 md:block" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}
