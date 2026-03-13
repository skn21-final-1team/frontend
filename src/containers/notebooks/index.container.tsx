'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  getNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  type Notebook,
  type NotebookSortType,
} from '@/shared/api/notebook.api'
import { ErrorAlert, type ErrorAlertState } from '@/shared/components'
import NotebookCard from './components/notebook-card'
import CreateCard from './components/create-notebook-card'
import SortSelect from './components/sort-select'

import * as s from './index.style'

export default function NotebooksContainer() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [sort, setSort] = useState<NotebookSortType>('recent')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ErrorAlertState | null>(null)

  const showError = useCallback((title: string, description: string) => {
    setError({ title, description })
  }, [])

  const fetchNotebooks = useCallback(async (sortType: NotebookSortType) => {
    try {
      setIsLoading(true)
      const data = await getNotebooks(sortType)
      setNotebooks(data)
    } catch {
      showError('목록 불러오기 실패', '노트북 목록을 불러오지 못했습니다. 네트워크 상태를 확인해주세요.')
    } finally {
      setIsLoading(false)
    }
  }, [showError])

  useEffect(() => {
    fetchNotebooks(sort)
  }, [sort, fetchNotebooks])

  const handleCreate = async (title: string) => {
    try {
      await createNotebook(title)
      await fetchNotebooks(sort)
    } catch {
      showError('노트북 생성 실패', '노트북을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleRename = async (id: number, newTitle: string) => {
    try {
      await updateNotebook(id, { title: newTitle })
      await fetchNotebooks(sort)
    } catch {
      showError('이름 변경 실패', '노트북 이름을 변경하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteNotebook(id)
      await fetchNotebooks(sort)
    } catch {
      showError('노트북 삭제 실패', '노트북을 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  const handleTogglePin = async (id: number, pinned: boolean) => {
    try {
      await updateNotebook(id, { pinned })
      await fetchNotebooks(sort)
    } catch {
      showError('고정 실패', '노트북 고정 상태를 변경하지 못했습니다.')
    }
  }

  const sortedNotebooks = useMemo(() => {
    const pinned = notebooks.filter((nb) => nb.pinned)
    const unpinned = notebooks.filter((nb) => !nb.pinned)
    return [...pinned, ...unpinned]
  }, [notebooks])

  return (
    <div className={s.page()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />

      <div className={s.header()}>
        <h1 className={s.title()}>내 노트북</h1>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {isLoading ? (
        <div className={s.grid()}>
          <div className={s.loadingState()}>불러오는 중...</div>
        </div>
      ) : (
        <div className={s.grid()}>
          {sortedNotebooks.map((notebook) => (
            <NotebookCard
              key={notebook.id}
              notebook={notebook}
              onRename={handleRename}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
            />
          ))}

          <CreateCard onCreate={handleCreate} />
        </div>
      )}
    </div>
  )
}
