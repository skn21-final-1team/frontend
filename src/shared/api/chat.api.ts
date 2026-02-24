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
  return response
}

export const getChatsByNotebook = async (notebookId: number): Promise<Chat[]> => {
  const response = await fetcher.get<Chat[]>(`/chat/notebook/${notebookId}`)
  return response
}

export type StreamChatResponse = {
  event: 'messages' | 'end'
  data: string
}

// export const streamChat = async (
//   data: CreateChatRequest,
//   onMessage: (msg: string) => void,
//   onFinish?: () => void,
// ) => {
//   try {
//     await rawAPI.post('/api/chat', data, {
//       onDownloadProgress: (progressEvent) => {
//         const response = progressEvent.event.target.responseText
//         const parsedResponse = JSON.parse(response)
//         onMessage(parsedResponse.data)
//       },
//     })

//     onFinish?.()
//   } catch (error) {
//     console.error('Stream error:', error)
//     throw error
//   }
// }
