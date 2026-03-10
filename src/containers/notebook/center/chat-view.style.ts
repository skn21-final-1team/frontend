import { cva } from 'class-variance-authority'

export const inner = cva(`
  h-full
  flex
  flex-col
  rounded-2xl
  bg-card
  border
  border-border
`)

export const messages = cva(`
  flex-1
  overflow-y-auto
  flex
  flex-col
  px-4
  pt-8
  pb-4
`)

export const inputWrapper = cva(`
  shrink-0
  px-4
  pb-4
  bg-card
`)

export const section = cva(`
  h-full
  gap-4
  overflow-hidden
  px-2
  py-4
`)
