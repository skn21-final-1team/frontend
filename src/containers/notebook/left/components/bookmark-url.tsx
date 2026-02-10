import { Button, Checkbox } from '@/shared/components'
import { FileIcon } from 'lucide-react'
import type { Bookmark } from '../types/bookmarks'
import { useBookmarkStore } from '../store/bookmarks.store'
import * as S from './bookmark-url.style'

type BookmarkUrlProps = {
  data: Bookmark
}

function BookmarkUrl({ data }: BookmarkUrlProps) {
  const { bookmarks, toggleCheck } = useBookmarkStore()

  return (
    <div className={S.fileRow()}>
      <Button key={data.id} variant="link" size="sm" className={S.file()}>
        <span className={S.fileInfo()}>
          <span className={S.fileLeft()}>
            <FileIcon />
            <span>{data.title}</span>
          </span>
        </span>
      </Button>
      <Checkbox
        checked={bookmarks[data.id]?.isChecked ?? false}
        onCheckedChange={(checked) => toggleCheck(data.id, !!checked)}
      />
    </div>
  )
}

export default BookmarkUrl
