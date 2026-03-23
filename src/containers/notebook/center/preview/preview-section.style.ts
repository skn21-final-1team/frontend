import { cva } from 'class-variance-authority'

export const section = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-hidden
`)

export const tabsRoot = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-hidden
`)

export const header = cva(`
  flex
  items-center
  gap-3
  px-6
  pt-4
`)

export const tabsList = cva(`
  gap-1
`)

export const copyButton = cva(`
  ml-auto
`)

export const inner = cva(`
  flex
  h-full
  min-h-0
  flex-col
  overflow-hidden
  p-6
  pt-4
`)

export const content = cva(`
  flex
  mt-0
  h-full
  min-h-0
  overflow-auto
`)

export const codeBlock = cva(`
  w-full
  h-full
  rounded-md
  bg-muted/30
  p-4
  font-mono
  text-sm
  leading-6
  whitespace-pre
  overflow-auto
`)

export const empty = cva(`
  flex
  h-full
  items-center
  justify-center
  text-sm
  text-muted-foreground
`)
