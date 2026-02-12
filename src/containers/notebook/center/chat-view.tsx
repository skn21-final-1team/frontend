'use client'

import { useState, useEffect } from 'react'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import type { Message } from './types/message'
import * as S from './chat-view.style'
import { getChatsByNotebook, createChat } from '@/shared/api/chat.api'

interface ChatViewProps {
  notebookId: number
}

export default function ChatView({ notebookId }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await getChatsByNotebook(notebookId)
        const formattedMessages: Message[] = chats.map((chat) => ({
          id: chat.id.toString(),
          role: chat.role as 'user' | 'assistant' | 'ai',
          content: chat.message,
        }))
        setMessages(formattedMessages)
      } catch (error) {
        console.error('채팅 내역을 불러오는데 실패했습니다:', error)
      }
    }

    if (notebookId) {
      fetchChats()
    }
  }, [notebookId])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    try {
      setIsLoading(true)

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
      }
      setMessages((prev) => [...prev, userMessage])

      await createChat({
        role: 'user',
        message: message,
        notebook_id: notebookId,
      })

      // AI 응답 생성 (실제로는 백엔드에서 처리해야 함)
      // TODO: AI 응답 API 연결 필요
      const aiResponse = await createChat({
        role: 'ai',
        message: '응답을 생성 중입니다...', // 임시 답변
        notebook_id: notebookId,
      })

      const aiMessage: Message = {
        id: aiResponse.id.toString(),
        role: 'ai',
        content: aiResponse.message,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('메시지 전송에 실패했습니다:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={S.section()}>
      <div className={S.inner()}>
        <div className={S.messages()}>
          {messages.map((message) =>
            message.role === 'ai' ? (
              <MessageAi key={message.id} message={message} />
            ) : (
              <MessageUser key={message.id} message={message} />
            ),
          )}
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </section>
  )
}
