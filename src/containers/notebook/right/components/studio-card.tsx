import Image from 'next/image'
import type { StudioFeature } from '../types/studio'
import * as S from './studio-card.style'

interface StudioCardProps {
  feature: StudioFeature
  onClick: (id: string) => void
}

function StudioCard({ feature, onClick }: StudioCardProps) {
  return (
    <div className={S.wrapper()} onClick={() => onClick(feature.id)}>
      <div className={S.iconWrapper()}>
        <Image src={feature.icon} alt={feature.name} width={20} height={20} className={S.icon()} />
      </div>
      <div className={S.content()}>
        <span className={S.name()}>{feature.name}</span>
        <span className={S.description()}>{feature.description}</span>
      </div>
    </div>
  )
}

export default StudioCard
