'use client'

import { useState } from 'react'
import ChatInput from './components/chat-input'
import MessageUser from './components/message-user'
import MessageAi from './components/message-ai'
import type { Message } from './types/message'
import * as S from './chat-view.style'

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '2',
      role: 'ai',
      content: '안녕하세요! 무엇을 도와드릴까요?',
    },
    {
      id: '1',
      role: 'user',
      content: '그럼 이거도 해줘',
    },
    {
      id: '4',
      role: 'ai',
      content:
        '안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?안녕하세요! 무엇을 도와드릴까요?s',
    },
    {
      id: '3',
      role: 'user',
      content: '?이렇게 하라고 말했잖아',
    },
  ])

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
        <ChatInput />
      </div>
    </section>
  )
}
