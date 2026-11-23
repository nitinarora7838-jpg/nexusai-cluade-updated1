-- Leads from the website contact form (/contact → /api/contact).
-- Run this once in the Supabase SQL editor.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text,
  company       text,
  company_size  text,
  interest      text,
  message       text
);

create index if not exists idx_leads_created_at on public.leads (created_at desc);

-- Row level security is ON, and there are deliberately NO policies.
-- That means the public (anon) key cannot read or write this table at all.
-- Only the server, using SUPABASE_SERVICE_ROLE_KEY (which bypasses RLS), can insert leads.
alter table public.leads enable row level security;
