import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex
  flex-col
  gap-2
`)

export const header = cva(`
  flex
  items-center
  justify-between
  px-1
  pb-2
  mb-1
  border-b
  border-border
`)

export const title = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-wider
  text-muted-foreground
`)
