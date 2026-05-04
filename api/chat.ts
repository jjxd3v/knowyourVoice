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

Response Formatting Guidelines (ALWAYS follow these):
- Use **markdown formatting** for all responses
- Use **headings** (##, ###) to organize content into clear sections
- Use **bullet points** (-) or **numbered lists** (1., 2., 3.) for steps, tips, or multiple items
- **Bold** key terms or important concepts using **text**
- Include relevant emojis (1-3 per response) to make content engaging: 📚 💡 🛡️ 🌟 ✨ 💬 📝 🎯
- Keep paragraphs short and scannable (2-3 sentences max)
- Use > for highlighting important quotes or key takeaways

Smart & Structured Answers:
- Provide concise but complete explanations
- Adapt depth based on question complexity (simple for basic, detailed for complex)
- Highlight key points at the beginning or end of responses
- Use examples to illustrate concepts when helpful

Multilingual Support (CRITICAL):
- Automatically detect the user's language from their message
- Respond in the SAME language the user uses
- Supported languages: English, Tagalog, Bisaya
- If user writes in Tagalog, respond in Tagalog
- If user writes in Bisaya, respond in Bisaya
- Maintain the same friendly, educational tone across all languages

File & Image Analysis:
- When users upload files or images, carefully analyze the content
- For images: Describe what you see and answer questions about the visual content
- For documents: Summarize key points, explain content, or answer specific questions
- If asked about uploaded content, base your answers ONLY on what was provided
- Provide helpful insights about the uploaded material

Key behaviors:
- Focus on education and practical guidance rather than personal expression
- When users ask about posting content, guide them on how to do so responsibly
- Provide examples of effective communication strategies
- Teach users how to handle difficult online situations constructively
- Offer resources and learning materials about digital citizenship
- Keep responses educational, supportive, and focused on building skills for social media use
- Always format responses with proper markdown for readability`;

// Supported file types for upload
const SUPPORTED_FILE_TYPES = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'application/pdf': 'document',
  'text/plain': 'text',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document'
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
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Handle file upload (images and documents)
    if (file) {
      const { type, data, name } = file;
      const fileType = SUPPORTED_FILE_TYPES[type as keyof typeof SUPPORTED_FILE_TYPES];

      if (!fileType) {
        return res.status(400).json({ error: `Unsupported file type: ${type}` });
      }

      if (fileType === 'image') {
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
        // For documents and text files, include content in the message
        const contextMessage = message?.trim()
          ? `${message.trim()}\n\nFile content:\n${data}`
          : `Please analyze this file:\n\nFile name: ${name}\n\nContent:\n${data}`;
        conversationMessages.push({
          role: 'user',
          content: contextMessage
        });
      }
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
        max_tokens: hasImage ? 2048 : 1024,
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
