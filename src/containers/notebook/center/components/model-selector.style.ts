import { cva } from 'class-variance-authority'

export const trigger = cva(`
  flex
  items-center
  gap-1
  rounded-md
  border
  px-2
  py-1
  text-xs
  text-muted-foreground
  hover:bg-accent
  disabled:opacity-50
  [&>svg]:size-3
`)

export const menuItem = cva(`
  flex
  flex-col
  items-start
  gap-0.5
  [&>span:first-child]:text-sm
  [&>span:first-child]:font-medium
  [&>span:last-child]:text-xs
  [&>span:last-child]:text-muted-foreground
`)
