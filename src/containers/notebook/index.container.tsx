'use client'

import { notFound, useRouter } from 'next/navigation'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, Spinner } from '@/shared/components'
import { ErrorAlert } from '@/shared/components/error-alert'
import ChatView from './center/chat-view'
import SourceSection from './left/source-section'
import { useNotebook } from './utils/use-notebook'
import AgentSection from './right/agent'
import * as s from './index.style'

interface NotebookContainerProps {
  notebookId: number
}

export default function NotebookContainer({ notebookId }: NotebookContainerProps) {
  const router = useRouter()
  const { is404, isLoading, isError } = useNotebook(notebookId)

  if (is404) notFound()
  if (isLoading)
    return (
      <div className={s.spinnerWrapper()}>
        <Spinner className={s.spinner()} />
      </div>
    )
  if (isError)
    return (
      <ErrorAlert
        error={{
          title: '노트북 로딩 실패',
          description: '노트북을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
        }}
        onClose={() => router.push('/')}
      />
    )

  return (
    <div className={s.container()}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} className={s.resizablePanel()}>
          <SourceSection notebookId={notebookId} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30} className={s.resizablePanel()}>
          <ChatView notebookId={notebookId} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20} className={s.resizablePanel()}>
          <AgentSection notebookId={notebookId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
