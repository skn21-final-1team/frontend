import { cva } from 'class-variance-authority'

export const trigger = cva(`
  flex
  items-center
  gap-1.5
  px-3
  py-1.5
  text-sm
  text-muted-foreground
  hover:text-foreground
  rounded-md
  hover:bg-muted
  transition-colors
`)

export const activeItem = cva(`
  bg-accent
`)
