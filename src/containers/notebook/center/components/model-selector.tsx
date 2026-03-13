import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components'

import { AI_MODELS, type AIModel } from '../../constants/models-mock'

import * as S from './model-selector.style'

interface ModelSelectorProps {
  selected: AIModel
  onSelect: (model: AIModel) => void
  disabled?: boolean
}

function ModelSelector({ selected, onSelect, disabled }: ModelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={S.trigger()} disabled={disabled}>
        {selected.name}
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {AI_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelect(model)}
            className={S.menuItem()}
          >
            <span>{model.name}</span>
            <span>{model.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModelSelector
