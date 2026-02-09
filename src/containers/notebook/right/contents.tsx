'use client'

import { useState } from 'react'

import StudioList from './components/studio-list'
import StudioDetail from './components/studio-detail/studio-detail'
import GeneratedList from './components/generated-list/generated-list'
import * as S from './contents.style'

import type { StudioFeatureList, GeneratedItem } from './types/studio'
import type { BookmarkUrl } from '@/containers/notebook/left/types/bookmarks'

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

interface ContentsProps {
  selectedUrls: BookmarkUrl[]
  generatedItems: GeneratedItem[]
  onAddGeneratedItem: (item: GeneratedItem) => void
  onRemoveGeneratedItem: (itemId: string) => void
}

function Contents({
  selectedUrls,
  generatedItems,
  onAddGeneratedItem,
  onRemoveGeneratedItem,
}: ContentsProps) {
  const [features] = useState<StudioFeatureList>(MOCK_FEATURES)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const handleSelectFeature = (id: string) => {
    setSelectedFeature(id)
  }

  const handleBack = () => {
    setSelectedFeature(null)
  }

  if (selectedFeature) {
    const feature = features.find((f) => f.id === selectedFeature)
    if (!feature) return null

    return (
      <section className={S.section()}>
        <div className={S.inner()}>
          <StudioDetail
            feature={feature}
            selectedUrls={selectedUrls}
            onBack={handleBack}
            onAddGeneratedItem={onAddGeneratedItem}
          />
        </div>
      </section>
    )
  }

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <StudioList features={features} onSelectFeature={handleSelectFeature} />
        <GeneratedList items={generatedItems} onRemove={onRemoveGeneratedItem} />
      </div>
    </section>
  )
}

export default Contents
