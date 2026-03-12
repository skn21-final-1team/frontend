import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button, Checkbox } from '@/shared/components'
import { Globe } from 'lucide-react'
import type { FlatBookmarkNode } from '../types/bookmarks.types'
import { useBookmarkStore } from '../store/bookmarks.store'
import HoverActions from './hover-actions'
import * as S from './bookmark-url.style'

function Favicon({ url }: { url?: string | null }) {
  const [failed, setFailed] = useState(false)

  if (!url || failed) {
    return <Globe size={16} style={{ flexShrink: 0 }} />
  }

  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`}
      alt=""
      width={16}
      height={16}
      style={{ flexShrink: 0 }}
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}

type BookmarkUrlProps = {
  data: Pick<FlatBookmarkNode, 'id' | 'title' | 'url'>
}

function BookmarkUrl({ data }: BookmarkUrlProps) {
  const isChecked = useBookmarkStore((s) => s.bookmarks[data.id]?.isChecked ?? false)
  const toggleCheck = useBookmarkStore((s) => s.toggleCheck)
  const deleteBookmark = useBookmarkStore((s) => s.deleteBookmark)
  const renameBookmark = useBookmarkStore((s) => s.renameBookmark)

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(data.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleSubmit = () => {
    if (editValue.trim() && editValue !== data.title) {
      renameBookmark(data.id, editValue.trim())
    } else {
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') setIsEditing(false)
  }

  const changeEditMode = () => {
    setIsEditing(true)
    setEditValue(data.title)
  }

  return (
    <div className={S.fileRow()}>
      <div className={S.fileInfo()}>
        <Button variant="link" size="sm" className={S.file()}>
          <Favicon url={data.url} />
          {isEditing ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              style={{ all: 'unset', width: '100%' }}
            />
          ) : (
            <span className={S.title()}>{data.title}</span>
          )}
        </Button>
        <HoverActions onClickDelete={() => deleteBookmark(data.id)} onClickEdit={changeEditMode} />
      </div>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
      />
    </div>
  )
}

export default BookmarkUrl
