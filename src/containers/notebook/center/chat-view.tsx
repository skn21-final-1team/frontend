'use client'

import { useEffect, useRef } from 'react'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import * as S from './chat-view.style'
import { useChatStore } from '../store/chat.store'

interface ChatViewProps {
  notebookId: number
}

export default function ChatView({ notebookId }: ChatViewProps) {
  const { messages, streamingMessage, isLoading, init, sendMessage } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    init(notebookId)
  }, [notebookId, init])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingMessage])

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <div className={S.inner()}>
        <div className={S.messages()}>
          {messages.map((chat) =>
            chat.role === 'assistant' ? (
              <MessageAi key={chat.id} message={chat.message} />
            ) : (
              <MessageUser key={chat.id} message={chat.message} />
            ),
          )}
          {isLoading && !streamingMessage && <MessageAi isLoading={true} message="" />}
          {streamingMessage && <MessageAi message={streamingMessage} />}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </section>
  )
}
