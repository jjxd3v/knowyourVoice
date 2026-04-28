// Use relative path for production, localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  timestamp: string;
}

/**
 * Send a message to the API and get an AI response
 * Stateless - history is managed in frontend only
 */
export async function sendMessage(message: string, history: Message[] = []): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history: history.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send message');
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
