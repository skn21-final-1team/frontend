import { fetcher } from '@/shared/utils/fetcher'

export interface Notebook {
  id: number
  title: string
  pinned: boolean
  created_at: string
}

export type NotebookSortType = 'recent' | 'created_at' | 'name'

export const getNotebooks = async (sort: NotebookSortType = 'recent'): Promise<Notebook[]> => {
  const response = await fetcher.get<Notebook[]>(`/notebook/list?sort=${sort}`)
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

export interface NotebookUpdateBody {
  title?: string
  pinned?: boolean
}

export const updateNotebook = async (id: number, body: NotebookUpdateBody): Promise<Notebook> => {
  const response = await fetcher.patch<Notebook>(`/notebook/${id}`, body)
  return response.data
}

export const deleteNotebook = async (id: number) => {
  const response = await fetcher.delete(`/notebook/${id}`)
  return response.data
}