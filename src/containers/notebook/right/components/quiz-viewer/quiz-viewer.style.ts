import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex-1
  flex
  flex-col
  overflow-hidden
`)

export const header = cva(`
  flex
  items-center
  gap-2
  mb-4
  pb-2
  border-b
  border-border/50
`)

export const backButton = cva(`
  p-1.5
  hover:bg-muted
  rounded-full
  transition-colors
`)

export const title = cva(`
  flex-1
  font-semibold
  text-sm
`)

export const sourceCount = cva(`
  text-xs
  text-muted-foreground
`)

export const content = cva(`
  flex-1
  overflow-y-auto
  flex
  flex-col
  gap-4
`)

export const progressRow = cva(`
  flex
  items-center
  justify-between
  mb-2
`)

export const progressText = cva(`
  text-xs
  text-muted-foreground
`)

export const footer = cva(`
  flex
  items-center
  justify-between
  pt-4
  mt-2
  border-t
  border-border/50
`)

export const footerLeft = cva(`
  flex
  items-center
  gap-2
`)

export const footerRight = cva(`
  flex
  items-center
  gap-2
`)

export const explainButton = cva(`
  flex
  items-center
  gap-1.5
  text-xs
  text-muted-foreground
  border
  border-border
  rounded
  px-3
  py-1.5
  hover:bg-muted
  transition-colors
  disabled:opacity-40
  disabled:cursor-not-allowed
`)

export const prevButton = cva(`
  text-xs
  font-medium
  border
  border-border
  rounded
  px-4
  py-1.5
  hover:bg-muted
  transition-colors
  disabled:opacity-40
  disabled:cursor-not-allowed
`)

export const nextButton = cva(`
  text-xs
  font-medium
  bg-primary
  text-primary-foreground
  rounded
  px-4
  py-1.5
  hover:opacity-90
  transition-opacity
`)