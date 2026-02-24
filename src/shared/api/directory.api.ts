import { fetcher } from '@/shared/utils/fetcher';

export interface Directory {
  id: number
  title: string
  notebook_id: number
  parent_id: number | null
}

export interface DirectoryRequest {
  title: string
  parent_id: number | null
}

export const createDirectory = async (
  notebookId: number,
  data: DirectoryRequest
): Promise<Directory> => {
  const response = await fetcher.post<Directory>('/directory/', {
    ...data,
    notebook_id: notebookId,
  })
  return response
}

export const getDirectories = async (
  notebookId: number,
  parentId?: number | null
): Promise<Directory[]> => {
  const params: Record<string, string | number> = { notebook_id: notebookId }
  if (parentId !== undefined && parentId !== null) {
    params.parent_id = parentId
  }
  const response = await fetcher.get<Directory[]>('/directory/', params)
  return response
}

export const getDirectory = async (directoryId: number): Promise<Directory> => {
  const response = await fetcher.get<Directory>(`/directory/${directoryId}`)
  return response
}

export const updateDirectory = async (
  directoryId: number,
  data: DirectoryRequest
): Promise<Directory> => {
  const response = await fetcher.patch<Directory>(`/directory/${directoryId}`, data)
  return response
}

export const deleteDirectory = async (directoryId: number) => {
  const response = await fetcher.delete(`/directory/${directoryId}`)
  return response
}
