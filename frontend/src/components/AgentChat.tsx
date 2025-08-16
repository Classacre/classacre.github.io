// AgentChat.tsx
import React, { useState } from 'react';
import { useLLM } from '../../lib/openrouter';

export default function AgentChat() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'normal' | 'fill-gaps'>('normal');
  const [speaking, setSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const llm = useLLM();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      let response;
      if (mode === 'fill-gaps') {
        // In fill gaps mode, we might want to target specific categories
        // This is just a placeholder
        response = "I'm analyzing your personality profile to find gaps in your data.";
      } else {
        response = "I'm here to help you with your personality profile.";
      }

      // Simulate streaming response (in a real app, you would use the LLM API)
      const stream = response.split(' ');
      let i = 0;
      const interval = setInterval(() => {
        if (i < stream.length) {
          setMessages(prev => [...prev, { role: 'assistant', content: stream[i] }]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      setSpeaking(false);
    } catch (error) {
      console.error('Error in LLM response', error);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Agent Chat</h2>
        <div className="flex space-x-2 mb-4">
          <button 
            className={`px-4 py-2 rounded ${mode === 'normal' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setMode('normal')}
          >
            Normal
          </button>
          <button 
            className={`px-4 py-2 rounded ${mode === 'fill-gaps' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setMode('fill-gaps')}
          >
            Fill Gaps
          </button>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="speak-replies"
            checked={speaking}
            onChange={(e) => setSpeaking(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="speak-replies">Speak replies in my voice</label>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">
            Start a conversation to fill gaps in your personality profile.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`p-3 rounded-lg max-w-xs ${message.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-700 text-white'}`}>
                {message.content}
              </div>
            ))}
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-pulse text-gray-400">Thinking...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-l px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 focus:outline-none"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}