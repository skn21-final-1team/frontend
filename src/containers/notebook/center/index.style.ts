import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  h-full
  min-h-0
  flex-col
  px-2
  py-4
`)

export const header = cva(`
  flex
  shrink-0
  items-center
  justify-end
  border-b
  border-border
  px-4
  py-3
`)

export const content = cva(`
  flex
  h-full
  min-h-0
  flex-1
  flex-col
  overflow-hidden
  rounded-2xl
  border
  border-border
  bg-card
`)
