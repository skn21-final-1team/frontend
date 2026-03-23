import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components'
import { AI_MODELS, type AIModel } from '@/containers/notebook/constants/models-mock'
import * as style from './model-selector.style'

interface ModelSelectorProps {
  selected: AIModel
  onSelect: (model: AIModel) => void
  disabled?: boolean
}

export default function ModelSelector({ selected, onSelect, disabled }: ModelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={style.trigger()} disabled={disabled}>
        {selected.name}
        <ChevronDown className={style.triggerIcon()} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {AI_MODELS.map((model) => (
          <DropdownMenuItem key={model.id} onClick={() => onSelect(model)} className={style.item()}>
            <span className={style.itemTitle()}>{model.name}</span>
            <span className={style.itemDescription()}>{model.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
