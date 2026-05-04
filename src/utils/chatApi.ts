// Use relative path for production, localhost for development
// For local dev, you can set VITE_API_URL in .env to point to your deployed Vercel API
// Example: VITE_API_URL=https://your-site.vercel.app/api
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

// Check if we're in local development
const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentType?: string;
}

export interface UploadedFile {
  type: string;
  data: string; // base64 encoded
  name: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  timestamp: string;
}

// Maximum file size (2MB for images, Vercel has 4.5MB payload limit)
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// Supported file types
const SUPPORTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

/**
 * Read a file and convert to base64
 */
export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // For images, check original size (base64 adds ~33% overhead)
    const effectiveLimit = file.type.startsWith('image/') ? MAX_FILE_SIZE : 2 * 1024 * 1024;
    if (file.size > effectiveLimit) {
      reject(new Error(`File too large. Maximum size is ${effectiveLimit / 1024 / 1024}MB for ${file.type.startsWith('image/') ? 'images' : 'files'}. Please use a smaller file.`));
      return;
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      reject(new Error(`Unsupported file type: ${file.type}. Supported: Images (JPG, PNG, WEBP), Documents (PDF, DOCX), Text (TXT)`));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Send a message to the API and get an AI response
 * Stateless - history is managed in frontend only
 */
export async function sendMessage(
  message: string,
  history: Message[] = [],
  file?: UploadedFile
): Promise<ChatResponse> {
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
      })),
      file
    })
  });

  if (!response.ok) {
    let errorMessage = 'Failed to send message';
    try {
      const error = await response.json();
      errorMessage = error.error || error.details || `Server error: ${response.status}`;
    } catch {
      // If can't parse JSON, use status text
      errorMessage = `Server error: ${response.status} - ${response.statusText}`;
    }
    throw new Error(errorMessage);
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
  } catch (error) {
    if (isLocalDev && API_BASE_URL === '/api') {
      console.warn('⚠️ Local development: API not available. Set VITE_API_URL in .env to use deployed API.');
    }
    return false;
  }
}
