import { create } from 'zustand'
import { Chat, getChatsByNotebook } from '@/shared/api/chat.api'
import { SSE } from '@/shared/utils/fetcher'
import { ErrorAlertState } from '@/shared/components/error-alert'

let tempId = 0
const nextTempId = () => --tempId

interface ChatStore {
  messages: Chat[]
  streamingMessage: string
  isLoading: boolean
  notebookId: number | null
  error: ErrorAlertState | null
  abortController: AbortController | null

  init: (notebookId: number) => Promise<void>
  sendMessage: (message: string) => Promise<void>
  setError: (error: ErrorAlertState | null) => void
  abort: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  streamingMessage: '',
  isLoading: false,
  notebookId: null,
  error: null,
  abortController: null,
  setError: (error) => set({ error }),

  abort: () => {
    const { abortController } = get()
    if (abortController) {
      abortController.abort()
      set({ abortController: null, isLoading: false, streamingMessage: '' })
    }
  },

  init: async (notebookId) => {
    get().abort()
    set({ notebookId, messages: [], streamingMessage: '', isLoading: false })
    try {
      const chats = await getChatsByNotebook(notebookId)
      set({ messages: chats })
    } catch {
      set({
        error: { title: '불러오기 실패', description: '채팅 내역을 불러오는데 실패했습니다.' },
      })
    }
  },

  sendMessage: async (message) => {
    const { notebookId, isLoading } = get()
    if (!message.trim() || !notebookId || isLoading) return

    const abortController = new AbortController()

    set((state) => ({
      isLoading: true,
      abortController,
      messages: [
        ...state.messages,
        {
          id: nextTempId(),
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
      signal: abortController.signal,
      onMessage: (event) => {
        if (get().notebookId !== notebookId) return

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
        if (abortController.signal.aborted) return

        set({
          streamingMessage: '',
          isLoading: false,
          abortController: null,
          error: {
            title: '전송 실패',
            description: '메시지 전송에 실패했습니다. 다시 시도해주세요.',
          },
        })
      },
    })

    if (abortController.signal.aborted) return

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: nextTempId(),
          role: 'assistant' as const,
          message: aiMessage.trim(),
          created_at: new Date().toISOString(),
          notebook_id: notebookId,
        },
      ],
      streamingMessage: '',
      isLoading: false,
      abortController: null,
    }))
  },
}))
