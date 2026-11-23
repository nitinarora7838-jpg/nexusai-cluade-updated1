'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck, Loader2 } from 'lucide-react';
import { buttonClasses } from '@/components/button-link';
import { companySizes, contactSchema, interests, type ContactInput } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

const interestFromSlug: Record<string, ContactInput['interest']> = {
  automation: 'AI Automation',
  'voice-chat': 'AI Voice Chat',
  'voice-agents': 'AI Voice Agents',
};

const inputClass =
  'block w-full rounded-xl border border-input bg-ink px-4 py-3 text-base text-fg placeholder:text-muted/80 transition-colors focus:border-brand focus:outline-none aria-[invalid=true]:border-red-400';

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', company: '', message: '', website: '' },
  });

  // Pre-select the service when arriving from a service page (/contact?interest=voice-agents)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('interest');
    if (slug && interestFromSlug[slug]) setValue('interest', interestFromSlug[slug]);
  }, [setValue]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactInput) => {
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmittedName(values.name.split(' ')[0]);
        setStatus('success');
        return;
      }
      if (res.status === 400 && data?.fieldErrors) {
        for (const [field, messages] of Object.entries(data.fieldErrors as Record<string, string[]>)) {
          if (messages?.[0]) setError(field as keyof ContactInput, { message: messages[0] });
        }
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center focus:outline-none"
      >
        <CircleCheck className="mx-auto h-10 w-10 text-brand" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">Thanks, {submittedName}. We’ve got your message.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          We’ll reply within 1 business day to set up your free 30-minute consultation.
        </p>
      </div>
    );
  }

  const describedBy = (name: keyof ContactInput, hasHint = false) =>
    [errors[name] ? `${fid(name)}-error` : null, hasHint ? `${fid(name)}-hint` : null].filter(Boolean).join(' ') ||
    undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative space-y-6 rounded-2xl border border-line bg-surface p-6 sm:p-8"
      aria-label="Book a free consultation"
    >
      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fid('website')}>Leave this field empty</label>
        <input id={fid('website')} type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fid('name')} label="Your name" error={errors.name?.message}>
          <input
            id={fid('name')}
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name')}
            {...register('name')}
          />
        </Field>
        <Field id={fid('email')} label="Work email" error={errors.email?.message}>
          <input
            id={fid('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            {...register('email')}
          />
        </Field>
        <Field id={fid('phone')} label="Phone / WhatsApp" error={errors.phone?.message}>
          <input
            id={fid('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98XXX XXXXX"
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
            {...register('phone')}
          />
        </Field>
        <Field id={fid('company')} label="Company" error={errors.company?.message}>
          <input
            id={fid('company')}
            type="text"
            autoComplete="organization"
            className={inputClass}
            aria-invalid={!!errors.company}
            aria-describedby={describedBy('company')}
            {...register('company')}
          />
        </Field>
      </div>

      <Field id={fid('companySize')} label="Company size" error={errors.companySize?.message}>
        <select
          id={fid('companySize')}
          defaultValue=""
          className={cn(inputClass, 'appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          aria-invalid={!!errors.companySize}
          aria-describedby={describedBy('companySize')}
          {...register('companySize')}
        >
          <option value="" disabled>
            Select number of employees
          </option>
          {companySizes.map((size) => (
            <option key={size} value={size}>
              {size} employees
            </option>
          ))}
        </select>
      </Field>

      <fieldset aria-describedby={errors.interest ? `${fid('interest')}-error` : undefined}>
        <legend className="mb-2 block text-sm font-medium text-fg">Interested in</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {interests.map((option) => (
            <label key={option} className="relative block cursor-pointer">
              <input
                type="radio"
                value={option}
                className="peer absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 accent-[#00D4FF]"
                {...register('interest')}
              />
              <span className="flex min-h-[48px] items-center rounded-xl border border-input bg-ink py-3 pl-11 pr-4 text-sm text-body transition-colors hover:border-white/25 peer-checked:border-brand peer-checked:text-fg">
                {option}
              </span>
            </label>
          ))}
        </div>
        {errors.interest && (
          <p id={`${fid('interest')}-error`} className="mt-2 text-sm text-red-300">
            {errors.interest.message}
          </p>
        )}
      </fieldset>

      <Field
        id={fid('message')}
        label="What would you like to automate?"
        hint="For example: “We miss calls after 7 pm” or “Our team copies leads from portals into Zoho by hand.”"
        error={errors.message?.message}
      >
        <textarea
          id={fid('message')}
          rows={5}
          className={cn(inputClass, 'resize-y')}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message', true)}
          {...register('message')}
        />
      </Field>

      {status === 'error' && (
        <div role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-sm leading-relaxed text-red-200">
          Sorry, something went wrong on our side and your message wasn’t sent. Please try again, or email us at{' '}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold underline">
            {siteConfig.email}
          </a>
          .
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={isSubmitting} className={buttonClasses('primary', 'disabled:opacity-70')}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isSubmitting ? 'Sending…' : 'Book my free consultation'}
        </button>
        <p className="text-sm text-muted">No cost, no obligation.</p>
      </div>
    </form>
  );
}
