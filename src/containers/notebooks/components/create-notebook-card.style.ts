import { cva } from 'class-variance-authority'

export const card = cva(`
  flex
  flex-col
  items-center
  justify-center
  gap-2
  rounded-xl
  border-2
  border-dashed
  border-border
  bg-card
  h-40
  hover:border-primary/60
  hover:bg-muted/30
  transition-all
  duration-200
  cursor-pointer
  group
`)

export const inputWrapper = cva(`
  flex
  flex-col
  items-center
  justify-center
  gap-2
  w-full
  h-full
  px-4
`)

export const input = cva(`
  w-full
  rounded-md
  border
  border-primary
  bg-background
  px-3
  py-1.5
  text-sm
  text-foreground
  placeholder:text-muted-foreground
  focus:outline-none
  focus:ring-1
  focus:ring-primary
`)

export const hint = cva(`
  text-xs
  text-muted-foreground
`)

export const plusIcon = cva(`
  text-muted-foreground
  group-hover:text-primary
  transition-colors
  duration-150
`)

export const label = cva(`
  text-sm
  text-muted-foreground
  group-hover:text-primary
  transition-colors
  duration-150
`)
