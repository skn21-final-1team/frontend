import { create } from 'zustand'
import { Chat, getChatsByNotebook } from '@/shared/api/chat.api'
import { SSE } from '@/shared/utils/fetcher'
import { ErrorAlertState } from '@/shared/components/error-alert'

interface ChatStore {
  messages: Chat[]
  streamingMessage: string
  isLoading: boolean
  notebookId: number | null
  error: ErrorAlertState | null

  init: (notebookId: number) => Promise<void>
  sendMessage: (message: string) => Promise<void>
  setError: (error: ErrorAlertState | null) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  streamingMessage: '',
  isLoading: false,
  notebookId: null,
  error: null,
  setError: (error) => set({ error }),

  init: async (notebookId) => {
    set({ notebookId, messages: [], streamingMessage: '', isLoading: false })
    try {
      const chats = await getChatsByNotebook(notebookId)
      set({ messages: chats })
    } catch {
      set({ error: { title: '불러오기 실패', description: '채팅 내역을 불러오는데 실패했습니다.' } })
    }
  },

  sendMessage: async (message) => {
    const { notebookId, isLoading } = get()
    if (!message.trim() || !notebookId || isLoading) return

    set((state) => ({
      isLoading: true,
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          role: 'user' as const,
          message,
          created_at: new Date().toISOString(),
          notebook_id: notebookId,
        },
      ],
    }))

    let aiMessage = ''
    await SSE({
      url: '/chat',
      data: {
        notebook_id: notebookId,
        message,
      },
      onMessage: (event) => {
        if (event.data === '') {
          set((state) => ({ streamingMessage: state.streamingMessage + '\n' }))
          aiMessage += '\n'
        }
        if (event.event === 'messages') {
          set((state) => ({ streamingMessage: state.streamingMessage + event.data }))
          aiMessage += event.data
        }
      },
      onError: () => {
        set({ isLoading: false, streamingMessage: '', error: { title: '전송 실패', description: '메시지 전송에 실패했습니다. 다시 시도해주세요.' } })
      },
    })

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now() + 1,
          role: 'assistant' as const,
          message: aiMessage.trim(),
          created_at: new Date().toISOString(),
          notebook_id: notebookId,
        },
      ],
      streamingMessage: '',
      isLoading: false,
    }))
  },
}))
