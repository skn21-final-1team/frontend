import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex
  flex-col
  mb-1
`)

export const header = cva(`
  group
  flex
  items-center
  gap-3
  px-2
  py-2
  rounded-md
  transition-all
  duration-200
  hover:bg-sidebar-accent
`)

export const checkbox = cva(`
  h-4
  w-4
  rounded
  border-2
  border-muted-foreground/40
  cursor-pointer
  transition-colors
  duration-150
  accent-primary
  hover:border-primary
`)

export const folderIcon = cva(`
  w-4
  h-4
  text-muted-foreground
  transition-colors
  duration-150
  group-hover:text-foreground
`)

export const folderName = cva(`
  flex-1
  text-sm
  font-medium
  text-foreground/80
  truncate
  transition-colors
  duration-150
  group-hover:text-foreground
`)

export const urlList = cva(`
  flex
  flex-col
  ml-4
  pl-3
  border-l
  border-border/50
`)

export const chevron = cva(`
  w-4
  h-4
  text-muted-foreground
  transition-transform
  duration-200
`)

export const chevronOpen = cva(`
  rotate-90
`)
