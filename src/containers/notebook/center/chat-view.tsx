'use client'

import { useEffect, useRef } from 'react'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import { ErrorAlert } from '@/shared/components/error-alert'
import * as S from './chat-view.style'
import { useChatStore } from '../store/chat.store'
import { useReportWorkflowStore } from '../store/report-workflow.store'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'

interface ChatViewProps {
  notebookId: number
}

export default function ChatView({ notebookId }: ChatViewProps) {
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
  const { init: initWorkflow } = useReportWorkflowStore()
  const { status: agentStatus } = useAgentStatusStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isAgentMode = agentStatus === 'ready' || agentStatus === 'working'
  const visibleMessages = isAgentMode ? agentMessages : chatMessages
  const workflowInitializedNotebook = useRef<number | null>(null)

  useEffect(() => {
    init(notebookId)
  }, [notebookId, init])

  useEffect(() => {
    if (!isAgentMode) {
      workflowInitializedNotebook.current = null
      return
    }

    if (workflowInitializedNotebook.current === notebookId) return
    workflowInitializedNotebook.current = notebookId
    initWorkflow(notebookId)
  }, [isAgentMode, notebookId, initWorkflow])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, streamingMessage])

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      <div className={S.inner()}>
        <div className={S.messages()}>
          {visibleMessages.map((chat) =>
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
        <div className={S.inputWrapper()}>
          <ChatInput onSend={sendMessage} onStop={abort} isLoading={isLoading} />
        </div>
      </div>
    </section>
  )
}
