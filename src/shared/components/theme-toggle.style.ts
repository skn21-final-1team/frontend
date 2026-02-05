import { cva } from 'class-variance-authority'

export const button = cva(`
  inline-flex
  items-center
  justify-center
  rounded-md
  p-2
  hover:bg-accent
  transition-colors
`)
