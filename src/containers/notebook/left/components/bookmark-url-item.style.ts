import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  group
  flex
  items-start
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
  mt-0.5
`)

export const icon = cva(`
  w-3.5
  h-3.5
  mt-0.5
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

export const tagList = cva(`
  flex
  flex-wrap
  gap-1.5
  mt-1.5
`)
export const tagItem = cva(`
  text-[10px]
  text-muted-foreground/80
  font-medium
  bg-muted/50
  px-1.5
  py-0.5
  rounded-sm
  tracking-tight
`)

export const content = cva(`
  flex-1
  min-w-0
  flex
  flex-col
`)
