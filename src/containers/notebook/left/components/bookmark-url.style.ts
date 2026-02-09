import { cva } from 'class-variance-authority'

export const tagList = cva(`
  flex
  flex-wrap
  gap-1.5
  w-full
  justify-start
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

export const fileRow = cva(`
  flex
  items-center
  gap-2
`)

export const file = cva(`
  w-full
  cursor-pointer
`)

export const fileLeft = cva(`
  flex
  items-center
  gap-2
  text-foreground
`)

export const fileInfo = cva(`
  w-full
  flex
  items-center
  justify-between
`)
