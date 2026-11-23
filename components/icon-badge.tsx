import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn('inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-brand/10', className)}
    >
      <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
    </span>
  );
}
