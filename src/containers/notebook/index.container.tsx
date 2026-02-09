'use client'

import { useState } from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/shared/components'

import ChatView from './center/chat-view'
import Source from './left/source'
import Contents from './right/contents'
import * as s from './index.style'

import {
  updateFolderRecursive,
  isAllCheckedRecursive,
  setAllCheckedRecursive,
  collectCheckedUrls,
  deleteUrlRecursive,
  deleteFolderRecursive,
} from './utils/bookmark-helpers'
import { MOCK_FOLDERS } from './utils/mock-data'

import type { BookmarkFolderList } from './left/types/bookmarks'
import type { GeneratedItem } from './right/types/studio'

export default function NotebookContainer() {
  const [folders, setFolders] = useState<BookmarkFolderList>(MOCK_FOLDERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([])

  const selectedUrls = collectCheckedUrls(folders)

  const handleToggleExpand = (folderId: string) => {
    setFolders((prev) =>
      updateFolderRecursive(prev, folderId, (folder) => ({
        ...folder,
        isExpanded: !folder.isExpanded,
      })),
    )
  }

  const handleToggleUrl = (folderId: string, urlId: string) => {
    setFolders((prev) =>
      updateFolderRecursive(prev, folderId, (folder) => ({
        ...folder,
        urls: folder.urls.map((url) =>
          url.id === urlId ? { ...url, isChecked: !url.isChecked } : url,
        ),
      })),
    )
  }

  const handleToggleFolder = (folderId: string) => {
    setFolders((prev) =>
      updateFolderRecursive(prev, folderId, (folder) => {
        const allChecked = isAllCheckedRecursive(folder)
        return setAllCheckedRecursive(folder, !allChecked)
      }),
    )
  }

  const handleAddGeneratedItem = (item: GeneratedItem) => {
    setGeneratedItems((prev) => [item, ...prev])
  }

  const handleDeleteUrl = (folderId: string, urlId: string) => {
    setFolders((prev) => deleteUrlRecursive(prev, folderId, urlId))
  }

  const handleDeleteFolder = (folderId: string) => {
    setFolders((prev) => deleteFolderRecursive(prev, folderId))
  }

  const handleRemoveGeneratedItem = (itemId: string) => {
    setGeneratedItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  return (
    <div className={s.container()}>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <Source
            folders={folders}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleExpand={handleToggleExpand}
            onToggleUrl={handleToggleUrl}
            onToggleFolder={handleToggleFolder}
            onDeleteUrl={handleDeleteUrl}
            onDeleteFolder={handleDeleteFolder}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <ChatView />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <Contents
            selectedUrls={selectedUrls}
            generatedItems={generatedItems}
            onAddGeneratedItem={handleAddGeneratedItem}
            onRemoveGeneratedItem={handleRemoveGeneratedItem}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
