import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Message = {
  role: 'human' | 'ai';
  text: string;
};

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    }),
    {
      name: 'sweet-shop-chat-history', // A unique name for the local storage item
    }
  )
);