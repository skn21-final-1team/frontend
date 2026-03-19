import AgentStep from '@/containers/notebook/right/components/agent-step'
import { ConfirmationDialog } from '@/shared/components'
import { ErrorAlert } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { useChatStore } from '@/containers/notebook/store/chat.store'
import {
  REPORT_WORKFLOW_STEP_DEFINITIONS,
  resolveReportWorkflowStepUiState,
} from '@/containers/notebook/store/report-workflow.domain'
import { useReportWorkflowStore } from '@/containers/notebook/store/report-workflow.store'
import { useState } from 'react'
import * as S from './working.style'

interface WorkingSectionProps {
  notebookId: number
}

function WorkingSection({ notebookId }: WorkingSectionProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { setStatus } = useAgentStatusStore()
  const { abort, clearAgentMessages, setError: setChatError } = useChatStore()
  const { stepContents, currentStepNumber, status, error, setError, clear } =
    useReportWorkflowStore()
  void notebookId

  const handleConfirmExit = () => {
    abort()
    clear()
    clearAgentMessages()
    setChatError(null)
    setConfirmOpen(false)
    setStatus('sleep')
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
        {REPORT_WORKFLOW_STEP_DEFINITIONS.map((stepDefinition) => {
          const stepUiState = resolveReportWorkflowStepUiState(
            status,
            currentStepNumber,
            stepDefinition,
          )

          return (
            <AgentStep
              key={stepDefinition.purpose}
              title={stepDefinition.title}
              content={stepContents[stepDefinition.purpose]}
              status={stepUiState.status}
              badgeLabel={stepUiState.badgeLabel}
            />
          )
        })}
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
