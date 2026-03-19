'use client'

import { useEffect, useRef } from 'react'
import { ErrorAlert } from '@/shared/components/error-alert'
import { useChatStore } from '../store/chat.store'
import { useReportWorkflowStore } from '../store/report-workflow.store'
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
  const chatMessages = useChatStore((state) => state.chatMessages)
  const streamingMessage = useChatStore((state) => state.streamingMessage)
  const chatIsLoading = useChatStore((state) => state.isLoading)
  const chatError = useChatStore((state) => state.error)
  const initChat = useChatStore((state) => state.init)
  const sendChatMessage = useChatStore((state) => state.sendMessage)
  const clearChatError = useChatStore((state) => state.setError)
  const abortChat = useChatStore((state) => state.abort)
  const agentMessages = useReportWorkflowStore((state) => state.agentMessages)
  const reportWorkflowError = useReportWorkflowStore((state) => state.error)
  const reportWorkflowIsLoading = useReportWorkflowStore((state) => state.isLoading)
  const initReportWorkflowSession = useReportWorkflowStore((state) => state.initSession)
  const sendAgentMessage = useReportWorkflowStore((state) => state.sendAgentMessage)
  const clearReportWorkflowError = useReportWorkflowStore((state) => state.setError)
  const abortAgentSession = useReportWorkflowStore((state) => state.abortAgentSession)
  const { status: agentStatus } = useAgentStatusStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isAgentMode = agentStatus === 'ready' || agentStatus === 'working'
  const isLoading = isAgentMode ? reportWorkflowIsLoading : chatIsLoading
  const error = isAgentMode ? reportWorkflowError : chatError
  const visibleMessages = isAgentMode ? agentMessages : chatMessages

  const handleCloseError = () => {
    if (isAgentMode) {
      clearReportWorkflowError(null)
      return
    }

    clearChatError(null)
  }

  const handleSend = (message: string) => {
    if (isAgentMode) {
      void sendAgentMessage(message, notebookId)
      return
    }

    void sendChatMessage(message)
  }

  const handleStop = () => {
    if (isAgentMode) {
      abortAgentSession()
      return
    }

    abortChat()
  }

  useEffect(() => {
    void initChat(notebookId)
    initReportWorkflowSession(notebookId)
  }, [initChat, initReportWorkflowSession, notebookId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleMessages, streamingMessage])

  return (
    <section className={S.section()}>
      <ErrorAlert error={error} onClose={handleCloseError} />
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
          <ChatInput onSend={handleSend} onStop={handleStop} isLoading={isLoading} />
        </div>
      </div>
    </section>
  )
}

export default ChatView
