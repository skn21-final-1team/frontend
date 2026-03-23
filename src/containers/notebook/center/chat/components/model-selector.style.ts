import { cva } from 'class-variance-authority'

export const trigger = cva(`
  flex
  h-8
  w-fit
  flex-none
  items-center
  gap-1
  whitespace-nowrap
  rounded-md
  px-3
  text-xs
  bg-background
  hover:bg-accent
  disabled:opacity-50
`)

export const triggerIcon = cva(`
  size-3
`)

export const item = cva(`
  flex
  flex-col
  items-start
  gap-0.5
`)

export const itemTitle = cva(`
  text-sm
  font-medium
`)

export const itemDescription = cva(`
  text-xs
  text-muted-foreground
`)
