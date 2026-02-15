import { fetcher } from '@/shared/utils/fetcher'

export interface Chat {
  id: number
  role: string
  message: string
  created_at: string
  notebook_id: number
}

export interface CreateChatRequest {
  role: string
  message: string
  notebook_id: number
}

export const getChat = async (chatId: number): Promise<Chat> => {
  const response = await fetcher.get<Chat>(`/chat/${chatId}`)
  return response.data
}

export const getChatsByNotebook = async (notebookId: number): Promise<Chat[]> => {
  const response = await fetcher.get<Chat[]>(`/chat/notebook/${notebookId}`)
  return response.data
}

export const createChat = async (data: CreateChatRequest): Promise<Chat> => {
  const response = await fetcher.post<Chat>('/chat/', data)
  return response.data
}
