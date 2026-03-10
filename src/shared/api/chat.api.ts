import { fetcher } from '@/shared/utils/fetcher'

export interface Chat {
  id: number
  role: 'user' | 'assistant'
  message: string
  created_at: string
  notebook_id: number
}

export interface CreateChatRequest {
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

export type StreamChatResponse = {
  event: 'messages' | 'end'
  data: string
}
