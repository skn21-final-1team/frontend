import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components'
import * as S from './item-menu.style'

interface ItemMenuProps {
  align?: 'start' | 'end'
  size?: number
  onRename?: () => void
  onDelete: () => void
}

function ItemMenu({ align = 'start', size = 14, onRename, onDelete }: ItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button className={S.trigger()}>
          <MoreHorizontal size={size} className={S.icon()} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={onRename ?? (() => alert('이름 바꾸기 기능 추후 구현'))}>
          <Pencil size={14} />
          <span>이름 바꾸기</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className={S.deleteItem()}>
          <Trash2 size={14} />
          <span>삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ItemMenu
