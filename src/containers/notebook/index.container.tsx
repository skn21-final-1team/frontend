'use client'

import { useState, useEffect, useMemo } from 'react'

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true)
      try {
        const data = await getNotebookContent(notebookId)
        setContentNodes(data)
      } catch (error) {
        console.error('Failed to fetch notebook content:', error)
        setContentNodes([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchContent()
  }, [notebookId])

  const bookmarks = useMemo(() => mapContentToBookmarks(contentNodes), [contentNodes])

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
        <div className="text-gray-500">노트북 데이터를 불러오는 중입니다...</div>
      </div>
    )
  }

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