import AgentStep from '@/containers/notebook/right/components/agent-step'
import { ConfirmationDialog } from '@/shared/components'
import { ErrorAlert } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { useChatStore } from '@/containers/notebook/store/chat.store'
import {
  REPORT_WORKFLOW_STEP_DEFINITIONS,
  resolveReportWorkflowStepDefinition,
} from '@/containers/notebook/store/report-workflow.domain'
import { useReportWorkflowStore } from '@/containers/notebook/store/report-workflow.store'
import {
  ReportWorkflowPurpose,
  type ReportWorkflowStepDefinition,
} from '@/containers/notebook/store/report-workflow.types'
import { useState } from 'react'
import * as S from './working.style'

interface WorkingSectionProps {
  notebookId: number
}

function WorkingSection({ notebookId }: WorkingSectionProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { setStatus } = useAgentStatusStore()
  const { abort, clearAgentMessages } = useChatStore()
  const { stepContents, currentStepNumber, status, error, setError, reset } =
    useReportWorkflowStore()
  const currentPurpose: ReportWorkflowPurpose =
    resolveReportWorkflowStepDefinition(currentStepNumber).purpose
  const finalStepDefinition: ReportWorkflowStepDefinition =
    REPORT_WORKFLOW_STEP_DEFINITIONS[REPORT_WORKFLOW_STEP_DEFINITIONS.length - 1]

  const stepStatus = (
    stepDefinition: ReportWorkflowStepDefinition,
  ): 'working' | 'pending' | 'completed' => {
    if (status === 'idle' || status === 'cancelled') {
      return stepDefinition.purpose === ReportWorkflowPurpose.RequirementsAnalysis &&
        stepContents[ReportWorkflowPurpose.RequirementsAnalysis]
        ? 'completed'
        : 'pending'
    }
    if (status === 'completed') return 'completed'
    if (stepDefinition.stepNumber < currentStepNumber) return 'completed'
    if (stepDefinition.purpose === currentPurpose) return 'working'
    return 'pending' as const
  }

  const stepBadgeLabel = (stepDefinition: ReportWorkflowStepDefinition): string | undefined => {
    if (stepDefinition.purpose === currentPurpose && status === 'waiting_confirmation') {
      return '승인대기'
    }
    if (stepDefinition.purpose === finalStepDefinition.purpose && status === 'completed') {
      return '최종 승인 완료'
    }
    return undefined
  }

  const handleConfirmExit = async () => {
    abort()
    const resetSucceeded = await reset(notebookId)
    if (!resetSucceeded) return

    clearAgentMessages()
    setConfirmOpen(false)
    setStatus('sleep')
  }

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <ConfirmationDialog
        open={confirmOpen}
        title="채팅 모드로 돌아가시겠습니까?"
        description="지금 돌아가면 이전에 작성하던 문서 워크플로우 세션이 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        confirmLabel="확인"
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmExit}
      />
      <div className={S.content()}>
        {REPORT_WORKFLOW_STEP_DEFINITIONS.map((stepDefinition) => (
          <AgentStep
            key={stepDefinition.purpose}
            title={stepDefinition.title}
            content={stepContents[stepDefinition.purpose]}
            status={stepStatus(stepDefinition)}
            badgeLabel={stepBadgeLabel(stepDefinition)}
          />
        ))}
      </div>
      <div className={S.actionArea()}>
        <button className={S.exitButton()} onClick={() => setConfirmOpen(true)} type="button">
          채팅모드로 돌아가기
        </button>
      </div>
    </section>
  )
}

export default WorkingSection
