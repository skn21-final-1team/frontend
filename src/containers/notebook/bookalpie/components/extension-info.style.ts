import { cva } from 'class-variance-authority'

export const container = cva('flex flex-col justify-center h-full gap-1.5')

export const title = cva('text-[11px] font-semibold text-foreground/90 leading-tight mb-0.5')

export const list = cva('list-decimal list-outside ml-3.5 space-y-0.5 text-[10px] text-muted-foreground tracking-tight leading-relaxed')
