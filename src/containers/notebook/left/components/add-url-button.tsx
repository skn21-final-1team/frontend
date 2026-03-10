import { useState } from 'react'
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
import { crawlUrls } from '@/shared/api/directory.api'
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
      await crawlUrls([trimmed], notebookId)
      await fetchAndInitialize(notebookId)
      handleClose()
    } catch {
      setError('URL 크롤링에 실패했습니다. URL을 확인해주세요.')
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

        <div className="flex flex-col gap-2">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!url.trim() || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
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
