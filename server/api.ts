import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
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

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Request validation middleware
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  next();
};

app.use(validateRequest);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'KYRO API is running' });
});

// POST /api/chat - Handle message and get AI response
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { conversationId, message } = req.body;

    // Validate input
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (!conversationId?.trim()) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }

    // Validate conversation exists or create new one
    let conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true }
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { id: conversationId, messages: { create: [] } },
        include: { messages: true }
      });
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        conversationId,
        role: 'user',
        content: message.trim()
      }
    });

    // Prepare conversation history for API
    const messageHistory = conversation.messages.map((msg: { role: any; content: any; }) => ({
      role: msg.role,
      content: msg.content
    }));

    messageHistory.push({
      role: 'user',
      content: message.trim()
    });

    // Call Groq API
    let aiResponse: string;
    try {
      const requestBody = {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messageHistory
        ],
        max_tokens: 1024,
        temperature: 0.7
      };

      console.log('API Key (first 20 chars):', GROQ_API_KEY?.substring(0, 20));
      console.log('Sending to Groq:', JSON.stringify(requestBody, null, 2).substring(0, 200));

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Groq API Error Response:', JSON.stringify(errorData, null, 2));
        throw new Error(`Groq API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      aiResponse = data.choices[0].message.content;
    } catch (apiError) {
      console.error('Groq API error:', apiError);
      return res.status(500).json({ 
        error: 'Failed to get AI response',
        details: apiError instanceof Error ? apiError.message : 'Unknown error'
      });
    }

    // Save AI response
    const assistantMessage = await prisma.message.create({
      data: {
        conversationId,
        role: 'assistant',
        content: aiResponse
      }
    });

    res.json({
      success: true,
      userMessage: userMessage,
      assistantMessage: assistantMessage
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/history - Retrieve conversation history
app.get('/api/history', async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.query;

    if (!conversationId?.toString().trim()) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId.toString() },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      conversationId: conversation.id,
      messages: conversation.messages,
      createdAt: conversation.createdAt
    });

  } catch (error) {
    console.error('History endpoint error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/conversations - Create new conversation
app.post('/api/conversations', async (req: Request, res: Response) => {
  try {
    const conversation = await prisma.conversation.create({
      data: {}
    });

    res.json({
      success: true,
      conversation: conversation
    });

  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ 
      error: 'Failed to create conversation',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 KYRO API Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: SQLite (${process.env.DATABASE_URL})`);
  console.log(`🔌 CORS enabled for: ${FRONTEND_URL}\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
