import { useEffect } from 'react'
import { useBookmarkStore } from '../store/bookmarks.store'
import BookmarkItem from './bookmark-item'
import * as S from './bookmarks.style'

type BookmarksProps = {
  notebookId: number
}

function Bookmarks({ notebookId }: BookmarksProps) {
  const { rootIds, fetchAndInitialize, isLoading } = useBookmarkStore()

  useEffect(() => {
    fetchAndInitialize(notebookId)
  }, [notebookId])

  if (isLoading) return null

  return (
    <div className={S.folderList()}>
      {rootIds.map((id) => (
        <BookmarkItem key={id} id={id} />
      ))}
    </div>
  )
}

export default Bookmarks
