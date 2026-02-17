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
            <span className="ml-2 text-sm">AI가 응답 중입니다...</span>
          </div>
        ) : (
          <>
            <p className={S.content()}>{message}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default MessageAi
