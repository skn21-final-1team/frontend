import { cva } from 'class-variance-authority'

export const page = cva(`
  h-full
  bg-background
  px-8
  py-10
`)

export const header = cva(`
  flex
  items-center
  justify-between
  mb-8
`)

export const title = cva(`
  text-2xl
  font-bold
  text-foreground
`)

export const section = cva(`
  mb-8
`)

export const sectionHeader = cva(`
  flex
  items-center
  justify-between
  mb-4
`)

export const sectionTitle = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-wider
  text-muted-foreground
`)

export const grid = cva(`
  grid
  grid-cols-1
  gap-4
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-5
`)

export const pinnedContent = cva(`
  min-h-44
`)

export const emptyState = cva(`
  h-44
  flex
  items-center
  justify-center
  text-base
  font-medium
  text-muted-foreground
`)

export const loadingState = cva(`
  col-span-full
  flex
  items-center
  justify-center
  py-24
  text-muted-foreground
  text-sm
`)
