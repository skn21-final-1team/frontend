import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex-1
  flex
  flex-col
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
  font-semibold
  text-sm
`)

export const content = cva(`
  flex-1
  flex
  flex-col
  gap-4
  overflow-y-auto
`)

export const sourceBox = cva(`
  bg-muted/50
  rounded-lg
  p-3
`)

export const sourceTitle = cva(`
  text-xs
  font-medium
  text-muted-foreground
  mb-2
`)

export const sourceList = cva(`
  space-y-1
`)

export const sourceItem = cva(`
  text-xs
  truncate
  flex
  items-center
  gap-2
`)

export const sourceDot = cva(`
  w-1
  h-1
  rounded-full
  bg-primary
  flex-shrink-0
`)

export const sourceEmpty = cva(`
  text-xs
  text-muted-foreground/70
`)

export const placeholder = cva(`
  flex-1
  flex
  items-center
  justify-center
  text-muted-foreground
  text-sm
  border-2
  border-dashed
  border-muted
  rounded-lg
  m-2
`)

export const spacer = cva('flex-1')

export const generateButton = cva('w-full mt-4')

export const icon = cva('mr-2 h-4 w-4')
