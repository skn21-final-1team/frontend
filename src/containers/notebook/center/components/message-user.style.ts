import { cva } from 'class-variance-authority'

export const container = cva(`
  flex
  justify-end
  mb-4
`)

export const bubble = cva(`
  max-w-[70%]
  bg-primary
  text-primary-foreground
  rounded-lg
  px-4
  py-2
`)

export const content = cva(`
  text-sm
  whitespace-pre-wrap
  wrap-break-word
`)

export const timestamp = cva(`
  text-xs
  mt-1
  opacity-80
  text-right
`)
