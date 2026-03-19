import { create } from 'zustand'
import { type Chat } from '@/shared/api/chat.api'
import { type ErrorAlertState } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { SSE } from '@/shared/utils/fetcher'
import {
  type ReportWorkflowSseEventName,
  getReportWorkflowStepNumber,
  type WorkflowStatus,
} from '../center/utils/report-workflow.contract'
import {
  createDefaultReportWorkflowStepContents,
  createResetReportWorkflowStateSnapshot,
  REPORT_WORKFLOW_STEP_DEFINITIONS,
  resolveReportWorkflowStepDefinition,
  updateReportWorkflowStepContent,
} from '../center/utils/report-workflow.domain'
import {
  type ReportWorkflowSsePayload,
  type ReportWorkflowStepContents,
} from '@/containers/notebook/center/utils/report-workflow.types'

let tempId = 0
const nextTempId = () => --tempId

const isReportMode = (): boolean => {
  const status = useAgentStatusStore.getState().status
  return status === 'working' || status === 'ready'
}

interface ReportWorkflowStore {
  status: WorkflowStatus
  currentStepNumber: number
  stepContents: ReportWorkflowStepContents
  agentMessages: Chat[]
  notebookId: number | null
  isLoading: boolean
  abortController: AbortController | null
  error: ErrorAlertState | null
  setWorkflowState: (payload: { status: WorkflowStatus; currentStepNumber: number }) => void
  setStepContent: (step: number, content: string) => void
  appendAgentMessage: (message: Chat) => void
  clearAgentMessages: () => void
  initSession: (notebookId: number) => void
  sendAgentMessage: (message: string, notebookId: number) => Promise<boolean>
  abortAgentSession: () => boolean
  resetWorkflow: () => void
  clear: () => void
  setError: (error: ErrorAlertState | null) => void
}

export const useReportWorkflowStore = create<ReportWorkflowStore>((set, get) => ({
  status: 'idle',
  currentStepNumber: resolveReportWorkflowStepDefinition(undefined).stepNumber,
  stepContents: createDefaultReportWorkflowStepContents(),
  agentMessages: [],
  notebookId: null,
  isLoading: false,
  abortController: null,
  error: null,
  setWorkflowState: ({ status, currentStepNumber }) =>
    set((state) => ({
      ...state,
      status,
      currentStepNumber: resolveReportWorkflowStepDefinition(currentStepNumber).stepNumber,
    })),
  setStepContent: (step, content) =>
    set((state) => ({
      stepContents: updateReportWorkflowStepContent(state.stepContents, step, content),
    })),
  appendAgentMessage: (message) =>
    set((state) => ({
      agentMessages: [...state.agentMessages, message],
    })),
  clearAgentMessages: () => set({ agentMessages: [] }),
  initSession: (notebookId) => {
    const state = get()
    const shouldClearSession = state.notebookId !== null && state.notebookId !== notebookId

    state.abortAgentSession()

    if (shouldClearSession) {
      set({
        ...createResetReportWorkflowStateSnapshot(),
        agentMessages: [],
        notebookId,
        isLoading: false,
        abortController: null,
        error: null,
      })
      return
    }

    set({
      notebookId,
      isLoading: false,
      abortController: null,
      error: null,
    })
  },
  sendAgentMessage: async (message, notebookId) => {
    if (!isReportMode()) return false

    const normalizedMessage = message.trim()
    if (!normalizedMessage) return true

    const state = get()
    if (state.isLoading) return true

    const abortController = new AbortController()
    const { status, setStatus } = useAgentStatusStore.getState()
    if (status === 'ready') {
      setStatus('working')
    }

    const finalStepNumber =
      REPORT_WORKFLOW_STEP_DEFINITIONS[REPORT_WORKFLOW_STEP_DEFINITIONS.length - 1].stepNumber
    let hasAwaitUserReviewEventInStream = false

    const appendAssistantMessage = (assistantMessage: string) => {
      const normalizedAssistantMessage = assistantMessage.trim()
      if (!normalizedAssistantMessage) return

      get().appendAgentMessage({
        id: nextTempId(),
        role: 'assistant' as const,
        message: normalizedAssistantMessage,
        created_at: new Date().toISOString(),
        notebook_id: notebookId,
      })
    }

    const applyReportWorkflowStepEvent = (
      eventName: ReportWorkflowSseEventName,
      content: string,
    ) => {
      const stepNumber = getReportWorkflowStepNumber(eventName)
      const normalizedContent = content.trim()
      if (stepNumber === undefined || !normalizedContent) return

      get().setStepContent(stepNumber, normalizedContent)
      get().setWorkflowState({
        status: 'awaiting_review' as never,
        currentStepNumber: stepNumber,
      })
    }

    get().appendAgentMessage({
      id: nextTempId(),
      role: 'user' as const,
      message: normalizedMessage,
      created_at: new Date().toISOString(),
      notebook_id: notebookId,
    })

    set({
      notebookId,
      isLoading: true,
      abortController,
      error: null,
    })

    await SSE({
      url: '/report-workflow/stream',
      data: {
        notebook_id: notebookId,
        message: normalizedMessage,
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
            get().resetWorkflow()
          }
          return
        }

        if (eventName === 'await_user_review') {
          hasAwaitUserReviewEventInStream = true
          appendAssistantMessage(payload?.system_message ?? payload?.content ?? event.data)
          return
        }

        if (eventName === 'done') {
          const currentWorkflowState = get()
          const shouldMarkCompleted =
            currentWorkflowState.currentStepNumber === finalStepNumber &&
            !hasAwaitUserReviewEventInStream

          if (shouldMarkCompleted) {
            get().setWorkflowState({
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

        set({
          isLoading: false,
          abortController: null,
          error: {
            title: '전송 실패',
            description: '보고서 워크플로우 실행에 실패했습니다. 다시 시도해주세요.',
          },
        })
      },
    })

    if (abortController.signal.aborted) return true

    set({
      isLoading: false,
      abortController: null,
    })
    return true
  },
  abortAgentSession: () => {
    if (!isReportMode()) return false

    const { abortController, notebookId } = get()
    if (!abortController) return true

    abortController.abort()
    if (notebookId !== null) {
      get().appendAgentMessage({
        id: nextTempId(),
        role: 'assistant' as const,
        message: '',
        created_at: new Date().toISOString(),
        notebook_id: notebookId,
        aborted: true,
      })
    }

    set({
      isLoading: false,
      abortController: null,
    })
    return true
  },
  resetWorkflow: () =>
    set((state) => ({
      ...createResetReportWorkflowStateSnapshot(),
      agentMessages: state.agentMessages,
      notebookId: state.notebookId,
      isLoading: state.isLoading,
      abortController: state.abortController,
      error: null,
    })),
  clear: () =>
    set({
      ...createResetReportWorkflowStateSnapshot(),
      agentMessages: [],
      notebookId: null,
      isLoading: false,
      abortController: null,
      error: null,
    }),
  setError: (error) => set({ error }),
}))
