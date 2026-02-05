import { cva } from 'class-variance-authority'

export const section = cva(`
  h-full
  gap-4
  overflow-hidden
  px-2
  py-4
`)
export const inner = cva(`
  h-full
  px-4
  py-8
  pb-4
  rounded-2xl
  bg-card
  border
  border-border
`)
