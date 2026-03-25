import { cva } from 'class-variance-authority'

export const fileRow = cva(`
  gap-2
  items-center
  flex
  justify-between
  w-full
  min-h-[28px]
  group
`, {
  variants: {
    status: {
      default: '',
      failed: 'bg-[#ffefef] dark:bg-[#4a1a1f] rounded pr-1',
    },
  },
  defaultVariants: { status: 'default' },
})

export const fileInfo = cva(`
  flex
  items-center
  gap-1
  truncate
`)

export const faviconButton = cva(`
  shrink-0
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
  cursor-pointer
  hover:text-primary
  focus-visible:outline-none
`)

export const editInput = cva(`
  w-full
  bg-transparent
  border-none
  outline-none
  text-sm
  text-foreground
`)

export const popoverContent = cva(`
  w-72
  p-0
  border-border
`)

export const summaryText = cva(`
  text-xs
  text-muted-foreground
  leading-relaxed
  whitespace-normal
  break-words
  p-3
`)

export const failedText = cva(`
  text-sm
  text-red-500
  dark:text-red-600
  whitespace-nowrap
`)
