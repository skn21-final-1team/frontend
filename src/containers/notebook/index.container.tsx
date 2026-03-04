'use client'

import { notFound } from 'next/navigation'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, Spinner } from '@/shared/components'
import ChatView from './center/chat-view'
import SourceSection from './left/source-section'
import Contents from './right/contents'
import { useNotebook } from './utils/use-notebook'
import * as s from './index.style'

interface NotebookContainerProps {
  notebookId: number
}

export default function NotebookContainer({ notebookId }: NotebookContainerProps) {
  const { is404, isLoading } = useNotebook(notebookId)

  if (is404) notFound()
  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <Spinner className="size-6" />
    </div>
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
