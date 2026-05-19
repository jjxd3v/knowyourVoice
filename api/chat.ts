import type { VercelRequest, VercelResponse } from '@vercel/node';
import { KYRO_SYSTEM_PROMPT } from './kyroSystemPrompt.js';

const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim();
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SUPPORTED_FILE_TYPES = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image'
} as const;

function parseGroqError(status: number, body: string): string {
  try {
    const parsed = JSON.parse(body);
    const message = parsed?.error?.message || parsed?.message;
    if (message) return `Groq API error (${status}): ${message}`;
  } catch {
    // body is not JSON
  }
  const snippet = body.slice(0, 300);
  return snippet
    ? `Groq API error (${status}): ${snippet}`
    : `Groq API error (${status})`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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

    const body = req.body ?? {};
    const { message, file } = body;
    const history = Array.isArray(body.history) ? body.history : [];

    if (!message?.trim() && !file) {
      return res.status(400).json({ error: 'Message or file is required' });
    }

    const conversationMessages: Array<{
      role: string;
      content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
    }> = [
      { role: 'system', content: KYRO_SYSTEM_PROMPT },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    if (file) {
      const { type, data } = file;
      const fileType = SUPPORTED_FILE_TYPES[type as keyof typeof SUPPORTED_FILE_TYPES];

      if (!fileType) {
        return res.status(400).json({
          error: `Unsupported file type: ${type}. Only images (JPG, PNG, WEBP) are supported.`
        });
      }

      conversationMessages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: message?.trim() || 'Please analyze this image and describe what you see.'
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${type};base64,${data}`
            }
          }
        ]
      });
    } else {
      conversationMessages.push({
        role: 'user',
        content: message.trim()
      });
    }

    const hasImage =
      file && SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES] === 'image';
    const model = hasImage ? 'llama-3.2-90b-vision-preview' : 'llama-3.3-70b-versatile';

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: conversationMessages,
        max_tokens: 2048,
        temperature: 0.7
      })
    });

    if (!groqResponse.ok) {
      const errorBody = await groqResponse.text();
      return res.status(500).json({
        error: 'Failed to get AI response',
        details: parseGroqError(groqResponse.status, errorBody)
      });
    }

    const data = await groqResponse.json();
    const aiResponse = data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return res.status(500).json({
        error: 'Failed to get AI response',
        details: 'Groq returned an empty response'
      });
    }

    return res.status(200).json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({
      error: 'Failed to get AI response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
