import { cva } from 'class-variance-authority'

export const triggerButton = cva(
  'w-fit justify-start gap-1.5 px-2 py-1 h-auto text-xs font-semibold text-white border-border shadow-sm',
)

export const triggerIcon = cva('h-3 w-3')

export const dropdownContent = cva('w-64')

export const dropdownLabel = cva('font-semibold text-sm py-1.5 flex justify-between items-center')

export const keySection = cva('p-2.5 flex flex-col gap-2')

export const keyRow = cva('flex items-center justify-between gap-2')

export const keyLabel = cva('text-xs text-muted-foreground whitespace-nowrap')

export const generateButton = cva('h-6 px-2 text-[11px]')

export const spinnerIcon = cva('mr-1 h-3 w-3')

export const infoSection = cva('p-2.5 bg-muted/20')

export const errorBox = cva('rounded bg-destructive/10 p-1.5 text-xs text-destructive mb-2')
