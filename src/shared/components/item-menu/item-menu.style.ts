import { cva } from 'class-variance-authority'

export const trigger = cva(
  'p-1 hover:bg-muted rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
)

export const icon = cva('text-muted-foreground')

export const deleteItem = cva('text-destructive focus:text-destructive')
