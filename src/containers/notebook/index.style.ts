import { cva } from 'class-variance-authority'

export const container = cva(`
  h-[calc(100vh-64px)]
  w-full
  overflow-hidden
  bg-background
  px-2
`)
