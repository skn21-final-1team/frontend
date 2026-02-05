import { cva } from 'class-variance-authority'

export const container = cva(`
  h-[calc(100vh-3.5rem)]
  w-full
  overflow-hidden
  bg-background
  px-2
`)

export const panelContent = cva(`
  h-full
  overflow-y-auto
  p-4
`)

export const handle = cva(`
  w-1
  bg-border
  hover:bg-primary/50
  transition-colors
`)
