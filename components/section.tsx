import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  /** id of the section's heading, for aria-labelledby */
  labelledBy?: string;
  /** 'surface' gives the section a slightly lighter background to separate it from neighbours */
  tone?: 'default' | 'surface';
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, labelledBy, tone = 'default', className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-16 py-16 sm:py-24', tone === 'surface' && 'border-y border-line bg-surface/50', className)}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, intro, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="mb-3 text-sm font-medium text-brand">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}
