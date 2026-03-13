import { useState, type KeyboardEvent } from 'react'
import { Button } from '@/shared/components'
import { Send, Square } from 'lucide-react'
import ModelSelector from './model-selector'
import { DEFAULT_MODEL, type AIModel } from '../../constants/models-mock'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { NeonGradientCard } from '@/shared/components/ui/neon-gradient-card'

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
  const { isWorking } = useAgentStatusStore()

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
    <NeonGradientCard borderRadius={12} isOff={!isWorking} className={S.container()}>
      <textarea
        rows={4}
        className={S.textarea()}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요."
        disabled={disabled}
      />

      <div className={S.bottomBar()}>
        <ModelSelector selected={model} onSelect={setModel} disabled={isLoading} />
        <Button
          className={S.button()}
          onClick={isLoading ? onStop : handleSend}
          size="icon"
          disabled={!isLoading && (disabled || !value.trim())}
        >
          {isLoading ? (
            <Square className={S.buttonIcon({ size: 'sm' })} fill="currentColor" />
          ) : (
            <Send className={S.buttonIcon({ size: 'm' })} />
          )}
        </Button>
      </div>
    </NeonGradientCard>
  )
}

export default ChatInput
