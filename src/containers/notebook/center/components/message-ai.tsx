import * as S from './message-ai.style'
import Markdown from '@/shared/components/ui/markdown/markdown'

interface MessageAiProps {
  message: string
  isLoading?: boolean
}

function MessageAi({ message, isLoading = false }: MessageAiProps) {
  return (
    <div className={S.container()}>
      <div className={S.bubble()}>
        {isLoading ? (
          <div className={S.loadingDots()}>
            <div className={S.dot()} style={{ animationDelay: '0ms' }} />
            <div className={S.dot()} style={{ animationDelay: '150ms' }} />
            <div className={S.dot()} style={{ animationDelay: '300ms' }} />
            <span>Thinking...</span>
          </div>
        ) : (
          <Markdown text={message} />
        )}
      </div>
    </div>
  )
}

export default MessageAi
