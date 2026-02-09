import { useState } from 'react'
import * as S from './search-bookmark.style'

function SearchBookmark() {
  const [searchQuery, setSearchQuery] = useState('')

  const onSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className={S.searchWrapper()}>
      <input
        type="text"
        placeholder="북마크 검색..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className={S.searchInput()}
      />
    </div>
  )
}

export default SearchBookmark
