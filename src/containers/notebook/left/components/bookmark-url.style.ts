import { cva } from 'class-variance-authority'

export const fileRow = cva(`
  gap-2
  items-center
  flex
  justify-between
  w-full
  group
`)

export const fileInfo = cva(`
  flex
  items-center
  gap-1
  truncate
`)

export const faviconButton = cva(`
  flex-shrink-0
  p-0.5
  rounded
  cursor-pointer
  hover:bg-muted
  transition-colors
`)

export const titleButton = cva(`
  truncate
  text-left
  text-sm
  text-foreground
  bg-transparent
  border-none
  p-0
  transition-colors
`, {
  variants: {
    clickable: {
      true: 'cursor-pointer hover:text-primary',
      false: 'cursor-default',
    },
  },
  defaultVariants: {
    clickable: false,
  },
})

export const editInput = cva(`
  w-full
  bg-transparent
  border-none
  outline-none
  text-sm
  text-foreground
`)

export const summary = cva(`
  text-xs
  text-muted-foreground
  leading-relaxed
  pl-6
  pr-2
  pb-2
`)
