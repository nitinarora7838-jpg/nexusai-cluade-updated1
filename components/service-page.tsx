import type { Metadata } from 'next';
import { ButtonLink } from '@/components/button-link';
import { CheckList } from '@/components/check-list';
import { Cta } from '@/components/cta';
import { Faq } from '@/components/faq';
import { IconBadge } from '@/components/icon-badge';
import { Section, SectionHeading } from '@/components/section';
import { ServiceExample } from '@/components/service-example';
import { StepList } from '@/components/step-list';
import type { Service } from '@/lib/services';
import { ctaLabel } from '@/lib/site';

export function serviceMetadata(service: Service): Metadata {
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: { canonical: service.href },
    openGraph: { title: service.meta.title, description: service.meta.description, url: service.href },
    twitter: { title: service.meta.title, description: service.meta.description },
  };
}

/** One template for /automation and /voice-chat (AI Voice Agents has its own site). */
export function ServicePage({ service }: { service: Service }) {
  const contactHref = `/contact?interest=${service.slug}`;

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="service-heading" className="relative">
        <div className="mx-auto max-w-content animate-fade-up px-5 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <div className="flex items-center gap-3">
            <IconBadge icon={service.icon} />
            <p className="label-mono">{service.tag}</p>
          </div>
          <h1
            id="service-heading"
            className="mt-7 text-[clamp(2.6rem,1.4rem_+_3.6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-body">{service.definition}</p>
          {service.heroNote && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{service.heroNote}</p>}
          <div className="mt-9">
            <ButtonLink href={contactHref}>{ctaLabel}</ButtonLink>
          </div>
        </div>
      </section>

      {/* 2. What it does */}
      <Section tone="band" labelledBy="does-heading">
        <SectionHeading id="does-heading" eyebrow="Capabilities" title="What it does" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((cap) => (
            <li key={cap.title} className="glass-card glass-card-hover rounded-xl px-6 py-7">
              <IconBadge icon={cap.icon} />
              <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.01em]">{cap.title}</h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{cap.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. How it works */}
      <Section labelledBy="how-heading">
        <SectionHeading
          id="how-heading"
          eyebrow="The process"
          title="How it works"
          intro="We do the setup. You review and approve."
        />
        <StepList className="mt-12" steps={service.steps} columns={service.steps.length === 4 ? 4 : 2} />
      </Section>

      {/* 4. Example */}
      <Section tone="band" labelledBy="example-heading">
        <SectionHeading
          id="example-heading"
          eyebrow="Example"
          title="What it looks like"
          intro="A realistic example of the kind of work it does."
        />
        <div className="mt-12">
          <ServiceExample example={service.example} />
        </div>
      </Section>

      {/* 5. Good fit if… */}
      <Section labelledBy="fit-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <SectionHeading
            id="fit-heading"
            eyebrow="Is it for you?"
            title="A good fit if…"
            intro="Not sure? Tell us what’s slowing your team down and we’ll give you an honest answer."
            align="left"
          />
          <div className="glass-card rounded-xl p-6 sm:p-8">
            <CheckList items={service.goodFit} />
          </div>
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section tone="band" labelledBy="service-faq-heading">
        <SectionHeading id="service-faq-heading" eyebrow="FAQ" title={`${service.name}: common questions`} />
        <div className="mt-12">
          <Faq items={service.faqs} withSchema />
        </div>
      </Section>

      {/* 7. Call to action */}
      <Cta href={contactHref} />
    </>
  );
}
