import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-hidden
`)

export const inner = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-y-auto
  p-6
`)

export const empty = cva(`
  flex
  h-full
  items-center
  justify-center
  text-sm
  text-muted-foreground
`)
