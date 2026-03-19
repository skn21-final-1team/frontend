import { create } from 'zustand'
import {
  getReportWorkflowState,
  type ReportWorkflowState,
} from '@/shared/api/report-workflow.api'
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
let hydrationRequestSeq = 0
let workflowMutationRevision = 0

const bumpWorkflowMutationRevision = (): number => {
  workflowMutationRevision += 1
  return workflowMutationRevision
}

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
  initSession: (notebookId: number) => Promise<void>
  sendAgentMessage: (message: string, notebookId: number) => Promise<boolean>
  abortAgentSession: () => boolean
  resetWorkflow: () => void
  clear: () => void
  setError: (error: ErrorAlertState | null) => void
}

const createInitReportWorkflowState = (
  notebookId: number,
): Pick<
  ReportWorkflowStore,
  | 'status'
  | 'currentStepNumber'
  | 'stepContents'
  | 'agentMessages'
  | 'notebookId'
  | 'isLoading'
  | 'abortController'
  | 'error'
> => ({
  ...createResetReportWorkflowStateSnapshot(),
  agentMessages: [],
  notebookId,
  isLoading: true,
  abortController: null,
  error: null,
})

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
    set((state) => {
      bumpWorkflowMutationRevision()
      return {
        ...state,
        status,
        currentStepNumber: resolveReportWorkflowStepDefinition(currentStepNumber).stepNumber,
      }
    }),
  setStepContent: (step, content) =>
    set((state) => {
      bumpWorkflowMutationRevision()
      return {
        stepContents: updateReportWorkflowStepContent(state.stepContents, step, content),
      }
    }),
  appendAgentMessage: (message) =>
    set((state) => {
      bumpWorkflowMutationRevision()
      return {
        agentMessages: [...state.agentMessages, message],
      }
    }),
  clearAgentMessages: () =>
    set(() => {
      bumpWorkflowMutationRevision()
      return { agentMessages: [] }
    }),
  initSession: async (notebookId) => {
    get().abortAgentSession()

    const requestedRevision = bumpWorkflowMutationRevision()
    set(createInitReportWorkflowState(notebookId))

    const requestSeq = ++hydrationRequestSeq

    let hydratedState: ReportWorkflowState
    try {
      hydratedState = await getReportWorkflowState(notebookId)
    } catch {
      if (hydrationRequestSeq !== requestSeq) return
      if (get().notebookId !== notebookId) return
      if (workflowMutationRevision !== requestedRevision) return

      bumpWorkflowMutationRevision()
      set({
        isLoading: false,
      })

      if (isReportMode()) {
        const { status: agentModeStatus, setStatus: setAgentModeStatus } =
          useAgentStatusStore.getState()
        if (agentModeStatus === 'working') {
          setAgentModeStatus('ready')
        }

        set({
          error: {
            title: '복원 실패',
            description: '진행 중인 보고서 워크플로우 상태를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
          },
        })
      }
      return
    }

    if (hydrationRequestSeq !== requestSeq) return
    if (get().notebookId !== notebookId) return
    if (workflowMutationRevision !== requestedRevision) return

    const { workflowStatus, currentStep, stepOutputs } = hydratedState
    const nextStepNumber = resolveReportWorkflowStepDefinition(currentStep ?? undefined).stepNumber
    bumpWorkflowMutationRevision()
    set({
      status: workflowStatus,
      currentStepNumber: nextStepNumber,
      stepContents: {
        requirementsAnalysis: stepOutputs.requirementsText,
        outlineComposition: stepOutputs.outlineText,
        draftWriting: stepOutputs.draftText,
        finalDocumentWriting: stepOutputs.finalText,
      },
      isLoading: false,
      error: null,
    })

    const { status: agentModeStatus, setStatus: setAgentModeStatus } = useAgentStatusStore.getState()
    if (workflowStatus === 'idle') {
      if (agentModeStatus === 'working') {
        setAgentModeStatus('ready')
      }
      return
    }

    setAgentModeStatus('working')
  },
  sendAgentMessage: async (message, notebookId) => {
    if (!isReportMode()) return false

    const normalizedMessage = message.trim()
    if (!normalizedMessage) return true

    const state = get()
    if (state.isLoading) return true

    const abortController = new AbortController()
    bumpWorkflowMutationRevision()
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
    const { abortController, notebookId } = get()
    if (!abortController) return false

    abortController.abort()
    bumpWorkflowMutationRevision()
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
    set((state) => {
      bumpWorkflowMutationRevision()
      return {
        ...createResetReportWorkflowStateSnapshot(),
        agentMessages: state.agentMessages,
        notebookId: state.notebookId,
        isLoading: state.isLoading,
        abortController: state.abortController,
        error: null,
      }
    }),
  clear: () =>
    set(() => {
      bumpWorkflowMutationRevision()
      return {
        ...createResetReportWorkflowStateSnapshot(),
        agentMessages: [],
        notebookId: null,
        isLoading: false,
        abortController: null,
        error: null,
      }
    }),
  setError: (error) => set({ error }),
}))
