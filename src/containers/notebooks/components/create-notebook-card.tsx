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
  const isEscaping = useRef(false)

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
    if (isEscaping.current) {
      isEscaping.current = false
      return
    }
    if (isLoading) return
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
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      isEscaping.current = true
      setIsEditing(false)
      setTitle('')
    }
  }

  return (
    <div className={S.card()} onClick={handleOpen}>
      <div className={S.media()}>
        <div className={S.mediaInner()}>
          {isEditing ? (
            <div className={S.inputWrapper()}>
              <input
                ref={inputRef}
                className={S.input()}
                placeholder="노트북 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                disabled={isLoading}
              />
              <span className={S.hint()}>Enter로 생성 · Esc로 취소</span>
            </div>
          ) : (
            <Plus size={28} className={S.plusIcon()} />
          )}
        </div>
      </div>
    </div>
  )
}
