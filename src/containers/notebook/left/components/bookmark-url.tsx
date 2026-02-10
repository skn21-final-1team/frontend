import { Button, Checkbox } from '@/shared/components'
import { Bookmark as BookmarkIcon } from 'lucide-react'
import type { Bookmark } from '../types/bookmarks'
import { useBookmarkStore } from '../store/bookmarks.store'
import HoverActions from './hover-actions'
import * as S from './bookmark-url.style'

type BookmarkUrlProps = {
  data: Pick<Bookmark, 'id' | 'title' | 'url'>
}

function BookmarkUrl({ data }: BookmarkUrlProps) {
  const { bookmarks, toggleCheck, deleteBookmark } = useBookmarkStore()

  return (
    <div className={S.fileRow()}>
      <div className={S.fileInfo()}>
        <Button key={data.id} variant="link" size="sm" className={S.file()}>
          <BookmarkIcon />
          <span className={S.title()}>{data.title}</span>
        </Button>
        <HoverActions onClickDelete={() => deleteBookmark(data.id)} onClickEdit={() => {}} />
      </div>
      <Checkbox
        checked={bookmarks[data.id]?.isChecked ?? false}
        onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
      />
    </div>
  )
}

export default BookmarkUrl
