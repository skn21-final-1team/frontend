import { useState, useRef, useEffect } from 'react'
import { Button, Checkbox } from '@/shared/components'
import { Bookmark as BookmarkIcon } from 'lucide-react'
import type { FlatBookmarkNode } from '../types/bookmarks.types'
import { useBookmarkStore } from '../store/bookmarks.store'
import HoverActions from './hover-actions'
import * as S from './bookmark-url.style'

type BookmarkUrlProps = {
  data: Pick<FlatBookmarkNode, 'id' | 'title' | 'url'>
}

function BookmarkUrl({ data }: BookmarkUrlProps) {
  const isChecked = useBookmarkStore((s) => s.bookmarks[data.id]?.isChecked ?? false)
  const toggleCheck = useBookmarkStore((s) => s.toggleCheck)
  const deleteBookmark = useBookmarkStore((s) => s.deleteBookmark)
  const editingId = useBookmarkStore((s) => s.editingId)
  const setEditingId = useBookmarkStore((s) => s.setEditingId)
  const renameBookmark = useBookmarkStore((s) => s.renameBookmark)

  const isEditing = editingId === data.id
  const [editValue, setEditValue] = useState(data.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      setEditValue(data.title)
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing, data.title])

  const handleSubmit = () => {
    if (editValue.trim() && editValue !== data.title) {
      renameBookmark(data.id, editValue.trim())
    } else {
      setEditingId(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') setEditingId(null)
  }

  return (
    <div className={S.fileRow()}>
      <div className={S.fileInfo()}>
        <Button variant="link" size="sm" className={S.file()}>
          <BookmarkIcon />
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
        <HoverActions
          onClickDelete={() => deleteBookmark(data.id)}
          onClickEdit={() => setEditingId(data.id)}
        />
      </div>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
      />
    </div>
  )
}

export default BookmarkUrl
