import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-hidden
  px-2
  py-4
`)

export const inner = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-y-auto
  rounded-2xl
  border
  border-border
  bg-card
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
