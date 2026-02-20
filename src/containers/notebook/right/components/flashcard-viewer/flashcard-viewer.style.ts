import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex-1
  flex
  flex-col
  overflow-hidden
`)

export const header = cva(`
  flex
  items-center
  gap-2
  mb-4
  pb-2
  border-b
  border-border/50
`)

export const backButton = cva(`
  p-1.5
  hover:bg-muted
  rounded-full
  transition-colors
`)

export const title = cva(`
  flex-1
  font-semibold
  text-sm
`)

export const sourceCount = cva(`
  text-xs
  text-muted-foreground
`)

export const cardArea = cva(`
  flex-1
  flex
  items-center
  justify-center
  gap-4
  min-h-0
  py-4
`)

export const navButton = cva(`
  p-2
  rounded-full
  border
  border-border
  hover:bg-muted
  transition-colors
  disabled:opacity-30
  disabled:cursor-not-allowed
  shrink-0
`)

export const footer = cva(`
  flex
  items-center
  gap-3
  pt-3
  mt-auto
  border-t
  border-border/50
`)

export const progressBarWrapper = cva(`
  flex-1
  h-1
  bg-muted
  rounded-full
  cursor-pointer
  relative
  overflow-hidden
`)

export const progressBarFill = cva(`
  h-full
  bg-primary
  rounded-full
  transition-[width]
  duration-200
`)

export const progressBarThumb = cva(`
  absolute
  top-1/2
  -translate-y-1/2
  -translate-x-1/2
  w-2.5
  h-2.5
  bg-primary
  rounded-full
  cursor-grab
  active:cursor-grabbing
  hover:scale-125
  transition-transform
`)

export const cardCount = cva(`
  text-xs
  text-muted-foreground
  whitespace-nowrap
`)
