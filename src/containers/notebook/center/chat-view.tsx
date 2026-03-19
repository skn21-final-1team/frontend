'use client'

import { useEffect, useRef } from 'react'
import { ErrorAlert } from '@/shared/components/error-alert'
import { useChatStore } from '../store/chat.store'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import * as S from './chat-view.style'
import {
  AGENT_MODE_CHAT_GUIDE_MESSAGE,
  useAgentStatusStore,
} from '@/shared/store/agent-status-store'

interface ChatViewProps {
  notebookId: number
}

function ChatView({ notebookId }: ChatViewProps) {
  const {
    chatMessages,
    agentMessages,
    streamingMessage,
    isLoading,
    error,
    init,
    sendMessage,
    setError,
    abort,
  } = useChatStore()
  const { status: agentStatus } = useAgentStatusStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isAgentMode = agentStatus === 'ready' || agentStatus === 'working'
  const visibleMessages = isAgentMode ? agentMessages : chatMessages

  useEffect(() => {
    init(notebookId)
  }, [notebookId, init])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, streamingMessage])

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <div className={S.inner()}>
        <div className={S.messages()}>
          {isAgentMode && <MessageAi message={AGENT_MODE_CHAT_GUIDE_MESSAGE} />}
          {visibleMessages.map((chat) =>
            chat.role === 'assistant' ? (
              <MessageAi
                key={chat.id}
                message={chat.message}
                sources={chat.sources}
                aborted={chat.aborted}
              />
            ) : (
              <MessageUser key={chat.id} message={chat.message} />
            ),
          )}
          {isLoading && !streamingMessage && <MessageAi isLoading={true} message="" />}
          {streamingMessage && <MessageAi message={streamingMessage} />}
          <div ref={messagesEndRef} />
        </div>
        <div className={S.inputWrapper()}>
          <ChatInput onSend={sendMessage} onStop={abort} isLoading={isLoading} />
        </div>
      </div>
    </section>
  )
}

export default ChatView
