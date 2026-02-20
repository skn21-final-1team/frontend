import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex
  flex-col
  gap-3
`)

export const orderText = cva(`
  text-xs
  text-muted-foreground
`)

export const questionText = cva(`
  text-sm
  font-medium
  text-foreground
  leading-relaxed
`)

export const optionList = cva(`
  flex
  flex-col
  gap-2
  mt-2
`)