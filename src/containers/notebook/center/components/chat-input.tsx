import { useState, type KeyboardEvent } from 'react'
import { Button, Textarea } from '@/shared/components'
import { Send } from 'lucide-react'
import * as S from './chat-input.style'

function ChatInput() {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim()) return

    console.log('메시지 전송:', value)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={S.container()}>
      <Textarea
        rows={6}
        className={S.textarea()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요."
      />
      <Button className={S.button()} onClick={handleSend} size="icon">
        <Send />
      </Button>
    </div>
  )
}

export default ChatInput
