import Image from 'next/image'
import type { BookmarkUrl } from '../types/bookmarks'
import * as S from './bookmark-url-item.style'

interface BookmarkUrlItemProps {
  url: BookmarkUrl
  onToggle: () => void
}

function BookmarkUrlItem({ url, onToggle }: BookmarkUrlItemProps) {
  return (
    <div className={S.wrapper()}>
      <Image src="/globe.svg" alt="link" width={10} height={10} className={S.icon()} />
      <span className={S.title()}>{url.title}</span>
      <input type="checkbox" checked={url.isChecked} onChange={onToggle} className={S.checkbox()} />
    </div>
  )
}

export default BookmarkUrlItem
