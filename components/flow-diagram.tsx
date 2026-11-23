import { Fragment } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface FlowStep {
  title: string;
  text: string;
}

/** Simple left-to-right flow (top-to-bottom on mobile). */
export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flex flex-col gap-2 text-left md:flex-row md:items-stretch">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <li className="glass-card flex-1 rounded-xl p-5">
            <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-brand">
              Step {String(i + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 font-space text-lg font-semibold leading-snug tracking-[-0.01em] text-fg">{step.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
          </li>
          {i < steps.length - 1 && (
            <li aria-hidden="true" className="flex items-center justify-center py-1 text-brand md:px-1 md:py-0">
              <ArrowDown className="h-5 w-5 md:hidden" />
              <ArrowRight className="hidden h-5 w-5 md:block" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}
