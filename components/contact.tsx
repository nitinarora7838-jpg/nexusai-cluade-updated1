'use client';

import { motion } from 'framer-motion';
import { useState, useId } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Send, Mail, Phone, MapPin, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const BENEFITS = [
  'Free AI readiness assessment',
  'Custom transformation roadmap',
  'ROI projection & business case',
  'Proof of concept in 2 weeks',
] as const;

const CONTACT_ITEMS = [
  { icon: Mail,   label: 'Email', value: 'enterprise@nexusai.com',           color: '#00D4FF' },
  { icon: Phone,  label: 'Phone', value: '+1 (888) NEXUS-AI',                color: '#6C63FF' },
  { icon: MapPin, label: 'HQ',    value: 'San Francisco, CA + New York, NY', color: '#00D4FF' },
] as const;

const INPUT_CLASS =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00D4FF]/50 transition-colors';

export default function Contact() {
  const formId                    = useId();
  const [form, setForm]           = useState<FormState>({ name: '', email: '', company: '', message: '' });
  const [sent, setSent]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await new Promise<void>(r => setTimeout(r, 1200));
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleField =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 sm:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#111827]" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#6C63FF]/4 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/3 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="tag-pill mb-4">Contact</div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            <span className="text-white">Let&apos;s Build Intelligent</span>
            <br />
            <span className="gradient-text">Enterprise Systems Together</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Talk to our enterprise AI team. We&apos;ll map your transformation journey and build a roadmap in your first session.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4 sm:space-y-5"
          >
            {/* Book call */}
            <div
              className="glass rounded-2xl border border-[#00D4FF]/20 p-5 sm:p-6"
              style={{ background: 'rgba(0,212,255,0.04)' }}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 text-[#00D4FF] flex-shrink-0" aria-hidden="true" />
                <h3 className="font-semibold text-white text-base sm:text-lg">Book a Strategy Call</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                Schedule a 45-minute discovery call with our enterprise AI architects. We&apos;ll understand your
                needs and outline an AI transformation roadmap.
              </p>
              <a
                href="https://calendly.com"
                rel="noopener noreferrer"
                target="_blank"
                className="group w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B1120] rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#6C63FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF]"
              >
                Schedule Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </div>

            {/* Contact details */}
            <ul className="space-y-2 sm:space-y-3">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, color }) => (
                <li
                  key={label}
                  className="glass rounded-xl p-3 sm:p-4 border border-white/5 flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18` }}
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-medium">{label}</div>
                    <div className="text-sm text-slate-300">{value}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* What you get */}
            <div className="glass rounded-xl p-4 sm:p-5 border border-white/5">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">
                What you get
              </p>
              <ul className="space-y-2">
                {BENEFITS.map(b => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs text-slate-400">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-strong rounded-2xl border border-white/10 p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mb-5"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2" role="alert">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 text-sm">
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
                  <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">
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
                      <label
                        htmlFor={`${formId}-name`}
                        className="text-xs text-slate-500 font-medium block mb-2"
                      >
                        Full Name <span aria-label="required">*</span>
                      </label>
                      <input
                        id={`${formId}-name`}
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleField('name')}
                        placeholder="John Smith"
                        className={INPUT_CLASS}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${formId}-email`}
                        className="text-xs text-slate-500 font-medium block mb-2"
                      >
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
                        className={INPUT_CLASS}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-company`}
                      className="text-xs text-slate-500 font-medium block mb-2"
                    >
                      Company <span aria-label="required">*</span>
                    </label>
                    <input
                      id={`${formId}-company`}
                      required
                      autoComplete="organization"
                      value={form.company}
                      onChange={handleField('company')}
                      placeholder="Acme Corporation"
                      className={INPUT_CLASS}
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-message`}
                      className="text-xs text-slate-500 font-medium block mb-2"
                    >
                      How can we help? <span aria-label="required">*</span>
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleField('message')}
                      placeholder="Tell us about your AI transformation goals, current challenges, and timeline..."
                      className={`${INPUT_CLASS} resize-none`}
                      aria-required="true"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 text-sm font-semibold text-[#0B1120] rounded-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF] transition-opacity"
                    aria-busy={loading}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#6C63FF]" />
                    <span className="relative flex items-center gap-2">
                      {loading ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full animate-spin"
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
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
