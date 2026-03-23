import { cva } from 'class-variance-authority'

export const section = cva(`
  h-full
  flex
  flex-col
  overflow-y-hidden
  overflow-x-visible
  px-2
  py-4
`)

export const inner = cva(`
  flex
  flex-col
  h-full
  gap-1
  p-4
  rounded-2xl
  bg-card
  border
  border-border
  overflow-y-hidden
  overflow-x-visible
`)

export const header = cva(`
  flex
  items-center
  justify-between
  pb-3
  mb-2
  border-b
  border-border
  shrink-0
`)

export const headerLeft = cva(`
  flex
  items-center
  gap-2
`)

export const headerTitle = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-wider
  text-muted-foreground
`)
