import { Fragment } from 'react';

/**
 * Minimal, safe formatter for agent replies: paragraphs, bullet/numbered lists,
 * **bold** and [links](https://…). Builds React elements only (no raw HTML).
 */

function safeHref(url: string): string | null {
  const trimmed = url.trim();
  if (/^(https?:\/\/|mailto:|\/(?!\/))/i.test(trimmed)) return trimmed;
  return null;
}

function inline(text: string, keyPrefix: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s)]+)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1]) {
      parts.push(
        <strong key={key} className="font-semibold text-fg">
          {match[1]}
        </strong>,
      );
    } else {
      const label = match[2] ?? match[4];
      const href = safeHref(match[3] ?? match[4]);
      parts.push(
        href ? (
          <a
            key={key}
            href={href}
            className="font-medium text-brand underline-offset-2 hover:underline"
            {...(href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {label}
          </a>
        ) : (
          label
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function RichText({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split('\n').filter((l) => l.trim());
        const bullet = /^\s*[-*•]\s+/;
        const numbered = /^\s*\d+[.)]\s+/;
        if (lines.length && lines.every((l) => bullet.test(l))) {
          return (
            <ul key={b} className="my-2 list-disc space-y-1 pl-5 first:mt-0 last:mb-0">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(bullet, ''), `${b}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.length && lines.every((l) => numbered.test(l))) {
          return (
            <ol key={b} className="my-2 list-decimal space-y-1 pl-5 first:mt-0 last:mb-0">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(numbered, ''), `${b}-${i}`)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={b} className="my-2 first:mt-0 last:mb-0">
            {lines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {inline(l.replace(/^#{1,6}\s+/, ''), `${b}-${i}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
