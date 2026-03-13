import { cva } from 'class-variance-authority'

export const container = cva(`
  h-full
  w-full
  overflow-hidden
  bg-background
  px-2
`)

export const spinnerWrapper = cva(`flex items-center justify-center h-full`)
export const spinner = cva(`size-6`)
