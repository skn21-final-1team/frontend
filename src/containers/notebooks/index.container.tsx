'use client'

import { useEffect } from 'react'

import { ErrorAlert } from '@/shared/components'
import { useNotebooksStore } from './store/notebooks.store'
import NotebookCard from './components/notebook-card'
import CreateCard from './components/create-notebook-card'
import SortSelect from './components/sort-select'

import * as s from './index.style'

function NotebooksContainer() {
  const notebooks = useNotebooksStore((state) => state.notebooks)
  const sort = useNotebooksStore((state) => state.sort)
  const isLoading = useNotebooksStore((state) => state.isLoading)
  const error = useNotebooksStore((state) => state.error)
  const fetchNotebooks = useNotebooksStore((state) => state.fetchNotebooks)
  const setSort = useNotebooksStore((state) => state.setSort)
  const createNotebook = useNotebooksStore((state) => state.createNotebook)
  const renameNotebook = useNotebooksStore((state) => state.renameNotebook)
  const deleteNotebook = useNotebooksStore((state) => state.deleteNotebook)
  const togglePin = useNotebooksStore((state) => state.togglePin)
  const clearError = useNotebooksStore((state) => state.clearError)

  useEffect(() => {
    fetchNotebooks()
  }, [sort, fetchNotebooks])

  const pinnedNotebooks = notebooks.filter((nb) => nb.pinned)
  const unpinnedNotebooks = notebooks.filter((nb) => !nb.pinned)

  const cardProps = {
    onRename: renameNotebook,
    onDelete: deleteNotebook,
    onTogglePin: togglePin,
  }

  if (isLoading) {
    return (
      <div className={s.page()}>
        <div className={s.header()}>
          <h1 className={s.title()}>내 노트북</h1>
        </div>
        <div className={s.grid()}>
          <div className={s.loadingState()}>불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={s.page()}>
      <ErrorAlert error={error} onClose={clearError} />

      <div className={s.header()}>
        <h1 className={s.title()}>내 노트북</h1>
      </div>

      <section className={s.section()}>
        <div className={s.sectionHeader()}>
          <span className={s.sectionTitle()}>Pinned</span>
        </div>
        <div className={s.pinnedContent()}>
          {pinnedNotebooks.length === 0 ? (
            <p className={s.emptyState()}>고정된 노트북이 없습니다.</p>
          ) : (
            <div className={s.grid()}>
              {pinnedNotebooks.map((notebook, cardIndex) => (
                <NotebookCard
                  key={notebook.id}
                  notebook={notebook}
                  cardIndex={cardIndex}
                  {...cardProps}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={s.section()}>
        <div className={s.sectionHeader()}>
          <span className={s.sectionTitle()}>Notebooks</span>
          <SortSelect value={sort} onChange={setSort} />
        </div>
        <div className={s.grid()}>
          <CreateCard onCreate={createNotebook} />
          {unpinnedNotebooks.map((notebook, cardIndex) => (
            <NotebookCard
              key={notebook.id}
              notebook={notebook}
              cardIndex={cardIndex}
              {...cardProps}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default NotebooksContainer
