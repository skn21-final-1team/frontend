import { create } from 'zustand'
import { getDirectories } from '@/shared/api/directory.api'
import {
  directory,
  source,
  updateSource,
  updateAllSourcesActive,
  deleteSource,
  renameDirectory,
  deleteDirectory,
} from '@/shared/api/directory.api'
import type {
  BookmarkState,
  BookmarkStore,
  CheckedSource,
  FlatBookmarkNode,
} from '../types/bookmarks.types'

const showError = (
  set: (state: Partial<BookmarkStore>) => void,
  title: string,
  description: string,
) => {
  set({ error: { title, description } })
}

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
      status: null,
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
      status: src.status,
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
  isSyncing: false,
  searchQuery: '',
  error: null,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  clearError: () => set({ error: null }),

  fetchAndInitialize: async (notebookId: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await getDirectories(notebookId)
      const { bookmarks, rootIds } = flattenDirectoryTree(response.directories, response.sources)
      set({ bookmarks, rootIds })
    } catch (error) {
      console.error('북마크 로딩 실패:', error)
      showError(set, '북마크 로딩 실패', '북마크를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
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

  toggleCheck: async (id: number, isChecked: boolean) => {
    if (get().isSyncing) return

    const previousBookmarks = get().bookmarks
    const nextBookmarks = { ...previousBookmarks }
    const node = nextBookmarks[id]
    if (!node) return

    const sourceIdsToSync: number[] = []

    const updateChildren = (targetId: number, checked: boolean) => {
      const target = nextBookmarks[targetId]
      if (!target) return
      nextBookmarks[targetId] = { ...target, isChecked: checked }
      if (target.type === 'source') sourceIdsToSync.push(-targetId)
      target.children.forEach((childId) => updateChildren(childId, checked))
    }

    const updateParents = (childId: number) => {
      const child = nextBookmarks[childId]
      if (!child || child.parentId === null) return
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

    set({ bookmarks: nextBookmarks, isSyncing: true })

    try {
      await Promise.all(
        sourceIdsToSync.map((sourceId) => updateSource(sourceId, { is_active: isChecked })),
      )
    } catch (error) {
      console.error('북마크 체크 상태 동기화 실패:', error)
      set({ bookmarks: previousBookmarks })
    } finally {
      set({ isSyncing: false })
    }
  },

  toggleCheckAll: async (notebookId: number, isChecked: boolean) => {
    if (get().isSyncing) return

    const previousBookmarks = get().bookmarks
    const nextBookmarks = { ...previousBookmarks }

    for (const id of Object.keys(nextBookmarks).map(Number)) {
      const node = nextBookmarks[id]
      if (!node) continue
      nextBookmarks[id] = { ...node, isChecked }
    }

    set({ bookmarks: nextBookmarks, isSyncing: true })

    try {
      const updatedSources = await updateAllSourcesActive(notebookId, isChecked)
      const reconciledBookmarks = { ...get().bookmarks }
      const serverActiveMap = new Map(updatedSources.map((s) => [s.id, s.is_active]))

      for (const [id, node] of Object.entries(reconciledBookmarks)) {
        const numId = Number(id)
        if (node.type === 'source') {
          const serverActive = serverActiveMap.get(-numId)
          if (serverActive !== undefined) {
            reconciledBookmarks[numId] = { ...node, isChecked: serverActive }
          }
        }
      }

      const recomputeFolder = (id: number): boolean => {
        const node = reconciledBookmarks[id]
        if (!node) return false
        if (node.type === 'source') return node.isChecked
        if (node.children.length === 0) return true
        const allChecked = node.children.every((childId) => recomputeFolder(childId))
        reconciledBookmarks[id] = { ...node, isChecked: allChecked }
        return allChecked
      }
      get().rootIds.forEach((id) => recomputeFolder(id))

      set({ bookmarks: reconciledBookmarks })
    } catch (error) {
      console.error('전체 체크 상태 동기화 실패:', error)
      set({ bookmarks: previousBookmarks })
    } finally {
      set({ isSyncing: false })
    }
  },

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

    try {
      if (node.type === 'source') {
        await updateSource(-id, { title })
      } else if (node.type === 'folder') {
        await renameDirectory(id, title)
      }

      set((state) => ({
        bookmarks: {
          ...state.bookmarks,
          [id]: { ...state.bookmarks[id], title },
        },
      }))
    } catch (error) {
      console.error('이름 변경 실패:', error)
      showError(
        set,
        '이름 변경 실패',
        `${node.type === 'folder' ? '폴더' : '북마크'} 이름을 변경하지 못했습니다. 잠시 후 다시 시도해주세요.`,
      )
    }
  },

  deleteBookmark: async (id: number) => {
    const state = get()
    const bookmarks = state.bookmarks
    const node = bookmarks[id]
    if (!node) return

    try {
      if (node.type === 'folder') {
        await deleteDirectory(id)
      } else if (node.type === 'source') {
        await deleteSource(-id)
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
    } catch (error) {
      console.error('삭제 실패:', error)
      showError(
        set,
        '삭제 실패',
        `${node.type === 'folder' ? '폴더' : '북마크'}를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.`,
      )
    }
  },
}))
