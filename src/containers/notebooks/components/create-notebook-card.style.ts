import { cva } from 'class-variance-authority'

export const card = cva(`
  flex
  flex-col
  w-full
  overflow-hidden
  rounded-2xl
  border
  border-border
  bg-card
  shadow-sm
  hover:shadow-md
  hover:border-primary/50
  transition-all
  duration-200
  cursor-pointer
  group
`)

export const media = cva(`
  relative
  w-full
  overflow-hidden
  aspect-16/10
  bg-[linear-gradient(135deg,hsl(var(--primary)/0.22),hsl(var(--muted)))]
`)

export const mediaOverlay = cva(`
  absolute
  inset-0
  bg-foreground/40
`)

export const mediaInner = cva(`
  absolute
  inset-0
  flex
  items-center
  justify-center
`)

export const inputWrapper = cva(`
  flex
  flex-col
  items-start
  justify-center
  gap-2
  w-full
`)

export const input = cva(`
  w-full
  rounded-md
  border
  border-primary
  bg-background
  px-3
  py-1.5
  text-sm
  text-foreground
  placeholder:text-muted-foreground
  focus:outline-none
  focus:ring-1
  focus:ring-primary
`)

export const hint = cva(`
  text-xs
  text-muted-foreground
`)

export const plusIcon = cva(`
  text-white/85
  group-hover:text-white
  transition-colors
  duration-150
`)

export const overlayLabelArea = cva(`
  absolute
  inset-x-0
  bottom-0
  z-10
  flex
  items-end
  bg-linear-to-t
  from-black/70
  via-black/30
  to-transparent
  px-4
  pb-14
  pt-10
`)

export const label = cva(`
  text-xl
  font-bold
  text-white
  transition-colors
  duration-150
`)
