import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  h-full
  min-h-0
  flex-col
  gap-3
`)

export const header = cva(`
  flex
  shrink-0
  items-center
  justify-end
  px-2
  pt-4
`)

export const content = cva(`
  flex
  h-full
  min-h-0
  flex-1
  flex-col
  overflow-hidden
`)
