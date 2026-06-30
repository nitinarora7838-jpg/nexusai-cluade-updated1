import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are an AI assistant for Nexus AI — an enterprise AI platform that delivers intelligent automation systems, AI agents, and real-time monitoring solutions.

Your role is to:
1. Answer questions about Nexus AI's products: Automation Suite, Monitoring Platform, and AI Agents
2. Qualify leads by understanding their business needs and company size
3. Guide interested prospects to book a demo or contact the sales team
4. Be concise — WhatsApp messages should be short and conversational (2-4 sentences max)

Key facts about Nexus AI:
- Enterprise AI platform founded in 2021
- Products: Intelligent Process Automation, Real-time Monitoring, AI Agent Orchestration
- Industries: Manufacturing, Healthcare, Finance, Retail, Logistics
- Contact: ai@nexus-aisolution.com | nexus-aisolution.com

When someone wants to book a demo or speak to sales, ask for their name, company, and email, then confirm you'll have the team reach out.

If asked something outside your knowledge, say you'll have a specialist follow up.`;

export async function generateAIReply(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return "Thanks for reaching out to Nexus AI! Our team will get back to you shortly. For immediate assistance, email ai@nexus-aisolution.com";
  }

  const client = new Anthropic({ apiKey });

  const messages: Anthropic.MessageParam[] = [
    ...conversationHistory.slice(-10),
    { role: 'user', content: userMessage },
  ];

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages,
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : "Thanks for your message! Our team will follow up shortly.";
}
