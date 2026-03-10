import { cva } from 'class-variance-authority'

export const container = cva(`
  relative
`)

export const toolbar = cva(`
  absolute
  top-2
  left-2
  z-10
`)

export const textarea = cva(`
  pr-20
  pt-10
  pb-12
`)

export const button = cva(`
  absolute
  bottom-2
  right-2
`)
