import React from 'react'
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

interface CitationBadgeProps {
  source: ChatSource
}

function CitationBadge({ source }: CitationBadgeProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={S.citationBadge()}>
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
  )
}

function parseInlineCitations(text: string, sources: ChatSource[]): React.ReactNode[] {
  return text.split(/(\[\d+\])/).map((part, i) => {
    const match = part.match(/^\[(\d+)\]$/)
    if (match) {
      const source = sources.find((s) => s.index === Number(match[1]))
      if (source) return <CitationBadge key={i} source={source} />
    }
    return part
  })
}

function processChildren(children: React.ReactNode, sources: ChatSource[]): React.ReactNode {
  if (typeof children === 'string') {
    return parseInlineCitations(children, sources)
  }
  if (Array.isArray(children)) {
    return children.flatMap((child, i) => {
      if (typeof child === 'string') {
        return parseInlineCitations(child, sources).map((el, j) =>
          React.isValidElement(el) ? React.cloneElement(el, { key: `${i}-${j}` }) : el,
        )
      }
      return [child]
    })
  }
  return children
}

function MessageAi({
  message,
  isLoading = false,
  isStreaming = false,
  sources,
  aborted = false,
}: MessageAiProps) {
  const citationComponents = sources?.length
    ? {
        p: ({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
          <p {...props}>{processChildren(children, sources)}</p>
        ),
      }
    : undefined

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
          <div className={S.streamingText()}>{message}</div>
        ) : (
          <Markdown text={message} components={citationComponents} />
        )}
      </div>
    </div>
  )
}

export default MessageAi
