import { cva } from 'class-variance-authority'

export const section = cva(`
  h-full
  flex
  flex-col
  overflow-hidden
  px-2
  py-4
`)

export const inner = cva(`
  flex
  flex-col
  h-full
  gap-1
  px-4
  py-4
  rounded-2xl
  bg-card
  border
  border-border
  overflow-hidden
`)

export const header = cva(`
  flex
  items-center
  justify-between
  px-2
  pb-3
  mb-2
  border-b
  border-border
  flex-shrink-0
`)

export const headerTitle = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-wider
  text-muted-foreground
`)

export const searchWrapper = cva(`
  px-2
  mb-3
  flex-shrink-0
`)

export const searchInput = cva(`
  w-full
  px-3
  py-2
  text-sm
  rounded-lg
  border
  border-border
  bg-background
  text-foreground
  placeholder:text-muted-foreground
  focus:outline-none
  focus:ring-2
  focus:ring-primary/50
  transition-all
  duration-200
`)

export const folderList = cva(`
  flex-1
  overflow-y-auto
  min-h-0
  space-y-1
  pr-2
`)
