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
  overflow-y-auto
`)
