import { create } from 'zustand'
import { getDirectories } from '@/shared/api/directory.api'
import { directory, source, updateSource, deleteSource } from '@/shared/api/directory.api'
import type {
  BookmarkState,
  BookmarkStore,
  CheckedSource,
  FlatBookmarkNode,
} from '../types/bookmarks.types'

const flattenDirectoryTree = (
  directories: directory[],
  rootSources: source[],
): { bookmarks: BookmarkState; rootIds: number[] } => {
  const bookmarks: BookmarkState = {}
  const rootIds: number[] = []

  const flattenDirectory = (dir: directory, parentId: number | null) => {
    const sortedChildren = [...dir.children].sort((a, b) => a.id - b.id)
    const sortedSources = [...dir.sources].sort((a, b) => a.id - b.id)
    const childDirectoryIds = sortedChildren.map((child) => child.id)
    const childSourceIds = sortedSources.map((src) => toSourceNodeId(src.id))
    const isChecked = dir.sources.every((src) => src.is_active)

    const node: FlatBookmarkNode = {
      id: dir.id,
      type: 'folder',
      title: dir.title,
      url: null,
      summary: null,
      isExpanded: false,
      isChecked: isChecked,
      parentId,
      children: [...childDirectoryIds, ...childSourceIds],
    }

    bookmarks[dir.id] = node

    sortedSources.forEach((src) => flattenSource(src, dir.id))
    sortedChildren.forEach((child) => flattenDirectory(child, dir.id))
  }

  const flattenSource = (src: source, parentId: number | null) => {
    const nodeId = toSourceNodeId(src.id)
    const node: FlatBookmarkNode = {
      id: nodeId,
      type: 'source',
      title: src.title ?? '',
      url: src.url,
      summary: src.summary || null,
      isExpanded: false,
      isChecked: src.is_active,
      parentId,
      children: [],
    }
    bookmarks[nodeId] = node
  }

  const sortedDirectories = [...directories].sort((a, b) => a.id - b.id)
  const sortedRootSources = [...rootSources].sort((a, b) => a.id - b.id)

  sortedDirectories.forEach((dir) => {
    rootIds.push(dir.id)
    flattenDirectory(dir, null)
  })

  sortedRootSources.forEach((src) => {
    const nodeId = toSourceNodeId(src.id)
    rootIds.push(nodeId)
    flattenSource(src, null)
  })

  // 후처리: 폴더 isChecked를 하위 전체 기준으로 재계산
  const recomputeChecked = (id: number): boolean => {
    const node = bookmarks[id]
    if (!node) return false
    if (node.type === 'source') return node.isChecked
    if (node.children.length === 0) return true
    const allChecked = node.children.every((childId) => recomputeChecked(childId))
    bookmarks[id] = { ...node, isChecked: allChecked }
    return allChecked
  }
  rootIds.forEach((id) => recomputeChecked(id))

  return { bookmarks, rootIds }
}

const toSourceNodeId = (sourceId: number): number => -sourceId

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: {},
  rootIds: [],
  isLoading: false,
  searchQuery: '',

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  fetchAndInitialize: async (notebookId: number) => {
    set({ isLoading: true })
    try {
      const response = await getDirectories(notebookId)
      const { bookmarks, rootIds } = flattenDirectoryTree(response.directories, response.sources)
      set({ bookmarks, rootIds })
    } catch (error) {
      console.error('북마크 로딩 실패:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  toggleExpand: (id: number) =>
    set((state) => {
      const node = state.bookmarks[id]
      if (!node || node.type !== 'folder') return state

      return {
        bookmarks: {
          ...state.bookmarks,
          [id]: { ...node, isExpanded: !node.isExpanded },
        },
      }
    }),

  toggleCheck: (id: number, isChecked: boolean) =>
    set((state) => {
      const previousBookmarks = state.bookmarks
      const nextBookmarks = { ...state.bookmarks }
      const node = nextBookmarks[id]
      if (!node) return state

      const sourceIdsToSync: number[] = []

      const updateChildren = (targetId: number, checked: boolean) => {
        const target = nextBookmarks[targetId]
        if (!target) return

        nextBookmarks[targetId] = { ...target, isChecked: checked }
        if (target.type === 'source') {
          sourceIdsToSync.push(-targetId)
        }

        target.children.forEach((childId) => updateChildren(childId, checked))
      }

      const updateParents = (childId: number) => {
        const child = nextBookmarks[childId]
        if (!child) return
        if (child.parentId === null) return

        const parent = nextBookmarks[child.parentId]
        if (!parent) return

        const allChildrenChecked = parent.children.every((cId) => {
          const currentChild = nextBookmarks[cId]
          return currentChild ? currentChild.isChecked : false
        })

        nextBookmarks[child.parentId] = { ...parent, isChecked: allChildrenChecked }
        updateParents(child.parentId)
      }

      updateChildren(id, isChecked)
      updateParents(id)

      Promise.all(
        sourceIdsToSync.map((sourceId) => updateSource(sourceId, { is_active: isChecked })),
      ).catch((error) => {
        console.error('북마크 체크 상태 동기화 실패:', error)
        set({ bookmarks: previousBookmarks })
      })

      return { bookmarks: nextBookmarks }
    }),

  getCheckedSources: (): CheckedSource[] => {
    const { bookmarks } = get()
    return Object.values(bookmarks)
      .filter(
        (node): node is FlatBookmarkNode & { url: string } =>
          node.type === 'source' && node.isChecked && node.url !== null,
      )
      .map((node) => ({
        id: node.id,
        title: node.title,
        url: node.url,
      }))
  },

  renameBookmark: async (id: number, title: string) => {
    const node = get().bookmarks[id]
    if (!node || !title.trim()) return

    if (node.type === 'source') {
      await updateSource(-id, { title })
    }

    set((state) => ({
      bookmarks: {
        ...state.bookmarks,
        [id]: { ...state.bookmarks[id], title },
      },
      editingId: null,
    }))
  },

  deleteBookmark: async (id: number) => {
    const state = get()
    const bookmarks = state.bookmarks
    const node = bookmarks[id]
    if (!node) return

    const sourceIdsToDelete: number[] = []
    const collectSourceIds = (targetId: number) => {
      const target = bookmarks[targetId]
      if (!target) return
      if (target.type === 'source') {
        sourceIdsToDelete.push(-targetId)
      }
      target.children.forEach((childId) => collectSourceIds(childId))
    }
    collectSourceIds(id)

    if (sourceIdsToDelete.length > 0) {
      await Promise.all(sourceIdsToDelete.map((sourceId) => deleteSource(sourceId)))
    }

    set((state) => {
      const newBookmarks = { ...state.bookmarks }

      if (node.parentId !== null) {
        const parent = newBookmarks[node.parentId]
        if (parent) {
          newBookmarks[node.parentId] = {
            ...parent,
            children: parent.children.filter((childId) => childId !== id),
          }
        }
      }

      const deleteChildren = (targetId: number) => {
        const target = newBookmarks[targetId]
        if (!target) return
        delete newBookmarks[targetId]
        target.children.forEach((childId) => deleteChildren(childId))
      }

      deleteChildren(id)

      const newRootIds = state.rootIds.filter((rootId) => rootId !== id)

      return { bookmarks: newBookmarks, rootIds: newRootIds }
    })
  },
}))
