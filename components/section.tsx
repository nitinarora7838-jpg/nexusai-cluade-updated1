import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  /** id of the section's heading, for aria-labelledby */
  labelledBy?: string;
  /** 'band' adds the soft blue band background used to separate sections */
  tone?: 'default' | 'band';
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, labelledBy, tone = 'default', className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-16 py-[clamp(4.5rem,10vw,8rem)]', tone === 'band' && 'band', className)}
    >
      <div className="mx-auto max-w-content px-5 sm:px-6">{children}</div>
    </section>
  );
}

/** Renders `title`, colouring the `highlight` part (if it appears in the title) in brand blue. */
export function Highlighted({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) return <>{title}</>;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-brand">{highlight}</span>
      {after}
    </>
  );
}

interface SectionHeadingProps {
  id?: string;
  /** Small monospace label above the title */
  eyebrow?: string;
  title: string;
  /** Part of the title to show in blue */
  highlight?: string;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, highlight, intro, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="label-mono mb-[18px]">{eyebrow}</p>}
      <h2 id={id} className="text-[clamp(2rem,1.2rem_+_3vw,3.2rem)] font-bold leading-[1.05]">
        <Highlighted title={title} highlight={highlight} />
      </h2>
      {intro && (
        <p className={cn('mt-[18px] max-w-[60ch] text-[1.05rem] leading-relaxed text-muted', align === 'center' && 'mx-auto')}>
          {intro}
        </p>
      )}
    </div>
  );
}
