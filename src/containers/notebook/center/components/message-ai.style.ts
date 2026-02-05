import { cva } from 'class-variance-authority'

export const container = cva(`
  flex
  justify-start
  mb-4
`)

export const bubble = cva(`
  max-w-[70%]
  bg-muted
  text-foreground
  rounded-lg
  px-4
  py-2
  shadow-sm
`)

export const content = cva(`
  text-sm
  whitespace-pre-wrap
  break-words
`)

export const timestamp = cva(`
  text-xs
  mt-1
  text-muted-foreground
  text-left
`)

export const loadingDots = cva(`
  flex
  gap-1
  items-center
`)

export const dot = cva(`
  w-2
  h-2
  bg-muted-foreground
  rounded-full
  animate-bounce
`)
