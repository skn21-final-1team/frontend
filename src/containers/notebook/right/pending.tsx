import { Bot, BotMessageSquare } from 'lucide-react'
import { Button } from '@/shared/components'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import * as S from './panding.style'

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
            <p>문서 작성을 바로 시작할게요.</p>
            <p>채팅을 통해 작성을 원하는 문서를 알려주세요.</p>
            <p>{'예시) "에이전트 사용설명서 만들어줘"'}</p>
          </div>
          <Button variant="ghost" onClick={changeChatMode} size="sm">
            채팅모드로 돌아가기
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
