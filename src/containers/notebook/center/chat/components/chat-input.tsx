import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { Button } from '@/shared/components'
import { Send, Square } from 'lucide-react'
import ModelSelector from './model-selector'
import { DEFAULT_MODEL, type AIModel } from '@/containers/notebook/constants/models-mock'
import { useAgentStatusStore } from '@/shared/store/agent-status-store'
import { NeonGradientCard } from '@/shared/components/ui/neon-gradient-card'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'

import * as S from './chat-input.style'

interface ChatInputProps {
  onSend: (message: string, modelId: string) => void
  onStop?: () => void
  disabled?: boolean
  isLoading?: boolean
}

function ChatInput({ onSend, onStop, disabled = false, isLoading = false }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [model, setModel] = useState<AIModel>(DEFAULT_MODEL)
  const status = useAgentStatusStore((state) => state.status)
  const debouncedValue = useDebouncedValue<string>(value, 150)
  const hasDebouncedMessage = debouncedValue.trim().length > 0
  const isSendDisabled = !isLoading && (disabled || !hasDebouncedMessage)

  const handleSend = (): void => {
    if (!value.trim() || disabled) return

    onSend(value, model.id)
    setValue('')
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <NeonGradientCard borderRadius={12} isOff={status === 'sleep'} className={S.container()}>
      <textarea
        rows={4}
        className={S.textarea()}
        value={value}
        onChange={handleChange}
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
          disabled={isSendDisabled}
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
