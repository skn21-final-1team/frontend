import Image from 'next/image'
import type { FlashcardContent } from '../../types/studio'
import * as S from './flashcard-card.style'

interface FlashcardCardProps {
  card: FlashcardContent
  isFlipped: boolean
  onFlip: () => void
  onDelete: () => void
  onExplain: () => void
}

function FlashcardCard({ card, isFlipped, onFlip, onDelete, onExplain }: FlashcardCardProps) {
  return (
    <div className={S.cardOuter()} onClick={onFlip}>
      <div className={`${S.cardInner()} ${isFlipped ? S.cardInnerFlipped() : ''}`}>
        <div className={`${S.face()} ${S.front()}`}>
          <button className={S.deleteButton()} onClick={(e) => { e.stopPropagation(); onDelete() }}>
            <Image src="/trash.svg" alt="delete" width={16} height={16} />
          </button>
          <span className={S.questionText()}>{card.question}</span>
          <span className={S.flipHint()}>정답 보기</span>
        </div>

        <div className={`${S.face()} ${S.back()}`}>
          <span className={S.answerText()}>{card.answer}</span>
          <button className={S.explainButton()} onClick={(e) => { e.stopPropagation(); onExplain() }}>
            <Image src="/square-arrow-out-up-right.svg" alt="explain" width={13} height={13} />
            설명
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlashcardCard
