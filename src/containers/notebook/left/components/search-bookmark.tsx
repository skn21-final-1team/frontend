import { useRef, useState } from 'react'
import { useBookmarkStore } from '../store/bookmarks.store'
import * as S from './search-bookmark.style'

function SearchBookmark() {
  const setSearchQuery = useBookmarkStore((state) => state.setSearchQuery)
  const [inputValue, setInputValue] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleChange = (value: string) => {
    setInputValue(value)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setSearchQuery(value)
    }, 250)
  }

  return (
    <div className={S.searchWrapper()}>
      <input
        type="text"
        placeholder="북마크 검색..."
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className={S.searchInput()}
      />
    </div>
  )
}

export default SearchBookmark
