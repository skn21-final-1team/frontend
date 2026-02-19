import ReactMarkdown from 'react-markdown'
import * as S from './message-ai.style'

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
            <span className="ml-2 text-sm">Thinking...</span>
          </div>
        ) : (
          <div className={S.content()}>
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageAi
