import { ArrowRight, CircleCheck } from 'lucide-react';
import type { ServiceExample as Example } from '@/lib/services';
import { cn } from '@/lib/utils';

function SampleLabel() {
  return (
    <span className="rounded-full border border-brand/40 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand">
      Sample
    </span>
  );
}

function Outcome({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-line p-5 sm:p-6">
      <p className="text-sm font-semibold text-fg">{title}</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-body">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Transcript({
  lines,
  labels,
}: {
  lines: { from: string; text: string }[];
  labels: Record<string, string>;
}) {
  return (
    <ol className="space-y-4 p-5 sm:p-6">
      {lines.map((line, i) => {
        const isAi = line.from === 'ai';
        return (
          <li key={i} className={cn('flex flex-col', isAi ? 'items-start' : 'items-end')}>
            <span className="mb-1 text-xs font-medium text-muted">{labels[line.from]}</span>
            <p
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]',
                isAi ? 'rounded-tl-md border border-brand/25 bg-brand/[0.06] text-fg' : 'rounded-tr-md bg-white/[0.06] text-body',
              )}
            >
              {line.text}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function ServiceExample({ example }: { example: Example }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <figcaption className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
        <SampleLabel />
        <span className="font-medium text-fg">{example.title}</span>
        <span className="text-sm text-muted">Illustrative example, not a real customer.</span>
      </figcaption>

      {example.kind === 'rules' && (
        <ul className="divide-y divide-line">
          {example.rules.map((rule) => (
            <li key={rule.when} className="grid gap-2 p-5 sm:p-6 md:grid-cols-[1fr_auto_1.3fr] md:items-start md:gap-6">
              <p className="text-body">
                <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-muted">When</span>
                {rule.when}
              </p>
              <ArrowRight className="hidden h-5 w-5 text-brand md:mt-0.5 md:block" aria-hidden="true" />
              <p className="text-body">
                <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-brand">We</span>
                {rule.then.charAt(0).toLowerCase() + rule.then.slice(1)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {example.kind === 'chat' && (
        <>
          <Transcript lines={example.messages} labels={{ ai: 'AI assistant', visitor: 'Website visitor (speaking)' }} />
          <Outcome title="What happened next" items={example.outcome} />
        </>
      )}

      {example.kind === 'call' && (
        <>
          <Transcript lines={example.lines} labels={{ ai: 'AI voice agent', caller: 'Lead' }} />
          <Outcome title="After the call" items={example.outcome} />
        </>
      )}
    </figure>
  );
}
