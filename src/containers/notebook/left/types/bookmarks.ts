export type Bookmark = {
  type: 'folder' | 'url'
  id: string
  title: string
  url?: string
  isExpanded?: boolean
  isChecked?: boolean
  parentId?: string | null
  children: Bookmark[]
  tags?: string[]
}

export type BookmarkState = {
  [key: string]: Omit<Bookmark, 'children'> & {
    children: string[]
  }
}
export type BookmarkStore = {
  bookmarks: BookmarkState
  initialize: (data: Bookmark[]) => void
  toggleExpand: (id: string) => void
  toggleCheck: (id: string, isChecked: boolean) => void
  searchBookmarks: (query: string) => void
}
