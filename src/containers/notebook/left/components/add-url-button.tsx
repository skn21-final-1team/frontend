import { Plus } from 'lucide-react'
import * as S from './add-url-button.style'

interface AddUrlButtonProps {
  onClick: () => void
}

function AddUrlButton({ onClick }: AddUrlButtonProps) {
  return (
    <button type="button" className={S.wrapper()} onClick={onClick}>
      <Plus className={S.icon()} />
      <span>URL 추가</span>
    </button>
  )
}

export default AddUrlButton
