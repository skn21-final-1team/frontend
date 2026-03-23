import { Button } from '@/shared/components'
import * as S from './view-mode-toggle.style'

interface ViewModeToggleProps {
  isPreviewMode: boolean
  isPreviewDisabled: boolean
  onShowChat: () => void
  onShowPreview: () => void
}

function ViewModeToggle({
  isPreviewMode,
  isPreviewDisabled,
  onShowChat,
  onShowPreview,
}: ViewModeToggleProps) {
  return (
    <div className={S.group()}>
      <Button
        className={S.TabButton({ isActive: !isPreviewMode })}
        type="button"
        size="sm"
        onClick={onShowChat}
      >
        채팅
      </Button>
      <Button
        className={S.TabButton({ isActive: isPreviewMode })}
        type="button"
        size="sm"
        onClick={onShowPreview}
        disabled={isPreviewDisabled}
      >
        미리보기
      </Button>
    </div>
  )
}

export default ViewModeToggle
