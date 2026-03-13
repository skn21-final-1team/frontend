import { cva } from 'class-variance-authority'

export const container = cva(`
  flex
  justify-start
  mb-4
`)

export const bubble = cva(`
  max-w-[80%]
  bg-muted
  text-foreground
  rounded-lg
  p-3
`)

export const content = cva(`
  prose
  prose-invert
  max-w-none
  text-sm
  whitespace-pre-wrap
  wrap-break-word
  [&_h3]:mt-0 [&_h3]:font-bold
  [&_h2]:mt-0 [&_h2]:font-bold
  [&_h1]:mt-0 [&_h1]:font-bold
  [&_ul]:list-disc [&_ul]:whitespace-normal
  [&_ul]:list-inside
  [&_ul]:pl-2
  [&_ol]:list-decimal
  [&_ol]:list-inside
  [&_ol]:pl-2
`)

export const timestamp = cva(`
  text-xs
  mt-1
  text-muted-foreground
  text-left
`)

export const loadingDots = cva(`
  flex
  gap-1
  items-center
  [&>span]:ml-2 
  [&>span]:text-sm
`)

export const dot = cva(`
  w-2
  h-2
  bg-muted-foreground
  rounded-full
  animate-bounce
`)
