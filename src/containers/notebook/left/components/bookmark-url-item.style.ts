import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  group
  flex
  items-center
  gap-3
  px-2
  py-1.5
  rounded-md
  transition-all
  duration-200
  hover:bg-sidebar-accent
`)

export const checkbox = cva(`
  h-3.5
  w-3.5
  rounded
  border-2
  border-muted-foreground/40
  cursor-pointer
  transition-colors
  duration-150
  accent-primary
  hover:border-primary
`)

export const icon = cva(`
  w-3.5
  h-3.5
  text-muted-foreground/70
  transition-colors
  duration-150
  group-hover:text-muted-foreground
`)

export const title = cva(`
  flex-1
  text-sm
  text-foreground/70
  truncate
  transition-colors
  duration-150
  group-hover:text-foreground/90
`)
