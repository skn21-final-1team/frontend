import { cva } from 'class-variance-authority'

export const folderList = cva(`
  flex-1
  overflow-y-auto
  min-h-0
  space-y-1
  pr-2
`)

export const fileLeft = cva(`
  flex
  items-center
  gap-2
`)

export const subList = cva(`
  style-lyra:ml-4
  mt-1
  ml-5
`)

export const subFolder = cva(`
  flex
  flex-col
  gap-1
`)

export const chevron = cva(`
  transition-transform
  group-data-[state=open]:rotate-90
`)

export const folderRow = cva(`
  flex
  items-center
  gap-2
`)

export const folder = cva(`
  group
  hover:bg-accent
  hover:text-accent-foreground
  w-full
  justify-between
  transition-none
`)
