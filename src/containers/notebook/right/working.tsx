import AgentStep from '@/containers/notebook/right/components/agent-step'
import { Button, ConfirmationDialog } from '@/shared/components'
import { ErrorAlert } from '@/shared/components/error-alert'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { useReportWorkflowStore } from '@/containers/notebook/store/report-workflow.store'
import { useState } from 'react'
import * as S from './working.style'

type ExitAction = 'start_new_workflow' | 'return_to_chat'

const EXIT_DIALOG_CONTENT: Record<
  ExitAction,
  {
    title: string
    description: string
  }
> = {
  start_new_workflow: {
    title: '새로운 워크플로우를 시작하시겠습니까?',
    description:
      '진행 중인 문서 워크플로우 세션이 삭제되고 새 워크플로우를 바로 시작할 수 있는 상태로 초기화됩니다.',
  },
  return_to_chat: {
    title: '채팅 모드로 돌아가시겠습니까?',
    description: '이전에 작성하던 문서 워크플로우 세션이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
  },
}

function WorkingSection() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [exitAction, setExitAction] = useState<ExitAction>('return_to_chat')
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
      setStatus(exitAction === 'start_new_workflow' ? 'ready' : 'sleep')
    }
  }

  const openConfirm = (action: ExitAction): void => {
    setExitAction(action)
    setConfirmOpen(true)
  }

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <ConfirmationDialog
        open={confirmOpen}
        title={EXIT_DIALOG_CONTENT[exitAction].title}
        description={EXIT_DIALOG_CONTENT[exitAction].description}
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
        <Button
          className={S.newButton()}
          onClick={() => openConfirm('start_new_workflow')}
          type="button"
        >
          새로운 워크플로우 시작하기
        </Button>
      </div>
      <div className={S.actionArea()}>
        <Button
          onClick={() => openConfirm('return_to_chat')}
          type="button"
          variant="ghost"
          size="sm"
        >
          채팅모드로 돌아가기
        </Button>
      </div>
    </section>
  )
}

export default WorkingSection
