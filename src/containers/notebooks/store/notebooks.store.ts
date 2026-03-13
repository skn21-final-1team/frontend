import { create } from 'zustand'
import {
  getNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  type Notebook,
  type NotebookSortType,
} from '@/shared/api/notebook.api'
import type { ErrorAlertState } from '@/shared/components'

interface NotebooksStore {
  // State
  notebooks: Notebook[]
  sort: NotebookSortType
  isLoading: boolean
  error: ErrorAlertState | null

  // Actions
  fetchNotebooks: () => Promise<void>
  setSort: (sort: NotebookSortType) => void
  createNotebook: (title: string) => Promise<void>
  renameNotebook: (id: number, newTitle: string) => Promise<void>
  deleteNotebook: (id: number) => Promise<void>
  togglePin: (id: number, pinned: boolean) => Promise<void>
  clearError: () => void
}

const showError = (set: (state: Partial<NotebooksStore>) => void, title: string, description: string) => {
  set({ error: { title, description } })
}

export const useNotebooksStore = create<NotebooksStore>((set, get) => ({
  notebooks: [],
  sort: 'recent',
  isLoading: true,
  error: null,

  fetchNotebooks: async () => {
    set({ isLoading: true })
    try {
      const data = await getNotebooks(get().sort)
      set({ notebooks: data })
    } catch {
      showError(set, '목록 불러오기 실패', '노트북 목록을 불러오지 못했습니다. 네트워크 상태를 확인해주세요.')
    } finally {
      set({ isLoading: false })
    }
  },

  setSort: (sort: NotebookSortType) => set({ sort }),

  createNotebook: async (title: string) => {
    try {
      await createNotebook(title)
      await get().fetchNotebooks()
    } catch {
      showError(set, '노트북 생성 실패', '노트북을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  },

  renameNotebook: async (id: number, newTitle: string) => {
    try {
      await updateNotebook(id, { title: newTitle })
      await get().fetchNotebooks()
    } catch {
      showError(set, '이름 변경 실패', '노트북 이름을 변경하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  },

  deleteNotebook: async (id: number) => {
    try {
      await deleteNotebook(id)
      await get().fetchNotebooks()
    } catch {
      showError(set, '노트북 삭제 실패', '노트북을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  },

  togglePin: async (id: number, pinned: boolean) => {
    try {
      await updateNotebook(id, { pinned })
      await get().fetchNotebooks()
    } catch {
      showError(set, '고정 실패', '노트북 고정 상태를 변경하지 못했습니다.')
    }
  },

  clearError: () => set({ error: null }),
}))
