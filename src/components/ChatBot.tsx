import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, SendIcon, UserIcon, SparklesIcon, Trash2Icon, AlertCircleIcon } from 'lucide-react';
import { sendMessage, createConversation, checkApiHealth } from '../utils/chatApi';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const CONVERSATION_ID_KEY = 'know-your-voice-conversation-id';
const BOT_AVATAR = "/3ba5fab1d81e66ac60f2c12a290f9641.jpg";

const welcomeMessage: Message = {
  id: 'welcome',
  text: "Welcome to KYRO! 👋 I'm your AI guide for digital education. Here you can learn about effective communication, online safety, and responsible expression on social media platforms. What would you like to learn about today?",
  sender: 'bot',
  timestamp: new Date().toISOString()
};

const getOrCreateConversationId = async (): Promise<string> => {
  try {
    // Check if we have a stored conversation ID
    const stored = localStorage.getItem(CONVERSATION_ID_KEY);
    if (stored) {
      return stored;
    }

    // Create a new conversation
    const response = await createConversation();
    const conversationId = response.conversation.id;
    localStorage.setItem(CONVERSATION_ID_KEY, conversationId);
    return conversationId;
  } catch (error) {
    console.error('Failed to get/create conversation:', error);
    // Fallback: generate a temporary ID
    return `temp-${Date.now()}`;
  }
};

const loadMessagesFromStorage = (): Message[] => {
  try {
    const stored = localStorage.getItem('know-your-voice-chat-messages');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [welcomeMessage];
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessagesFromStorage);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isApiHealthy, setIsApiHealthy] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation ID and check API health
  useEffect(() => {
    const initialize = async () => {
      const id = await getOrCreateConversationId();
      setConversationId(id);

      // Check API health
      const healthy = await checkApiHealth();
      setIsApiHealthy(healthy);

      if (!healthy) {
        setApiError('Backend API is not available. Please ensure the server is running.');
        console.warn('KYRO API is not responding. Running in offline mode.');
      }
    };

    initialize();
  }, []);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem('know-your-voice-chat-messages', JSON.stringify(messages));
  }, [messages]);

  // Listen for external events to open chat
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const quickSuggestions = [
    'How do I express my opinion respectfully?',
    "I want to share something but I'm worried",
    'What are my digital rights?',
    'Tips for online safety'
  ];

  const handleClearChat = () => {
    setMessages([welcomeMessage]);
    localStorage.setItem('know-your-voice-chat-messages', JSON.stringify([welcomeMessage]));
    setApiError(null);
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping || !conversationId) return;

    // Check if API is available
    if (!isApiHealthy) {
      setApiError('Cannot send message: Backend API is not available.');
      return;
    }

    // Add user message to UI
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);
    setApiError(null);

    try {
      // Send message to backend
      const response = await sendMessage(conversationId, text);

      // Add assistant response to UI
      const newBotMsg: Message = {
        id: response.assistantMessage.id,
        text: response.assistantMessage.content,
        sender: 'bot',
        timestamp: response.assistantMessage.createdAt
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setApiError(`Failed to get response: ${errorMessage}`);

      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an issue. Please try again!',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl z-50 overflow-hidden border-2 border-primary hover:border-primary-hover transition-colors"
            aria-label="Open chat">
            <img src={BOT_AVATAR} alt="Chat" className="w-full h-full object-cover" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 w-[370px] sm:w-[420px] h-[550px] max-h-[85vh] bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50 overflow-hidden">

            {/* Header */}
            <div className="bg-primary p-5 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src={BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="font-serif font-bold text-lg">KYRO</span>
                  <p className="text-xs text-white/80">AI-powered • Always here to listen</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClearChat}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  title="Clear chat history">
                  <Trash2Icon size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1">
                  <XIcon size={22} />
                </button>
              </div>
            </div>

            {/* API Error Alert */}
            {apiError && (
              <div className="bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800 p-3 flex items-start gap-2">
                <AlertCircleIcon size={16} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 dark:text-red-300">{apiError}</p>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/50 dark:bg-gray-800/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ${
                        msg.sender === 'user'
                          ? 'bg-gray-200 dark:bg-gray-700 ml-2'
                          : 'mr-2'
                      }`}>
                      {msg.sender === 'user' ? (
                        <UserIcon size={14} className="text-gray-600 dark:text-gray-300" />
                      ) : (
                        <img src={BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-surface dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-sm'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex flex-row max-w-[80%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full mr-2 overflow-hidden">
                      <img src={BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 bg-surface dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-tl-none shadow-sm flex space-x-1.5 items-center">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    disabled={isTyping || !isApiHealthy}
                    className="flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 px-2.5 py-1.5 rounded-full transition-colors">
                    <SparklesIcon size={10} className="mr-1 text-primary" />
                    {suggestion}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Express yourself freely..."
                  disabled={isTyping || !isApiHealthy}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-gray-100 dark:focus:bg-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-full px-4 py-3 text-sm outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping || !isApiHealthy}
                  className="w-11 h-11 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                  <SendIcon size={16} className="ml-0.5 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};