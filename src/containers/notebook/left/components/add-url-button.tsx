import { useState } from 'react'
import axios from 'axios'
import { Loader2, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
} from '@/shared/components'
import { addSource } from '@/shared/api/directory.api'
import { useBookmarkStore } from '../store/bookmarks.store'
import * as S from './add-url-button.style'

type AddUrlButtonProps = {
  notebookId: number
}

function AddUrlButton({ notebookId }: AddUrlButtonProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchAndInitialize = useBookmarkStore((s) => s.fetchAndInitialize)

  const reset = () => {
    setUrl('')
    setError('')
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const handleOpenChange = (next: boolean) => {
    if (isLoading) return
    if (next) handleOpen()
    else handleClose()
  }

  const handleSubmit = async () => {
    const trimmed = url.trim()
    if (!trimmed) return

    setError('')
    setIsLoading(true)

    try {
      await addSource({ url: trimmed, notebook_id: notebookId })
      await fetchAndInitialize(notebookId)
      handleClose()
    } catch (error) {
      console.error('소스 추가 실패:', error)

      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        if (status === 400 || status === 422) setError('유효하지 않은 URL입니다. 형식을 확인해주세요.')
        else if (status === 404) setError('노트북을 찾을 수 없습니다.')
        else if (status && status >= 500) setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        else setError('네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.')
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) handleSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <button type="button" className={S.wrapper()} onClick={handleOpen}>
        <Plus className={S.icon()} />
        <span>URL 추가</span>
      </button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>URL 추가</DialogTitle>
          <DialogDescription>크롤링할 웹 페이지 URL을 입력해주세요.</DialogDescription>
        </DialogHeader>

        <div className={S.inputWrapper()}>
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {error && <p className={S.errorText()}>{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!url.trim() || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className={S.spinner()} />
                크롤링 중...
              </>
            ) : (
              '추가'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddUrlButton
