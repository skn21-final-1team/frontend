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
