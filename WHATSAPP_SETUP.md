# WhatsApp Business Automation — Setup Guide

## Step 1: Meta Business App Setup

1. Go to [developers.facebook.com](https://developers.facebook.com) → Create App → Business
2. Add **WhatsApp** product to your app
3. Under **WhatsApp > API Setup**, note:
   - **Phone Number ID** → `WHATSAPP_PHONE_NUMBER_ID`
   - **Access Token** (temporary) → generate a permanent one via System User in Meta Business Suite → `WHATSAPP_ACCESS_TOKEN`

## Step 2: Environment Variables

Add these to your `.env.local` (and Vercel/Netlify environment settings):

```env
# WhatsApp Cloud API (Meta)
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=any_random_secret_string_you_choose

# Your team's WhatsApp number for contact form alerts (E.164 format, no +)
# e.g. 14155552671 for +1 (415) 555-2671
WHATSAPP_TEAM_PHONE=your_team_whatsapp_number

# Admin key to protect the /send and /broadcast endpoints
WHATSAPP_ADMIN_KEY=choose_a_strong_random_secret

# Claude AI (for chatbot replies)
ANTHROPIC_API_KEY=your_anthropic_api_key

# Supabase (already in use)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # NOT the anon key
```

## Step 3: Supabase Schema

Run the SQL in `supabase/whatsapp-schema.sql` in your Supabase SQL editor.

## Step 4: Configure Webhook in Meta Dashboard

1. Deploy your app (Vercel) so the URL is live
2. In Meta Developer Console → WhatsApp → Configuration → Webhook:
   - **Callback URL**: `https://your-domain.com/api/whatsapp/webhook`
   - **Verify Token**: same value as `WHATSAPP_VERIFY_TOKEN`
   - **Subscribe** to: `messages`

## API Endpoints

### Receive messages (webhook — called by Meta automatically)
```
GET  /api/whatsapp/webhook   ← Meta verification
POST /api/whatsapp/webhook   ← Incoming messages → AI reply + lead capture
```

### Send a single message
```
POST /api/whatsapp/send
Body: { "to": "14155552671", "message": "Hello!", "apiKey": "WHATSAPP_ADMIN_KEY" }
```

### Broadcast to all leads (or active leads from last 7 days)
```
POST /api/whatsapp/broadcast
Body: {
  "message": "🚀 New feature alert!",
  "segment": "all",          // "all" or "active" (last 7 days)
  // OR provide explicit list:
  "phones": ["14155552671", "447911123456"],
  "apiKey": "WHATSAPP_ADMIN_KEY"
}
```

## How It Works

| Event | What happens |
|---|---|
| Someone messages your WhatsApp number | Lead saved to Supabase, Claude AI replies automatically |
| Contact form submitted on website | Email sent (Resend) + WhatsApp alert to your team phone |
| You call `/broadcast` | Message sent to all leads (or active segment) |
| You call `/send` | Single message to one number |
