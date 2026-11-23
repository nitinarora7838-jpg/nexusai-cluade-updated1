import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckListProps {
  items: string[];
  className?: string;
}

export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-body">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
