import { AIAssistantMessage } from '../types';
import { MessageSquare, Send } from 'lucide-react';
import Button from './ui/Button';
import TextToSpeech from './accessibility/TextToSpeech';
import { usePreferences } from '../context/PreferencesContext';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';

const AZURE_OPENAI_BASE = "https://thisisoajo.openai.azure.com";
const AZURE_OPENAI_MODEL = "gpt-4o";
const AZURE_OPENAI_KEY = "9I4UEJweVUdih04Uv8AXcAxs5H8jSQRfwaugcSQYHcI882wSpFvqJQQJ99BAACL93NaXJ3w3AAABACOGkv4f";
const AZURE_OPENAI_VERSION = "2023-06-01-preview";
const SYSTEM_PROMPT = "Guide in writing carrier driven prompt not more than 4 words or so.";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const { preferences } = usePreferences();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIAssistantMessage[]>([{
    id: uuidv4(),
    role: 'assistant',
    content: "Hello! I'm your AI assistant. How can I help you today?",
    timestamp: new Date(),
  }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getFontClass = () => {
    switch (preferences.fontSize) {
      case 'large': return 'text-lg';
      case 'x-large': return 'text-xl';
      default: return 'text-base';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: AIAssistantMessage = {
      id: uuidv4(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const res = await fetch(
        `${AZURE_OPENAI_BASE}/openai/deployments/${AZURE_OPENAI_MODEL}/chat/completions?api-version=${AZURE_OPENAI_VERSION}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': AZURE_OPENAI_KEY,
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: 'user', content: input }
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );

      const data = await res.json();
      const assistantResponse = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";

      const assistantMessage: AIAssistantMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI error:', error);
      setMessages(prev => [...prev, {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, something went wrong.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 dark:bg-blue-800 text-white flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>

      <div className={`flex-1 p-4 overflow-y-auto ${getFontClass()}`}>
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' 
                ? 'ml-auto max-w-[80%]' 
                : 'mr-auto max-w-[80%]'
            }`}
          >
            <div 
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-white rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
              }`}
            >
              <div className="flex justify-between items-start">
                <p>{message.content}</p>
                {message.role === 'assistant' && (
                  <div className="ml-2 flex-shrink-0">
                    <TextToSpeech text={message.content} element="icon" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={isProcessing}
          />
          <Button 
            type="submit"
            variant="primary"
            disabled={isProcessing || !input.trim()}
            icon={<Send className="h-4 w-4" />}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;