import { Mail, Phone, MapPin, type LucideIcon } from 'lucide-react';
import type { AccentKind } from '@/lib/theme';

export const CALENDLY_URL = 'https://calendly.com/nitinarora81788/30min';

export const CONTACT_BENEFITS = [
  'Free AI readiness assessment',
  'Custom transformation roadmap',
  'ROI projection & business case',
  'Proof of concept in 2 weeks',
] as const;

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: AccentKind;
}

export const CONTACT_ITEMS: ContactItem[] = [
  { icon: Mail, label: 'Email', value: 'ai@nexus-aisolution.com', accent: 'healthcare' },
  { icon: Phone, label: 'Phone', value: '+91 8178840058', accent: 'agriculture' },
  { icon: MapPin, label: 'HQ', value: 'DLF Cyber Park Tower A, Gurugram, IN', accent: 'healthcare' },
];
