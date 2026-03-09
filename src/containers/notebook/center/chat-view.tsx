'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import * as S from './chat-view.style'
import { getChatsByNotebook, Chat, StreamChatResponse } from '@/shared/api/chat.api'
import { SSE } from '@/shared/utils/fetcher'
import { ErrorAlert, type ErrorAlertState } from '@/shared/components'

interface ChatViewProps {
  notebookId: number
}

export default function ChatView({ notebookId }: ChatViewProps) {
  const [messages, setMessages] = useState<Chat[]>([])
  const [streamingMessage, setStreamingMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ErrorAlertState | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await getChatsByNotebook(notebookId)
        setMessages(chats)
      } catch {
        setError({ title: '채팅 불러오기 실패', description: '채팅 내역을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.' })
      }
    }

    if (notebookId) {
      fetchChats()
    }
  }, [notebookId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  const updateNewMessage = (message: string, role: 'user' | 'assistant') => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role,
        message,
        created_at: new Date().toISOString(),
        notebook_id: notebookId,
      },
    ])
  }

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) return

    setIsLoading(true)
    updateNewMessage(input, 'user')

    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    let aiMessage = ''
    await SSE({
      url: '/chat',
      data: {
        notebook_id: notebookId,
        message: input,
      },
      signal: controller.signal,
      onMessage: (event) => {
        if (event.data === '') {
          setStreamingMessage((prev) => prev + '\n')
          aiMessage += '\n'
        }
        if (event.event === 'messages') {
          setStreamingMessage((prev) => prev + event.data)
          aiMessage += event.data
        }
      },
      onError: () => {
        setIsLoading(false)
        setStreamingMessage('')
      },
    })

    updateNewMessage(aiMessage.trim(), 'assistant')
    setStreamingMessage('')
    setIsLoading(false)
  }

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
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </section>
  )
}
