# Nexus AI — Enterprise AI Platform

> Intelligent automation systems, AI agents, and enterprise transformation platforms that accelerate growth, cut costs, and drive productivity across every vertical.

---

## 🚀 Overview

Nexus AI is a Next.js 13 web application showcasing the full suite of Nexus AI's enterprise products and services — from AI-powered payroll and workflow automation to real-time monitoring dashboards and generative AI solutions.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion + GSAP |
| UI Primitives | Radix UI + shadcn/ui |
| Forms | React Hook Form + Zod |
| Backend / DB | Supabase |
| Deployment | Vercel / Netlify |

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Scripts

```bash
npm run build       # Production build
npm run start       # Start production server
npm run lint        # Run ESLint
npm run typecheck   # TypeScript type-check (no emit)
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout — fonts, metadata, skip-link
│   ├── page.tsx          # Home page (code-split sections)
│   └── globals.css       # Global styles & Tailwind directives
├── components/
│   ├── navigation.tsx
│   ├── hero.tsx
│   ├── products.tsx
│   ├── services.tsx
│   ├── …                 # One file per page section
│   └── ui/               # shadcn/ui primitives
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
├── public/               # Static assets
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 🔒 Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Never commit `.env.local` to source control.** It is already listed in `.gitignore`.

## 🚢 Deployment

The project ships with both a `vercel.json` and a `netlify.toml` — deploy to whichever platform you prefer:

- **Vercel**: Import the repo at [vercel.com/new](https://vercel.com/new) and set your env vars in the project settings.
- **Netlify**: Import the repo at [app.netlify.com](https://app.netlify.com) — the `@netlify/plugin-nextjs` plugin is already configured.

## 📄 License

© 2025 Nexus AI Inc. All rights reserved.
