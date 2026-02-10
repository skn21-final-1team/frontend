'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components'

import ChatView from './center/chat-view'
import SourceSection from './left/source-section'
import type { Bookmark } from './left/types/bookmarks'
import Contents from './right/contents'
import * as s from './index.style'

export default function NotebookContainer() {
  return (
    <div className={s.container()}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <SourceSection data={mook.bookmarks} />
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

const mook = {
  bookmarks: [
    {
      id: 'folder_1',
      type: 'folder' as const,
      title: 'folder_1',
      isExpanded: true,
      isChecked: false,
      parentId: null,
      children: [
        {
          id: 'folder_2',
          type: 'folder' as const,
          title: 'folder_2',
          isExpanded: false,
          isChecked: false,
          parentId: 'folder_1',
          children: [
            {
              id: 'url_1',
              type: 'url' as const,
              title: 'url_1',
              url: 'https://www.google.com',
              isChecked: false,
              parentId: 'folder_2',
            },
          ],
        },
        {
          id: 'folder_3',
          type: 'folder' as const,
          title: 'folder_3',
          isExpanded: false,
          isChecked: false,
          parentId: 'folder_1',
          children: [
            {
              id: 'folder_4',
              type: 'folder' as const,
              title: 'folder_4',
              isExpanded: false,
              isChecked: false,
              parentId: 'folder_3',
              children: [
                {
                  id: 'url_122',
                  type: 'url' as const,
                  title: 'url_122',
                  url: 'https://www.google.com',
                  isChecked: false,
                  parentId: 'folder_4',
                  tags: ['tag1', 'tag2'],
                },
                {
                  id: 'url_1223',
                  type: 'url' as const,
                  title: 'url_122',
                  url: 'https://www.google.com',
                  isChecked: false,
                  parentId: 'folder_4',
                },
                {
                  id: 'url_1242',
                  type: 'url' as const,
                  title: 'url_122',
                  url: 'https://www.google.com',
                  isChecked: false,
                  parentId: 'folder_4',
                },
              ],
            },
          ],
        },
      ],
    },
  ] as Bookmark[],
  sources: [],
}
