import { ArrowLeft, Sparkles } from 'lucide-react'
import { Button } from '@/shared/components'

import * as S from './studio-detail.style'

import type { StudioFeature, GeneratedItem } from '../../types/studio'
import type { BookmarkUrl } from '@/containers/notebook/left/types/bookmarks'

interface StudioDetailProps {
  feature: StudioFeature
  selectedUrls: BookmarkUrl[]
  onBack: () => void
  onAddGeneratedItem: (item: GeneratedItem) => void
}

function StudioDetail({ feature, selectedUrls, onBack, onAddGeneratedItem }: StudioDetailProps) {
  const handleGenerate = () => {
    const newItem: GeneratedItem = {
      id: crypto.randomUUID(),
      type: feature.id as GeneratedItem['type'],
      title: `${feature.name} 결과물`,
      createdAt: new Date(),
      sourceCount: selectedUrls.length,
    }
    onAddGeneratedItem(newItem)
    onBack()
  }

  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <button onClick={onBack} className={S.backButton()}>
          <ArrowLeft size={16} />
        </button>
        <span className={S.title()}>{feature.name}</span>
      </div>

      <div className={S.content()}>
        <div className={S.sourceBox()}>
          <p className={S.sourceTitle()}>선택된 소스 ({selectedUrls.length})</p>
          {selectedUrls.length > 0 ? (
            <ul className={S.sourceList()}>
              {selectedUrls.map((url) => (
                <li key={url.id} className={S.sourceItem()}>
                  <span className={S.sourceDot()} />
                  {url.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className={S.sourceEmpty()}>
              선택된 소스가 없습니다. Left에서 북마크를 선택해주세요.
            </p>
          )}
        </div>

        <div className={S.spacer()} />

        <Button
          onClick={handleGenerate}
          disabled={selectedUrls.length === 0}
          className={S.generateButton()}
        >
          <Sparkles className={S.icon()} />
          {feature.name} 생성하기
        </Button>
      </div>
    </div>
  )
}

export default StudioDetail
