const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatResponse {
  success: boolean;
  userMessage: Message;
  assistantMessage: Message;
}

export interface HistoryResponse {
  messages: Message[];
}

export interface ConversationResponse {
  conversation: {
    id: string;
    createdAt: string;
  };
}

/**
 * Send a message to the API and get an AI response
 */
export async function sendMessage(conversationId: string, message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversationId,
      message
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send message');
  }

  return response.json();
}

/**
 * Get conversation history for a specific conversation
 */
export async function getConversationHistory(conversationId: string): Promise<HistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/api/history?conversationId=${conversationId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get conversation history');
  }

  return response.json();
}

/**
 * Create a new conversation
 */
export async function createConversation(): Promise<ConversationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create conversation');
  }

  return response.json();
}

/**
 * Check if the API is healthy and available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET'
    });
    return response.ok;
  } catch {
    return false;
  }
}
