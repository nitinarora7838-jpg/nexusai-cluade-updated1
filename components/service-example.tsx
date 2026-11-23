import type { ServiceExample as Example } from '@/lib/services';
import { cn } from '@/lib/utils';

/** Small green status dot, as on the voice site's "Live call" panel. */
function LiveDot() {
  return <span className="h-2 w-2 shrink-0 rounded-full bg-ok shadow-[0_0_0_4px_rgba(74,222,128,0.12)]" aria-hidden="true" />;
}

function Outcome({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="grid content-start gap-2.5 border-t border-line bg-[rgba(2,6,20,0.35)] p-5 md:border-l md:border-t-0">
      <h4 className="mb-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">{title}</h4>
      {items.map((item) => (
        <p key={item} className="flex items-start gap-2.5 text-[0.86rem] text-fg">
          <span
            className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[rgba(74,222,128,0.12)] shadow-[inset_0_0_0_1px_#4ADE80]"
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 bg-ok" />
          </span>
          {item}
        </p>
      ))}
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
    <ol className="grid content-start gap-3.5 p-5 text-[0.93rem]">
      {lines.map((line, i) => {
        const isAi = line.from === 'ai';
        return (
          <li key={i} className="grid gap-0.5 sm:grid-cols-[104px_1fr] sm:gap-3">
            <span
              className={cn(
                'font-mono text-[0.7rem] font-medium uppercase leading-[1.9] tracking-[0.08em]',
                isAi ? 'text-brand' : 'text-muted',
              )}
            >
              {labels[line.from]}
            </span>
            <p className={cn('leading-relaxed', isAi ? 'text-fg' : 'text-muted')}>{line.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function ServiceExample({ example }: { example: Example }) {
  const kindLabel = example.kind === 'rules' ? 'Sample automations' : example.kind === 'chat' ? 'Sample voice chat' : 'Sample call';
  return (
    <figure className="glass-card mx-auto max-w-[900px] overflow-hidden rounded-[14px] text-left">
      <figcaption className="flex flex-wrap items-center gap-x-[18px] gap-y-2 border-b border-line px-5 py-3.5 font-mono text-[0.76rem] text-muted">
        <span className="flex items-center gap-2 text-ok">
          <LiveDot />
          {kindLabel}
        </span>
        <span className="text-body">{example.title}</span>
        <span className="ml-auto rounded border border-[rgba(76,141,255,0.38)] px-[7px] py-[3px] text-[0.68rem] uppercase tracking-[0.08em] text-brand">
          Example
        </span>
        <span className="w-full font-inter text-[0.8rem] text-muted">Illustrative example, not a real customer.</span>
      </figcaption>

      {example.kind === 'rules' && (
        <ul className="divide-y divide-line">
          {example.rules.map((rule) => (
            <li key={rule.when} className="grid gap-2 p-5 md:grid-cols-[1fr_auto_1.3fr] md:items-start md:gap-6">
              <p className="text-muted">
                <span className="mr-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-muted">When</span>
                {rule.when}
              </p>
              <span className="hidden font-mono text-brand md:block" aria-hidden="true">
                →
              </span>
              <p className="text-fg">
                <span className="mr-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-brand">We</span>
                {rule.then.charAt(0).toLowerCase() + rule.then.slice(1)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {example.kind === 'chat' && (
        <div className="grid md:grid-cols-[1.35fr_1fr]">
          <Transcript lines={example.messages} labels={{ ai: 'AI assistant', visitor: 'Visitor' }} />
          <Outcome title="What happened next" items={example.outcome} />
        </div>
      )}

      {example.kind === 'call' && (
        <div className="grid md:grid-cols-[1.35fr_1fr]">
          <Transcript lines={example.lines} labels={{ ai: 'AI agent', caller: 'Caller' }} />
          <Outcome title="After the call" items={example.outcome} />
        </div>
      )}
    </figure>
  );
}
