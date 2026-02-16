import { api } from '@/shared/utils/axios';

export interface Directory {
  id: number;
  title: string;
  notebook_id: number;
  parent_id: number | null;
}

export interface DirectoryRequest {
  title: string;
  parent_id: number | null;
}

export const createDirectory = async (
  notebookId: number,
  data: DirectoryRequest
): Promise<Directory> => {
  const response = await api.post('/directory/', { ...data, notebook_id: notebookId });
  return response.data.data;
};

export const getDirectories = async (
  notebookId: number,
  parentId?: number | null
): Promise<Directory[]> => {
  const params: Record<string, string | number> = { notebook_id: notebookId };
  if (parentId !== undefined) {
    params.parent_id = parentId ?? '';
  }
  const response = await api.get('/directory/', { params });
  return response.data.data;
};

export const getDirectory = async (directoryId: number): Promise<Directory> => {
  const response = await api.get(`/directory/${directoryId}`);
  return response.data.data;
};

export const updateDirectory = async (
  directoryId: number,
  data: DirectoryRequest
): Promise<Directory> => {
  const response = await api.patch(`/directory/${directoryId}`, data);
  return response.data.data;
};

export const deleteDirectory = async (directoryId: number): Promise<Directory> => {
  const response = await api.delete(`/directory/${directoryId}`);
  return response.data.data;
};
