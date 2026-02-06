'use client'

import { useState } from 'react'
import type { StudioFeatureList } from './types/studio'
import StudioList from './components/studio-list'
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
  {
    id: 'summary',
    name: '요약',
    description: '문서를 간단히 정리',
    icon: '/summary.svg',
    isEnabled: true,
  },
]

function Contents() {
  const [features] = useState<StudioFeatureList>(MOCK_FEATURES)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const handleSelectFeature = (id: string) => {
    setSelectedFeature(id)
    console.log('선택된 기능:', id)
  }

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <StudioList features={features} onSelectFeature={handleSelectFeature} />
      </div>
    </section>
  )
}

export default Contents
