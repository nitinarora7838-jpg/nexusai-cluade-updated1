import { cn } from '@/lib/utils';

export interface StepItem {
  title: string;
  text?: string;
  /** Small label on the right of the number, e.g. a duration */
  meta?: string;
  share?: string;
  get?: string;
}

interface StepListProps {
  steps: StepItem[];
  columns?: 2 | 4;
  className?: string;
}

/** Numbered steps. Used for "How it works" on the homepage and every service page. */
export function StepList({ steps, columns = 4, className }: StepListProps) {
  return (
    <ol
      className={cn(
        'grid gap-4',
        columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2',
        className,
      )}
    >
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-3">
            <span
              className="grid h-8 w-8 place-items-center rounded-full border border-brand/40 text-sm font-semibold text-brand"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            {step.meta && (
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-body">{step.meta}</span>
            )}
          </div>
          <h3 className="mt-4 text-lg font-semibold">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          {step.text && <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>}
          {(step.share || step.get) && (
            <dl className="mt-4 space-y-4 text-sm">
              {step.share && (
                <div>
                  <dt className="font-medium text-fg">You share</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{step.share}</dd>
                </div>
              )}
              {step.get && (
                <div>
                  <dt className="font-medium text-fg">You get</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{step.get}</dd>
                </div>
              )}
            </dl>
          )}
        </li>
      ))}
    </ol>
  );
}
