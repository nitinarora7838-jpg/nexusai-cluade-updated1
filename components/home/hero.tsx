import { AuroraBackground } from '@/components/aurora-background';
import { ButtonLink } from '@/components/button-link';
import { heroFacts } from '@/lib/home-content';
import { ctaHref, ctaLabel } from '@/lib/site';

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Aurora wallpaper, fading out at the bottom so it blends into the page's starfield */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [-webkit-mask-image:linear-gradient(to_bottom,#000_calc(100%_-_140px),transparent)] [mask-image:linear-gradient(to_bottom,#000_calc(100%_-_140px),transparent)]"
      >
        <AuroraBackground />
        {/* Readability: keep the text side dark, let the aurora show on the open side and along the bottom */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,9,0.6)_0%,rgba(2,4,9,0.35)_55%,rgba(2,4,9,0)_100%)] lg:bg-[linear-gradient(90deg,#020409_0%,rgba(2,4,9,0.85)_38%,rgba(2,4,9,0.15)_68%,rgba(2,4,9,0)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-66px)] max-w-content animate-fade-up flex-col justify-center px-5 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:min-h-[700px]">
        <p className="label-mono tracking-[0.22em] text-[#C9D6EE]">Nexus AI · Done-for-you AI</p>
        <h1
          id="hero-heading"
          className="mt-6 grid max-w-4xl text-[clamp(2.6rem,1.4rem_+_3.6vw,4.6rem)] leading-[1.02] tracking-[-0.035em]"
        >
          <span className="font-semibold">AI that talks to your customers</span>{' '}
          <span className="font-inter font-light italic tracking-[-0.03em] text-[#DFE8FF]">and does the work for you.</span>
        </h1>
        <p className="mt-7 max-w-[36rem] text-[1.05rem] leading-[1.6] text-body">
          Nexus AI builds AI voice agents, website voice chat and business automation for growing businesses. We set it
          up, connect it to your tools and run it for you.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
          <ButtonLink href="#services" variant="secondary">
            See our services
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-[22px] gap-y-2 font-mono text-[0.74rem] text-[#C3CDE0]" aria-label="Key facts">
          {heroFacts.map((fact) => (
            <li key={fact}>
              <span className="text-brand" aria-hidden="true">
                ✓{' '}
              </span>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
