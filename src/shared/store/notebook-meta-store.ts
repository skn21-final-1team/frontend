import { create } from 'zustand'

interface NotebookMetaState {
  notebookId: number | null
  title: string | null
  setMeta: (notebookId: number, title: string) => void
  clear: () => void
}

export const useNotebookMetaStore = create<NotebookMetaState>((set) => ({
  notebookId: null,
  title: null,
  setMeta: (notebookId, title) => set({ notebookId, title }),
  clear: () => set({ notebookId: null, title: null }),
}))
