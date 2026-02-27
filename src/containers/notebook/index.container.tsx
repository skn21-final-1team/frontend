'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components'
import ChatView from './center/chat-view'
import SourceSection from './left/source-section'
import Contents from './right/contents'
import * as s from './index.style'

interface NotebookContainerProps {
  notebookId: number
}

export default function NotebookContainer({ notebookId }: NotebookContainerProps) {
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
