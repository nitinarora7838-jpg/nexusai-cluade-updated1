import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Glowing blue icon tile (same as the voice site's cards). */
export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn('icon-tile inline-grid h-[42px] w-[42px] shrink-0 place-items-center rounded-lg', className)}>
      <Icon className="h-5 w-5 text-[#BFD6FF]" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
