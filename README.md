# Nexus AI website

The marketing website for [Nexus AI](https://www.nexus-aisolution.com). It explains our three done-for-you services:

- **AI Automation** (`/automation`): WhatsApp Business automation, lead routing, CRM updates, document extraction, reports and internal assistants.
- **AI Voice Chat** (`/voice-chat`): a voice assistant on a website, app or WhatsApp.
- **AI Voice Agents**: AI that makes and answers real phone calls. This tab opens the dedicated Nexus AI Voice site, https://voice.nexus-aisolution.com (a separate Vercel project); `/voice-agents` redirects there.

Visitors book a free consultation at `/contact`. Each request is saved to Supabase, emailed to the team via Resend, and optionally sent to the team on WhatsApp.

## Tech stack

Next.js 13.5 (App Router), TypeScript, Tailwind CSS, shadcn/ui primitives, lucide-react icons, react-hook-form + zod, Supabase, Resend, WhatsApp Cloud API, Anthropic (Claude) for WhatsApp replies. Hosted on Vercel (pages are served worldwide from Vercel's CDN; server functions run in the region set in `vercel.json`).

The visual theme (colours, fonts, glass cards, starfield) matches the voice site; design tokens are in `tailwind.config.ts` and `app/globals.css`.

## Run it locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
cp .env.example .env.local   # then fill in the values you need (all optional for browsing the site)
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm run build       # production build
npm run start       # serve the production build
```

## Environment variables

None are needed just to browse the site. The contact form needs **at least one** of Supabase or Resend to work; with both, leads are saved and emailed.

| Name | What it's for | Required? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL. Used to save contact-form leads and WhatsApp conversations. | Optional (recommended) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only, never expose it). Needed together with the URL above. | Optional (recommended) |
| `RESEND_API_KEY` | Sends each contact-form lead to the team by email via Resend. | Optional (recommended) |
| `RESEND_FROM_EMAIL` | Sender for those emails, e.g. `Nexus AI <hello@nexus-aisolution.com>`. Must be a domain verified in Resend. Defaults to `Nexus AI <onboarding@resend.dev>`. | Optional |
| `CONTACT_TO_EMAIL` | Where lead emails go. Defaults to `ai@nexus-aisolution.com`. | Optional |
| `WHATSAPP_ACCESS_TOKEN` | Meta WhatsApp Cloud API token. Needed for any WhatsApp feature. | Optional (needed for WhatsApp) |
| `WHATSAPP_PHONE_NUMBER_ID` | The WhatsApp Business phone number ID from Meta. | Optional (needed for WhatsApp) |
| `WHATSAPP_APP_SECRET` | Meta app secret. The webhook rejects all incoming messages without it. | Optional (needed for the WhatsApp bot) |
| `WHATSAPP_VERIFY_TOKEN` | Any secret string you choose; used once when Meta verifies the webhook URL. | Optional (needed for the WhatsApp bot) |
| `LYZR_API_KEY` | Powers the "Ask Nexus AI" chat on every page (Lyzr agent API key). Kept on the server only; without it the chat shows a friendly error. | Required for the chat |
| `LYZR_USER_ID` | The Lyzr account user ID sent with each chat request (usually the email you use in Lyzr Studio). | Recommended for the chat |
| `LYZR_AGENT_ID` | Which Lyzr agent answers. Defaults to the Nexus AI agent (`6b0470a797f839862b625678`). | Optional |
| `ANTHROPIC_API_KEY` | Lets the WhatsApp bot write AI replies with Claude. Without it the bot sends a fixed "we'll get back to you" reply. | Optional |
| `WHATSAPP_TEAM_PHONE` | Team WhatsApp number (digits with country code, e.g. `14155552671`) that gets an alert for each new lead. | Optional |
| `WHATSAPP_ADMIN_KEY` | Long random secret protecting `/api/whatsapp/send` and `/broadcast` (sent as `Authorization: Bearer …`). If unset, those endpoints always refuse. | Optional |

## Database setup (Supabase)

In the Supabase SQL editor, run:

1. `supabase/leads-schema.sql` (contact-form leads)
2. `supabase/whatsapp-schema.sql` (WhatsApp bot, only if you use it)

Both enable row level security with no public policies, so only the server can read or write the data.

WhatsApp setup steps are in [`WHATSAPP_SETUP.md`](./WHATSAPP_SETUP.md).

## Project structure

```
app/
  page.tsx                 Homepage
  automation/ voice-chat/   Service pages (one shared template)
  contact/                 Consultation form
  api/contact/             Form handler: validate → Supabase → Resend → WhatsApp alert
  api/chat/                Website chat → Lyzr agent (keeps the API key on the server)
  api/whatsapp/            Webhook (bot), send and broadcast (admin only)
components/
  home/                    Homepage sections
  layout/                  Header, mobile menu, footer, logo
  service-page.tsx         Template for the three service pages
  section.tsx, step-list.tsx, faq.tsx, cta.tsx, service-card.tsx, …
lib/
  site.ts, services.ts, home-content.ts, faqs.ts   All website copy
  contact-schema.ts        Form validation (shared by browser and server)
  leads.ts                 Save / email / WhatsApp-alert a lead
supabase/                  SQL schemas
```

Most text on the site lives in `lib/`, so copy changes rarely need you to touch components.
