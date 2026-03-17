import { type WorkflowStatus } from '@/shared/api/report-workflow.api'

export enum ReportWorkflowPurpose {
  RequirementsAnalysis = 'requirementsAnalysis',
  OutlineComposition = 'outlineComposition',
  DraftWriting = 'draftWriting',
  FinalDocumentWriting = 'finalDocumentWriting',
}

export interface ReportWorkflowStepDefinition {
  stepNumber: number
  purpose: ReportWorkflowPurpose
  title: string
  contentField: 'requirements_text' | 'outline_text' | 'draft_text' | 'final_text'
}

export type ReportWorkflowStepContents = Record<ReportWorkflowPurpose, string>

export interface ReportWorkflowStateSnapshot {
  status: WorkflowStatus
  currentStepNumber: number
  stepContents: ReportWorkflowStepContents
}
