import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components'
import Markdown from '@/shared/components/ui/markdown/markdown'
import type { ChatSource } from '@/shared/api/chat.api'
import * as S from './message-ai.style'

interface MessageAiProps {
  message: string
  isLoading?: boolean
  isStreaming?: boolean
  sources?: ChatSource[]
  aborted?: boolean
}

function stripSourceTags(text: string): string {
  return text.replace(/\s*\[소스\s*\d+\]/g, '')
}

function MessageAi({
  message,
  isLoading = false,
  isStreaming = false,
  sources,
  aborted = false,
}: MessageAiProps) {
  const visibleSources = sources?.slice(0, 3)
  const cleanMessage = stripSourceTags(message)

  return (
    <div className={S.container()}>
      <div className={S.bubble()}>
        {isLoading ? (
          <div className={S.loadingDots()}>
            <div className={S.dot({ delay: 0 })} />
            <div className={S.dot({ delay: 150 })} />
            <div className={S.dot({ delay: 300 })} />
            <span>Thinking...</span>
          </div>
        ) : aborted ? (
          <span className={S.abortedText()}>사용자가 답변 중단을 요청했습니다.</span>
        ) : isStreaming ? (
          <Markdown text={stripSourceTags(message)} />
        ) : (
          <Markdown text={cleanMessage} />
        )}
        {!isLoading && !isStreaming && !aborted && visibleSources?.length ? (
          <div className={S.sourceList()}>
            {visibleSources.map((source) => (
              <Popover key={source.index}>
                <PopoverTrigger asChild>
                  <button type="button" className={S.sourceIndex()}>
                    {source.index}
                  </button>
                </PopoverTrigger>
                <PopoverContent className={S.popoverContent()} side="top" align="start">
                  <div className={S.popoverInner()}>
                    {source.title && <span className={S.popoverTitle()}>{source.title}</span>}
                    <p className={S.popoverChunk()}>{source.content}</p>
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={S.popoverLink()}
                      >
                        {source.url}
                      </a>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MessageAi
