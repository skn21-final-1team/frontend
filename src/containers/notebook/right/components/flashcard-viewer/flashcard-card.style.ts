import { cva } from 'class-variance-authority'

export const cardOuter = cva(`
  relative
  w-full
  max-w-[280px]
  h-[340px]
  cursor-pointer
  [perspective:800px]
`)

export const cardInner = cva(`
  relative
  w-full
  h-full
  transition-transform
  duration-500
  [transform-style:preserve-3d]
`)

export const cardInnerFlipped = cva(`
  [transform:rotateY(180deg)]
`)

export const face = cva(`
  absolute
  inset-0
  flex
  flex-col
  items-center
  justify-center
  rounded-2xl
  px-6
  py-5
  [backface-visibility:hidden]
`)

export const front = cva(`
  bg-secondary
  text-secondary-foreground
  dark:bg-[#2a2a2a]
  dark:text-white
`)

export const back = cva(`
  bg-primary/10
  text-foreground
  dark:bg-primary/20
  dark:text-white
  [transform:rotateY(180deg)]
`)

export const questionText = cva(`
  text-sm
  font-semibold
  text-center
  leading-relaxed
  flex-1
  flex
  items-center
  overflow-y-auto
  w-full
  justify-center
`)

export const answerText = cva(`
  text-sm
  font-semibold
  text-center
  leading-relaxed
  flex-1
  flex
  items-center
  overflow-y-auto
  w-full
  justify-center
`)

export const deleteButton = cva(`
  absolute
  top-3
  right-3
  p-1.5
  rounded-md
  opacity-50
  hover:opacity-100
  hover:bg-black/10
  dark:hover:bg-white/10
  transition-colors
  z-10
`)

export const flipHint = cva(`
  text-sm
  opacity-40
  mt-auto
`)

export const explainButton = cva(`
  flex
  items-center
  gap-1.5
  text-sm
  opacity-60
  hover:opacity-100
  mt-auto
  px-3
  py-1.5
  rounded-md
  hover:bg-black/10
  dark:hover:bg-white/10
  transition-colors
`)
