import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  ItemMenu,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components'
import * as S from './generated-list.style'
import type { GeneratedItem } from '../../types/studio'

interface GeneratedListProps {
  items: GeneratedItem[]
  onRemove: (itemId: string) => void
  onSelect: (itemId: string) => void
  onRename: (itemId: string, title: string) => void
}

function GeneratedList({ items, onRemove, onSelect, onRename }: GeneratedListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<GeneratedItem | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingId) inputRef.current?.focus()
  }, [editingId])

  const startRename = (item: GeneratedItem) => {
    setEditingId(item.id)
    setEditValue(item.title)
  }

  const commitRename = (itemId: string) => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== items.find((i) => i.id === itemId)?.title) {
      onRename(itemId, trimmed)
    }
    setEditingId(null)
  }

  if (items.length === 0) return null

  return (
    <div className={S.wrapper()}>
      <p className={S.title()}>생성된 컨텐츠</p>
      <div className={S.list()}>
        {items.map((item) => (
          <div
            key={item.id}
            className={S.item()}
            onClick={() => editingId !== item.id && onSelect(item.id)}
          >
            <div className={S.icon()}>
              {item.type === 'flashcard' && (
                <Image src="/flashcard.svg" alt="flashcard" width={20} height={20} />
              )}
              {item.type === 'quiz' && (
                <Image src="/quiz.svg" alt="quiz" width={20} height={20} />
              )}
            </div>

            <div className={S.content()}>
              {editingId === item.id ? (
                <input
                  ref={inputRef}
                  className={S.renameInput()}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => commitRename(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitRename(item.id)
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  <p className={S.itemTitle()}>{item.title}</p>
                  <p className={S.itemSubtitle()}>소스 {item.sourceCount}개</p>
                </>
              )}
            </div>

            <ItemMenu
              align="end"
              onDelete={() => setDeleteTarget(item)}
              onRename={() => startRename(item)}
            />
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>삭제 확인</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{deleteTarget?.title}&rdquo;을(를) 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) onRemove(deleteTarget.id)
                setDeleteTarget(null)
              }}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default GeneratedList