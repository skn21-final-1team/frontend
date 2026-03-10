import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components'
import { AI_MODELS, type AIModel } from '../../constants/models-mock'

interface ModelSelectorProps {
  selected: AIModel
  onSelect: (model: AIModel) => void
  disabled?: boolean
}

export default function ModelSelector({ selected, onSelect, disabled }: ModelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground hover:bg-accent disabled:opacity-50"
        disabled={disabled}
      >
        {selected.name}
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {AI_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelect(model)}
            className="flex flex-col items-start gap-0.5"
          >
            <span className="text-sm font-medium">{model.name}</span>
            <span className="text-xs text-muted-foreground">{model.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
