import { create } from 'zustand'
import { Chat, ChatSource, getChatsByNotebook } from '@/shared/api/chat.api'
import { ErrorAlertState } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { SSE } from '@/shared/utils/fetcher'
import {
  type ReportWorkflowSseEventName,
  getReportWorkflowStepNumber,
} from './report-workflow.contract'
import { REPORT_WORKFLOW_STEP_DEFINITIONS } from './report-workflow.domain'
import { useReportWorkflowStore } from './report-workflow.store'
import { type ReportWorkflowSsePayload } from './report-workflow.types'

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
    const reportWorkflowStore = useReportWorkflowStore.getState()
    const finalStepNumber =
      REPORT_WORKFLOW_STEP_DEFINITIONS[REPORT_WORKFLOW_STEP_DEFINITIONS.length - 1].stepNumber
    let hasAwaitUserReviewEventInStream = false

    const appendAgentMessage = (assistantMessage: string) => {
      const normalizedMessage = assistantMessage.trim()
      if (!normalizedMessage) return

      set((state) => ({
        agentMessages: [
          ...state.agentMessages,
          {
            id: nextTempId(),
            role: 'assistant' as const,
            message: normalizedMessage,
            created_at: new Date().toISOString(),
            notebook_id: notebookId,
          },
        ],
      }))
    }

    const applyReportWorkflowStepEvent = (
      eventName: ReportWorkflowSseEventName,
      content: string,
    ) => {
      const stepNumber = getReportWorkflowStepNumber(eventName)
      const normalizedContent = content.trim()
      if (stepNumber === undefined || !normalizedContent) return

      reportWorkflowStore.setStepContent(stepNumber, normalizedContent)
      reportWorkflowStore.setWorkflowState({
        status: 'awaiting_review' as never,
        currentStepNumber: stepNumber,
      })
    }

    set((state) => ({
      isLoading: true,
      abortController,
      streamingMessage: '',
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
      reportWorkflowStore.setError(null)

      await SSE({
        url: '/report-workflow/stream',
        data: {
          notebook_id: notebookId,
          message,
        },
        signal: abortController.signal,
        onMessage: (event) => {
          if (get().notebookId !== notebookId) return
          const eventName = event.event as ReportWorkflowSseEventName | undefined
          if (!eventName) return

          let payload: ReportWorkflowSsePayload | null = null
          payload = JSON.parse(event.data) as ReportWorkflowSsePayload

          if (eventName === 'thread') {
            if (payload?.mode === 'start') {
              reportWorkflowStore.clear()
            }
            return
          }

          if (eventName === 'await_user_review') {
            hasAwaitUserReviewEventInStream = true
            appendAgentMessage(payload?.system_message ?? payload?.content ?? event.data)
            return
          }

          if (eventName === 'done') {
            const currentWorkflowState = useReportWorkflowStore.getState()
            const shouldMarkCompleted =
              currentWorkflowState.currentStepNumber === finalStepNumber &&
              !hasAwaitUserReviewEventInStream

            if (shouldMarkCompleted) {
              reportWorkflowStore.setWorkflowState({
                status: 'completed' as never,
                currentStepNumber: currentWorkflowState.currentStepNumber,
              })
            }
            return
          }

          const stepNumber = getReportWorkflowStepNumber(eventName)
          if (stepNumber !== undefined) {
            applyReportWorkflowStepEvent(eventName, payload?.content ?? '')
          }
        },
        onError: () => {
          if (abortController.signal.aborted) return

          reportWorkflowStore.setError({
            title: '전송 실패',
            description: '보고서 워크플로우 실행에 실패했습니다. 다시 시도해주세요.',
          })
          set({
            streamingMessage: '',
            isLoading: false,
            abortController: null,
            error: {
              title: '전송 실패',
              description: '보고서 워크플로우 실행에 실패했습니다. 다시 시도해주세요.',
            },
          })
        },
      })

      if (abortController.signal.aborted) return

      set({
        streamingMessage: '',
        isLoading: false,
        abortController: null,
      })
      return
    }

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
