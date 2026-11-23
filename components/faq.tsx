import { Plus } from 'lucide-react';
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
      <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {items.map((item) => (
          <details key={item.question} className="group px-5 sm:px-6">
            <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 rounded-lg py-5 text-left">
              <h3 className="font-inter text-base font-medium text-fg">{item.question}</h3>
              <Plus
                className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="pb-5 pr-6 leading-relaxed text-muted sm:pr-10">{item.answer}</p>
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
