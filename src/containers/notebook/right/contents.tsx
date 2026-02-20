'use client'

import { useState, useRef } from 'react'
import { Loader2, X } from 'lucide-react'

import StudioList from './components/studio-list'
import GeneratedList from './components/generated-list/generated-list'
import { QuizViewer } from './components/quiz-viewer'

import type { StudioFeatureList, GeneratedItem, QuizStudioContent } from './types/studio'
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
  featureId: string
  featureName: string
}

function Contents({ onSendToChat }: ContentsProps) {
  const [features] = useState<StudioFeatureList>(MOCK_FEATURES)
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([])
  const [activeQuiz, setActiveQuiz] = useState<QuizStudioContent | null>(null)
  const [generating, setGenerating] = useState<GeneratingState | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleSelectFeature = (featureId: string) => {
    const feature = features.find((f) => f.id === featureId)
    if (!feature || generating) return

    setGenerating({ featureId, featureName: feature.name })

    timerRef.current = setTimeout(() => {
      const newItem: GeneratedItem = {
        id: crypto.randomUUID(),
        type: featureId as GeneratedItem['type'],
        title: `${feature.name} 결과물`,
        createdAt: new Date(),
        sourceCount: 0,
      }
      setGeneratedItems((prev) => [newItem, ...prev])
      setGenerating(null)
    }, 3000)
  }

  const handleCancelGenerating = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setGenerating(null)
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
    }
  }

  const handleBack = () => {
    setActiveQuiz(null)
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

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.scrollArea()}>

          <div className={S.studioSection()}>
            <StudioList features={features} onSelectFeature={handleSelectFeature} />
          </div>
          {generating && (
            <div className={S.generatingBanner()}>
              <div className={S.generatingInfo()}>
                <Loader2 size={14} className={S.generatingSpinner()} />
                <span>{generating.featureName} 생성 중...</span>
              </div>
              <button
                onClick={handleCancelGenerating}
                className={S.cancelButton()}
              >
                <X size={14} />
              </button>
            </div>
          )}

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