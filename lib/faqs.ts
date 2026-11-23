export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What’s the difference between AI Voice Chat and AI Voice Agents?',
    answer:
      'AI Voice Chat lives on your website, app or WhatsApp: visitors tap a button and talk to it. AI Voice Agents handle real phone calls: they answer your business number and call your leads and customers.',
  },
  {
    question: 'Which languages do you support?',
    answer:
      'English and other languages, including people switching languages mid-sentence. Tell us which languages your customers speak, and on the free call we’ll tell you honestly what works well today.',
  },
  {
    question: 'Will people know they’re talking to AI?',
    answer:
      'Yes. Our assistants always say they’re an AI assistant. Being upfront builds trust, and people can ask for a human at any time.',
  },
  {
    question: 'What happens if the AI can’t answer?',
    answer:
      'It doesn’t guess. It hands the conversation to your team with a short summary, or takes the person’s details and schedules a callback.',
  },
  {
    question: 'Do I need a tech team?',
    answer:
      'No. We design, build, connect and run everything. Your team only shares information about your business and reviews the results with us.',
  },
  {
    question: 'Which phone numbers and telephony providers do you work with?',
    answer:
      'We work with providers such as Exotel and Twilio, and can usually forward calls from your existing business number. We’ll confirm the best option for your setup on the free call.',
  },
  {
    question: 'Which CRMs can you connect to?',
    answer:
      'Zoho CRM, HubSpot, Salesforce, Freshdesk and Google Sheets are the most common. If your CRM has an API, we can usually connect it.',
  },
  {
    question: 'How long does it take to go live?',
    answer:
      'Usually about a week to build, then a 2-week pilot on real calls, chats or tasks. It depends on how many tools we connect, and you’ll get a clear plan after the consultation.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Pricing has three parts: a one-time setup fee, a monthly managed-service fee, and usage (call minutes or messages). We share exact pilot pricing after the free consultation.',
  },
  {
    question: 'Is our data safe?',
    answer:
      'Recordings and transcripts are visible only to your authorised team. We handle personal data in line with the data-protection laws that apply to your business and use it only to run your service.',
  },
];
