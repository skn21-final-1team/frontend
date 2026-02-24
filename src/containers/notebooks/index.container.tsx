'use client'

import { useEffect, useState } from 'react'
import {
  getNotebooks,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  type Notebook,
} from '@/shared/api/notebook.api'
import NotebookCard from './components/notebook-card'
import CreateCard from './components/create-notebook-card'

import * as s from './index.style'

export default function NotebooksContainer() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotebooks()
  }, [])

  const fetchNotebooks = async () => {
    try {
      setIsLoading(true)
      const data = await getNotebooks()
      setNotebooks(data)
    } catch (error) {
      console.error('노트북 목록 불러오기 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (title: string) => {
    try {
      const created = await createNotebook(title)
      setNotebooks((prev) => [created, ...prev])
    } catch (error) {
      console.error('노트북 생성 실패:', error)
    }
  }

  const handleRename = async (id: number, newTitle: string) => {
    try {
      const updated = await updateNotebook(id, newTitle)
      setNotebooks((prev) =>
        prev.map((nb) => (nb.id === id ? updated : nb))
      )
    } catch (error) {
      console.error('노트북 이름 변경 실패:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteNotebook(id)
      setNotebooks((prev) => prev.filter((nb) => nb.id !== id))
    } catch (error) {
      console.error('노트북 삭제 실패:', error)
    }
  }

  return (
    <div className={s.page()}>

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
