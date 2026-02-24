'use client'

import { useState } from 'react'
import { ArrowLeft, SquareArrowOutUpRight } from 'lucide-react'
import type { QuizStudioContent } from '../../types/studio'
import QuizQuestion from './quiz-question'
import QuizResult from './quiz-result'
import * as S from './quiz-viewer.style'

interface QuizViewerProps {
  quizContent: QuizStudioContent
  onBack: () => void
  onSendToChat?: (message: string) => void
}

type QuizResultData = {
  correct: number
  wrong: number
  skipped: number
  total: number
}

function QuizViewer({ quizContent, onBack, onSendToChat }: QuizViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMap, setSelectedMap] = useState<Record<number, number>>({})
  const [result, setResult] = useState<QuizResultData | null>(null)

  const currentQuestion = quizContent.contents[currentIndex]
  const totalCount = quizContent.contents.length
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalCount - 1
  const selectedId = selectedMap[currentQuestion.id] ?? null
  const isAnswered = selectedId !== null

  const handleSelect = (answerId: number) => {
    if (selectedMap[currentQuestion.id] !== undefined) return
    setSelectedMap((prev) => ({ ...prev, [currentQuestion.id]: answerId }))
  }

  const handleExplain = () => {
    if (!onSendToChat || !isAnswered) return

    const selected = currentQuestion.answer.find((a) => a.id === selectedId)
    const correct = currentQuestion.answer.find((a) => a.is_correct)

    const message = selected?.is_correct
      ? `이 자료를 바탕으로 퀴즈를 풀었는데 이런 문제가 나왔어.\n"${currentQuestion.question}"\n\n내가 고른 답은 "${selected.text}"이고 정답이었어.\n이 문제에 관해 더 자세히 설명해 줘.`
      : `이 자료를 바탕으로 퀴즈를 풀었는데 이런 문제가 나왔어.\n"${currentQuestion.question}"\n\n내가 고른 답은 이거야. "${selected?.text}"\n\n근데 틀린 답이었어. 정답은 이거야. "${correct?.text}"\n\n내 답이 왜 틀렸는지 이해할 수 있게 설명해 줘.`

    onSendToChat(message)
  }

  const handleNext = () => {
    if (isLast) {
      let correct = 0
      let wrong = 0
      let skipped = 0

      quizContent.contents.forEach((q) => {
        const chosen = selectedMap[q.id]
        if (chosen === undefined) {
          skipped++
        } else {
          const isCorrect = q.answer.find((a) => a.id === chosen)?.is_correct
          if (isCorrect) correct++
          else wrong++
        }
      })

      setResult({ correct, wrong, skipped, total: totalCount })
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((i) => i - 1)
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setSelectedMap({})
    setResult(null)
  }

  if (result) {
    return (
      <QuizResult
        correct={result.correct}
        wrong={result.wrong}
        skipped={result.skipped}
        total={result.total}
        onBack={onBack}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <button onClick={onBack} className={S.backButton()}>
          <ArrowLeft size={16} />
        </button>
        <span className={S.title()}>{quizContent.content_id}번 퀴즈</span>
        <span className={S.sourceCount()}>총 {totalCount}문제</span>
      </div>

      <div className={S.progressRow()}>
        <span className={S.progressText()}>
          {currentIndex + 1} / {totalCount}
        </span>
      </div>

      <div className={S.content()}>
        <QuizQuestion
          question={currentQuestion}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      </div>

      <div className={S.footer()}>
        <div className={S.footerLeft()}>
          <button
            className={S.explainButton()}
            onClick={handleExplain}
            disabled={!isAnswered}
          >
            <SquareArrowOutUpRight size={13} />
            설명
          </button>
        </div>

        <div className={S.footerRight()}>
          <button
            className={S.prevButton()}
            disabled={isFirst}
            onClick={handlePrev}
          >
            이전
          </button>
          <button
            className={S.nextButton()}
            onClick={handleNext}
          >
            {isLast ? '완료' : '다음'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizViewer