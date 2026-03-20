export type BookmarkNodeType = 'folder' | 'source'

export type FlatBookmarkNode = {
  id: number
  type: BookmarkNodeType
  title: string
  url: string | null
  summary: string | null
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

export type ErrorAlertState = {
  title: string
  description: string
}

export type BookmarkStore = {
  bookmarks: BookmarkState
  rootIds: number[]
  isLoading: boolean
  isSyncing: boolean
  searchQuery: string
  error: ErrorAlertState | null
  fetchAndInitialize: (notebookId: number) => Promise<void>
  toggleExpand: (id: number) => void
  toggleCheck: (id: number, isChecked: boolean) => Promise<void>
  toggleCheckAll: (isChecked: boolean) => Promise<void>
  getCheckedSources: () => CheckedSource[]
  deleteBookmark: (id: number) => Promise<void>
  setSearchQuery: (query: string) => void
  renameBookmark: (id: number, title: string) => Promise<void>
  clearError: () => void
}
