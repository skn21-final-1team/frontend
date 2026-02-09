import { ItemMenu } from '@/shared/components'
import * as S from './generated-list.style'
import type { GeneratedItem } from '../../types/studio'

interface GeneratedListProps {
  items: GeneratedItem[]
  onRemove: (itemId: string) => void
}

function GeneratedList({ items, onRemove }: GeneratedListProps) {
  if (items.length === 0) return null

  return (
    <div className={S.wrapper()}>
      <p className={S.title()}>생성된 항목</p>
      <div className={S.list()}>
        {items.map((item) => (
          <div key={item.id} className={S.item()}>
            <div className={S.icon()}>
              {item.type === 'flashcard' && '📇'}
              {item.type === 'quiz' && '❓'}
              {item.type === 'summary' && '📝'}
            </div>
            <div className={S.content()}>
              <p className={S.itemTitle()}>{item.title}</p>
              <p className={S.itemSubtitle()}>소스 {item.sourceCount}개</p>
            </div>
            <ItemMenu align="end" onDelete={() => onRemove(item.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GeneratedList
