"use client"

import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';

import { useChatStore } from '@/lib/store';
import { sendChatMessage } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface ChatbotProps {
  onRefreshData?: () => void;
}

export function Chatbot({ onRefreshData }: ChatbotProps) {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  // User/Session State
  const [name, setName] = useState('');
  const [sessionId, setSessionId] = useState('');

  // Zustand store for message history
  const { messages, addMessage } = useChatStore();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Effect to load user info from localStorage on component mount
  useEffect(() => {
    let storedSessionId = localStorage.getItem('chatSessionId');
    const storedName = localStorage.getItem('chatUserName');

    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('chatSessionId', storedSessionId);
    }

    setSessionId(storedSessionId);
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);


  // TanStack Mutation for sending messages
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      addMessage({ role: 'ai', text: data });
      // Refresh data on the page after successful AI response
      if (onRefreshData) {
        console.log('Refreshing data after AI response');
        onRefreshData();
      }
    },
    onError: (error) => {
      addMessage({ role: 'ai', text: `Sorry, something went wrong: ${error.message}` });
    }
  });

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = (e.target as any).name.value;
    if (enteredName.trim()) {
      setName(enteredName);
      localStorage.setItem('chatUserName', enteredName);
    }
  };

  const handleSend = () => {
    if (!input.trim() || !sessionId) return;

    addMessage({ role: 'human', text: input });
    sendMessage({ message: input, session_id: sessionId });
    setInput('');
  };

  return (
    <div>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg z-50 flex items-center transition-all duration-300 ease-in-out ${isOpen ? 'w-14 justify-center' : 'w-auto px-6 gap-x-3'}`
        }
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6" />
            <span className="text-md font-medium">Meet AI Waiter</span>
          </>
        )}
      </Button>

      {/* Chat Popup */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[34rem] flex flex-col shadow-2xl z-50 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between mt-3 -mb-3">
            <CardTitle>Welcome{name && `, ${name}`}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {!name ? (
            // --- Name Input View ---
            <CardContent className="flex-1 flex items-center justify-center">
              <form onSubmit={handleNameSubmit} className="space-y-4 text-center">
                <p>What should we call you?</p>
                <Input name="name" placeholder="Enter your name..." required />
                <Button type="submit">Start Chatting</Button>
              </form>
            </CardContent>
          ) : (
            // --- Main Chat View ---
            <>
              <CardContent ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-3 py-2 max-w-xs break-words ${msg.role === 'human'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full items-center space-x-2 -mt-3"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isPending}
                  />
                  <Button type="submit" size="icon" disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
}