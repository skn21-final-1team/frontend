import { useEffect } from 'react'
import { useBookmarkStore } from '../store/bookmarks.store'
import type { Bookmark } from '../types/bookmarks'
import BookmarkUrl from './bookmark-url'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { ChevronRightIcon, FolderIcon } from 'lucide-react'
import * as S from './bookmarks.style'

type BookmardProps = {
  data: Bookmark[]
}

function Bookmarks({ data }: BookmardProps) {
  const { initialize, bookmarks, toggleExpand, toggleCheck } = useBookmarkStore()

  useEffect(() => {
    initialize(data)
  }, [data, initialize])

  const renderBookmark = (data: Bookmark) => {
    if (data.type === 'folder') {
      return (
        <Collapsible key={data.id} open={bookmarks[data.id]?.isExpanded ?? false}>
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
              </Button>
            </CollapsibleTrigger>
            <Checkbox
              checked={bookmarks[data.id]?.isChecked ?? false}
              onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
            />
          </div>
          <CollapsibleContent className={S.subList()}>
            <span className={S.subFolder()}>
              {data.children?.map((child) => renderBookmark(child))}
            </span>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return <BookmarkUrl key={data.id} data={data} />
  }

  return <div className={S.folderList()}>{data.map((item) => renderBookmark(item))}</div>
}

export default Bookmarks
