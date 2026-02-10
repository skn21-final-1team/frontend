import { create } from 'zustand'
import type { Bookmark, BookmarkState, BookmarkStore, CheckedUrl } from '../types/bookmarks'

const initialBookmarks: BookmarkState = {
  folder_1: {
    id: 'folder_1',
    type: 'folder',
    title: 'folder_1',
    isExpanded: false,
    isChecked: false,
    parentId: null,
    children: [],
  },
}

const flattenBookmarks = (data: Bookmark[]) => {
  const bookmarks: BookmarkState = {}

  const flatten = (node: Bookmark, parentId: string | null) => {
    bookmarks[node.id] = {
      id: node.id,
      type: node.type,
      title: node.title,
      isExpanded: node.isExpanded ?? false,
      isChecked: node.isChecked ?? false,
      parentId: parentId,
      children: node.children?.map((child) => child.id) ?? [],
    }
    node.children?.forEach((child: Bookmark) => flatten(child, node.id))
  }

  data.forEach((node: Bookmark) => flatten(node, null))
  return bookmarks
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: initialBookmarks,

  initialize: (data: Bookmark[]) => {
    const bookmarks = flattenBookmarks(data)
    set({ bookmarks })
  },

  toggleExpand: (id: string) =>
    set((state) => {
      const node = state.bookmarks[id]
      if (!node || node.type !== 'folder') return state

      const newBookmarks = { ...state.bookmarks }
      newBookmarks[id] = { ...node, isExpanded: !node.isExpanded }

      return { bookmarks: newBookmarks }
    }),

  toggleCheck: (id: string, isChecked: boolean) =>
    set((state) => {
      const newBookmarks = { ...state.bookmarks }
      const node = newBookmarks[id]
      if (!node) return state

      const updateChildren = (targetId: string, checked: boolean) => {
        const target = newBookmarks[targetId]
        newBookmarks[targetId] = { ...target, isChecked: checked }
        target.children.forEach((childId) => updateChildren(childId, checked))
      }

      const updateParents = (childId: string) => {
        const child = newBookmarks[childId]
        if (!child.parentId) return

        const parent = newBookmarks[child.parentId]
        const allChildrenChecked = parent.children.every((cId) => newBookmarks[cId].isChecked)
        newBookmarks[child.parentId] = { ...parent, isChecked: allChildrenChecked }
        updateParents(child.parentId)
      }

      updateChildren(id, isChecked)
      updateParents(id)

      return { bookmarks: newBookmarks }
    }),

  searchBookmarks: (query: string) =>
    set((state) => {
      const filteredBookmarks = Object.values(state.bookmarks).filter((bookmark) => {
        if (bookmark.type === 'folder') {
          return bookmark.children?.some((childId) =>
            state.bookmarks[childId].title.toLowerCase().includes(query.toLowerCase()),
          )
        }
        return bookmark.title.toLowerCase().includes(query.toLowerCase())
      })

      const filteredBookmarksMap = filteredBookmarks.reduce((acc, bookmark) => {
        acc[bookmark.id] = bookmark
        return acc
      }, {} as BookmarkState)

      return { bookmarks: filteredBookmarksMap }
    }),

  getCheckedUrls: (): CheckedUrl[] => {
    const { bookmarks } = useBookmarkStore.getState()
    return Object.values(bookmarks)
      .filter((node) => node.type === 'url' && node.isChecked)
      .map((node) => ({
        id: node.id,
        title: node.title,
        url: node.url ?? '',
      }))
  },
}))
