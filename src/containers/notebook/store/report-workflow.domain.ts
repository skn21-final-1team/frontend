import { type ReportWorkflow } from '@/shared/api/report-workflow.api'
import {
  type ReportWorkflowStateSnapshot,
  type ReportWorkflowStepContents,
  type ReportWorkflowStepDefinition,
  ReportWorkflowPurpose,
} from './report-workflow.types'

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

const createReportWorkflowStepContents = (workflow: ReportWorkflow): ReportWorkflowStepContents =>
  REPORT_WORKFLOW_STEP_DEFINITIONS.reduce<ReportWorkflowStepContents>(
    (accumulator: ReportWorkflowStepContents, definition: ReportWorkflowStepDefinition) => {
      accumulator[definition.purpose] = workflow[definition.contentField]
      return accumulator
    },
    {} as ReportWorkflowStepContents,
  )

export const createReportWorkflowStateSnapshot = (
  workflow: ReportWorkflow,
): ReportWorkflowStateSnapshot => ({
  status: workflow.status,
  currentStepNumber: resolveReportWorkflowStepDefinition(workflow.current_step).stepNumber,
  stepContents: createReportWorkflowStepContents(workflow),
})

export const createResetReportWorkflowStateSnapshot = (): ReportWorkflowStateSnapshot => ({
  status: 'cancelled',
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
