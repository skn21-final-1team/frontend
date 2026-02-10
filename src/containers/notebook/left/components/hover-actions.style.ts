import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex
  items-center
  opacity-0
  group-hover:opacity-100
  transition-opacity
`)

export const actionButton = cva(`
  h-6
  w-6
  cursor-pointer
`)

export const actionIcon = cva(`
  h-3.5
  w-3.5
  text-muted-foreground
`)
