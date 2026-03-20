import { cva } from 'class-variance-authority'

export const searchWrapper = cva(`
  flex
  items-center
  w-full
  mb-3
  shrink-0
  rounded-lg
  border
  border-border
  bg-background
  focus-within:ring-1
  focus-within:ring-ring
  transition-all
  duration-200
`)

export const searchInput = cva(`
  flex-1
  min-w-0
  px-3
  py-2
  text-sm
  bg-transparent
  text-foreground
  placeholder:text-muted-foreground
  focus:outline-none
`)

export const clearButton = cva(`
  shrink-0
  mr-1
  p-0.5
  rounded
  text-muted-foreground
  hover:text-foreground
  transition-colors
`)
