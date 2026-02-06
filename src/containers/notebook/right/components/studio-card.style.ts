import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  group
  flex
  items-center
  gap-3
  p-3
  rounded-lg
  border
  border-border/50
  cursor-pointer
  transition-all
  duration-200
  hover:bg-sidebar-accent
  hover:border-primary/30
`)

export const iconWrapper = cva(`
  flex
  items-center
  justify-center
  w-10
  h-10
  rounded-lg
  bg-muted
  transition-colors
  duration-200
  group-hover:bg-primary/10
`)

export const icon = cva(`
  w-5
  h-5
  text-muted-foreground
  transition-colors
  duration-150
  group-hover:text-primary
`)

export const content = cva(`
  flex
  flex-col
  flex-1
  min-w-0
`)

export const name = cva(`
  text-sm
  font-medium
  text-foreground
  truncate
`)

export const description = cva(`
  text-xs
  text-muted-foreground
  truncate
`)
