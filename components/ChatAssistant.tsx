
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini, analyzeMealImage } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your SanFitness assistant. How can I help optimize your performance today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Filter out the initial welcome message from the API history
      // The API expects the history to start with 'user'
      const apiHistory = messages
        .filter((msg, index) => !(index === 0 && msg.role === 'model'))
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

      const response = await chatWithGemini(apiHistory, userMsg);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error: any) {
      console.error("Chat Error Details:", error);
      const errorMessage = error.message || JSON.stringify(error) || "Unknown error";
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: "Analyzing your photo..." }]);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const analysis = await analyzeMealImage(base64);
        setMessages(prev => [...prev, { role: 'model', content: analysis }]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'model', content: "Failed to analyze the image." }]);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] mb-4 glass-card rounded-2xl flex flex-col shadow-2xl border border-primary/20 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-surface-dark p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">bolt</span>
              </div>
              <span className="text-white font-bold">SanBot Performance AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user'
                  ? 'bg-primary text-background-dark font-medium'
                  : 'bg-white/5 text-white/90 border border-white/5'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex gap-1">
                  <div className="size-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="size-1.5 bg-primary rounded-full animate-bounce delay-75"></div>
                  <div className="size-1.5 bg-primary rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-surface-dark border-t border-white/5">
            <div className="flex items-center gap-2 bg-background-dark/50 rounded-xl p-2 border border-white/5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-white/40 hover:text-primary transition-colors p-1"
                title="Analyze meal/label photo"
              >
                <span className="material-symbols-outlined">add_a_photo</span>
              </button>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
              />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="text-primary disabled:text-white/20 transition-colors p-1"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
      >
        <span className="material-symbols-outlined text-3xl font-bold group-hover:rotate-12 transition-transform">
          {isOpen ? 'chat_bubble_outline' : 'chat'}
        </span>
      </button>
    </div>
  );
};

export default ChatAssistant;
