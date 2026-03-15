import { cva } from 'class-variance-authority'

export const card = cva(`
  flex
  flex-col
  gap-3
  w-full
  p-5
  bg-card
  border
  border-border
  rounded-2xl
  shadow-sm
  hover:shadow-md
  hover:border-primary/40
  transition-all
  duration-200
  cursor-pointer
  group
  relative
`)

export const topRow = cva(`
  flex
  w-full
  justify-between
  items-center
`)

export const actionGroup = cva(`
  flex
  items-center
  gap-0.5
`)

export const menuButton = cva(`
  flex
  items-center
  justify-center
  w-6
  h-6
  rounded-md
  text-muted-foreground
  hover:bg-muted
  hover:text-foreground
  transition-colors
`)

export const pinButton = cva(
  `
  flex
  items-center
  justify-center
  w-6
  h-6
  rounded-md
  transition-colors
`,
  {
    variants: {
      pinned: {
        true: `text-primary opacity-100`,
        false: `text-muted-foreground hover:bg-muted hover:text-foreground`,
      },
    },
    defaultVariants: { pinned: false },
  },
)

export const pinIconFilled = cva(`fill-current`)

export const titleArea = cva(`flex-1`)

export const title = cva(`
  text-base
  font-semibold
  text-card-foreground
  line-clamp-2
  break-keep
  leading-snug
`)

export const renameInput = cva(`
  w-full
  px-2
  py-1
  text-sm
  rounded-md
  border
  border-primary
  bg-background
  focus:outline-none
  focus:ring-1
  focus:ring-primary
`)

export const footer = cva(`
  flex
  items-center
  justify-between
  pt-3
  border-t
  border-border
`)

export const date = cva(`
  text-xs
  text-muted-foreground
`)

export const pinnedBadge = cva(`
  text-xs
  font-medium
  text-primary
  bg-primary/10
  px-2
  py-0.5
  rounded-full
`)
