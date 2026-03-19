import { cva } from 'class-variance-authority'

export const card = cva(`
  flex
  flex-col
  w-full
  overflow-hidden
  rounded-2xl
  border
  border-dashed
  border-muted-foreground/30
  hover:border-primary/50
  bg-transparent
  transition-all
  duration-200
  cursor-pointer
  group
`)

export const media = cva(`
  relative
  w-full
  overflow-hidden
  aspect-16/10
`)

export const mediaInner = cva(`
  absolute
  inset-0
  flex
  items-center
  justify-center
`)

export const inputWrapper = cva(`
  flex
  flex-col
  items-start
  justify-center
  gap-2
  w-full
  px-4
`)

export const input = cva(`
  w-full
  bg-transparent
  border-none
  border-b-2
  border-b-border
  text-xl
  font-semibold
  text-foreground
  placeholder:text-muted-foreground
  overflow-hidden
  whitespace-pre-wrap
  break-keep
  leading-snug
  focus:outline-none
  focus:border-b-primary/60
  focus:ring-0
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
