import { useState, type KeyboardEvent } from 'react'
import { Button, Textarea } from '@/shared/components'
import { Send, Square } from 'lucide-react'
import ModelSelector from './model-selector'
import { DEFAULT_MODEL, type AIModel } from '../../constants/models-mock'
import * as S from './chat-input.style'

interface ChatInputProps {
  onSend: (message: string) => void
  onStop?: () => void
  disabled?: boolean
  isLoading?: boolean
}

function ChatInput({ onSend, onStop, disabled = false, isLoading = false }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [model, setModel] = useState<AIModel>(DEFAULT_MODEL)

  const handleSend = () => {
    if (!value.trim() || disabled) return

    onSend(value)
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
      <div className={S.toolbar()}>
        <ModelSelector selected={model} onSelect={setModel} disabled={isLoading} />
      </div>
      <Textarea
        rows={6}
        className={S.textarea()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요."
        disabled={disabled}
      />
      {isLoading ? (
        <Button
          className={S.button()}
          onClick={onStop}
          size="icon"
          variant="destructive"
        >
          <Square className="size-4" />
        </Button>
      ) : (
        <Button
          className={S.button()}
          onClick={handleSend}
          size="icon"
          disabled={disabled || !value.trim()}
        >
          <Send />
        </Button>
      )}
    </div>
  )
}

export default ChatInput
