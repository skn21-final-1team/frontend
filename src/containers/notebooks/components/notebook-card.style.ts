import { cva } from 'class-variance-authority'

export const card = cva(`
  flex
  flex-col
  justify-between
  w-full
  h-40
  p-4
  bg-card
  border
  border-border
  rounded-xl
  shadow-sm
  hover:shadow-md
  hover:border-primary/50
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
  items-start
`)

export const icon = cva(`
  opacity-70
  group-hover:opacity-100
  transition-opacity
  duration-200
`)

export const menuButton = cva(`
  flex
  items-center
  justify-center
  w-7
  h-7
  rounded-md
  text-muted-foreground
  hover:bg-muted
  hover:text-foreground
  transition-colors
  opacity-0
  group-hover:opacity-100
`)

export const titleArea = cva(`
  w-full
  mt-2
`)

export const title = cva(`
  text-base
  font-medium
  text-card-foreground
  line-clamp-2
  break-keep
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

export const actionGroup = cva(`
  flex
  items-center
  gap-1
`)

export const pinButton = cva(`
  flex
  items-center
  justify-center
  w-7
  h-7
  rounded-md
  transition-colors
`, {
  variants: {
    pinned: {
      true: `text-primary opacity-100`,
      false: `text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted hover:text-foreground`,
    },
  },
  defaultVariants: { pinned: false },
})

export const pinIconFilled = cva(`
  fill-current
`)

export const deleteItem = cva(`
  text-destructive
  focus:text-destructive
  focus:bg-destructive/10
`)
