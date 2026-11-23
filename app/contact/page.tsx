import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book a Free AI Consultation',
  description:
    'Book a free 30-minute consultation with Nexus AI. Tell us which calls and tasks you want to hand over to AI, and we’ll reply within 1 business day.',
  alternates: { canonical: '/contact' },
};

const nextSteps = [
  { title: 'We reply within 1 business day', text: 'A real person reads your message and suggests a time.' },
  {
    title: '30-minute consultation',
    text: 'We go through your calls, leads and tasks, and show you what AI can take over.',
  },
  { title: 'Pilot proposal', text: 'If it’s a fit, you get a clear 2-week pilot plan with pricing.' },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-content px-5 sm:px-6">
        <div className="max-w-2xl animate-fade-up">
          <p className="label-mono mb-[18px]">Contact</p>
          <h1
            id="contact-heading"
            className="text-[clamp(2.4rem,1.4rem_+_3vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
          >
            Book a free consultation
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us a little about your business and what you’d like AI to take over. It takes about two minutes.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
          <ContactForm />

          <aside aria-labelledby="next-heading" className="lg:pt-2">
            <h2 id="next-heading" className="text-xl font-semibold">
              What happens next
            </h2>
            <ol className="mt-6 space-y-6">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="w-6 shrink-0 pt-0.5 font-mono text-[0.72rem] font-medium text-brand" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-inter font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="glass-card mt-8 rounded-xl p-5 text-sm leading-relaxed text-muted">
              Prefer email? Write to{' '}
              <a href={`mailto:${siteConfig.email}`} className="whitespace-nowrap font-medium text-brand hover:underline">
                {siteConfig.email}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
