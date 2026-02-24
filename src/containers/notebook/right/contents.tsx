'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Spinner } from '@/shared/components/ui/spinner'
import StudioList from './components/studio-list'
import GeneratedList from './components/generated-list/generated-list'
import { QuizViewer } from './components/quiz-viewer'
import { FlashcardViewer } from './components/flashcard-viewer'

import type { StudioFeatureList, GeneratedItem, QuizStudioContent, FlashcardStudioContent } from './types/studio'
import { MOCK_STUDIO_CONTENTS } from '../utils/studio.mock'
import * as S from './contents.style'

const MOCK_FEATURES: StudioFeatureList = [
  {
    id: 'flashcard',
    name: '플래시카드',
    description: '핵심 개념을 카드로 학습',
    icon: '/flashcard.svg',
    isEnabled: true,
  },
  {
    id: 'quiz',
    name: '퀴즈',
    description: '이해도를 테스트',
    icon: '/quiz.svg',
    isEnabled: true,
  },
]

interface ContentsProps {
  onSendToChat?: (message: string) => void
}

interface GeneratingState {
  id: string
  featureId: string
  featureName: string
  timerId: ReturnType<typeof setTimeout>
}

function Contents({ onSendToChat }: ContentsProps) {
  const [features] = useState<StudioFeatureList>(MOCK_FEATURES)
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([])
  const [activeQuiz, setActiveQuiz] = useState<QuizStudioContent | null>(null)
  const [activeFlashcard, setActiveFlashcard] = useState<FlashcardStudioContent | null>(null)
  const [generatingList, setGeneratingList] = useState<GeneratingState[]>([])
  const handleSelectFeature = (featureId: string) => {
    const feature = features.find((f) => f.id === featureId)
    if (!feature) return

    const generatingId = crypto.randomUUID()

    const timerId = setTimeout(() => {
      const newItem: GeneratedItem = {
        id: crypto.randomUUID(),
        type: featureId as GeneratedItem['type'],
        title: `${feature.name} 결과물`,
        createdAt: new Date(),
        sourceCount: 0,
      }
      setGeneratedItems((prev) => [newItem, ...prev])
      setGeneratingList((prev) => prev.filter((g) => g.id !== generatingId))
    }, 3000)

    setGeneratingList((prev) => [
      ...prev,
      { id: generatingId, featureId, featureName: feature.name, timerId },
    ])
  }

  const handleCancelGenerating = (generatingId: string) => {
    const generating = generatingList.find((g) => g.id === generatingId)
    if (generating) {
      clearTimeout(generating.timerId)
      setGeneratingList((prev) => prev.filter((g) => g.id !== generatingId))
    }
  }

  const handleRemoveGeneratedItem = (itemId: string) => {
    setGeneratedItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const handleRenameGeneratedItem = (itemId: string, title: string) => {
    setGeneratedItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, title } : item)),
    )
  }

  const handleSelectItem = (itemId: string) => {
    const item = generatedItems.find((i) => i.id === itemId)
    if (!item) return

    if (item.type === 'quiz') {
      const quizContent = MOCK_STUDIO_CONTENTS.find((c) => c.type === 'quiz')
      if (quizContent && quizContent.type === 'quiz') {
        setActiveQuiz(quizContent)
      }
    } else if (item.type === 'flashcard') {
      const flashcardContent = MOCK_STUDIO_CONTENTS.find((c) => c.type === 'flashcard')
      if (flashcardContent && flashcardContent.type === 'flashcard') {
        setActiveFlashcard(flashcardContent)
      }
    }
  }

  const handleBack = () => {
    setActiveQuiz(null)
    setActiveFlashcard(null)
  }

  if (activeQuiz) {
    return (
      <section className={S.section()}>
        <div className={S.inner()}>
          <QuizViewer
            quizContent={activeQuiz}
            onBack={handleBack}
            onSendToChat={onSendToChat}
          />
        </div>
      </section>
    )
  }

  if (activeFlashcard) {
    return (
      <section className={S.section()}>
        <div className={S.inner()}>
          <FlashcardViewer
            flashcardContent={activeFlashcard}
            onBack={handleBack}
            onSendToChat={onSendToChat}
          />
        </div>
      </section>
    )
  }

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.scrollArea()}>

          <div className={S.studioSection()}>
            <StudioList features={features} onSelectFeature={handleSelectFeature} />
          </div>
          {generatingList.map((generating) => (
            <div key={generating.id} className={S.generatingBanner()}>
              <div className={S.generatingInfo()}>
                <Spinner className={S.generatingSpinner()} />
                <span>{generating.featureName} 생성 중...</span>
              </div>
              <button
                onClick={() => handleCancelGenerating(generating.id)}
                className={S.cancelButton()}
              >
                <Image src="/x.svg" alt="cancel" width={14} height={14} />
              </button>
            </div>
          ))}

          <div className={S.generatedSection()}>
            <GeneratedList
              items={generatedItems}
              onRemove={handleRemoveGeneratedItem}
              onSelect={handleSelectItem}
              onRename={handleRenameGeneratedItem}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contents