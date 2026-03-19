export type WorkflowStatus = 'idle' | 'in_progress' | 'awaiting_review' | 'completed'

export type ReportWorkflowSseEventName =
  | 'thread'
  | 'requirement'
  | 'skeleton'
  | 'prepared'
  | 'final'
  | 'await_user_review'
  | 'done'

export const REPORT_WORKFLOW_STEP_EVENT_MAP = {
  1: 'requirement',
  2: 'skeleton',
  3: 'prepared',
  4: 'final',
} as const satisfies Record<number, ReportWorkflowSseEventName>

export const REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT = {
  requirement: 1,
  skeleton: 2,
  prepared: 3,
  final: 4,
} as const satisfies Partial<Record<ReportWorkflowSseEventName, number>>

export const isReportWorkflowStepEvent = (
  eventName: ReportWorkflowSseEventName,
): eventName is keyof typeof REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT =>
  eventName in REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT

export const getReportWorkflowStepEventName = (
  stepNumber: number,
): ReportWorkflowSseEventName | undefined =>
  REPORT_WORKFLOW_STEP_EVENT_MAP[stepNumber as keyof typeof REPORT_WORKFLOW_STEP_EVENT_MAP]

export const getReportWorkflowStepNumber = (
  eventName: ReportWorkflowSseEventName,
): number | undefined =>
  REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT[
    eventName as keyof typeof REPORT_WORKFLOW_STEP_NUMBER_BY_EVENT
  ]
