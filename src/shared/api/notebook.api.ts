import { fetcher } from '@/shared/utils/fetcher'
import { useUserStore } from '@/shared/store/user-store'

export interface Notebook {
  id: number
  title: string
}

const getUserId = () => useUserStore.getState().user?.id

export const getNotebooks = async (): Promise<Notebook[]> => {
  const response = await fetcher.get<Notebook[]>(`/notebook/list?user_id=${getUserId()}`)
  return response
}

export const getNotebook = async (id: number): Promise<Notebook> => {
  const response = await fetcher.get<Notebook>(`/notebook/${id}`)
  return response
}

export const createNotebook = async (title: string): Promise<Notebook> => {
  const response = await fetcher.post<Notebook>(`/notebook?user_id=${getUserId()}`, { title })
  return response
}

export const updateNotebook = async (id: number, title: string): Promise<Notebook> => {
  const response = await fetcher.patch<Notebook>(`/notebook/${id}`, { title })
  return response
}

export const deleteNotebook = async (id: number) => {
  const response = await fetcher.delete(`/notebook/${id}`)
  return response
}