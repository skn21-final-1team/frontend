import AgentStep from '@/containers/notebook/right/components/agent-step'
import { ConfirmationDialog } from '@/shared/components'
import { ErrorAlert } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { useReportWorkflowStore } from '@/containers/notebook/store/report-workflow.store'
import { useState } from 'react'
import * as S from './working.style'

function WorkingSection() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { setStatus } = useAgentStatusStore()
  const stepContents = useReportWorkflowStore((state) => state.stepContents)
  const currentStepNumber = useReportWorkflowStore((state) => state.currentStepNumber)
  const workflowStatus = useReportWorkflowStore((state) => state.status)
  const error = useReportWorkflowStore((state) => state.error)
  const setError = useReportWorkflowStore((state) => state.setError)
  const resetReportWorkflowSession = useReportWorkflowStore(
    (state) => state.resetReportWorkflowSession,
  )
  const handleConfirmExit = async () => {
    setConfirmOpen(false)
    const resetSucceeded = await resetReportWorkflowSession()
    if (resetSucceeded) {
      setStatus('sleep')
    }
  }

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <ConfirmationDialog
        open={confirmOpen}
        title="채팅 모드로 돌아가시겠습니까?"
        description="이전에 작성하던 문서 워크플로우 세션이 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
        confirmLabel="확인"
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmExit}
      />
      <div className={S.content()}>
        <AgentStep
          title="요구사항을 분석합니다."
          content={stepContents.requirementsAnalysis}
          workflowStatus={workflowStatus}
          currentStepNumber={currentStepNumber}
          stepNumber={1}
        />
        <AgentStep
          title="목차 및 문서 구성을 작성합니다."
          content={stepContents.outlineComposition}
          workflowStatus={workflowStatus}
          currentStepNumber={currentStepNumber}
          stepNumber={2}
        />
        <AgentStep
          title="초안을 작성합니다."
          content={stepContents.draftWriting}
          workflowStatus={workflowStatus}
          currentStepNumber={currentStepNumber}
          stepNumber={3}
        />
        <AgentStep
          title="최종 문서를 작성합니다."
          content={stepContents.finalDocumentWriting}
          workflowStatus={workflowStatus}
          currentStepNumber={currentStepNumber}
          stepNumber={4}
        />
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
