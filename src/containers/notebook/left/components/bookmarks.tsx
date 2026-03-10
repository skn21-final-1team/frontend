import { useEffect, useMemo } from 'react'
import { useBookmarkStore } from '../store/bookmarks.store'
import { SearchContext } from '../contexts/search-context'
import BookmarkItem from './bookmark-item'
import * as S from './bookmarks.style'

type BookmarksProps = {
  notebookId: number
}

function Bookmarks({ notebookId }: BookmarksProps) {
  const { rootIds, bookmarks, searchQuery, fetchAndInitialize, isLoading } = useBookmarkStore()

  useEffect(() => {
    fetchAndInitialize(notebookId)
  }, [notebookId, fetchAndInitialize])

  const matchedIds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return null

    const matched = new Set<number>()

    const collectAncestors = (id: number) => {
      let current = bookmarks[id]
      while (current) {
        if (matched.has(current.id)) break
        matched.add(current.id)
        current = current.parentId !== null ? bookmarks[current.parentId] : undefined!
      }
    }

    const collectDescendants = (id: number) => {
      const node = bookmarks[id]
      if (!node) return
      matched.add(id)
      node.children.forEach((childId) => collectDescendants(childId))
    }

    const search = (id: number) => {
      const node = bookmarks[id]
      if (!node) return

      const titleMatch = node.title?.toLowerCase().includes(query)
      const urlMatch = node.url?.toLowerCase().includes(query)

      if (titleMatch || urlMatch) {
        collectAncestors(id)
        if (node.type === 'folder') collectDescendants(id)
      }

      node.children.forEach((childId) => search(childId))
    }

    rootIds.forEach((id) => search(id))
    return matched
  }, [rootIds, bookmarks, searchQuery])

  const filteredRootIds = useMemo(() => {
    if (!matchedIds) return rootIds
    return rootIds.filter((id) => matchedIds.has(id))
  }, [rootIds, matchedIds])

  if (isLoading) return null

  return (
    <SearchContext value={{ matchedIds }}>
      <div className={S.folderList()}>
        {filteredRootIds.map((id) => (
          <BookmarkItem key={id} id={id} />
        ))}
      </div>
    </SearchContext>
  )
}

export default Bookmarks
