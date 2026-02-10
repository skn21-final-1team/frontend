import { useEffect } from 'react'
import { useBookmarkStore } from '../store/bookmarks.store'
import type { Bookmark } from '../types/bookmarks'
import BookmarkItem from './bookmark-item'
import * as S from './bookmarks.style'

type BookmardProps = {
  data: Bookmark[]
}

function Bookmarks({ data }: BookmardProps) {
  const { initialize } = useBookmarkStore()

  useEffect(() => {
    initialize(data)
  }, [data, initialize])

  return (
    <div className={S.folderList()}>
      {data.map((item) => (
        <BookmarkItem key={item.id} id={item.id} />
      ))}
    </div>
  )
}

export default Bookmarks
