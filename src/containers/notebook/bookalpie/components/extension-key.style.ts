import { cva } from 'class-variance-authority'

export const container = cva('mt-1.5 space-y-2 rounded-md bg-muted/30 p-2 border border-border/50')

export const keyRow = cva('flex items-center gap-1.5')

export const keyInput = cva('flex-1 font-mono text-[11px] shadow-none border-muted-foreground/20')

export const checkIcon = cva('text-green-600 h-3 w-3')

export const copyIcon = cva('h-3 w-3')

export const copyButton = cva('shrink-0 h-6 w-6')

export const footer = cva('flex justify-between items-center px-1.5')

export const successMessage = cva('text-[11px] text-green-600 font-medium tracking-tight')

export const warningMessage = cva('text-[11px] font-medium text-orange-600 tracking-tight')
