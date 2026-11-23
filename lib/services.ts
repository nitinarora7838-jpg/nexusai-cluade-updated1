import {
  AudioLines,
  BookOpen,
  CalendarCheck,
  CalendarClock,
  Compass,
  Headset,
  Inbox,
  IndianRupee,
  Languages,
  MessageCircle,
  Mic,
  PackageCheck,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  RefreshCw,
  ScanText,
  UserPlus,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { FaqItem } from '@/lib/faqs';

export type ServiceSlug = 'automation' | 'voice-chat' | 'voice-agents';

export interface Capability {
  title: string;
  text: string;
  icon: LucideIcon;
}

export interface Step {
  title: string;
  text: string;
}

export type ServiceExample =
  | {
      kind: 'rules';
      title: string;
      rules: { when: string; then: string }[];
    }
  | {
      kind: 'chat';
      title: string;
      messages: { from: 'visitor' | 'ai'; text: string }[];
      outcome: string[];
    }
  | {
      kind: 'call';
      title: string;
      lines: { from: 'caller' | 'ai'; text: string }[];
      outcome: string[];
    };

export interface Service {
  slug: ServiceSlug;
  href: `/${ServiceSlug}`;
  name: string;
  icon: LucideIcon;
  /** One line, plain words. Used on cards and in the page hero. */
  definition: string;
  /** Optional extra line under the hero definition. */
  heroNote?: string;
  cardBullets: string[];
  bestFor: string;
  meta: { title: string; description: string };
  capabilities: Capability[];
  steps: Step[];
  example: ServiceExample;
  goodFit: string[];
  faqs: FaqItem[];
}

export const services: Service[] = [
  // ─── AI Automation ──────────────────────────────────────────────
  {
    slug: 'automation',
    href: '/automation',
    name: 'AI Automation',
    icon: Workflow,
    definition: 'Custom AI workflows that take repetitive manual work off your team.',
    cardBullets: [
      'Replies and follow-ups on WhatsApp Business',
      'Captures leads and sends each one to the right person',
      'Reads invoices and documents and enters the data',
      'Keeps your CRM updated and sends scheduled reports',
    ],
    bestFor: 'Teams losing hours to copy-paste, follow-ups and reports.',
    meta: {
      title: 'AI Automation for Business: WhatsApp, CRM & Document Workflows',
      description:
        'Custom AI workflows for Indian businesses: WhatsApp Business automation, lead capture and routing, CRM updates, invoice data extraction, scheduled reports and internal AI assistants. Built and run for you.',
    },
    capabilities: [
      {
        title: 'WhatsApp Business automation',
        text: 'Instant replies, follow-ups, reminders and confirmations on the official WhatsApp Business Platform.',
        icon: MessageCircle,
      },
      {
        title: 'Lead capture and routing',
        text: 'Leads from your website, ads and portals land in one place and reach the right salesperson in seconds.',
        icon: Inbox,
      },
      {
        title: 'CRM updates',
        text: 'Calls, chats and form fills are logged in your CRM automatically, so records stay complete.',
        icon: RefreshCw,
      },
      {
        title: 'Document and invoice extraction',
        text: 'AI reads invoices, forms and PDFs, pulls out the fields you need and puts them in your sheet or system.',
        icon: ScanText,
      },
      {
        title: 'Scheduled reports',
        text: 'Daily or weekly summaries of sales, collections or support, sent to email or WhatsApp on time.',
        icon: CalendarClock,
      },
      {
        title: 'Internal AI assistant',
        text: 'A private assistant trained on your SOPs, policies and product documents that your team can ask anything.',
        icon: BookOpen,
      },
    ],
    steps: [
      {
        title: 'Map the manual work',
        text: 'On a call, we list the tasks your team repeats every day and pick the ones worth automating first.',
      },
      {
        title: 'Design and build',
        text: 'We build the workflow and connect it to your WhatsApp, CRM, sheets and email.',
      },
      {
        title: 'Test on real work',
        text: 'It runs on real data during the pilot. Your team checks the output and we fix anything that’s off.',
      },
      {
        title: 'Run and improve',
        text: 'We monitor every run, fix breakages and add new workflows when you need them.',
      },
    ],
    example: {
      kind: 'rules',
      title: 'Automations for a real-estate business',
      rules: [
        {
          when: 'A new lead comes in from a property portal or a Facebook ad',
          then: 'We send a WhatsApp welcome message, add the lead to your CRM and assign it to the right salesperson.',
        },
        {
          when: 'A site visit is booked',
          then: 'The customer gets a WhatsApp confirmation with the location pin, and a reminder 2 hours before.',
        },
        {
          when: 'A lead hasn’t replied for 3 days',
          then: 'A polite WhatsApp follow-up goes out, and the salesperson gets a reminder to call.',
        },
        {
          when: 'A vendor emails an invoice PDF',
          then: 'AI reads the invoice number, amount, GST and due date and adds them to your accounts sheet for approval.',
        },
        {
          when: 'It’s 9 am on Monday',
          then: 'Your sales head gets a WhatsApp summary of last week’s leads, site visits and bookings.',
        },
      ],
    },
    goodFit: [
      'Your team copies data between WhatsApp, sheets and your CRM every day',
      'Leads wait hours, or days, before anyone follows up',
      'Someone spends hours every week building the same reports',
      'You process invoices, forms or documents by hand',
    ],
    faqs: [
      {
        question: 'Which tools can you connect?',
        answer:
          'WhatsApp Business, Google Sheets, Zoho CRM, HubSpot, Salesforce, Freshdesk, Razorpay, Calendly, email and most tools that have an API. If you’re unsure about a tool, ask us on the free call.',
      },
      {
        question: 'Do we need the official WhatsApp Business API?',
        answer:
          'Yes, for automated messages. We help you set up the WhatsApp Business Platform with Meta on your number and get your message templates approved.',
      },
      {
        question: 'How accurate is document extraction?',
        answer:
          'It depends on the quality and layout of your documents, so we measure it on your real documents during the pilot. Anything the AI isn’t sure about is flagged for a person to check instead of being entered blindly.',
      },
      {
        question: 'Will our documents be used to train public AI models?',
        answer:
          'No. Your documents are only used to answer your team’s questions. We use business AI services whose terms say customer data isn’t used to train their models, and access is limited to your team.',
      },
      {
        question: 'What if a workflow breaks?',
        answer:
          'We monitor every workflow. If a connected tool changes or an error happens, we’re alerted and fix it as part of the monthly managed service.',
      },
    ],
  },

  // ─── AI Voice Chat ──────────────────────────────────────────────
  {
    slug: 'voice-chat',
    href: '/voice-chat',
    name: 'AI Voice Chat',
    icon: AudioLines,
    definition: 'A voice assistant on your website, app or WhatsApp that visitors can simply talk to.',
    heroNote: 'This is not a phone call. Visitors tap a mic button on your site, or send a voice note on WhatsApp, and speak.',
    cardBullets: [
      'Answers questions by voice, any time of day',
      'Guides visitors to the right product or page',
      'Collects name, number and requirements',
      'Books appointments and demos',
    ],
    bestFor: 'Websites and WhatsApp numbers where visitors leave without asking.',
    meta: {
      title: 'AI Voice Chat for Websites & WhatsApp in Hindi, English and Hinglish',
      description:
        'Add a voice assistant to your website, app or WhatsApp. Visitors talk to it in English, Hindi or Hinglish; it answers questions, guides them, collects details and books appointments.',
    },
    capabilities: [
      {
        title: 'Answers questions by voice',
        text: 'Trained on your website, brochures, prices and policies, so answers are about your business.',
        icon: Mic,
      },
      {
        title: 'English, Hindi and Hinglish',
        text: 'Visitors can switch languages mid-sentence, the way people actually talk.',
        icon: Languages,
      },
      {
        title: 'Guides people to the right place',
        text: 'Recommends the right product, course or plan and points visitors to the relevant page.',
        icon: Compass,
      },
      {
        title: 'Collects lead details',
        text: 'Asks for name, phone number and requirement during the conversation and sends them to your CRM.',
        icon: UserPlus,
      },
      {
        title: 'Books appointments',
        text: 'Checks your calendar and books a visit, demo or consultation slot.',
        icon: CalendarCheck,
      },
      {
        title: 'Hands over to your team',
        text: 'If a visitor wants a person, it passes the conversation and a summary to your team.',
        icon: Users,
      },
    ],
    steps: [
      {
        title: 'We learn your business',
        text: 'You share your website, FAQs, brochures and price lists. We turn them into the assistant’s knowledge.',
      },
      {
        title: 'We design the conversation',
        text: 'Together we agree what it should answer, what details to collect and when to hand over to a person.',
      },
      {
        title: 'We add it to your site',
        text: 'A small snippet adds a voice button to your website or app. On WhatsApp, it understands voice notes.',
      },
      {
        title: 'You see every conversation',
        text: 'Leads go to your CRM, and you can read the transcript and summary of every conversation.',
      },
    ],
    example: {
      kind: 'chat',
      title: 'Voice chat on a clinic’s website',
      messages: [
        { from: 'visitor', text: 'Hi, mujhe knee pain ke liye doctor se milna hai. Kal ka appointment mil sakta hai?' },
        {
          from: 'ai',
          text: 'Ji bilkul. Hamare orthopaedic doctor kal subah 11 baje aur shaam 4 baje available hain. Aapke liye kaunsa time theek rahega?',
        },
        { from: 'visitor', text: '4 baje theek hai. Consultation fee kitni hai?' },
        {
          from: 'ai',
          text: 'Consultation fee ₹800 hai. Booking ke liye bas aapka naam aur mobile number bata dijiye.',
        },
        { from: 'visitor', text: 'Rahul Sharma, 98XXX XXXXX.' },
        {
          from: 'ai',
          text: 'Thank you, Rahul ji. Kal shaam 4 baje ka appointment book ho gaya hai. Confirmation aur clinic ki location WhatsApp par bhej di hai.',
        },
      ],
      outcome: [
        'Appointment added to the clinic’s calendar',
        'WhatsApp confirmation sent with the location',
        'Lead saved with name, number and reason for visit',
      ],
    },
    goodFit: [
      'Many people visit your website but few fill in the form',
      'Your customers prefer speaking to typing, or are more comfortable in Hindi',
      'Your team answers the same questions on chat and WhatsApp all day',
      'You want enquiries captured and appointments booked after office hours',
    ],
    faqs: [
      {
        question: 'How is this different from a chatbot?',
        answer:
          'Visitors speak instead of typing, and the assistant replies by voice, with the text shown on screen too. It understands natural speech, including Hinglish, instead of making people pick from menus.',
      },
      {
        question: 'Does it work on mobile?',
        answer:
          'Yes. It works in mobile and desktop browsers. Visitors allow microphone access once and start talking, and they can type if they prefer.',
      },
      {
        question: 'Will it say things we haven’t approved?',
        answer:
          'It answers from the content you give us and follows rules we agree on together. If it doesn’t know something, it says so and offers to connect the visitor with your team.',
      },
      {
        question: 'How do we add it to our website?',
        answer:
          'We give you a small snippet to paste into your site, or we add it for you. It works with WordPress, Shopify, Wix and custom-built websites.',
      },
    ],
  },

  // ─── AI Voice Agents ────────────────────────────────────────────
  {
    slug: 'voice-agents',
    href: '/voice-agents',
    name: 'AI Voice Agents',
    icon: PhoneCall,
    definition: 'AI agents that make and answer real phone calls for your business, 24/7.',
    cardBullets: [
      'Answers inbound calls so none go unanswered',
      'Calls new leads back within minutes',
      'Books appointments and makes payment reminder calls',
      'Hands the call to a person when needed',
    ],
    bestFor: 'Businesses that miss calls or can’t call every lead back quickly.',
    meta: {
      title: 'AI Voice Agents for Phone Calls in Hindi, English and Hinglish',
      description:
        'AI voice agents that answer and make real phone calls 24/7: inbound support, lead follow-up, appointment booking, EMI and payment reminders and order confirmation, with warm handoff to your team.',
    },
    capabilities: [
      {
        title: 'Inbound support',
        text: 'Answers calls day and night and handles common questions on timings, prices, order status and policies.',
        icon: PhoneIncoming,
      },
      {
        title: 'Outbound lead follow-up',
        text: 'Calls new leads within minutes, asks qualifying questions and passes hot leads to your sales team.',
        icon: PhoneOutgoing,
      },
      {
        title: 'Appointment booking',
        text: 'Books, reschedules and confirms appointments, site visits or demos in your calendar.',
        icon: CalendarCheck,
      },
      {
        title: 'Payment and EMI reminders',
        text: 'Polite reminder calls before and after due dates, with a payment link sent on WhatsApp or SMS.',
        icon: IndianRupee,
      },
      {
        title: 'Order confirmation',
        text: 'Confirms cash-on-delivery orders and delivery addresses before dispatch.',
        icon: PackageCheck,
      },
      {
        title: 'Warm handoff to a human',
        text: 'When a caller asks for a person or the issue needs judgement, it transfers the call with a short summary.',
        icon: Headset,
      },
    ],
    steps: [
      {
        title: 'Script and rules',
        text: 'We write the call flow with you: what the agent says, what it asks and when it hands over.',
      },
      {
        title: 'Connect your phone system',
        text: 'We set up a number through Exotel, Twilio or your current provider, and connect your CRM and calendar.',
      },
      {
        title: 'Test calls, then pilot',
        text: 'You listen to test calls and approve them. Then it goes live on real calls for a 2-week pilot.',
      },
      {
        title: 'Review and improve',
        text: 'Every call is recorded, transcribed and summarised. We review them with you and keep improving.',
      },
    ],
    example: {
      kind: 'call',
      title: 'Outbound call to a new real-estate lead',
      lines: [
        {
          from: 'ai',
          text: 'Namaste! Main [Your company] ka AI assistant hoon. Aapne abhi 2BHK flat ke baare mein enquiry ki thi. Kya 2 minute baat kar sakte hain?',
        },
        { from: 'caller', text: 'Haan, boliye. Budget around 80 lakh hai, Whitefield side chahiye.' },
        {
          from: 'ai',
          text: 'Ji, noted. Whitefield mein aapke budget mein do projects available hain. Kya aap is weekend site visit karna chahenge?',
        },
        { from: 'caller', text: 'Saturday ko ho sakta hai, subah.' },
        { from: 'ai', text: 'Saturday subah 11 baje ka slot available hai. Book kar doon?' },
        { from: 'caller', text: 'Haan, kar dijiye.' },
        {
          from: 'ai',
          text: 'Done! Site visit Saturday 11 baje book ho gayi hai. Location aur project details aapko WhatsApp par bhej rahe hain. Hamari sales team kal aapko confirm karne ke liye call karegi.',
        },
      ],
      outcome: [
        'Lead marked “hot” in the CRM: 2BHK, Whitefield, ₹80 lakh budget',
        'Site visit booked for Saturday, 11 am',
        'Location and project details sent on WhatsApp',
        'Sales team notified with the call summary and recording',
      ],
    },
    goodFit: [
      'You miss calls after hours, on weekends or at busy times',
      'Leads from ads and portals aren’t called back within minutes',
      'Your team spends hours on routine reminder and confirmation calls',
      'You handle a large number of similar calls every day',
    ],
    faqs: [
      {
        question: 'Will callers know they’re talking to an AI?',
        answer:
          'Yes. The agent introduces itself as an AI assistant at the start of every call, and callers can ask for a person at any time.',
      },
      {
        question: 'Can we use our existing phone number?',
        answer:
          'Usually, yes. Calls can be forwarded from your current number, or we set up a new number through a provider like Exotel or Twilio. We’ll confirm what works for your setup on the free call.',
      },
      {
        question: 'What happens when the AI can’t help?',
        answer:
          'It transfers the call to your team with a short summary, so the caller doesn’t have to repeat themselves. If no one is free, it takes a message and schedules a callback.',
      },
      {
        question: 'Do outbound calls follow TRAI rules?',
        answer:
          'Yes. Outbound calls are scheduled within permitted calling hours and checked against DND preferences. We recommend calling only people who have enquired with you or are existing customers.',
      },
      {
        question: 'How natural does it sound?',
        answer:
          'It uses natural-sounding voices, handles English, Hindi and Hinglish, and copes with interruptions. You listen to test calls and approve the voice before anything goes live.',
      },
    ],
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
