import { create } from 'zustand'
import { getDirectories } from '@/shared/api/directory.api'
import type { directory, source } from '@/shared/api/directory.api'
import type {
  BookmarkState,
  BookmarkStore,
  CheckedSource,
  FlatBookmarkNode,
} from '../types/bookmarks.types'

/**
 * 중첩된 directory 트리를 평탄화하여 BookmarkState 맵으로 변환한다.
 * @param directories - API에서 받은 최상위 디렉토리 배열
 * @param rootSources - 최상위 소스(디렉토리에 속하지 않는) 배열
 * @returns 평탄화된 BookmarkState와 최상위 노드 ID 배열
 */
const flattenDirectoryTree = (
  directories: directory[],
  rootSources: source[],
): { bookmarks: BookmarkState; rootIds: number[] } => {
  const bookmarks: BookmarkState = {}
  const rootIds: number[] = []

  const flattenDirectory = (dir: directory, parentId: number | null) => {
    const childDirectoryIds = dir.children.map((child) => child.id)
    const childSourceIds = dir.sources.map((src) => toSourceNodeId(src.id))

    const node: FlatBookmarkNode = {
      id: dir.id,
      type: 'folder',
      title: dir.title,
      url: null,
      isExpanded: false,
      isChecked: false,
      parentId,
      children: [...childDirectoryIds, ...childSourceIds],
    }

    bookmarks[dir.id] = node

    dir.sources.forEach((src) => flattenSource(src, dir.id))
    dir.children.forEach((child) => flattenDirectory(child, dir.id))
  }

  const flattenSource = (src: source, parentId: number | null) => {
    const nodeId = toSourceNodeId(src.id)
    const node: FlatBookmarkNode = {
      id: nodeId,
      type: 'source',
      title: src.title,
      url: src.url,
      isExpanded: false,
      isChecked: false,
      parentId,
      children: [],
    }
    bookmarks[nodeId] = node
  }

  directories.forEach((dir) => {
    rootIds.push(dir.id)
    flattenDirectory(dir, null)
  })

  rootSources.forEach((src) => {
    const nodeId = toSourceNodeId(src.id)
    rootIds.push(nodeId)
    flattenSource(src, null)
  })

  return { bookmarks, rootIds }
}

/**
 * source ID를 directory ID와 충돌하지 않도록 변환한다.
 * @param sourceId - source의 원본 ID
 * @returns 음수로 변환된 고유 ID
 */
const toSourceNodeId = (sourceId: number): number => -sourceId

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  responseData: { directories: [], sources: [] },
  bookmarks: {},
  rootIds: [],
  isLoading: false,

  fetchAndInitialize: async (notebookId: number) => {
    set({ isLoading: true })
    try {
      const response = await getDirectories(notebookId)
      const { bookmarks, rootIds } = flattenDirectoryTree(response.directories, response.sources)
      set({ responseData: response, bookmarks, rootIds })
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
      const newBookmarks = { ...state.bookmarks }
      const node = newBookmarks[id]
      if (!node) return state

      const updateChildren = (targetId: number, checked: boolean) => {
        const target = newBookmarks[targetId]
        newBookmarks[targetId] = { ...target, isChecked: checked }
        target.children.forEach((childId) => updateChildren(childId, checked))
      }

      const updateParents = (childId: number) => {
        const child = newBookmarks[childId]
        if (child.parentId === null) return

        const parent = newBookmarks[child.parentId]
        const allChildrenChecked = parent.children.every((cId) => newBookmarks[cId].isChecked)
        newBookmarks[child.parentId] = { ...parent, isChecked: allChildrenChecked }
        updateParents(child.parentId)
      }

      updateChildren(id, isChecked)
      updateParents(id)

      return { bookmarks: newBookmarks }
    }),

  getCheckedSources: (): CheckedSource[] => {
    const { bookmarks } = useBookmarkStore.getState()
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

  deleteBookmark: (id: number) =>
    set((state) => {
      const newBookmarks = { ...state.bookmarks }
      const node = newBookmarks[id]
      if (!node) return state

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
    }),
}))
