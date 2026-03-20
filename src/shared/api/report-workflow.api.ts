import { fetcher } from '@/shared/utils/fetcher'

export type WorkflowStatus = 'idle' | 'in_progress' | 'awaiting_review' | 'completed'

export interface ReportWorkflowStepOutputs {
  requirementsText: string
  outlineText: string
  draftText: string
  finalText: string
}

export interface ReportWorkflowState {
  workflowStatus: WorkflowStatus
  currentStep: number | null
  stepOutputs: ReportWorkflowStepOutputs
}

interface ReportWorkflowStateResponse {
  workflow_status: WorkflowStatus
  current_step: number | null
  step_outputs: {
    requirements_text: string
    outline_text: string
    draft_text: string
    final_text: string
  }
}

const normalizeReportWorkflowState = (
  response: ReportWorkflowStateResponse,
): ReportWorkflowState => ({
  workflowStatus: response.workflow_status,
  currentStep: response.current_step,
  stepOutputs: {
    requirementsText: response.step_outputs.requirements_text,
    outlineText: response.step_outputs.outline_text,
    draftText: response.step_outputs.draft_text,
    finalText: response.step_outputs.final_text,
  },
})

export const getReportWorkflowState = async (
  notebookId: number,
): Promise<ReportWorkflowState> => {
  const response = await fetcher.get<ReportWorkflowStateResponse>(`/report-workflow/${notebookId}`)
  return normalizeReportWorkflowState(response.data)
}

export const resetReportWorkflowState = async (
  notebookId: number,
): Promise<ReportWorkflowState> => {
  const response = await fetcher.delete<ReportWorkflowStateResponse>(
    `/report-workflow/${notebookId}/state`,
  )
  return normalizeReportWorkflowState(response.data)
}
