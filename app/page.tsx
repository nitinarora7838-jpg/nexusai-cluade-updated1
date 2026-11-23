import { Cta } from '@/components/cta';
import { Faq } from '@/components/faq';
import { Chooser } from '@/components/home/chooser';
import { Hero } from '@/components/home/hero';
import { Industries } from '@/components/home/industries';
import { Integrations } from '@/components/home/integrations';
import { Pricing } from '@/components/home/pricing';
import { Process } from '@/components/home/process';
import { ServicesOverview } from '@/components/home/services-overview';
import { Together } from '@/components/home/together';
import { Trust } from '@/components/home/trust';
import { Why } from '@/components/home/why';
import { JsonLd } from '@/components/json-ld';
import { Section, SectionHeading } from '@/components/section';
import { homeFaqs } from '@/lib/faqs';
import { services } from '@/lib/services';
import { siteConfig } from '@/lib/site';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: { '@type': 'Country', name: 'India' },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.email,
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  makesOffer: services.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.name, description: s.definition, url: `${siteConfig.url}${s.href}` },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <ServicesOverview />
      <Chooser />
      <Together />
      <Industries />
      <Process />
      <Why />
      <Integrations />
      <Trust />
      <Pricing />
      <Section id="faq" tone="surface" labelledBy="faq-heading">
        <SectionHeading id="faq-heading" title="Frequently asked questions" />
        <div className="mt-10">
          <Faq items={homeFaqs} withSchema />
        </div>
      </Section>
      <Cta />
    </>
  );
}
