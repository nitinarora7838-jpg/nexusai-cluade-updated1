import { ButtonLink } from '@/components/button-link';
import { heroFacts } from '@/lib/home-content';
import { ctaHref, ctaLabel } from '@/lib/site';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-line">
      <div className="mx-auto max-w-content animate-fade-up px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <p className="inline-flex rounded-full border border-line px-3 py-1 text-sm text-muted">
          Done-for-you AI for Indian businesses
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          AI that talks to your customers and does the work for you.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Nexus AI builds AI voice agents, website voice chat and business automation for Indian companies, in
          English, Hindi and Hinglish. We set it up, connect it to your tools and run it for you.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          <ButtonLink href="#services" variant="secondary">
            See our services
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Key facts">
          {heroFacts.map((fact) => (
            <li key={fact} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-body">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
