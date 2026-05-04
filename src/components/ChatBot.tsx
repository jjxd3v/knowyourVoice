import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, SendIcon, UserIcon, SparklesIcon, Trash2Icon, AlertCircleIcon, PaperclipIcon, X, FileText, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sendMessage, checkApiHealth, Message as ApiMessage, readFileAsBase64, UploadedFile } from '../utils/chatApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentType?: string;
}

interface PendingFile {
  file: File;
  preview?: string;
  base64: string;
}

const BOT_AVATAR = "/3ba5fab1d81e66ac60f2c12a290f9641.jpg";

const welcomeMessage: Message = {
  id: 'welcome',
  text: "Welcome to KYRO! 👋 I'm your AI guide for digital education. Here you can learn about effective communication, online safety, and responsible expression on social media platforms. What would you like to learn about today?",
  sender: 'bot',
  timestamp: new Date().toISOString()
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
  const [pendingFile, setPendingFile] = useState<PendingFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await checkApiHealth();
      setIsApiHealthy(healthy);

      if (!healthy) {
        // Check if running locally
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocal) {
          setApiError('⚠️ Running locally. Chatbot API only works in production or with VITE_API_URL set in .env');
        } else {
          setApiError('Backend API is not available. Please try again later.');
        }
        console.warn('KYRO API is not responding.');
      }
    };

    checkHealth();
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
    setPendingFile(null);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setApiError(null);

    try {
      const base64 = await readFileAsBase64(file);
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;

      setPendingFile({
        file,
        preview,
        base64
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
      setApiError(errorMessage);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = () => {
    if (pendingFile?.preview) {
      URL.revokeObjectURL(pendingFile.preview);
    }
    setPendingFile(null);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={16} className="text-blue-500" />;
    return <FileText size={16} className="text-orange-500" />;
  };

  const handleSend = async (text: string) => {
    if ((!text.trim() && !pendingFile) || isTyping) return;

    // Check if API is available
    if (!isApiHealthy) {
      setApiError('Cannot send message: Backend API is not available.');
      return;
    }

    // Prepare file upload data if exists
    let uploadedFile: UploadedFile | undefined;
    let displayText = text.trim();

    if (pendingFile) {
      uploadedFile = {
        type: pendingFile.file.type,
        data: pendingFile.base64,
        name: pendingFile.file.name
      };
      // Add file indicator to message text
      if (!displayText) {
        displayText = `📎 ${pendingFile.file.name}`;
      } else {
        displayText = `${displayText}\n📎 ${pendingFile.file.name}`;
      }
    }

    // Add user message to UI
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: displayText,
      sender: 'user',
      timestamp: new Date().toISOString(),
      hasAttachment: !!pendingFile,
      attachmentName: pendingFile?.file.name,
      attachmentType: pendingFile?.file.type
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);
    setApiError(null);

    // Clear pending file
    if (pendingFile?.preview) {
      URL.revokeObjectURL(pendingFile.preview);
    }
    setPendingFile(null);

    try {
      // Build history from current messages (exclude welcome message)
      const history: ApiMessage[] = messages
        .filter(msg => msg.id !== 'welcome')
        .map(msg => ({
          id: msg.id,
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
          timestamp: msg.timestamp
        }));

      // Send message to backend with history and optional file
      const response = await sendMessage(text.trim(), history, uploadedFile);

      // Add assistant response to UI
      const newBotMsg: Message = {
        id: Date.now().toString(),
        text: response.response,
        sender: 'bot',
        timestamp: response.timestamp
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
                  <div className={`flex max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                          ? 'bg-primary text-white rounded-tr-none whitespace-pre-wrap'
                          : 'bg-surface dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-none shadow-sm prose prose-sm dark:prose-invert max-w-none'
                      }`}>
                      {msg.sender === 'bot' ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        <div className="whitespace-pre-wrap">
                          {msg.text.split('\n').map((line, i) => (
                            <div key={i} className="flex items-center gap-1">
                              {line.startsWith('📎') && msg.hasAttachment && (
                                <>
                                  {getFileIcon(msg.attachmentType || '')}
                                  <span className="opacity-80 text-xs">{line.replace('📎 ', '')}</span>
                                </>
                              )}
                              {!line.startsWith('📎') && line}
                            </div>
                          ))}
                        </div>
                      )}
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
                    disabled={isTyping || !isApiHealthy || pendingFile !== null}
                    className="flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 px-2.5 py-1.5 rounded-full transition-colors">
                    <SparklesIcon size={10} className="mr-1 text-primary" />
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* File Preview */}
              {pendingFile && (
                <div className="mb-3 p-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {pendingFile.preview ? (
                        <img
                          src={pendingFile.preview}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        getFileIcon(pendingFile.file.type)
                      )}
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                        {pendingFile.file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(pendingFile.file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="text-gray-500 hover:text-red-500 transition-colors p-1"
                      disabled={isTyping}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Uploading indicator */}
              {isUploading && (
                <div className="mb-3 text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Processing file...
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={isTyping || !isApiHealthy}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isTyping || !isApiHealthy || pendingFile !== null}
                  className="w-11 h-11 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  title="Upload image (JPG, PNG, WEBP, max 2MB)">
                  <PaperclipIcon size={18} />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={pendingFile ? "Add a message about this file (optional)..." : "Express yourself freely..."}
                  disabled={isTyping || !isApiHealthy}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-gray-100 dark:focus:bg-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-full px-4 py-3 text-sm outline-none transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={(!inputValue.trim() && !pendingFile) || isTyping || !isApiHealthy}
                  className="w-11 h-11 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                  <SendIcon size={16} className="ml-0.5 text-white" />
                </button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Images: JPG, PNG, WEBP (max 2MB)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};