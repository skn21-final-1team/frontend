import { type WorkflowStatus } from './report-workflow.contract'

export enum ReportWorkflowPurpose {
  RequirementsAnalysis = 'requirementsAnalysis',
  OutlineComposition = 'outlineComposition',
  DraftWriting = 'draftWriting',
  FinalDocumentWriting = 'finalDocumentWriting',
}

export interface ReportWorkflowStepDefinition {
  stepNumber: number
  purpose: ReportWorkflowPurpose
}

export type ReportWorkflowStepContents = Record<ReportWorkflowPurpose, string>

export interface ReportWorkflowSsePayload {
  message_type: 'thread' | 'step' | 'review' | 'done'
  event_name: string
  system_message?: string | null
  content?: string | null
  step?: number | null
  step_name?: string | null
  thread_id?: string | null
  mode?: 'start' | 'resume' | null
}

export interface ReportWorkflowStateSnapshot {
  status: WorkflowStatus
  currentStepNumber: number
  stepContents: ReportWorkflowStepContents
}
