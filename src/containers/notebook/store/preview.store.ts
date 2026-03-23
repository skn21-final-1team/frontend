import { create } from 'zustand'

interface PreviewStore {
  isPreviewMode: boolean
  setPreviewMode: (isPreviewMode: boolean) => void
  togglePreviewMode: () => void
}
const usePreviewStore = create<PreviewStore>((set) => ({
  isPreviewMode: false,
  setPreviewMode: (isPreviewMode: boolean) => set({ isPreviewMode }),
  togglePreviewMode: () =>
    set((state) => ({
      isPreviewMode: !state.isPreviewMode,
    })),
}))

export default usePreviewStore
