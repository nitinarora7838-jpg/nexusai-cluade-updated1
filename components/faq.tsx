import type { FaqItem } from '@/lib/faqs';
import { JsonLd } from '@/components/json-ld';

interface FaqProps {
  items: FaqItem[];
  /** Also output FAQPage structured data */
  withSchema?: boolean;
}

/**
 * Accordion built on native <details>, so every answer can be opened
 * with or without JavaScript, by mouse, keyboard or screen reader.
 */
export function Faq({ items, withSchema = false }: FaqProps) {
  return (
    <>
      <div className="glass-card mx-auto max-w-[780px] rounded-2xl px-5 py-1 text-left sm:px-[26px]">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-line last:border-b-0">
            <summary className="flex min-h-[44px] cursor-pointer items-start justify-between gap-4 rounded-md py-5 sm:py-[22px]">
              <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.01em]">{item.question}</h3>
              <span className="-mt-0.5 font-mono text-[1.4rem] leading-none text-brand" aria-hidden="true">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="max-w-[66ch] pb-[22px] leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }}
        />
      )}
    </>
  );
}
