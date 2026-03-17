import { cva } from 'class-variance-authority'

export const section = cva(`
  w-full
  h-full
  min-h-0
  flex
  flex-col
  gap-4
  overflow-hidden
`)

export const content = cva(`
  flex-1
  min-h-0
  overflow-hidden
  flex
  flex-col
  gap-4
  pr-1
`)

export const actionArea = cva(`
  shrink-0
`)

export const notice = cva(`rounded-2xl border px-4 py-3 text-xs leading-relaxed`, {
  variants: {
    tone: {
      neutral: 'border-border bg-muted/60 text-foreground',
      danger: 'border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300',
    },
  },
})

export const exitButton = cva(`
  rounded-xl
  border
  border-border
  bg-background
  px-3
  py-2
  text-xs
  font-medium
  text-muted-foreground
  transition-colors
  hover:bg-muted
`)
