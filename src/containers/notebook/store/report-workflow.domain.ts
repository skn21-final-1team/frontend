import {
  type ReportWorkflowStateSnapshot,
  type ReportWorkflowStepContents,
  type ReportWorkflowStepDefinition,
  ReportWorkflowPurpose,
} from './report-workflow.types'
import { type WorkflowStatus } from './report-workflow.contract'

export interface ReportWorkflowStepUiState {
  status: 'working' | 'pending' | 'completed'
  badgeLabel?: string
}

export const REPORT_WORKFLOW_STEP_DEFINITIONS: readonly ReportWorkflowStepDefinition[] = [
  {
    stepNumber: 1,
    purpose: ReportWorkflowPurpose.RequirementsAnalysis,
    title: '요구사항을 분석합니다.',
    contentField: 'requirements_text',
  },
  {
    stepNumber: 2,
    purpose: ReportWorkflowPurpose.OutlineComposition,
    title: '목차 및 문서 구성을 작성합니다.',
    contentField: 'outline_text',
  },
  {
    stepNumber: 3,
    purpose: ReportWorkflowPurpose.DraftWriting,
    title: '초안을 작성합니다.',
    contentField: 'draft_text',
  },
  {
    stepNumber: 4,
    purpose: ReportWorkflowPurpose.FinalDocumentWriting,
    title: '최종 문서를 작성합니다.',
    contentField: 'final_text',
  },
]

export const resolveReportWorkflowStepDefinition = (
  stepNumber: number | undefined,
): ReportWorkflowStepDefinition => {
  const firstStepNumber: number = REPORT_WORKFLOW_STEP_DEFINITIONS[0].stepNumber
  const lastStepNumber: number =
    REPORT_WORKFLOW_STEP_DEFINITIONS[REPORT_WORKFLOW_STEP_DEFINITIONS.length - 1].stepNumber
  const normalizedStepNumber: number =
    stepNumber === undefined
      ? firstStepNumber
      : Math.min(Math.max(stepNumber, firstStepNumber), lastStepNumber)

  return (
    REPORT_WORKFLOW_STEP_DEFINITIONS.find(
      (definition: ReportWorkflowStepDefinition) => definition.stepNumber === normalizedStepNumber,
    ) ?? REPORT_WORKFLOW_STEP_DEFINITIONS[0]
  )
}

export const createDefaultReportWorkflowStepContents = (): ReportWorkflowStepContents =>
  REPORT_WORKFLOW_STEP_DEFINITIONS.reduce<ReportWorkflowStepContents>(
    (accumulator, definition: ReportWorkflowStepDefinition) => {
      accumulator[definition.purpose] = ''
      return accumulator
    },
    {} as ReportWorkflowStepContents,
  )

export const createDefaultReportWorkflowStateSnapshot = (
  overrides: Partial<ReportWorkflowStateSnapshot> = {},
): ReportWorkflowStateSnapshot => ({
  status: overrides.status ?? 'idle',
  currentStepNumber: resolveReportWorkflowStepDefinition(overrides.currentStepNumber).stepNumber,
  stepContents: overrides.stepContents ?? createDefaultReportWorkflowStepContents(),
})

export const createResetReportWorkflowStateSnapshot = (): ReportWorkflowStateSnapshot => ({
  status: 'idle',
  currentStepNumber: REPORT_WORKFLOW_STEP_DEFINITIONS[0].stepNumber,
  stepContents: createDefaultReportWorkflowStepContents(),
})

export const updateReportWorkflowStepContent = (
  stepContents: ReportWorkflowStepContents,
  stepNumber: number,
  content: string,
): ReportWorkflowStepContents => {
  const matchedStepDefinition: ReportWorkflowStepDefinition | undefined =
    REPORT_WORKFLOW_STEP_DEFINITIONS.find(
      (definition: ReportWorkflowStepDefinition) => definition.stepNumber === stepNumber,
    )

  if (matchedStepDefinition === undefined) return stepContents

  return {
    ...stepContents,
    [matchedStepDefinition.purpose]: content,
  }
}

export const resolveReportWorkflowStepUiState = (
  workflowStatus: WorkflowStatus,
  currentStepNumber: number,
  stepDefinition: ReportWorkflowStepDefinition,
): ReportWorkflowStepUiState => {
  if (workflowStatus === 'idle') {
    return { status: 'pending' }
  }

  if (stepDefinition.stepNumber < currentStepNumber) {
    return { status: 'completed' }
  }

  if (stepDefinition.stepNumber > currentStepNumber) {
    return { status: 'pending' }
  }

  if (workflowStatus === 'awaiting_review') {
    return {
      status: 'working',
      badgeLabel: '승인 대기',
    }
  }

  if (workflowStatus === 'in_progress') {
    return {
      status: 'working',
      badgeLabel: '채팅 작성중',
    }
  }

  if (workflowStatus === 'completed') {
    return { status: 'completed' }
  }

  return { status: 'working' }
}
