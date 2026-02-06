import { cva } from 'class-variance-authority'

export const section = cva(`
  h-full
  flex
  flex-col
  overflow-hidden
`)

export const inner = cva(`
  flex
  flex-col
  h-full
  gap-1
  px-3
  py-4
  overflow-y-auto
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
`)

export const headerTitle = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-wider
  text-muted-foreground
`)
