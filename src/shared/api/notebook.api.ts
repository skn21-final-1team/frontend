import { api } from '@/shared/utils/axios';

export interface Notebook {
  id: number;
  title: string;
}

export const getNotebooks = async (): Promise<Notebook[]> => {
  const response = await api.get('/notebook/');
  return response.data.data;
};

export const getNotebook = async (id: number): Promise<Notebook> => {
  const response = await api.get(`/notebook/${id}`);
  return response.data.data;
};

export const createNotebook = async (title: string): Promise<Notebook> => {
  const response = await api.post('/notebook/', { title });
  return response.data.data;
};

export const updateNotebook = async (id: number, title: string): Promise<Notebook> => {
  const response = await api.patch(`/notebook/${id}`, { title });
  return response.data.data;
};

export const deleteNotebook = async (id: number): Promise<Notebook> => {
  const response = await api.delete(`/notebook/${id}`);
  return response.data.data;
};
