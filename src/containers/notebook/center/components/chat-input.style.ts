import { cva } from 'class-variance-authority'

export const container = cva(`
  flex
  flex-col
  w-full
  rounded-md
  border
  border-input
  bg-transparent
  shadow-sm
  focus-within:ring-1
  focus-within:ring-ring
`)

export const textarea = cva(`
  w-full
  min-h-[60px]
  resize-none
  bg-transparent
  px-3
  py-2
  text-base
  md:text-sm
  placeholder:text-muted-foreground
  focus:outline-none
  border-none
`)

export const bottomBar = cva(`
  flex
  items-center
  justify-end
  gap-2
  px-2
  pb-2
`)

export const button = cva(`
  size-8
`)

export const buttonIcon = cva(``, {
  variants: {
    size: {
      sm: 'size-3',
      m: 'size-4',
    },
  },
})
