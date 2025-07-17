import axios from 'axios';

// Define the type for a single sweet based on your backend model
export interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

// Define an interface for our search parameters
export interface SearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface PurchasePayload {
  sweetId: string;
  quantity: number;
}

export interface AddSweetPayload {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface RestockPayload {
  sweetId: string;
  quantity: number;
}

// Create an Axios instance pointing to your backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000', // Your backend server URL
});

// Function to fetch all sweets
export const fetchSweets = async (): Promise<Sweet[]> => {
  const { data } = await api.get('/view-all');
  return data;
};

// Function to fetch all unique categories
export const fetchCategories = async (): Promise<string[]> => {
  const { data } = await api.get('/categories');
  return data;
};

// Function to search for sweets
export const searchSweets = async (params: SearchParams): Promise<Sweet[]> => {
  const { data } = await api.get('/search', { params });
  return data;
};

// Function to purchase a sweet
export const purchaseSweet = async ({ sweetId, quantity }: PurchasePayload) => {
  const { data } = await api.post(`/purchase/${sweetId}`, { quantity });
  return data;
};

export const addSweet = async (payload: AddSweetPayload): Promise<Sweet> => {
  const { data } = await api.post('/add', payload);
  return data;
};

// Function to restock a sweet
export const restockSweet = async ({ sweetId, quantity }: RestockPayload) => {
  const { data } = await api.post(`/restock/${sweetId}`, { quantity });
  return data;
};

// Function to delete a sweet
export const deleteSweet = async (sweetId: string) => {
  const { data } = await api.delete(`/delete/${sweetId}`);
  return data;
};


const chatbotApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000', // Your Python server URL
});

interface ChatPayload {
  message: string;
  session_id: string;
}

export const sendChatMessage = async (payload: ChatPayload): Promise<string> => {
  const { data } = await chatbotApi.post('/chat', payload);
  return data.response;
};