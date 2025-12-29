
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

interface AIConsultantProps {
  lang: Language;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('https://gla-backend-api.vercel.app/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          lang: lang
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          setChatHistory(prev => [...prev, { role: 'bot', text: data.response }]);
        } else {
          console.error('API Error:', data);
          // Show specific error from backend if available
          const errorMsg = data.details || data.error || (lang === 'PT' ? 'Erro desconhecido na IA' : 'Unknown AI error');
          setChatHistory(prev => [...prev, { role: 'bot', text: `${lang === 'PT' ? 'Erro' : 'Error'}: ${errorMsg}` }]);
        }
      } else {
        const text = await response.text();
        console.error('Status Error:', response.status, text);
        setChatHistory(prev => [...prev, { role: 'bot', text: `${lang === 'PT' ? 'Erro no servidor' : 'Server error'} (${response.status}): ${text.substring(0, 100)}` }]);
      }

    } catch (error) {
      console.error('Fetch Error:', error);
      let errorMessage = lang === 'PT' ? 'Erro de conexão. Tente novamente.' : 'Connection error. Please try again.';
      if (error instanceof Error) {
        errorMessage += ` (${error.message})`;
      }
      setChatHistory(prev => [...prev, { role: 'bot', text: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[400px] h-[500px] rounded-2xl border border-surface-border bg-surface-dark shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          <div className="p-4 bg-primary text-background-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined font-bold">bolt</span>
              <span className="font-black tracking-tighter uppercase">GLA AI Consultant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 py-10 px-4">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-20">rocket_launch</span>
                <p className="text-sm">
                  {lang === 'PT'
                    ? 'Olá! Sou o consultor de inovação da GLA. Como posso ajudar com sua visão futurista hoje?'
                    : 'Hello! I am GLAs innovation consultant. How can I help with your futuristic vision today?'}
                </p>
              </div>
            )}
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${chat.role === 'user'
                  ? 'bg-primary text-background-dark font-medium rounded-tr-none'
                  : 'bg-background-dark text-white border border-surface-border rounded-tl-none'
                  }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-background-dark px-4 py-2 rounded-2xl rounded-tl-none border border-surface-border">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-surface-border bg-background-dark">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'PT' ? 'Descreva sua ideia...' : 'Describe your idea...'}
                className="flex-1 bg-surface-dark border-none focus:ring-1 focus:ring-primary rounded-lg text-sm text-white px-4 py-2"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-background-dark p-2 rounded-lg hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 bg-primary text-background-dark rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-pulse-slow"
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'chat_bubble' : 'psychology'}
        </span>
      </button>
    </div>
  );
};

export default AIConsultant;
