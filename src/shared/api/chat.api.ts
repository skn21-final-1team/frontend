import { api } from '@/shared/utils/axios';

export interface Chat {
  id: number;
  role: string;
  message: string;
  created_at: string;
  notebook_id: number;
}

export interface CreateChatRequest {
  role: string;
  message: string;
  notebook_id: number;
}

export const getChat = async (chatId: number): Promise<Chat> => {
  const response = await api.get(`/chat/${chatId}`);
  return response.data.data;
};

export const getChatsByNotebook = async (notebookId: number): Promise<Chat[]> => {
  const response = await api.get(`/chat/notebook/${notebookId}`);
  return response.data.data;
};

export const createChat = async (data: CreateChatRequest): Promise<Chat> => {
  const response = await api.post('/chat/', data);
  return response.data.data;
};
