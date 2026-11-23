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

/** One template for /automation, /voice-chat and /voice-agents. */
export function ServicePage({ service }: { service: Service }) {
  const contactHref = `/contact?interest=${service.slug}`;

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="service-heading" className="border-b border-line">
        <div className="mx-auto max-w-content animate-fade-up px-4 py-16 sm:px-6 sm:py-24">
          <IconBadge icon={service.icon} />
          <h1 id="service-heading" className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-body">{service.definition}</p>
          {service.heroNote && <p className="mt-3 max-w-2xl leading-relaxed text-muted">{service.heroNote}</p>}
          <div className="mt-8">
            <ButtonLink href={contactHref}>{ctaLabel}</ButtonLink>
          </div>
        </div>
      </section>

      {/* 2. What it does */}
      <Section labelledBy="does-heading">
        <SectionHeading id="does-heading" title="What it does" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((cap) => (
            <li key={cap.title} className="rounded-2xl border border-line bg-surface p-6">
              <IconBadge icon={cap.icon} />
              <h3 className="mt-4 text-lg font-semibold">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{cap.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. How it works */}
      <Section tone="surface" labelledBy="how-heading">
        <SectionHeading id="how-heading" title="How it works" intro="We do the setup. You review and approve." />
        <StepList className="mt-10" steps={service.steps} columns={service.steps.length === 4 ? 4 : 2} />
      </Section>

      {/* 4. Example */}
      <Section labelledBy="example-heading">
        <SectionHeading id="example-heading" title="What it looks like" intro="A realistic example of the kind of work it does." />
        <div className="mt-10">
          <ServiceExample example={service.example} />
        </div>
      </Section>

      {/* 5. Good fit if… */}
      <Section tone="surface" labelledBy="fit-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="fit-heading"
            title="A good fit if…"
            intro="Not sure? Tell us what’s slowing your team down and we’ll give you an honest answer."
          />
          <div className="rounded-2xl border border-line bg-ink p-6 sm:p-8">
            <CheckList items={service.goodFit} />
          </div>
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section labelledBy="service-faq-heading">
        <SectionHeading id="service-faq-heading" title={`${service.name}: common questions`} />
        <div className="mt-10">
          <Faq items={service.faqs} withSchema />
        </div>
      </Section>

      {/* 7. Call to action */}
      <Cta href={contactHref} />
    </>
  );
}
