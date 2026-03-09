'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  getNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  type Notebook,
} from '@/shared/api/notebook.api'
import { ErrorAlert, type ErrorAlertState } from '@/shared/components'
import NotebookCard from './components/notebook-card'
import CreateCard from './components/create-notebook-card'

import * as s from './index.style'

export default function NotebooksContainer() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ErrorAlertState | null>(null)

  const showError = useCallback((title: string, description: string) => {
    setError({ title, description })
  }, [])

  useEffect(() => {
    fetchNotebooks()
  }, [])

  const fetchNotebooks = async () => {
    try {
      setIsLoading(true)
      const data = await getNotebooks()
      setNotebooks(data)
    } catch {
      showError('목록 불러오기 실패', '노트북 목록을 불러오지 못했습니다. 네트워크 상태를 확인해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (title: string) => {
    try {
      const created = await createNotebook(title)
      setNotebooks((prev) => [created, ...prev])
    } catch {
      showError('노트북 생성 실패', '노트북을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleRename = async (id: number, newTitle: string) => {
    try {
      const updated = await updateNotebook(id, newTitle)
      setNotebooks((prev) =>
        prev.map((nb) => (nb.id === id ? updated : nb))
      )
    } catch {
      showError('이름 변경 실패', '노트북 이름을 변경하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteNotebook(id)
      setNotebooks((prev) => prev.filter((nb) => nb.id !== id))
    } catch {
      showError('노트북 삭제 실패', '노트북을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <div className={s.page()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />

      <div className={s.header()}>
        <h1 className={s.title()}>내 노트북</h1>
      </div>

      {isLoading ? (
        <div className={s.grid()}>
          <div className={s.loadingState()}>불러오는 중...</div>
        </div>
      ) : (
        <div className={s.grid()}>
          {notebooks.map((notebook) => (
            <NotebookCard
              key={notebook.id}
              notebook={notebook}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          ))}

          <CreateCard onCreate={handleCreate} />
        </div>
      )}
    </div>
  )
}
