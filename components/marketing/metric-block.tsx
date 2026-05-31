import { cn } from '@/lib/utils';
import { getAccentStyles, type AccentKind } from '@/lib/theme';

interface MetricBlockProps {
  accent: AccentKind;
  value: string;
  label: string;
  className?: string;
}

export function MetricBlock({ accent, value, label, className }: MetricBlockProps) {
  const styles = getAccentStyles(accent);
  return (
    <div className={cn('rounded-xl p-2.5 sm:p-3 text-center border', styles.metric, className)}>
      <div className={cn('text-lg sm:text-xl font-extrabold', styles.text)}>{value}</div>
      <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}
