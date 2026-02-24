import Image from 'next/image'
import { ItemMenu } from '@/shared/components'
import * as S from './generated-list.style'
import type { GeneratedItem } from '../../types/studio'

interface GeneratedListProps {
  items: GeneratedItem[]
  onRemove: (itemId: string) => void
  onSelect: (itemId: string) => void
  onRename: (itemId: string, title: string) => void
}

function GeneratedList({ items, onRemove, onSelect, onRename }: GeneratedListProps) {
  if (items.length === 0) return null

  return (
    <div className={S.wrapper()}>
      <p className={S.title()}>생성된 컨텐츠</p>
      <div className={S.list()}>
        {items.map((item) => (
          <div
            key={item.id}
            className={S.item()}
            onClick={() => onSelect(item.id)}
          >
            <div className={S.icon()}>
              {item.type === 'flashcard' && (
                <Image src="/flashcard.svg" alt="flashcard" width={20} height={20} />
              )}
              {item.type === 'quiz' && (
                <Image src="/quiz.svg" alt="quiz" width={20} height={20} />
              )}
            </div>

            <div className={S.content()}>
              <p className={S.itemTitle()}>{item.title}</p>
              <p className={S.itemSubtitle()}>소스 {item.sourceCount}개</p>
            </div>

            <ItemMenu
              align="end"
              onDelete={() => {
                onRemove(item.id)
              }}
              onRename={() => {
                setTimeout(() => {
                  const newTitle = window.prompt('새 이름을 입력하세요', item.title)
                  if (newTitle) onRename(item.id, newTitle)
                }, 0)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GeneratedList