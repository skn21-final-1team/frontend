import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  flex-col
  h-full
  overflow-hidden
  px-2
  py-4
`)

export const inner = cva(`
  flex
  flex-col
  h-full
  px-4
  py-4
  rounded-2xl
  bg-card
  border
  border-border
  overflow-hidden
`)

export const scrollArea = cva(`
  flex-1
  min-h-0
  flex
  flex-col
  gap-4
`)

export const studioSection = cva(`
  flex-shrink-0
`)

export const generatedSection = cva(`
  flex-1
  min-h-0
  flex
  flex-col
`)

export const generatingBanner = cva(`
  flex
  items-center
  justify-between
  px-3
  py-2
  rounded-lg
  bg-muted/60
  border
  border-border/50
  text-sm
`)

export const generatingInfo = cva(`
  flex
  items-center
  gap-2
  text-muted-foreground
`)

export const generatingSpinner = cva(`
  animate-spin
`)

export const cancelButton = cva(`
  p-1
  hover:bg-muted
  rounded
  transition-colors
  text-muted-foreground
`)
