import { Button, Checkbox } from '@/shared/components'
import { Bookmark as BookmarkIcon } from 'lucide-react'
import type { FlatBookmarkNode } from '../types/bookmarks.types'
import { useBookmarkStore } from '../store/bookmarks.store'
import HoverActions from './hover-actions'
import * as S from './bookmark-url.style'

type BookmarkUrlProps = {
  data: Pick<FlatBookmarkNode, 'id' | 'title' | 'url'>
}

function BookmarkUrl({ data }: BookmarkUrlProps) {
  const isChecked = useBookmarkStore((s) => s.bookmarks[data.id]?.isChecked ?? false)
  const toggleCheck = useBookmarkStore((s) => s.toggleCheck)
  const deleteBookmark = useBookmarkStore((s) => s.deleteBookmark)

  return (
    <div className={S.fileRow()}>
      <div className={S.fileInfo()}>
        <Button variant="link" size="sm" className={S.file()}>
          <BookmarkIcon />
          <span className={S.title()}>{data.title}</span>
        </Button>
        <HoverActions onClickDelete={() => deleteBookmark(data.id)} onClickEdit={() => {}} />
      </div>
      <Checkbox
        checked={isChecked}
        onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
      />
    </div>
  )
}

export default BookmarkUrl
