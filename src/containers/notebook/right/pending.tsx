import { BotMessageSquare } from 'lucide-react'
import { Button } from '@/shared/components'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import * as S from './panding.style'

function PendingSection() {
  const { setIsWorking } = useAgentStatusStore()

  const onClickStart = () => {
    setIsWorking(true)
  }
  return (
    <div className={S.box()}>
      <BotMessageSquare className={S.botIcon()} />
      <div>
        <p>문서 작성을 도와드릴게요.</p>
        <p>어떤 내용으로 시작해 볼까요?</p>
      </div>
      <Button onClick={onClickStart}>생성하기</Button>
    </div>
  )
}

export default PendingSection
