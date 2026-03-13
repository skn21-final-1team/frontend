'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Copy, Check } from 'lucide-react'
import { getTimeRemaining } from '@/shared/utils/format-date'
import * as S from './extension-key.style'

interface ExtensionKeyProps {
  syncKey: string
  expiresAt: string
  isCopied: boolean
  onCopy: () => void
}

export function ExtensionKey({ syncKey, expiresAt, isCopied, onCopy }: ExtensionKeyProps) {
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(expiresAt))

  useEffect(() => {
    if (!expiresAt) return

    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining(expiresAt))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [expiresAt])

  return (
    <div className={S.container()}>
      <div className={S.keyRow()}>
        <Input readOnly value={syncKey} className={S.keyInput()} />
        <Button
          onClick={onCopy}
          variant="outline"
          size="icon"
          aria-label="복사"
          className={S.copyButton()}
        >
          {isCopied ? <Check className={S.checkIcon()} /> : <Copy className={S.copyIcon()} />}
        </Button>
      </div>

      <div className={S.footer()}>
        {isCopied ? (
          <p className={S.successMessage()}>✓ 복사되었습니다!</p>
        ) : (
          <p className={S.warningMessage()}>{timeRemaining}</p>
        )}
      </div>
    </div>
  )
}
