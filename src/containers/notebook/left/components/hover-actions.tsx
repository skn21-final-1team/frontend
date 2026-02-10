import { Button } from '@/shared/components/ui/button'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import * as S from './hover-actions.style'

type hoverActionProps = {
  onClickDelete: () => void
  onClickEdit: () => void
}

function HoverActions({ onClickDelete, onClickEdit }: hoverActionProps) {
  const clickEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClickEdit()
  }

  const clickDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClickDelete()
  }

  return (
    <span className={S.wrapper()}>
      <Button variant="ghost" size="icon" asChild>
        <span className={S.actionButton()} onClick={clickEdit}>
          <PencilIcon className={S.actionIcon()} />
        </span>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <span className={S.actionButton()} onClick={clickDelete}>
          <Trash2Icon className={S.actionIcon()} />
        </span>
      </Button>
    </span>
  )
}

export default HoverActions
