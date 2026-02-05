'use client'

import ChatView from './center/chat-view'
import Source from './left/source'
import Contents from './right/contents'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components'
import * as s from './index.style'

export default function NotebookContainer() {
  return (
    <div className={s.container()}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <Source />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <ChatView />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <Contents />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
