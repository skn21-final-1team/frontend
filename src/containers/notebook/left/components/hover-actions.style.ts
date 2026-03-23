import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  hidden
  group-hover:flex
  items-center
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

