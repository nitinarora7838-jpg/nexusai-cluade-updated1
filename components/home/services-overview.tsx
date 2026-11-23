import { Section, SectionHeading } from '@/components/section';
import { ServiceCard } from '@/components/service-card';
import { services } from '@/lib/services';

export function ServicesOverview() {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow="Our services"
        title="Three ways AI can work for you"
        highlight="work for you"
        intro="Each one is built, connected and run by us. Pick one, or combine them."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
    </Section>
  );
}
