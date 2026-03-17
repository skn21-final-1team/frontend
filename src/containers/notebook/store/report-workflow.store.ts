import { create } from 'zustand'
import { type ErrorAlertState } from '@/shared/components/error-alert'
import {
  type ReportWorkflowFetchResult,
  type ResetReportWorkflowResult,
  type WorkflowApiError,
  type WorkflowStatus,
  getReportWorkflow,
  resetReportWorkflow,
} from '@/shared/api/report-workflow.api'
import {
  createDefaultReportWorkflowStepContents,
  createReportWorkflowStateSnapshot,
  createResetReportWorkflowStateSnapshot,
  resolveReportWorkflowStepDefinition,
  updateReportWorkflowStepContent,
} from './report-workflow.domain'
import { type ReportWorkflowStepContents } from './report-workflow.types'

interface ReportWorkflowStore {
  status: WorkflowStatus
  currentStepNumber: number
  stepContents: ReportWorkflowStepContents
  error: ErrorAlertState | null
  init: (notebookId: number) => Promise<boolean>
  reset: (notebookId: number) => Promise<boolean>
  setWorkflowState: (payload: {
    status: WorkflowStatus
    currentStepNumber: number
  }) => void
  setStepContent: (step: number, content: string) => void
  setError: (error: ErrorAlertState | null) => void
}

const mapWorkflowApiErrorToAlert = (error: WorkflowApiError): ErrorAlertState => ({
  title: error.title,
  description: error.description,
})

let initRequestSequence = 0

export const useReportWorkflowStore = create<ReportWorkflowStore>((set) => ({
  status: 'idle',
  currentStepNumber: resolveReportWorkflowStepDefinition(undefined).stepNumber,
  stepContents: createDefaultReportWorkflowStepContents(),
  error: null,
  init: async (notebookId) => {
    const requestSequence: number = ++initRequestSequence
    const result: ReportWorkflowFetchResult = await getReportWorkflow(notebookId)
    if (requestSequence !== initRequestSequence) return false

    if (!result.success) {
      set({ error: mapWorkflowApiErrorToAlert(result.error) })
      return false
    }

    set({
      ...createReportWorkflowStateSnapshot(result.data),
      error: null,
    })
    return true
  },
  reset: async (notebookId) => {
    const result: ResetReportWorkflowResult = await resetReportWorkflow(notebookId)
    if (!result.success) {
      set({ error: mapWorkflowApiErrorToAlert(result.error) })
      return false
    }

    set({
      ...createResetReportWorkflowStateSnapshot(),
      error: null,
    })
    return true
  },
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
  setError: (error) => set({ error }),
}))
