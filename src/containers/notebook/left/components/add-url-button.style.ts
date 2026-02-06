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
  border-border/60
  text-sm
  text-muted-foreground
  transition-all
  duration-200
  hover:border-primary/50
  hover:bg-primary/5
  hover:text-primary
  cursor-pointer
`)

export const icon = cva(`
  h-4
  w-4
  transition-transform
  duration-200
  group-hover:scale-110
`)
