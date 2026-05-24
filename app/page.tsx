import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import Footer from '@/components/footer';

// ─── Below-fold sections: dynamically imported for code splitting ──
const Products           = dynamic(() => import('@/components/products'),            { ssr: true });
const MonitoringHero     = dynamic(() => import('@/components/monitoring-hero'),     { ssr: true });
const MonitoringShowcase = dynamic(() => import('@/components/monitoring-showcase'), { ssr: true });
const MonitoringUseCases = dynamic(() => import('@/components/monitoring-use-cases'),{ ssr: true });
const Automation         = dynamic(() => import('@/components/automation'),          { ssr: true });
const Services           = dynamic(() => import('@/components/services'),            { ssr: true });
const Industries         = dynamic(() => import('@/components/industries'),          { ssr: true });
const CaseStudies        = dynamic(() => import('@/components/case-studies'),        { ssr: true });
const DashboardPreview   = dynamic(() => import('@/components/dashboard-preview'),   { ssr: true });
const Testimonials       = dynamic(() => import('@/components/testimonials'),        { ssr: true });
const About              = dynamic(() => import('@/components/about'),               { ssr: true });
const Contact            = dynamic(() => import('@/components/contact'),             { ssr: true });
const FinalCTA           = dynamic(() => import('@/components/final-cta'),           { ssr: true });
// Cursor is client-only — no SSR avoids hydration mismatch
const Cursor             = dynamic(() => import('@/components/cursor'),              { ssr: false });

// ─── JSON-LD structured data ───────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nexus AI',
  url: 'https://nexusai.com',
  logo: 'https://nexusai.com/logo.png',
  description: 'Enterprise AI solutions — automation systems, AI agents, and transformation platforms.',
  sameAs: [
    'https://linkedin.com/company/nexus-ai',
    'https://twitter.com/nexusai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-888-639-9524',
    contactType: 'customer service',
    email: 'enterprise@nexusai.com',
  },
};

function SectionFallback() {
  // Stable height prevents layout shift while section loads
  return <div style={{ minHeight: '4rem' }} aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Cursor />
      <Navigation />

      <main id="main-content">
        {/* Above fold — eager, no Suspense needed */}
        <Hero />

        {/* Below fold — each section code-split */}
        <Suspense fallback={<SectionFallback />}>
          <Products />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MonitoringHero />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MonitoringShowcase />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MonitoringUseCases />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Automation />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Industries />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <DashboardPreview />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
