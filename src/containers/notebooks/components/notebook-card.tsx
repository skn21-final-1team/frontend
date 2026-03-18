'use client'

import { useEffect, useRef, useState } from 'react'
import { Pin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Notebook } from '@/shared/api/notebook.api'
import ItemMenu from '@/shared/components/item-menu/item-menu'
import { getNotebookCardImageByIndex } from '../constants/card-images'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components'
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
  const cardImageSrc = getNotebookCardImageByIndex(cardIndex)

  const changeRenameMode = (editing: boolean) => {
    setIsRenaming(editing)
  }

  useEffect(() => {
    if (!isRenaming) return

    if (!inputRef.current) return
    inputRef.current.focus()
    inputRef.current.select()
  }, [isRenaming])

  const handleClick = () => {
    if (isRenaming || deleteOpen) return
    router.push(`/notebook/${notebook.id}`)
  }

  const handleRenameSubmit = async () => {
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleRenameSubmit()
    }
    if (e.key === 'Escape') {
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
            <Pin size={14} className={notebook.pinned ? S.pinIconFilled() : undefined} />
          </button>
          <ItemMenu
            align="end"
            size={14}
            onRename={() => changeRenameMode(true)}
            onDelete={() => setDeleteOpen(true)}
          />
        </div>

        <div className={S.badgeStack()}>
          {notebook.pinned && <span className={S.pinnedBadge()}>고정됨</span>}
          <span className={S.dateBadge()}>{formatDate(notebook.created_at)}</span>
        </div>

        <div className={S.overlayTitleArea()}>
          {isRenaming ? (
            <textarea
              ref={inputRef}
              autoFocus
              className={S.renameInput()}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
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

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>노트북 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{notebook.title}&rdquo;을(를) 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(notebook.id)}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
