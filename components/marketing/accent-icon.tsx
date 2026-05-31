import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAccentStyles, type AccentKind } from '@/lib/theme';

const sizes = {
  xs: { box: 'w-8 h-8 sm:w-9 sm:h-9', icon: 'w-4 h-4' },
  sm: { box: 'w-6 h-6', icon: 'w-3.5 h-3.5' },
  md: { box: 'w-10 h-10 sm:w-11 sm:h-11', icon: 'w-4 h-4 sm:w-5 sm:h-5' },
  lg: { box: 'w-11 h-11 sm:w-12 sm:h-12', icon: 'w-5 h-5' },
} as const;

interface AccentIconProps {
  accent: AccentKind;
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
  rounded?: 'lg' | 'xl' | 'full';
}

export function AccentIcon({
  accent,
  icon: Icon,
  size = 'md',
  className,
  rounded = 'xl',
}: AccentIconProps) {
  const styles = getAccentStyles(accent);
  const s = sizes[size];
  const radius = rounded === 'full' ? 'rounded-full' : rounded === 'lg' ? 'rounded-lg' : 'rounded-xl';

  return (
    <div
      className={cn(s.box, radius, 'flex items-center justify-center border', styles.icon, className)}
      aria-hidden="true"
    >
      <Icon className={s.icon} />
    </div>
  );
}
