'use client'

import { useState, useEffect } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components'
import { getNotebookContent, ContentNode } from '@/shared/api/notebook-content.api'
import type { Bookmark } from './left/types/bookmarks'
import ChatView from './center/chat-view'
import SourceSection from './left/source-section'
import Contents from './right/contents'
import * as s from './index.style'

interface NotebookContainerProps {
  notebookId: number
}

const mapContentToBookmarks = (nodes: ContentNode[]): Bookmark[] => {
  const bookmarks: Bookmark[] = []

  for (const node of nodes) {
    const folder: Bookmark = {
      id: String(node.id),
      type: 'folder',
      title: node.title,
      parentId: node.parent_id ? String(node.parent_id) : null,
      isExpanded: false,
      isChecked: false,
      children: [
        ...mapContentToBookmarks(node.children),
        ...node.sources.map((s): Bookmark => ({
          id: String(s.id),
          type: 'url',
          title: s.title ?? '',
          url: s.url,
          parentId: String(node.id),
          isChecked: false,
          children: [],
        })),
      ],
    }
    bookmarks.push(folder)
  }

  return bookmarks
}

export default function NotebookContainer({ notebookId }: NotebookContainerProps) {
  const [contentNodes, setContentNodes] = useState<ContentNode[]>([])
  useEffect(() => {
    getNotebookContent(notebookId).then(setContentNodes)
  }, [notebookId])
  const bookmarks = mapContentToBookmarks(contentNodes)

  return (
    <div className={s.container()}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <SourceSection data={bookmarks} />
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