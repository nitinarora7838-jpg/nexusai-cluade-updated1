import { cn } from '@/lib/utils';

export interface StepItem {
  title: string;
  text?: string;
  /** Small tag on the right of the step number, e.g. a duration */
  meta?: string;
  share?: string;
  get?: string;
}

interface StepListProps {
  steps: StepItem[];
  columns?: 2 | 4;
  className?: string;
}

/** Numbered steps. Used for "How it works" on the homepage and the service pages. */
export function StepList({ steps, columns = 4, className }: StepListProps) {
  return (
    <ol className={cn('grid gap-4', columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2', className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="glass-card flex flex-col rounded-xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-brand" aria-hidden="true">
              Step {String(i + 1).padStart(2, '0')}
            </span>
            {step.meta && <span className="tag-mono px-2 py-[3px]">{step.meta}</span>}
          </div>
          <h3 className="mt-4 text-[1.2rem] font-semibold tracking-[-0.01em]">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          {step.text && <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{step.text}</p>}
          {(step.share || step.get) && (
            <dl className="mt-4 space-y-4 border-t border-line pt-4 text-[0.9rem]">
              {step.share && (
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">You share</dt>
                  <dd className="mt-1.5 leading-relaxed text-body">{step.share}</dd>
                </div>
              )}
              {step.get && (
                <div>
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">You get</dt>
                  <dd className="mt-1.5 leading-relaxed text-body">{step.get}</dd>
                </div>
              )}
            </dl>
          )}
        </li>
      ))}
    </ol>
  );
}
