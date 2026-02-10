import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex
  items-center
  opacity-0
  group-hover:opacity-100
  transition-opacity
`)

export const actionButton = cva(`
  w-[28px]
  h-[28px]
  cursor-pointer
  rounded-full
  hover:rounded-xl
`)

export const actionIcon = cva(`
  text-muted-foreground
`)
