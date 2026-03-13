'use client'

import { notFound, useRouter } from 'next/navigation'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, Spinner } from '@/shared/components'
import { ErrorAlert } from '@/shared/components/error-alert'
import ChatView from './center/chat-view'
import SourceSection from './left/source-section'
import Contents from './right/contents'
import { useNotebook } from './utils/use-notebook'
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
      <div className="flex items-center justify-center h-full">
        <Spinner className="size-6" />
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
        <ResizablePanel defaultSize={20} minSize={15}>
          <SourceSection notebookId={notebookId} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <ChatView notebookId={notebookId} />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <Contents />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
