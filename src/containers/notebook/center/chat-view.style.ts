import { cva } from 'class-variance-authority'

export const inner = cva(`
  h-full
  grid
  grid-rows-[1fr_auto]
  px-4
  py-8
  pb-4
  rounded-2xl
  bg-card
  border
  border-border
`)

export const messages = cva(`
  h-full
  overflow-y-auto
`)

export const section = cva(`
  h-full
  gap-4
  overflow-hidden
  px-2
  py-4
`)
