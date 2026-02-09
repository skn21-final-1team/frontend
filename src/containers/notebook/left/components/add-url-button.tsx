import { Plus } from 'lucide-react'
import * as S from './add-url-button.style'

function AddUrlButton() {
  const onClick = () => {
    alert('URL 추가 기능은 추후 구현!')
  }

  return (
    <button type="button" className={S.wrapper()} onClick={onClick}>
      <Plus className={S.icon()} />
      <span>URL 추가</span>
    </button>
  )
}

export default AddUrlButton
