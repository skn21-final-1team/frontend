'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { FlashcardStudioContent, FlashcardContent } from '../../types/studio'
import FlashcardCard from './flashcard-card'
import * as S from './flashcard-viewer.style'
import { Slider } from '@/shared/components/ui/slider'

interface FlashcardViewerProps {
  flashcardContent: FlashcardStudioContent
  onBack: () => void
  onSendToChat?: (message: string) => void
}

function FlashcardViewer({ flashcardContent, onBack, onSendToChat }: FlashcardViewerProps) {
  const [cards, setCards] = useState<FlashcardContent[]>(flashcardContent.contents)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentCard = cards[currentIndex]
  if (!currentCard) return null

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, cards.length - 1)))
    setIsFlipped(false)
  }

  const handleDelete = () => {
    const next = cards.filter((_, i) => i !== currentIndex)
    if (next.length === 0) {
      onBack()
      return
    }
    setCards(next)
    setCurrentIndex(Math.min(currentIndex, next.length - 1))
    setIsFlipped(false)
  }

  const handleExplain = () => {
    if (!onSendToChat) return
    const message = `자료를 바탕으로 플래시카드를 검토 중인데 그중 하나를 더 잘 이해하고 싶어.\n\n앞면에는 이렇게 적혀 있어. "${currentCard.question}"\n뒷면에 답은 이렇게 적혀 있어. "${currentCard.answer}"\n\n이 주제에 대해 더 자세히 설명해 줘.`
    onSendToChat(message)
  }

  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <button onClick={onBack} className={S.backButton()}>
          <Image src="/arrow-left.svg" alt="back" width={16} height={16} />
        </button>
        <span className={S.title()}>플래시카드</span>
        <span className={S.sourceCount()}>총 {cards.length}장</span>
      </div>

      <div className={S.cardArea()}>
        <button
          className={S.navButton()}
          disabled={currentIndex === 0}
          onClick={() => goTo(currentIndex - 1)}
        >
          <Image src="/chevron-left.svg" alt="previous" width={18} height={18} />
        </button>

        <FlashcardCard
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
          onDelete={handleDelete}
          onExplain={handleExplain}
        />

        <button
          className={S.navButton()}
          disabled={currentIndex === cards.length - 1}
          onClick={() => goTo(currentIndex + 1)}
        >
          <Image src="/chevron-right.svg" alt="next" width={18} height={18} />
        </button>
      </div>

      <div className={S.footer()}>
        <div className="flex-1 px-3 flex items-center">
          <Slider
            value={[currentIndex]}
            max={cards.length > 0 ? cards.length - 1 : 0}
            step={1}
            onValueChange={(val) => goTo(val[0])}
            className="w-full cursor-pointer"
          />
        </div>
        <span className={S.cardCount()}>
          {currentIndex + 1} / {cards.length} 카드
        </span>
      </div>
    </div>
  )
}

export default FlashcardViewer
