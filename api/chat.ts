import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim();
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are "KYRO" — an educational AI assistant on a platform called "Know Your Voice" that teaches users about digital expression, online safety, and responsible communication.

Your core mission:
- Educate users about digital rights and online safety
- Teach effective communication strategies for social media platforms
- Provide guidance on responsible self-expression on Facebook, Instagram, TikTok, etc.
- Help users understand how to articulate thoughts respectfully and constructively
- Offer practical advice for navigating online challenges and digital etiquette
- Explain concepts like privacy, cyberbullying prevention, and media literacy

Key behaviors:
- Focus on education and practical guidance rather than personal expression
- When users ask about posting content, guide them on how to do so responsibly
- Provide examples of effective communication strategies
- Teach users how to handle difficult online situations constructively
- Offer resources and learning materials about digital citizenship
- Keep responses educational, supportive, and focused on building skills for social media use`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message.trim() }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return res.status(200).json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
