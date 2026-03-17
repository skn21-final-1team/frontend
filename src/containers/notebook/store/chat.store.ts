import { create } from 'zustand'
import { Chat, getChatsByNotebook } from '@/shared/api/chat.api'
import { StepContentEvent, SystemEvent, WorkflowStateEvent } from '@/shared/api/report-workflow.api'
import { SSE } from '@/shared/utils/fetcher'
import { ErrorAlertState } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { useReportWorkflowStore } from './report-workflow.store'

let tempId = 0
const nextTempId = () => --tempId

interface ChatStore {
  chatMessages: Chat[]
  agentMessages: Chat[]
  streamingMessage: string
  isLoading: boolean
  notebookId: number | null
  error: ErrorAlertState | null
  abortController: AbortController | null

  init: (notebookId: number) => Promise<void>
  sendMessage: (message: string) => Promise<void>
  setError: (error: ErrorAlertState | null) => void
  abort: () => void
  clearAgentMessages: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chatMessages: [],
  agentMessages: [],
  streamingMessage: '',
  isLoading: false,
  notebookId: null,
  error: null,
  abortController: null,
  setError: (error) => set({ error }),
  clearAgentMessages: () => set({ agentMessages: [] }),

  abort: () => {
    const { abortController } = get()
    if (abortController) {
      abortController.abort()
      set({ abortController: null, isLoading: false, streamingMessage: '' })
    }
  },

  init: async (notebookId) => {
    get().abort()
    const { notebookId: previousNotebookId, agentMessages: previousAgentMessages } = get()
    const shouldPreserveAgentMessages = previousNotebookId === notebookId
    set({
      notebookId,
      chatMessages: [],
      agentMessages: shouldPreserveAgentMessages ? previousAgentMessages : [],
      streamingMessage: '',
      isLoading: false,
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
    const { status, setStatus } = useAgentStatusStore.getState()
    if (status === 'ready') {
      setStatus('working')
    }

    const isReportMode = status === 'working' || status === 'ready'

    set((state) => ({
      isLoading: true,
      abortController,
      ...(isReportMode
        ? {
            agentMessages: [
              ...state.agentMessages,
              {
                id: nextTempId(),
                role: 'user' as const,
                message,
                created_at: new Date().toISOString(),
                notebook_id: notebookId,
              },
            ],
          }
        : {
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
          }),
    }))

    if (isReportMode) {
      const systemMessages: string[] = []

      await SSE({
        url: '/report-workflow/stream',
        data: {
          notebook_id: notebookId,
          message,
        },
        signal: abortController.signal,
        onMessage: (event) => {
          if (get().notebookId !== notebookId) return

          if (event.event === 'workflow_state') {
            const data = JSON.parse(event.data) as WorkflowStateEvent
            useReportWorkflowStore.getState().setWorkflowState({
              status: data.status,
              currentStepNumber: data.current_step,
            })
          }

          if (event.event === 'step_content') {
            const data = JSON.parse(event.data) as StepContentEvent
            useReportWorkflowStore.getState().setStepContent(data.step, data.content)
          }

          if (event.event === 'system') {
            const data = JSON.parse(event.data) as SystemEvent
            systemMessages.push(data.message)
            set({ streamingMessage: data.message })
          }
        },
        onError: () => {
          if (abortController.signal.aborted) return

          set({
            streamingMessage: '',
            isLoading: false,
            abortController: null,
            error: { title: '전송 실패', description: '보고서 워크플로우 실행에 실패했습니다. 다시 시도해주세요.' },
          })
        },
      })

      if (abortController.signal.aborted) return

      const assistantMessage = systemMessages.filter(Boolean).join('\n\n')

      set((state) => ({
        agentMessages: assistantMessage
          ? [
              ...state.agentMessages,
              {
                id: nextTempId(),
                role: 'assistant' as const,
                message: assistantMessage,
                created_at: new Date().toISOString(),
                notebook_id: notebookId,
              },
            ]
          : state.agentMessages,
        streamingMessage: '',
        isLoading: false,
        abortController: null,
      }))
      return
    }

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
      chatMessages: [
        ...state.chatMessages,
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
