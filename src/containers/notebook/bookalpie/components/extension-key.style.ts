import { cva } from 'class-variance-authority'

export const container = cva('mt-2 space-y-3 rounded-md bg-muted/30 p-3 border border-border/50')

export const keyRow = cva('flex items-center gap-2.5')

export const codeBlock = cva(
  'flex-1 overflow-x-auto rounded bg-background px-3 py-2 text-sm font-mono break-all border border-border shadow-md'
)

export const copyButton = cva('shrink-0 h-8 w-8')

export const footer = cva('flex justify-between items-center px-1.5')

export const successMessage = cva('text-sm text-green-600 font-medium tracking-tight')

export const warningMessage = cva('text-sm font-medium text-orange-600 tracking-tight')
