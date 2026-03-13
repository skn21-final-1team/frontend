'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { createExtensionSyncKey } from '@/shared/api/extension.api'
import { copyToClipboard } from '@/shared/utils/copy-to-clipboard'
import type { SyncKeyState } from '@/shared/types/extension'

export const useExtension = (notebookId: number) => {
  const [state, setState] = useState<SyncKeyState>({
    key: null,
    expiresAt: null,
    isLoading: false,
    error: null,
  })
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const generateKey = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const data = await createExtensionSyncKey(notebookId)
      setState({
        key: data.sync_key,
        expiresAt: data.expires_at,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : '키 발급에 실패했습니다.',
      }))
    }
  }, [notebookId])

  const copyKey = useCallback(async () => {
    if (!state.key) return

    const success = await copyToClipboard(state.key)
    if (success) {
      setIsCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000)
    }
  }, [state.key])

  const reset = useCallback(() => {
    setState({
      key: null,
      expiresAt: null,
      isLoading: false,
      error: null,
    })
    setIsCopied(false)
  }, [])

  return {
    ...state,
    isCopied,
    generateKey,
    copyKey,
    reset,
  }
}
