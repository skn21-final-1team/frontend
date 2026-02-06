export interface BookmarkUrl {
  id: string
  title: string
  url: string
  isChecked: boolean
}

export interface BookmarkFolder {
  id: string
  name: string
  isExpanded: boolean
  folders?: BookmarkFolder[]
  urls: BookmarkUrl[]
}

export type BookmarkItem = BookmarkFolder | BookmarkUrl

export type BookmarkFolderList = BookmarkFolder[]
