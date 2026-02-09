import { cva } from 'class-variance-authority'

export const section = cva(`
  h-full
  flex
  flex-col
  overflow-hidden
  px-2
  py-4
`)

export const inner = cva(`
  flex
  flex-col
  h-full
  gap-1
  px-4
  py-4
  rounded-2xl
  bg-card
  border
  border-border
  overflow-hidden
`)

export const header = cva(`
  flex
  items-center
  justify-between
  px-2
  pb-3
  mb-2
  border-b
  border-border
  flex-shrink-0
`)

export const headerTitle = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-wider
  text-muted-foreground
`)
