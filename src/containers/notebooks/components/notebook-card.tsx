'use client'

import { useEffect, useRef, useState } from 'react'
import { Pin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Notebook } from '@/shared/api/notebook.api'
import ItemMenu from '@/shared/components/item-menu/item-menu'
import { getNotebookCardImageByIndex } from '../constants/card-images'
import { ConfirmationDialog } from '@/shared/components/confirmation-dialog'
import * as S from './notebook-card.style'

interface NotebookCardProps {
  notebook: Notebook
  cardIndex: number
  onRename: (id: number, newTitle: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
  onTogglePin: (id: number, pinned: boolean) => Promise<void>
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function NotebookCard({
  notebook,
  cardIndex,
  onRename,
  onDelete,
  onTogglePin,
}: NotebookCardProps) {
  const router = useRouter()
  const [isRenaming, setIsRenaming] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isImageFailed, setIsImageFailed] = useState(false)
  const [title, setTitle] = useState(notebook.title)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isEscaping = useRef(false)
  const cardImageSrc = getNotebookCardImageByIndex(cardIndex)

  const handleSetRenaming = (editing: boolean) => {
    setIsRenaming(editing)
  }

  useEffect(() => {
    if (!isRenaming) return

    if (!inputRef.current) return
    inputRef.current.focus()
    inputRef.current.select()
    inputRef.current.style.height = 'auto'
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  }, [isRenaming])

  const handleClick = () => {
    if (isRenaming || deleteOpen) return
    router.push(`/notebook/${notebook.id}`)
  }

  const handleRenameSubmit = async () => {
    if (isEscaping.current) {
      isEscaping.current = false
      return
    }
    const trimmed = title.trim()
    if (!trimmed || trimmed === notebook.title) {
      setTitle(notebook.title)
      setIsRenaming(false)
      return
    }
    await onRename(notebook.id, trimmed)
    setIsRenaming(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleRenameSubmit()
    } else if (e.key === 'Escape') {
      isEscaping.current = true
      setTitle(notebook.title)
      setIsRenaming(false)
    }
  }

  return (
    <div className={S.card()} onClick={handleClick}>
      <div className={S.media()}>
        {!isImageFailed && (
          <Image
            src={cardImageSrc}
            alt={`${notebook.title} 배경 이미지`}
            className={S.cardImage()}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
            onError={() => setIsImageFailed(true)}
          />
        )}
        <div className={S.mediaOverlay()} />

        <div className={S.topRow()}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onTogglePin(notebook.id, !notebook.pinned)
            }}
            className={S.pinButton({ pinned: notebook.pinned })}
          >
            <Pin size={14} />
          </button>
          <div className={S.menuWrapper()}>
            <ItemMenu
              align="end"
              size={14}
              onRename={() => handleSetRenaming(true)}
              onDelete={() => setDeleteOpen(true)}
            />
          </div>
        </div>

        <div className={S.badgeStack()}>
          {notebook.pinned && <span className={S.pinnedBadge()}>고정됨</span>}
          <span className={S.dateBadge()}>{formatDate(notebook.created_at)}</span>
        </div>

        <div className={S.overlayTitleArea()}>
          {isRenaming ? (
            <textarea
              ref={inputRef}
              rows={1}
              autoFocus
              className={S.renameInput()}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleRenameSubmit}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p className={S.title()}>{notebook.title}</p>
          )}
        </div>

        {isImageFailed && (
          <div className={S.mediaFallback()}>
            <span className={S.mediaFallbackLabel()}>Notebook</span>
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={deleteOpen}
        title="노트북 삭제"
        description={`\u201C${notebook.title}\u201D을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        onOpenChange={setDeleteOpen}
        onConfirm={() => onDelete(notebook.id)}
      />
    </div>
  )
}
