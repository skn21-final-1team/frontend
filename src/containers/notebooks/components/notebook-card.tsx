'use client'

import { useState, useRef, useEffect } from 'react'
import { Pin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Notebook } from '@/shared/api/notebook.api'
import ItemMenu from '@/shared/components/item-menu/item-menu'
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
  onRename,
  onDelete,
  onTogglePin,
}: NotebookCardProps) {
  const router = useRouter()
  const [isRenaming, setIsRenaming] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [title, setTitle] = useState(notebook.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleRenameSubmit()
    if (e.key === 'Escape') {
      setTitle(notebook.title)
      setIsRenaming(false)
    }
  }

  return (
    <div className={S.card()} onClick={handleClick}>
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
        <span onClick={(e) => e.stopPropagation()} className={S.menuButton()}>
          <ItemMenu
            align="end"
            size={14}
            onRename={() => setIsRenaming(true)}
            onDelete={() => setDeleteOpen(true)}
          />
        </span>
      </div>

      <div className={S.titleArea()}>
        {isRenaming ? (
          <input
            ref={inputRef}
            className={S.renameInput()}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleRenameSubmit}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <p className={S.title()}>{notebook.title}</p>
        )}
      </div>

      <div className={S.footer()}>
        <span className={S.date()}>{formatDate(notebook.created_at)}</span>
        {notebook.pinned && <span className={S.pinnedBadge()}>고정됨</span>}
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
