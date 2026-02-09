import { Globe } from 'lucide-react'
import { ItemMenu } from '@/shared/components'
import type { BookmarkUrl } from '../types/bookmarks'
import * as S from './bookmark-url-item.style'

interface BookmarkUrlItemProps {
  url: BookmarkUrl
  onToggle: () => void
  onDelete: () => void
}

function BookmarkUrlItem({ url, onToggle, onDelete }: BookmarkUrlItemProps) {
  return (
    <div className={S.wrapper()}>
      <ItemMenu align="start" size={12} onDelete={onDelete} />
      <Globe size={10} className={S.icon()} />
      <span className={S.title()}>{url.title}</span>
      <input type="checkbox" checked={url.isChecked} onChange={onToggle} className={S.checkbox()} />
    </div>
  )
}

export default BookmarkUrlItem
