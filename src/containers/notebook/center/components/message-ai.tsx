import type { Message } from '../types/message'
import * as S from './message-ai.style'

interface MessageAiProps {
  message: Message
  isLoading?: boolean
}

function MessageAi({ message, isLoading = false }: MessageAiProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={S.container()}>
      <div className={S.bubble()}>
        {isLoading ? (
          <div className={S.loadingDots()}>
            <div className={S.dot()} style={{ animationDelay: '0ms' }} />
            <div className={S.dot()} style={{ animationDelay: '150ms' }} />
            <div className={S.dot()} style={{ animationDelay: '300ms' }} />
            <span className="ml-2 text-sm">AI가 응답 중입니다...</span>
          </div>
        ) : (
          <>
            <p className={S.content()}>{message.content}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default MessageAi
