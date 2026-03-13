'use client'

import { ArrowDownNarrowWide } from 'lucide-react'
import type { NotebookSortType } from '@/shared/api/notebook.api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components'
import * as S from './sort-select.style'

const SORT_OPTIONS: { value: NotebookSortType; label: string }[] = [
  { value: 'recent', label: '최근순' },
  { value: 'created_at', label: '생성순' },
  { value: 'name', label: '이름순' },
]

interface SortSelectProps {
  value: NotebookSortType
  onChange: (sort: NotebookSortType) => void
}

function SortSelect({ value, onChange }: SortSelectProps) {
  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={S.trigger()}>
          <ArrowDownNarrowWide size={16} />
          <span>{currentLabel}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={value === option.value ? S.activeItem() : undefined}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortSelect
