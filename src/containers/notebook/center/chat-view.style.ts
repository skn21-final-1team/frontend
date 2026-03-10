import { cva } from 'class-variance-authority'

export const inner = cva(`
  h-full
  overflow-y-auto
  px-4
  py-8
  pb-4
  rounded-2xl
  bg-card
  border
  border-border
`)

export const messages = cva(`
  min-h-full
  flex
  flex-col
  justify-end
`)

export const inputWrapper = cva(`
  sticky
  bottom-0
  pt-4
  bg-card
`)

export const section = cva(`
  h-full
  gap-4
  overflow-hidden
  px-2
  py-4
`)
