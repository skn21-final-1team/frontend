import type { QuizAnswer } from '../../types/studio'
import * as S from './quiz-option.style'

const LABELS = ['A', 'B', 'C', 'D'] as const
type Label = (typeof LABELS)[number]
type OptionState = 'default' | 'correct' | 'wrong' | 'disabled'

interface QuizOptionProps {
  option: QuizAnswer
  index: number
  isSelected: boolean
  isAnswered: boolean
  onSelect: (id: number) => void
}

function QuizOption({ option, index, isSelected, isAnswered, onSelect }: QuizOptionProps) {
  const label: Label = LABELS[index]

  const getState = (): OptionState => {
    if (!isAnswered) return 'default'
    if (option.is_correct) return 'correct'
    if (isSelected) return 'wrong'
    return 'disabled'
  }

  return (
    <div
      className={S.wrapper({ state: getState() })}
      onClick={() => !isAnswered && onSelect(option.id)}
    >
      <div className={S.topRow()}>
        <span className={S.optionLabel()}>{label}.</span>
        <span className={S.optionText()}>{option.text}</span>

        {isAnswered && option.is_correct && (
          <span className={S.badge({ type: 'correct' })}>✓ 정답</span>
        )}
        {isAnswered && isSelected && !option.is_correct && (
          <span className={S.badge({ type: 'wrong' })}>✗ 오답</span>
        )}
      </div>

      {isAnswered && (
        <p className={S.hint()}>{option.hint}</p>
      )}
    </div>
  )
}

export default QuizOption