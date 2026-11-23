import { AuroraBackground } from '@/components/aurora-background';
import { ButtonLink } from '@/components/button-link';
import { heroFacts } from '@/lib/home-content';
import { ctaHref, ctaLabel } from '@/lib/site';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden border-b border-line">
      <AuroraBackground className="-z-20" />
      {/* Readability: keep the text side dark, let the aurora show on the open side and along the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,17,32,0.55)_0%,rgba(11,17,32,0.35)_55%,rgba(11,17,32,0)_100%)] lg:bg-[linear-gradient(90deg,#0B1120_0%,rgba(11,17,32,0.85)_38%,rgba(11,17,32,0.15)_68%,rgba(11,17,32,0)_100%)]"
      />
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-content animate-fade-up flex-col justify-center px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:min-h-[680px]">
        <p className="inline-flex self-start rounded-full border border-line bg-ink/60 px-3 py-1 text-sm text-body backdrop-blur-sm">
          Done-for-you AI for Indian businesses
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          AI that talks to your customers and does the work for you.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
          Nexus AI builds AI voice agents, website voice chat and business automation for Indian companies, in
          English, Hindi and Hinglish. We set it up, connect it to your tools and run it for you.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          <ButtonLink href="#services" variant="secondary" className="bg-ink/60 backdrop-blur-sm">
            See our services
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Key facts">
          {heroFacts.map((fact) => (
            <li
              key={fact}
              className="rounded-full border border-line bg-ink/70 px-3 py-1.5 text-sm text-body backdrop-blur-sm"
            >
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
