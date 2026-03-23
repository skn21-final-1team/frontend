'use client'

import { useEffect, useRef } from 'react'
import { useReportWorkflowStore } from '@/containers/notebook/store/report-workflow.store'
import usePreviewStore from '@/containers/notebook/store/preview.store'
import { ReportWorkflowPurpose } from './utils/report-workflow.types'
import ChatView from './chat/chat-view'
import PreviewSection from './preview/preview-section'
import ViewModeToggle from './components/view-mode-toggle'
import * as S from './index.style'

type Props = {
  notebookId: number
}

const resolvePreviewContent = (
  currentStepNumber: number,
  stepContents: Record<ReportWorkflowPurpose, string>,
): string => {
  const currentStepContentMap: Record<number, string> = {
    1: stepContents.requirementsAnalysis,
    2: stepContents.outlineComposition,
    3: stepContents.draftWriting,
    4: stepContents.finalDocumentWriting,
  }

  const currentStepContent = currentStepContentMap[currentStepNumber]?.trim()
  if (currentStepContent) {
    return currentStepContentMap[currentStepNumber]
  }

  return (
    stepContents.finalDocumentWriting ||
    stepContents.draftWriting ||
    stepContents.outlineComposition ||
    stepContents.requirementsAnalysis
  )
}

function PlaygroundContainer({ notebookId }: Props) {
  const isPreviewMode = usePreviewStore((state) => state.isPreviewMode)
  const setPreviewMode = usePreviewStore((state) => state.setPreviewMode)
  const workflowStatus = useReportWorkflowStore((state) => state.status)
  const currentStepNumber = useReportWorkflowStore((state) => state.currentStepNumber)
  const stepContents = useReportWorkflowStore((state) => state.stepContents)
  const previewContent = resolvePreviewContent(currentStepNumber, stepContents)
  const hasPreviewContent = previewContent.trim().length > 0
  const previousWorkflowStatusRef = useRef<typeof workflowStatus | null>(null)

  const handleShowChat = (): void => {
    setPreviewMode(false)
  }

  const handleShowPreview = (): void => {
    if (hasPreviewContent) {
      setPreviewMode(true)
    }
  }

  useEffect(() => {
    if (!hasPreviewContent && isPreviewMode) {
      setPreviewMode(false)
    }
  }, [hasPreviewContent, isPreviewMode, setPreviewMode])

  useEffect(() => {
    const isCompletedTransition =
      previousWorkflowStatusRef.current !== 'completed' && workflowStatus === 'completed'

    if (isCompletedTransition && hasPreviewContent && !isPreviewMode) {
      setPreviewMode(true)
    }

    previousWorkflowStatusRef.current = workflowStatus
  }, [hasPreviewContent, isPreviewMode, setPreviewMode, workflowStatus])

  return (
    <section className={S.section()}>
      <div className={S.content()}>
        <div className={S.header()}>
          <ViewModeToggle
            isPreviewMode={isPreviewMode}
            isPreviewDisabled={!hasPreviewContent}
            onShowChat={handleShowChat}
            onShowPreview={handleShowPreview}
          />
        </div>
        <div className={S.body()}>
          <div className={S.view({ hidden: isPreviewMode })}>
            <ChatView notebookId={notebookId} />
          </div>
          <div className={S.view({ hidden: !isPreviewMode })}>
            <PreviewSection content={previewContent} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlaygroundContainer
