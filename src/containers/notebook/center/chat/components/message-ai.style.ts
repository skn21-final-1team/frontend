import { cva } from 'class-variance-authority'

export const container = cva(`
  flex
  justify-start
  mb-4
`)

export const bubble = cva(`
  max-w-[80%]
  bg-muted
  text-foreground
  rounded-lg
  p-3
`)

export const loadingDots = cva(`
  flex
  gap-1
  items-center
  [&>span]:ml-2
  [&>span]:text-sm
`)

export const dot = cva(
  `
  w-2
  h-2
  bg-muted-foreground
  rounded-full
  animate-bounce
`,
  {
    variants: {
      delay: {
        0: '[animation-delay:0ms]',
        150: '[animation-delay:150ms]',
        300: '[animation-delay:300ms]',
      },
    },
    defaultVariants: { delay: 0 },
  },
)

export const abortedText = cva(`
  text-sm
  italic
`)

export const streamingText = cva(`
  whitespace-pre-wrap
  break-words
  text-[13px]
  leading-6
`)

export const popoverContent = cva(`
  p-0
  w-72
`)

export const popoverInner = cva(`
  flex
  flex-col
  gap-2
  p-3
  max-w-xs
`)

export const popoverTitle = cva(`
  text-xs
  font-semibold
  text-foreground
  truncate
`)

export const popoverChunk = cva(`
  text-xs
  text-muted-foreground
  leading-relaxed
  line-clamp-5
`)

export const popoverLink = cva(`
  text-xs
  text-primary
  hover:underline
  truncate
`)

export const sourceList = cva(`
  flex
  flex-wrap
  gap-2
  mt-3
  pt-3
  border-t
  border-border
`)

export const sourceIndex = cva(`
  inline-flex
  items-center
  justify-center
  w-5
  h-5
  text-[11px]
  font-semibold
  rounded-full
  bg-primary/15
  text-primary
  cursor-pointer
  hover:bg-primary/30
  transition-colors
`)
