'use client'

import { useState, useEffect } from 'react'
import { getNotebook, type Notebook } from '@/shared/api/notebook.api'

interface NotebookState {
  notebook: Notebook | null
  isLoading: boolean
  is404: boolean
}

export const useNotebook = (notebookId: number): NotebookState => {
  const [state, setState] = useState<NotebookState>({
    notebook: null,
    isLoading: true,
    is404: false,
  })

  useEffect(() => {
    getNotebook(notebookId)
      .then((notebook) => setState({ notebook, isLoading: false, is404: false }))
      .catch((err) => {
        const is404 = err?.response?.status === 404
        setState({ notebook: null, isLoading: false, is404 })
      })
  }, [notebookId])

  return state
}
