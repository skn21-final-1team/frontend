import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  relative
  flex
  min-h-screen
  items-center
  justify-center
  bg-background
  p-4
`)

export const card = cva(`
  w-full
  max-w-md
`)

export const cardHeader = cva(`
  flex
  flex-row
  items-center
  justify-between
  space-y-0
`)

export const headerLeft = cva(`
  flex
  flex-col
  gap-1.5
`)

export const loginLink = cva(`
  px-0
  h-auto
`)

export const formContent = cva(`
  flex
  flex-col
  gap-6
`)

export const inputGroup = cva(`
  grid
  gap-2
`)

export const passwordInputWrapper = cva(`
  relative
`)

export const showPasswordButton = cva(`
  absolute
  right-0
  top-0
  h-full
  w-9
  px-3
  py-2
  hover:bg-transparent
  text-muted-foreground
`)

export const eyeIcon = cva(`
  h-4
  w-4
`)

export const cardFooter = cva(`
  flex-col
  gap-2
`)

export const submitButton = cva(`
  w-full
`)

export const googleButton = cva(`
  w-full
`)

export const googleIcon = cva(`
  mr-2
  h-4
  w-4
`)
