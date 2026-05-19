import type { VercelRequest, VercelResponse } from '@vercel/node';
import { KYRO_SYSTEM_PROMPT } from '../prompts/kyroSystemPrompt';

const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim();
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Supported file types for upload - only images work with Groq vision model
const SUPPORTED_FILE_TYPES = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image'
};

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
    const { message, history = [], file } = req.body;

    if (!message?.trim() && !file) {
      return res.status(400).json({ error: 'Message or file is required' });
    }

    // Build conversation messages
    const conversationMessages: any[] = [
      { role: 'system', content: KYRO_SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Handle file upload (images only - Groq vision model)
    if (file) {
      const { type, data } = file;
      const fileType = SUPPORTED_FILE_TYPES[type as keyof typeof SUPPORTED_FILE_TYPES];

      if (!fileType) {
        return res.status(400).json({ error: `Unsupported file type: ${type}. Only images (JPG, PNG, WEBP) are supported.` });
      }

      // For images, use vision capabilities with base64 encoding
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
      // Regular text message
      conversationMessages.push({
        role: 'user',
        content: message.trim()
      });
    }

    // Determine model based on whether there's an image
    const hasImage = file && SUPPORTED_FILE_TYPES[file.type as keyof typeof SUPPORTED_FILE_TYPES] === 'image';
    const model = hasImage ? 'llama-3.2-90b-vision-preview' : 'llama-3.3-70b-versatile';

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: conversationMessages,
        max_tokens: 2048,
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
