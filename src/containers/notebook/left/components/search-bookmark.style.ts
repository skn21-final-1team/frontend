import { cva } from 'class-variance-authority'

export const searchWrapper = cva(`
  mb-3
  shrink-0
`)

export const searchInput = cva(`
  w-full
  px-3
  py-2
  text-sm
  rounded-lg
  border
  border-border
  bg-background
  text-foreground
  placeholder:text-muted-foreground
  focus:outline-none
  focus:ring-2
  focus:ring-primary/50
  transition-all
  duration-200
`)
