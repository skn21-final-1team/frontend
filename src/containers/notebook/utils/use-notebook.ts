'use client'

import { useState, useEffect } from 'react'
import { getNotebook, type Notebook } from '@/shared/api/notebook.api'
import { useNotebookMetaStore } from '@/shared/store/notebook-meta-store'

interface NotebookState {
  notebook: Notebook | null
  isLoading: boolean
  is404: boolean
  isError: boolean
}

export const useNotebook = (notebookId: number): NotebookState => {
  const setMeta = useNotebookMetaStore((s) => s.setMeta)
  const clearMeta = useNotebookMetaStore((s) => s.clear)
  const [state, setState] = useState<NotebookState>({
    notebook: null,
    isLoading: true,
    is404: false,
    isError: false,
  })

  useEffect(() => {
    getNotebook(notebookId)
      .then((notebook) => {
        setState({ notebook, isLoading: false, is404: false, isError: false })
        setMeta(notebookId, notebook.title)
      })
      .catch((err) => {
        const is404 = err?.response?.status === 404
        setState({ notebook: null, isLoading: false, is404, isError: !is404 })
        clearMeta()
      })

    return () => clearMeta()
  }, [notebookId, setMeta, clearMeta])

  return state
}
