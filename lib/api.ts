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

// Create an Axios instance pointing to your backend
const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend server URL
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