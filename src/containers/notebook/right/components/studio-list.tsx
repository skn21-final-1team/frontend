import type { StudioFeatureList } from '../types/studio'
import StudioCard from './studio-card'
import * as S from './studio-list.style'

interface StudioListProps {
  features: StudioFeatureList
  onSelectFeature: (id: string) => void
}

function StudioList({ features, onSelectFeature }: StudioListProps) {
  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <span className={S.title()}>STUDIO</span>
      </div>
      {features.map((feature) => (
        <StudioCard key={feature.id} feature={feature} onClick={onSelectFeature} />
      ))}
    </div>
  )
}

export default StudioList
