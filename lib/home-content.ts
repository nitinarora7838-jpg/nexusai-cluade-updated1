import {
  Building2,
  GraduationCap,
  Headset,
  Landmark,
  Languages,
  Plug,
  ShoppingBag,
  Stethoscope,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceSlug } from '@/lib/services';

export const heroFacts = [
  'Speaks multiple languages',
  'Works with WhatsApp, your CRM and phone system',
  'Starts with a 2-week pilot',
];

export const chooserRows: { problem: string; service: ServiceSlug; serviceName: string }[] = [
  {
    problem: 'Customers call you and you miss calls',
    service: 'voice-agents',
    serviceName: 'AI Voice Agents',
  },
  {
    problem: 'Visitors land on your website or WhatsApp and leave without asking',
    service: 'voice-chat',
    serviceName: 'AI Voice Chat',
  },
  {
    problem: 'Your team spends hours on copy-paste, follow-ups and reports',
    service: 'automation',
    serviceName: 'AI Automation',
  },
];

export const togetherFlow = [
  { title: 'Customer calls or speaks', text: 'On the phone, your website or WhatsApp.' },
  { title: 'AI understands and answers', text: 'In your customer’s language.' },
  { title: 'Action is taken', text: 'A booking, a payment link or a qualified lead.' },
  {
    title: 'Automation does the rest',
    text: 'Updates your CRM, sends a WhatsApp confirmation and notifies your team.',
  },
];

export const industries: { name: string; icon: LucideIcon; jobs: string[] }[] = [
  {
    name: 'Real estate',
    icon: Building2,
    jobs: ['Call every portal lead within a minute', 'Book site visits', 'Send the location on WhatsApp'],
  },
  {
    name: 'Clinics & healthcare',
    icon: Stethoscope,
    jobs: ['Book and reschedule appointments', 'Send appointment reminders', 'Answer questions on timings and fees'],
  },
  {
    name: 'Education',
    icon: GraduationCap,
    jobs: ['Call back admission enquiries', 'Book counselling sessions', 'Remind parents about fee deadlines'],
  },
  {
    name: 'Banking, finance & insurance',
    icon: Landmark,
    jobs: ['Payment due-date reminder calls', 'Send payment links on WhatsApp', 'Qualify loan and insurance leads'],
  },
  {
    name: 'E-commerce & D2C',
    icon: ShoppingBag,
    jobs: ['Confirm cash-on-delivery orders', 'Answer “Where is my order?”', 'Follow up abandoned carts on WhatsApp'],
  },
  {
    name: 'Logistics',
    icon: Truck,
    jobs: ['Confirm delivery addresses and slots', 'Share shipment status updates', 'Log delivery issues automatically'],
  },
];

export interface ProcessStep {
  title: string;
  duration: string;
  share: string;
  get: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Free consultation',
    duration: '30 minutes',
    share: 'How you handle calls, leads and repetitive tasks today.',
    get: 'A clear list of what AI can take over, and where to start.',
  },
  {
    title: 'Build',
    duration: 'About 1 week',
    share: 'Your FAQs, call scripts, price lists and access to the tools we’ll connect.',
    get: 'A working assistant or workflow, with test calls and sample runs to review.',
  },
  {
    title: 'Pilot',
    duration: '2 weeks, live',
    share: 'Real calls, chats or tasks, plus feedback from your team.',
    get: 'Recordings, transcripts and a results review with what to improve.',
  },
  {
    title: 'Scale',
    duration: 'Ongoing',
    share: 'Which teams and processes to roll out next.',
    get: 'Full rollout, plus monthly monitoring and improvement.',
  },
];

export const whyPoints: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Done for you',
    text: 'We design, build, connect and run it. No tech team needed, and no new tool to learn.',
    icon: Wrench,
  },
  {
    title: 'Speaks your customers’ language',
    text: 'Works in multiple languages and accents, and copes when people switch languages mid-sentence.',
    icon: Languages,
  },
  {
    title: 'Works with your tools',
    text: 'Connects to the WhatsApp number, CRM, calendar and phone system you already use.',
    icon: Plug,
  },
  {
    title: 'Human handoff and full transparency',
    text: 'Hands over to your team when needed. Every call is recorded, transcribed and summarised.',
    icon: Headset,
  },
];

export const integrations = [
  'WhatsApp',
  'Google Sheets',
  'Zoho CRM',
  'HubSpot',
  'Salesforce',
  'Freshdesk',
  'Exotel',
  'Twilio',
  'Razorpay',
  'Calendly',
];

export const trustPoints = [
  'Callers are always told they’re speaking with an AI assistant.',
  'Outbound calls follow local calling-hour and do-not-call rules.',
  'Recordings and transcripts are visible only to your authorised team.',
  'Personal data is handled in line with the data-protection laws that apply to you.',
];

export const pricingParts = [
  {
    title: 'One-time setup',
    text: 'Designing, building and connecting your assistant or workflows.',
  },
  {
    title: 'Monthly managed service',
    text: 'Hosting, monitoring, fixes and ongoing improvements, every month.',
  },
  {
    title: 'Usage',
    text: 'What you actually use: call minutes for voice, messages for WhatsApp.',
  },
];
