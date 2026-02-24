import type { QuizContent } from '../../types/studio'
import QuizOption from './quiz-option'
import * as S from './quiz-question.style'

interface QuizQuestionProps {
  question: QuizContent
  selectedId: number | null
  onSelect: (id: number) => void
}

function QuizQuestion({ question, selectedId, onSelect }: QuizQuestionProps) {
  const isAnswered = selectedId !== null

  return (
    <div className={S.wrapper()}>
      <p className={S.questionText()}>{question.question}</p>

      <div className={S.optionList()}>
        {question.answer.map((option, index) => (
          <QuizOption
            key={option.id}
            option={option}
            index={index}
            isSelected={selectedId === option.id}
            isAnswered={isAnswered}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default QuizQuestion