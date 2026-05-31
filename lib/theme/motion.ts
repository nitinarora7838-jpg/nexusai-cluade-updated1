/** Shared Framer Motion presets — keeps animation timing consistent site-wide */
export const viewportOnce = { once: true } as const;
export const viewportOnceNear = { once: true, margin: '-40px' } as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
} as const;

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewportOnce,
} as const;

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewportOnce,
} as const;

export function staggerDelay(index: number, step = 0.07) {
  return { transition: { delay: index * step, duration: 0.5 } };
}

export function gridStaggerDelay(index: number, mod = 4, step = 0.08) {
  return { transition: { delay: (index % mod) * step, duration: 0.55 } };
}
