import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { marketing, marketingSectionClass, sectionBg, type SectionBg } from '@/lib/theme';

type BlurOrb = {
  className: string;
  ariaHidden?: boolean;
};

interface MarketingSectionProps {
  id?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  bg?: SectionBg;
  size?: 'default' | 'lg';
  className?: string;
  children: ReactNode;
}

export function MarketingSection({
  id,
  ariaLabelledBy,
  ariaLabel,
  bg = 'white',
  size = 'default',
  className,
  children,
}: MarketingSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      className={cn(
        size === 'lg' ? marketing.sectionLg : marketing.section,
        sectionBg(bg),
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionContainer({
  children,
  className,
  narrow,
  cta,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  cta?: boolean;
}) {
  const base = cta ? marketing.containerCta : narrow ? marketing.containerNarrow : marketing.container;
  return <div className={cn(base, className)}>{children}</div>;
}

export function SectionGridBg({ opacity = 30 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 grid-bg"
      style={{ opacity: opacity / 100 }}
      aria-hidden="true"
    />
  );
}

export function SectionBlurOrbs({ orbs }: { orbs: BlurOrb[] }) {
  return (
    <>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={cn('absolute pointer-events-none', orb.className)}
          aria-hidden={orb.ariaHidden ?? true}
        />
      ))}
    </>
  );
}

export { marketingSectionClass };
