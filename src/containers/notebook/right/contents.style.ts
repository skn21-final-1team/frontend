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
  overflow-hidden
`)

export const scrollArea = cva(`
  flex-1
  min-h-0
  flex
  flex-col
  gap-4
`)

export const studioSection = cva(`
  flex-shrink-0
`)

export const generatedSection = cva(`
  flex-1
  min-h-0
  flex
  flex-col
`)
