import { fetcher } from '@/shared/utils/fetcher'

export interface Notebook {
  id: number
  title: string
}

export const getNotebooks = async (): Promise<Notebook[]> => {
  const response = await fetcher.get<Notebook[]>(`/notebook/list`)
  return response.data
}

export const getNotebook = async (id: number): Promise<Notebook> => {
  const response = await fetcher.get<Notebook>(`/notebook/${id}`)
  return response.data
}

export const createNotebook = async (title: string): Promise<Notebook> => {
  const response = await fetcher.post<Notebook>(`/notebook`, { title })
  return response.data
}

export const updateNotebook = async (id: number, title: string): Promise<Notebook> => {
  const response = await fetcher.patch<Notebook>(`/notebook/${id}`, { title })
  return response.data
}

export const deleteNotebook = async (id: number) => {
  const response = await fetcher.delete(`/notebook/${id}`)
  return response.data
}