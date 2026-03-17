import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  flex-col
  h-full
  min-h-0
  overflow-hidden
  px-2
  py-4
`)

export const inner = cva(`
  flex
  flex-col
  h-full
  min-h-0
  px-4
  py-4
  rounded-2xl
  bg-card
  border
  border-border
  overflow-hidden
`)
