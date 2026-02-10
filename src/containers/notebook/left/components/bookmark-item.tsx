import { useBookmarkStore } from '../store/bookmarks.store'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ChevronRightIcon, FolderIcon } from 'lucide-react'
import HeaderActions from './hover-actions'
import BookmarkUrl from './bookmark-url'
import * as S from './bookmark-item.style'

type BookmarkItemProps = {
  id: string
}

function BookmarkItem({ id }: BookmarkItemProps) {
  const { bookmarks, toggleExpand, toggleCheck, deleteBookmark } = useBookmarkStore()
  const data = bookmarks[id]

  if (!data) return null

  if (data.type === 'folder') {
    return (
      <Collapsible key={data.id} open={data.isExpanded ?? false}>
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
            checked={data.isChecked ?? false}
            onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
          />
        </div>
        <CollapsibleContent className={S.subList()}>
          <span className={S.subFolder()}>
            {data.children?.map((childId) => (
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
