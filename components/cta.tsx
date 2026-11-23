import { ButtonLink } from '@/components/button-link';
import { Section } from '@/components/section';
import { ctaHref, ctaLabel, siteConfig } from '@/lib/site';

interface CtaProps {
  text?: string;
  href?: string;
}

const facts = ['30 minutes', 'Free', 'No obligation'];

export function Cta({
  text = 'You’ll leave with a clear list of calls and tasks AI can take over, whether or not you work with us.',
  href = ctaHref,
}: CtaProps) {
  return (
    <Section tone="band" labelledBy="cta-heading">
      <div className="text-center">
        <p className="label-mono mb-[18px]">Get started</p>
        <h2
          id="cta-heading"
          className="mx-auto max-w-3xl text-[clamp(2.2rem,1.2rem_+_4vw,4rem)] font-bold leading-[1.05]"
        >
          Book a free{' '}
          <span className="text-brand">
            <span className="whitespace-nowrap">30-minute</span> consultation
          </span>
        </h2>
        <p className="mx-auto mt-[18px] max-w-[60ch] text-[1.05rem] leading-relaxed text-muted">{text}</p>
        <div className="mt-9">
          <ButtonLink href={href}>{ctaLabel}</ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="About the consultation">
          {facts.map((fact) => (
            <li
              key={fact}
              className="glass-chip rounded-full px-[14px] py-[7px] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ice"
            >
              {fact}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Prefer email?{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-brand underline-offset-4 hover:text-brand-hover hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </Section>
  );
}
