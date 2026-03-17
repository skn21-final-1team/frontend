import { fetcher } from '@/shared/utils/fetcher'

export interface ChatSource {
  index: number
  content: string
  title?: string
  url?: string
}

export interface Chat {
  id: number
  role: 'user' | 'assistant'
  message: string
  created_at: string
  notebook_id: number
  sources?: ChatSource[]
  aborted?: boolean
}

export const getChatsByNotebook = async (notebookId: number): Promise<Chat[]> => {
  const response = await fetcher.get<Chat[]>(`/chat/notebook/${notebookId}`)
  return response.data
}
