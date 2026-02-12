import { api } from '@/shared/utils/axios';

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data.data; 
};

export const signup = async (data: { email: string; password: string; name: string }) => {
  const response = await api.post('/signup', data);
  return response.data;
};