import { z } from 'zod';

/** Shared by the contact form (client) and /api/contact (server). */

export const companySizes = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'] as const;

export const interests = ['AI Automation', 'AI Voice Chat', 'AI Voice Agents', 'Not sure yet'] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100, 'Please keep this under 100 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your work email.')
    .email('Please enter a valid email address.')
    .max(200, 'Please keep this under 200 characters.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Please enter a phone number we can reach you on.')
    .max(20, 'Please enter a valid phone number.')
    .regex(/^\+?[\d\s()-]{8,20}$/, 'Please use digits only, with an optional + at the start.'),
  company: z.string().trim().min(1, 'Please enter your company name.').max(150, 'Please keep this under 150 characters.'),
  companySize: z.enum(companySizes, {
    errorMap: () => ({ message: 'Please choose your company size.' }),
  }),
  interest: z.enum(interests, {
    errorMap: () => ({ message: 'Please choose what you’re interested in.' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Please add a little more detail (at least 10 characters).')
    .max(3000, 'Please keep this under 3,000 characters.'),
  /** Honeypot: hidden from people, so it should always be empty. */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
