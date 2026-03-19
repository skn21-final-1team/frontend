import { create } from 'zustand'
import { type ErrorAlertState } from '@/shared/components/error-alert'
import { type WorkflowStatus } from './report-workflow.contract'
import {
  createDefaultReportWorkflowStepContents,
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
  setWorkflowState: (payload: {
    status: WorkflowStatus
    currentStepNumber: number
  }) => void
  setStepContent: (step: number, content: string) => void
  clear: () => void
  setError: (error: ErrorAlertState | null) => void
}

export const useReportWorkflowStore = create<ReportWorkflowStore>((set) => ({
  status: 'idle',
  currentStepNumber: resolveReportWorkflowStepDefinition(undefined).stepNumber,
  stepContents: createDefaultReportWorkflowStepContents(),
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
  clear: () =>
    set({
      ...createResetReportWorkflowStateSnapshot(),
      error: null,
    }),
  setError: (error) => set({ error }),
}))
