import { useState } from 'react'
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
  const [open, setOpen] = useState(false)

  const handleRenameSelect = () => {
    setOpen(false)
    // 메뉴가 닫힌 다음 리네임 상태를 켜야 트리거로 포커스 복귀 경쟁이 줄어든다.
    window.setTimeout(() => {
      onRename?.()
    }, 0)
  }

  const handleDeleteSelect = () => {
    setOpen(false)
    window.setTimeout(() => {
      onDelete()
    }, 0)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button className={S.trigger()}>
          <MoreHorizontal size={size} className={S.icon()} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        onClick={(e) => e.stopPropagation()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            handleRenameSelect()
          }}
        >
          <Pencil size={14} />
          <span>이름 바꾸기</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            handleDeleteSelect()
          }}
          className={S.deleteItem()}
        >
          <Trash2 size={14} />
          <span>삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ItemMenu
