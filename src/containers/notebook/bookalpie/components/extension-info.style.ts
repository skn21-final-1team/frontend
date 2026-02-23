import { cva } from 'class-variance-authority'

export const container = cva('flex flex-col justify-center h-full gap-1.5')

export const title = cva('text-sm font-semibold text-foreground/90 leading-tight mb-0.5')

export const list = cva('list-decimal list-outside ml-4 space-y-1 text-xs text-muted-foreground tracking-tight leading-relaxed')
