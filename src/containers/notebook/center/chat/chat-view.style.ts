import { cva } from 'class-variance-authority'

export const inner = cva(`
  h-full
  flex
  flex-col
  rounded-2xl
  bg-card
  border
  border-border
  p-4
  gap-4
`)

export const messages = cva(`
  flex-1
  overflow-y-auto
  flex
  flex-col
  py-2
`)

export const inputWrapper = cva(`
  shrink-0
  bg-card
`)

export const workflowBanner = cva(`
  rounded-2xl
  border
  border-red-300
  bg-red-50
  px-4
  py-3
  text-xs
  leading-relaxed
  text-red-700
  dark:border-red-900
  dark:bg-red-950/50
  dark:text-red-300
`)

export const section = cva(`
  h-full
  gap-4
  overflow-hidden
  px-2
  py-4
`)
