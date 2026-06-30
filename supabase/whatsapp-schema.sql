-- WhatsApp leads: one row per unique phone number
create table if not exists whatsapp_leads (
  id          uuid primary key default gen_random_uuid(),
  phone       text unique not null,          -- E.164 format e.g. 14155552671
  name        text,
  email       text,
  company     text,
  notes       text,
  last_seen   timestamptz default now(),
  created_at  timestamptz default now()
);

-- Conversation log: every inbound and outbound message
create table if not exists whatsapp_conversations (
  id          uuid primary key default gen_random_uuid(),
  lead_phone  text not null references whatsapp_leads(phone) on delete cascade,
  direction   text not null check (direction in ('inbound', 'outbound')),
  message     text not null,
  message_id  text,                          -- Meta message ID (inbound only)
  created_at  timestamptz default now()
);

-- Indexes for fast lookups
create index if not exists idx_conversations_lead_phone on whatsapp_conversations(lead_phone);
create index if not exists idx_conversations_created_at on whatsapp_conversations(created_at desc);
create index if not exists idx_leads_last_seen on whatsapp_leads(last_seen desc);

-- Row Level Security (enable in production)
-- alter table whatsapp_leads enable row level security;
-- alter table whatsapp_conversations enable row level security;
