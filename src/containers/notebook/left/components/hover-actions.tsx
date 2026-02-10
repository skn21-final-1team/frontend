import { Button } from '@/shared/components/ui/button'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import * as S from './hover-actions.style'

type hoverActionProps = {
  onClickDelete: () => void
  onClickEdit: () => void
}

function HoverActions({ onClickDelete, onClickEdit }: hoverActionProps) {
  return (
    <span className={S.wrapper()}>
      <Button variant="ghost" size="icon" className={S.actionButton()} onClick={onClickEdit}>
        <PencilIcon className={S.actionIcon()} />
      </Button>
      <Button variant="ghost" size="icon" className={S.actionButton()} onClick={onClickDelete}>
        <Trash2Icon className={S.actionIcon()} />
      </Button>
    </span>
  )
}

export default HoverActions
