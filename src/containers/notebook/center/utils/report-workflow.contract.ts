export type WorkflowStatus = 'idle' | 'in_progress' | 'awaiting_review' | 'completed'

export type ReportWorkflowSseEventName =
  | 'thread'
  | 'requirement'
  | 'skeleton'
  | 'prepared'
  | 'final'
  | 'await_user_review'
  | 'done'

const REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT = {
  requirement: 1,
  skeleton: 2,
  prepared: 3,
  final: 4,
} as const satisfies Partial<Record<ReportWorkflowSseEventName, number>>

export const getReportWorkflowStepNumber = (
  eventName: ReportWorkflowSseEventName,
): number | undefined =>
  REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT[
    eventName as keyof typeof REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT
  ]
