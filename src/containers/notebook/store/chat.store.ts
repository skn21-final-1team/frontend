import { create } from 'zustand'
import { type Chat, type ChatSource, getChatsByNotebook } from '@/shared/api/chat.api'
import { type ErrorAlertState } from '@/shared/components/error-alert'
import { SSE } from '@/shared/utils/fetcher'

let tempId = 0
const nextTempId = () => --tempId

interface ChatStore {
  chatMessages: Chat[]
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
  chatMessages: [],
  streamingMessage: '',
  isLoading: false,
  notebookId: null,
  error: null,
  abortController: null,
  setError: (error) => set({ error }),

  abort: () => {
    const { abortController, notebookId } = get()
    if (!abortController) return

    abortController.abort()

    set((state) => ({
      abortController: null,
      isLoading: false,
      streamingMessage: '',
      chatMessages: [
        ...state.chatMessages,
        {
          id: nextTempId(),
          role: 'assistant' as const,
          message: '',
          created_at: new Date().toISOString(),
          notebook_id: notebookId!,
          aborted: true,
        },
      ],
    }))
  },

  init: async (notebookId) => {
    get().abort()
    set({
      notebookId,
      chatMessages: [],
      streamingMessage: '',
      isLoading: false,
      error: null,
    })
    try {
      const chats = await getChatsByNotebook(notebookId)
      set({ chatMessages: chats })
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
      streamingMessage: '',
      chatMessages: [
        ...state.chatMessages,
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
    let streamingSources: ChatSource[] = []

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
        if (event.event === 'sources') {
          try {
            streamingSources = JSON.parse(event.data)
          } catch {
            streamingSources = []
          }
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
      chatMessages: [
        ...state.chatMessages,
        {
          id: nextTempId(),
          role: 'assistant' as const,
          message: aiMessage.trim(),
          created_at: new Date().toISOString(),
          notebook_id: notebookId,
          sources: streamingSources.length > 0 ? streamingSources : undefined,
        },
      ],
      streamingMessage: '',
      isLoading: false,
      abortController: null,
    }))
  },
}))
