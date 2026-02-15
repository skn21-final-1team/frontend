'use client'

import { useState, useEffect } from 'react'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import * as S from './chat-view.style'
import { getChatsByNotebook, Chat } from '@/shared/api/chat.api'

interface ChatViewProps {
  notebookId: number
}

export default function ChatView({ notebookId }: ChatViewProps) {
  const [messages, setMessages] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await getChatsByNotebook(notebookId)
        setMessages(chats)
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
          {messages.map((chat) =>
            chat.role === 'assistant' ? (
              <MessageAi key={chat.id} message={chat.message} />
            ) : (
              <MessageUser key={chat.id} message={chat.message} />
            ),
          )}
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </section>
  )
}
