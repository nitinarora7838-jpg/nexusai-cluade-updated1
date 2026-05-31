/** Bio-AgTech dual-accent palette — single source of truth for color semantics */
export type AccentKind = 'healthcare' | 'agriculture';

export const ACCENT_HEX = {
  healthcare: '#0891b2',
  agriculture: '#059669',
  primary: '#0d9488',
} as const;

export type SectionBg = 'white' | 'slate';

/** Alternate healthcare / agriculture by index (products, services grids, etc.) */
export function accentFromIndex(index: number): AccentKind {
  return index % 2 === 0 ? 'healthcare' : 'agriculture';
}
