import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import { Globe } from 'lucide-react'

import { Checkbox, Collapsible, CollapsibleContent } from '@/shared/components'

import type { FlatBookmarkNode } from '../types/bookmarks.types'
import { useBookmarkStore } from '../store/bookmarks.store'
import HoverActions from './hover-actions'
import * as S from './bookmark-url.style'

const isSafeUrl = (url: string) => {
  try {
    return ['http:', 'https:'].includes(new URL(url).protocol)
  } catch {
    return false
  }
}

function Favicon({ url }: { url?: string | null }) {
  const [failed, setFailed] = useState(false)

  if (!url || failed || !isSafeUrl(url)) {
    return <Globe size={16} />
  }

  return (
    <Image
      src={`https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`}
      alt=""
      width={16}
      height={16}
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}

interface BookmarkUrlProps {
  data: Pick<FlatBookmarkNode, 'id' | 'title' | 'url' | 'summary'>
}

function BookmarkUrl({ data }: BookmarkUrlProps) {
  const isChecked = useBookmarkStore((s) => s.bookmarks[data.id]?.isChecked ?? false)
  const toggleCheck = useBookmarkStore((s) => s.toggleCheck)
  const deleteBookmark = useBookmarkStore((s) => s.deleteBookmark)
  const renameBookmark = useBookmarkStore((s) => s.renameBookmark)

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(data.title)
  const [showSummary, setShowSummary] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const isEscaping = useRef(false)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const handleSubmit = () => {
    if (isEscaping.current) {
      isEscaping.current = false
      return
    }
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== data.title) {
      renameBookmark(data.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      isEscaping.current = true
      setIsEditing(false)
      setEditValue(data.title)
    }
  }

  const handleOpenUrl = () => {
    if (!data.url || !isSafeUrl(data.url)) return
    window.open(data.url, '_blank', 'noopener,noreferrer')
  }

  const handleEditStart = () => {
    setIsEditing(true)
    setEditValue(data.title)
  }

  const hasSummary = !!data.summary

  return (
    <Collapsible open={showSummary}>
      <div className={S.fileRow()}>
        <div className={S.fileInfo()}>
          <button
            type="button"
            className={S.faviconButton()}
            onClick={handleOpenUrl}
          >
            <Favicon url={data.url} />
          </button>
          {isEditing ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSubmit}
              onKeyDown={handleKeyDown}
              className={S.editInput()}
            />
          ) : (
            <button
              type="button"
              className={S.titleButton({ clickable: hasSummary })}
              onClick={() => setShowSummary((prev) => !prev)}
              disabled={!hasSummary}
            >
              {data.title}
            </button>
          )}
          <HoverActions
            onClickDelete={() => deleteBookmark(data.id)}
            onClickEdit={handleEditStart}
          />
        </div>
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
        />
      </div>
      {hasSummary && (
        <CollapsibleContent>
          <p className={S.summary()}>{data.summary}</p>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}

export default BookmarkUrl
