import { cn } from '@/lib/utils';
import type { AccentKind, SectionBg } from './tokens';
import { ACCENT_HEX } from './tokens';

export const accentStyles = {
  healthcare: {
    icon: 'bg-cyan-50 border-cyan-200 text-cyan-600',
    badge: 'bg-cyan-50 border-cyan-200 text-cyan-600',
    metric: 'bg-cyan-50 border-cyan-200 text-cyan-600',
    text: 'text-cyan-600',
    line: 'bg-cyan-600',
    panel: 'bg-cyan-50 border-cyan-200',
    hex: ACCENT_HEX.healthcare,
    glow: 'rgba(8,145,178,0.08)',
  },
  agriculture: {
    icon: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    metric: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    text: 'text-emerald-600',
    line: 'bg-emerald-600',
    panel: 'bg-emerald-50 border-emerald-200',
    hex: ACCENT_HEX.agriculture,
    glow: 'rgba(5,150,105,0.08)',
  },
} as const satisfies Record<AccentKind, Record<string, string>>;

export function getAccentStyles(accent: AccentKind) {
  return accentStyles[accent];
}

export const marketing = {
  section: 'py-20 sm:py-28 relative overflow-hidden',
  sectionLg: 'py-24 sm:py-32 relative overflow-hidden',
  container: 'relative max-w-7xl mx-auto px-4 sm:px-6',
  containerNarrow: 'relative max-w-5xl mx-auto px-4 sm:px-6',
  containerCta: 'relative max-w-4xl mx-auto px-4 sm:px-6',
  card: 'relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 card-hover',
  cardStatic: 'relative bg-white rounded-2xl border border-slate-200 shadow-sm',
  cardSm: 'bg-white rounded-xl border border-slate-200',
  cardMuted: 'bg-slate-50 rounded-xl border border-slate-200',
  heading: 'text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight',
  headingLg: 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 sm:mb-6 leading-tight tracking-tight',
  subheading: 'text-slate-700 text-base sm:text-lg max-w-2xl mx-auto',
  body: 'text-slate-600',
  primaryBtn:
    'inline-flex items-center justify-center gap-2 font-semibold text-white rounded-xl bg-teal-600 hover:bg-teal-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600',
  secondaryBtn:
    'inline-flex items-center justify-center gap-2 font-semibold text-slate-700 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600',
  navBtn: 'font-semibold text-white rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600',
  fontSpace: { fontFamily: 'var(--font-space)' } as const,
  input:
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors',
  label: 'text-xs text-slate-500 font-medium block mb-2',
  iconBtn:
    'w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-teal-300 transition-all focus-visible:outline-2 focus-visible:outline-teal-600',
} as const;

export function sectionBg(bg: SectionBg) {
  return bg === 'white' ? 'bg-white' : 'bg-slate-50';
}

export function marketingSectionClass(bg: SectionBg, className?: string) {
  return cn(marketing.section, sectionBg(bg), className);
}

/** Inline styles for hex-based consumers (charts, canvas, legacy badges) */
export function accentInlineBg(hex: string, alpha = '18') {
  return { background: `${hex}${alpha}`, border: `1px solid ${hex}30` };
}

export function accentBadgeStyle(hex: string) {
  return {
    background: `${hex}15`,
    color: hex,
    border: `1px solid ${hex}25`,
  };
}
