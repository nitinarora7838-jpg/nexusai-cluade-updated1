'use client';

import { motion } from 'framer-motion';
import { useState, useId } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Send, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  MarketingSection,
  SectionContainer,
  SectionGridBg,
  SectionBlurOrbs,
  SectionHeader,
  AccentIcon,
  PrimaryLink,
  PrimaryButton,
} from '@/components/marketing';
import { CALENDLY_URL, CONTACT_BENEFITS, CONTACT_ITEMS } from '@/lib/content/contact';
import { fadeInLeft, fadeInRight, getAccentStyles, marketing } from '@/lib/theme';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function Contact() {
  const formId = useId();
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleField =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <MarketingSection id="contact" ariaLabelledBy="contact-heading">
      <SectionGridBg opacity={30} />
      <SectionBlurOrbs
        orbs={[
          { className: 'top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-100/40 blur-[120px]' },
          { className: 'bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan-100/40 blur-[100px]' },
        ]}
      />

      <SectionContainer>
        <SectionHeader
          label="Contact"
          headingId="contact-heading"
          titlePrimary="Let's Build Intelligent"
          titleAccent="Enterprise Systems Together"
          description="Talk to our enterprise AI team. We'll map your transformation journey and build a roadmap in your first session."
        />

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <motion.div {...fadeInLeft} className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div className={`${getAccentStyles('healthcare').panel} rounded-2xl p-5 sm:p-6`}>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 text-cyan-600 flex-shrink-0" aria-hidden="true" />
                <h3 className="font-semibold text-slate-900 text-base sm:text-lg">Book a Strategy Call</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Schedule a 45-minute discovery call with our enterprise AI architects. We&apos;ll understand your
                needs and outline an AI transformation roadmap.
              </p>
              <PrimaryLink
                href={CALENDLY_URL}
                rel="noopener noreferrer"
                target="_blank"
                fullWidth
                size="sm"
                className="group"
              >
                Schedule Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </PrimaryLink>
            </div>

            <ul className="space-y-2 sm:space-y-3">
              {CONTACT_ITEMS.map(({ icon, label, value, accent }) => (
                <li
                  key={label}
                  className={`${marketing.cardSm} p-3 sm:p-4 flex items-center gap-3`}
                >
                  <AccentIcon accent={accent} icon={icon} size="xs" rounded="lg" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{label}</div>
                    <div className="text-sm text-slate-700">{value}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={`${marketing.cardSm} p-4 sm:p-5`}>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">
                What you get
              </p>
              <ul className="space-y-2">
                {CONTACT_BENEFITS.map((b, i) => {
                  const accentStyles = getAccentStyles(i % 2 === 0 ? 'healthcare' : 'agriculture');
                  return (
                    <li key={b} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${accentStyles.text}`} aria-hidden="true" />
                      <span className="text-xs text-slate-600">{b}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fadeInRight} className="lg:col-span-3">
            <div className={`${marketing.cardStatic} p-6 sm:p-8`}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-5 border border-emerald-200"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2" role="alert">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Our enterprise team will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  id={formId}
                  onSubmit={handle}
                  className="space-y-4 sm:space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6">
                    Send us a message
                  </h3>

                  {error && (
                    <p
                      role="alert"
                      className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3 border border-red-400/20"
                    >
                      {error}
                    </p>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor={`${formId}-name`} className={marketing.label}>
                        Full Name <span aria-label="required">*</span>
                      </label>
                      <input
                        id={`${formId}-name`}
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleField('name')}
                        placeholder="John Smith"
                        className={marketing.input}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-email`} className={marketing.label}>
                        Work Email <span aria-label="required">*</span>
                      </label>
                      <input
                        id={`${formId}-email`}
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleField('email')}
                        placeholder="john@company.com"
                        className={marketing.input}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-company`} className={marketing.label}>
                      Company <span aria-label="required">*</span>
                    </label>
                    <input
                      id={`${formId}-company`}
                      required
                      autoComplete="organization"
                      value={form.company}
                      onChange={handleField('company')}
                      placeholder="Acme Corporation"
                      className={marketing.input}
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-message`} className={marketing.label}>
                      How can we help? <span aria-label="required">*</span>
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleField('message')}
                      placeholder="Tell us about your AI transformation goals, current challenges, and timeline..."
                      className={`${marketing.input} resize-none`}
                      aria-required="true"
                    />
                  </div>

                  <PrimaryButton
                    type="submit"
                    disabled={loading}
                    fullWidth
                    className="group relative gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          aria-hidden="true"
                        />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </PrimaryButton>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </MarketingSection>
  );
}
