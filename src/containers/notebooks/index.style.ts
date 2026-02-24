import { cva } from 'class-variance-authority'

export const page = cva(`
  min-h-screen
  bg-background
  px-8
  py-10
`)

export const header = cva(`
  flex
  items-center
  justify-between
  mb-8
`)

export const title = cva(`
  text-2xl
  font-bold
  text-foreground
`)

export const grid = cva(`
  grid
  grid-cols-1
  gap-4
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
`)

export const loadingState = cva(`
  col-span-full
  flex
  items-center
  justify-center
  py-24
  text-muted-foreground
  text-sm
`)
