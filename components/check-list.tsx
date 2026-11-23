import { cn } from '@/lib/utils';

interface CheckListProps {
  items: string[];
  className?: string;
}

/** Bullet list with blue arrows, as on the voice site. */
export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn('grid gap-[9px]', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-body">
          <span className="font-mono text-brand" aria-hidden="true">
            →
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
