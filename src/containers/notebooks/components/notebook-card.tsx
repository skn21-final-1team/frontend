'use client'

import { useState, useRef, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Notebook } from '@/shared/api/notebook.api'
import ItemMenu from '@/shared/components/item-menu/item-menu'
import * as S from './notebook-card.style'

interface NotebookCardProps {
  notebook: Notebook
  onRename: (id: number, newTitle: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export default function NotebookCard({ notebook, onRename, onDelete }: NotebookCardProps) {
  const router = useRouter()
  const [isRenaming, setIsRenaming] = useState(false)
  const [title, setTitle] = useState(notebook.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isRenaming) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isRenaming])

  const handleClick = () => {
    if (!isRenaming) {
      router.push(`/notebook/${notebook.id}`)
    }
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
        <BookOpen size={20} className={S.icon()} />
        <span
          onClick={(e) => e.stopPropagation()}
          className={S.menuButton()}
        >
          <ItemMenu
            align="end"
            size={16}
            onRename={() => setIsRenaming(true)}
            onDelete={() => onDelete(notebook.id)}
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
    </div>
  )
}
