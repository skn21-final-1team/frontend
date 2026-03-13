import { cva } from 'class-variance-authority'

export const content = cva(`
  flex-1
  min-w-0
  flex
  flex-col
`)

export const fileRow = cva(`
  gap-2
  items-center
  flex
  justify-between
  w-full
  group
`)

export const file = cva(`
  cursor-pointer
  truncate
  [&_img]:shrink-0
`)

export const fileInfo = cva(`
  flex
  truncate
`)

export const title = cva(`
  truncate
  text-left
  text-foreground
`)

export const editInput = cva(`
  w-full
  bg-transparent
  border-none
  outline-none
  text-sm
  text-foreground
`)
