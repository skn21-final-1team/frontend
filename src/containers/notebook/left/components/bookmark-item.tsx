import { useBookmarkStore } from '../store/bookmarks.store'
import { useSearchContext } from '../contexts/search-context'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ChevronRightIcon, FolderIcon } from 'lucide-react'
import HeaderActions from './hover-actions'
import BookmarkUrl from './bookmark-url'
import * as S from './bookmark-item.style'

type BookmarkItemProps = {
  id: number
}

function BookmarkItem({ id }: BookmarkItemProps) {
  const data = useBookmarkStore((state) => state.bookmarks[id])
  const toggleExpand = useBookmarkStore((state) => state.toggleExpand)
  const toggleCheck = useBookmarkStore((state) => state.toggleCheck)
  const deleteBookmark = useBookmarkStore((state) => state.deleteBookmark)
  const { matchedIds } = useSearchContext()

  if (!data) return null

  if (data.type === 'folder') {
    const isSearching = matchedIds !== null
    const isOpen = isSearching || data.isExpanded

    const visibleChildren = isSearching
      ? data.children.filter((childId) => matchedIds.has(childId))
      : data.children

    return (
      <Collapsible key={data.id} open={isOpen}>
        <div className={S.folderRow()}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={S.folder()}
              onClick={() => toggleExpand(data.id)}
            >
              <span className={S.fileLeft()}>
                <ChevronRightIcon className={S.chevron()} />
                <FolderIcon />
                {data.title}
              </span>
              <HeaderActions onClickDelete={() => deleteBookmark(data.id)} onClickEdit={() => {}} />
            </Button>
          </CollapsibleTrigger>

          <Checkbox
            checked={data.isChecked}
            onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
          />
        </div>
        <CollapsibleContent className={S.subList()}>
          <span className={S.subFolder()}>
            {visibleChildren.map((childId) => (
              <BookmarkItem key={childId} id={childId} />
            ))}
          </span>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return <BookmarkUrl data={data} />
}

export default BookmarkItem
