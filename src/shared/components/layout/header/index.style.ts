import { cva } from 'class-variance-authority'

export const header = cva(`
  fixed
  top-0
  z-50
  w-full
  bg-background
  pt-2
`)

export const container = cva(`
  flex
  h-14
  items-center
  justify-between
  px-4
  md:px-8
`)

export const leftSection = cva(`
  flex
  items-center
  gap-2
  font-semibold
  [&_span]:text-3xl
`)

export const rightSection = cva(`
  flex
  items-center
  gap-4
`)

export const userInfo = cva(`
  flex
  items-center
  gap-2
  text-sm
  font-medium
`)

export const avatar = cva(`
  h-8
  w-8
  rounded-full
  bg-primary/30
  flex
  items-center
  justify-center
  text-sm
  text-primary
  font-bold
`)
