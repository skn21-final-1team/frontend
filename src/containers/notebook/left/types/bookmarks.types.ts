import type { directory, source } from '@/shared/api/directory.api'

export type BookmarkNodeType = 'folder' | 'source'

export type FlatBookmarkNode = {
  id: number
  type: BookmarkNodeType
  title: string
  url: string | null
  isExpanded: boolean
  isChecked: boolean
  parentId: number | null
  children: number[]
}

export type BookmarkState = {
  [key: number]: FlatBookmarkNode
}

export type CheckedSource = {
  id: number
  title: string
  url: string
}

export type BookmarkStore = {
  responseData: { directories: directory[]; sources: source[] }
  bookmarks: BookmarkState
  rootIds: number[]
  isLoading: boolean
  searchQuery: string
  fetchAndInitialize: (notebookId: number) => Promise<void>
  toggleExpand: (id: number) => void
  toggleCheck: (id: number, isChecked: boolean) => void
  getCheckedSources: () => CheckedSource[]
  deleteBookmark: (id: number) => void
  setSearchQuery: (query: string) => void
}
