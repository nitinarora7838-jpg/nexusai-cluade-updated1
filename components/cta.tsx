import { ButtonLink } from '@/components/button-link';
import { Section } from '@/components/section';
import { ctaHref, ctaLabel, siteConfig } from '@/lib/site';

interface CtaProps {
  title?: string;
  text?: string;
  href?: string;
}

export function Cta({
  title = 'Book a free 30-minute consultation',
  text = 'You’ll leave with a clear list of calls and tasks AI can take over, whether or not you work with us.',
  href = ctaHref,
}: CtaProps) {
  return (
    <Section labelledBy="cta-heading">
      <div className="rounded-2xl border border-line bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 id="cta-heading" className="mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted sm:text-lg">{text}</p>
        <div className="mt-8">
          <ButtonLink href={href}>{ctaLabel}</ButtonLink>
        </div>
        <p className="mt-5 text-sm text-muted">
          Prefer email?{' '}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand hover:underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </Section>
  );
}
