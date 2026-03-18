import { cva } from 'class-variance-authority'

export const trigger = cva(
  `
    p-1
    rounded-md
    transition-colors
    text-white/85
    bg-black/40
    cursor-pointer
    hover:bg-black/50
  `,
)

export const icon = cva('text-white/85')

export const deleteItem = cva('text-destructive focus:text-destructive')
