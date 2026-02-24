import { ArrowLeft } from 'lucide-react'
import * as S from './quiz-result.style'

interface QuizResultProps {
  correct: number
  wrong: number
  skipped: number
  total: number
  onBack: () => void
  onRetry: () => void
}

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function QuizResult({ correct, wrong, skipped, total, onBack, onRetry }: QuizResultProps) {
  const percent = Math.round((correct / total) * 100)
  const dashOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE

  return (
    <div className={S.wrapper()}>
      <div className={S.header()}>
        <button onClick={onBack} className={S.backButton()}>
          <ArrowLeft size={16} />
        </button>
        <span className={S.headerTitle()}>퀴즈 결과</span>
      </div>

      <p className={S.title()}>축하합니다. 퀴즈가 완료되었습니다</p>

      <div className={S.card()}>
        <div className={S.circleContainer()} style={{ width: 100, height: 100 }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              className={S.bgCircle()}
            />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              className={S.fgCircle()}
            />
          </svg>
          <div className={S.circleLabel()}>
            <span className={S.scoreText()}>{correct}/{total}</span>
            <span className={S.percentText()}>{percent}%</span>
          </div>
        </div>

        <div className={S.statsGrid()}>
          <div className={S.statRow()}>
            <span className={S.statLabel()}>정답</span>
            <span className={S.statValue({ type: 'correct' })}>{correct}</span>
          </div>
          <div className={S.statRow()}>
            <span className={S.statLabel()}>오답</span>
            <span className={S.statValue({ type: 'wrong' })}>{wrong}</span>
          </div>
          <div className={S.statRow()}>
            <span className={S.statLabel()}>건너뜀</span>
            <span className={S.statValue({ type: 'skipped' })}>{skipped}</span>
          </div>
        </div>
      </div>

      <div className={S.footer()}>
        <button className={S.retryButton()} onClick={onRetry}>
          퀴즈 다시 풀기
        </button>
      </div>
    </div>
  )
}

export default QuizResult
