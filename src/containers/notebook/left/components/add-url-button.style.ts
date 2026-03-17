import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  group
  flex
  items-center
  justify-center
  gap-2
  w-full
  px-3
  py-2.5
  mt-auto
  rounded-md
  border
  border-dashed
  text-sm
  transition-all
  duration-200
  border-primary/50
  hover:bg-primary/5
  text-primary
  cursor-pointer
`)

export const icon = cva(`
  h-4
  w-4
  transition-transform
  duration-200
  group-hover:scale-110
`)

export const inputWrapper = cva(`
  flex
  flex-col
  gap-2
`)

export const errorText = cva(`
  text-sm
  text-destructive
`)

export const spinner = cva(`
  h-4
  w-4
  animate-spin
`)

