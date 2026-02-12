import { api } from '@/shared/utils/axios';

export interface Directory {
  id: number;
  title: string;
  notebook_id: number;
  parent_id: number | null;
}

export interface CreateDirectoryRequest {
  title: string;
  parent_id: number | null;
}

export interface UpdateDirectoryRequest {
  title: string;
  parent_id: number | null;
}

export const createDirectory = async (
  notebookId: number,
  data: CreateDirectoryRequest
): Promise<Directory> => {
  const response = await api.post(`/directory/?notebook_id=${notebookId}`, data);
  return response.data.data;
};

export const getDirectoriesByNotebook = async (notebookId: number): Promise<Directory[]> => {
  const response = await api.get(`/directory/notebook/${notebookId}`);
  return response.data.data;
};
export const getDirectoriesByParent = async (
  notebookId: number,
  parentId: number | null
): Promise<Directory[]> => {
  const params = parentId !== null ? `?notebook_id=${notebookId}&parent_id=${parentId}` : `?notebook_id=${notebookId}`;
  const response = await api.get(`/directory/${params}`);
  return response.data.data;
};

export const getDirectory = async (directoryId: number): Promise<Directory> => {
  const response = await api.get(`/directory/${directoryId}`);
  return response.data.data;
};

export const updateDirectory = async (
  directoryId: number,
  data: UpdateDirectoryRequest
): Promise<Directory> => {
  const response = await api.patch(`/directory/${directoryId}`, data);
  return response.data.data;
};

export const deleteDirectory = async (directoryId: number): Promise<Directory> => {
  const response = await api.delete(`/directory/${directoryId}`);
  return response.data.data;
};
