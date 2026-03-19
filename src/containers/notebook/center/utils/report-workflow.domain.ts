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
  },
  {
    stepNumber: 2,
    purpose: ReportWorkflowPurpose.OutlineComposition,
  },
  {
    stepNumber: 3,
    purpose: ReportWorkflowPurpose.DraftWriting,
  },
  {
    stepNumber: 4,
    purpose: ReportWorkflowPurpose.FinalDocumentWriting,
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
