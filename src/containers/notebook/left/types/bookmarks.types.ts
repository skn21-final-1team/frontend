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
  bookmarks: BookmarkState
  rootIds: number[]
  isLoading: boolean
  searchQuery: string
  editingId: number | null
  fetchAndInitialize: (notebookId: number) => Promise<void>
  toggleExpand: (id: number) => void
  toggleCheck: (id: number, isChecked: boolean) => void
  getCheckedSources: () => CheckedSource[]
  deleteBookmark: (id: number) => Promise<void>
  setSearchQuery: (query: string) => void
  setEditingId: (id: number | null) => void
  renameBookmark: (id: number, title: string) => Promise<void>
}
