'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'
import * as S from './create-notebook-card.style'

interface CreateNotebookCardProps {
  onCreate: (title: string) => Promise<void>
}

export default function CreateNotebookCard({ onCreate }: CreateNotebookCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleOpen = () => {
    setTitle('')
    setIsEditing(true)
  }

  const handleSubmit = async () => {
    const trimmed = title.trim()
    if (!trimmed) {
      setIsEditing(false)
      return
    }
    try {
      setIsLoading(true)
      await onCreate(trimmed)
      setTitle('')
      setIsEditing(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') {
      setIsEditing(false)
      setTitle('')
    }
  }

  if (isEditing) {
    return (
      <div className={S.card()}>
        <div className={S.inputWrapper()}>
          <input
            ref={inputRef}
            className={S.input()}
            placeholder="노트북 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            disabled={isLoading}
          />
          <span className={S.hint()}>Enter로 생성 · Esc로 취소</span>
        </div>
      </div>
    )
  }

  return (
    <div className={S.card()} onClick={handleOpen}>
      <Plus size={28} className={S.plusIcon()} />
      <span className={S.label()}>새 노트북 만들기</span>
    </div>
  )
}
