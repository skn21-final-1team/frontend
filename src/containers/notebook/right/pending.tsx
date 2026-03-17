import { Bot, BotMessageSquare } from 'lucide-react'
import { Button } from '@/shared/components'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import * as S from './pending.style'

function PendingSection() {
  const { status, setStatus } = useAgentStatusStore()

  const openNewAgent = () => {
    setStatus('ready')
  }

  const changeChatMode = () => {
    setStatus('sleep')
  }

  return (
    <div className={S.box()}>
      {status === 'ready' && (
        <>
          <BotMessageSquare className={S.botIcon()} />
          <div className={S.text()}>
            <p>에이전트 모드가 활성화되었습니다.</p>
            <p>채팅 영역에서 작성할 문서 예시와 사용 방법을 확인할 수 있어요.</p>
          </div>
          <Button variant="ghost" onClick={changeChatMode} size="sm">
            채팅모드로 돌아가기
          </Button>
          <Button variant="ghost" onClick={() => setStatus('working')} size="sm">
            임의: go workflow
          </Button>
        </>
      )}
      {status === 'sleep' && (
        <>
          <Bot className={S.botIcon()} />
          <div className={S.text()}>
            <p>선택된 URL소스를 기반으로 문서를 만들 수 있어요!</p>
            <p>어떤 문서를 만들어 볼까요?</p>
          </div>
          <Button variant="ghost" size="sm" onClick={openNewAgent}>
            문서 만들기
          </Button>
        </>
      )}
    </div>
  )
}

export default PendingSection
