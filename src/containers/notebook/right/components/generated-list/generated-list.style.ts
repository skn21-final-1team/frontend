import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex-1
  min-h-0
  flex
  flex-col
  pt-4
  border-t
  border-border/50
`)

export const title = cva(`
  text-xs
  font-medium
  text-muted-foreground
  mb-2
  px-1
  flex-shrink-0
`)

export const list = cva(`
  flex-1
  min-h-0
  overflow-y-auto
  space-y-2
`)

export const item = cva(`
  flex
  items-center
  gap-3
  p-2
  rounded-lg
  hover:bg-muted/50
  cursor-pointer
  transition-colors
`)

export const icon = cva(`
  w-8
  h-8
  rounded-lg
  bg-muted
  flex
  items-center
  justify-center
  text-xs
`)

export const content = cva(`
  flex-1
  min-w-0
`)

export const itemTitle = cva(`
  text-sm
  font-medium
  truncate
`)

export const itemSubtitle = cva(`
  text-xs
  text-muted-foreground
`)
