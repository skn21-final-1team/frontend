import { cva } from 'class-variance-authority'

export const wrapper = cva(`
  flex-1
  flex
  flex-col
  overflow-hidden
`)

export const header = cva(`
  flex
  items-center
  gap-2
  mb-4
  pb-2
  border-b
  border-border/50
`)

export const backButton = cva(`
  p-1.5
  hover:bg-muted
  rounded-full
  transition-colors
`)

export const headerTitle = cva(`
  flex-1
  font-semibold
  text-sm
`)

export const title = cva(`
  text-base
  font-semibold
  mb-6
`)

export const card = cva(`
  flex
  items-center
  gap-8
  bg-muted/50
  rounded-xl
  p-5
  mb-4
`)

export const circleContainer = cva(`
  relative
  flex
  items-center
  justify-center
  shrink-0
`)

export const circleLabel = cva(`
  absolute
  flex
  flex-col
  items-center
  justify-center
  text-center
`)

export const scoreText = cva(`
  text-lg
  font-bold
  leading-tight
`)

export const percentText = cva(`
  text-xs
  text-muted-foreground
`)

export const statsGrid = cva(`
  flex
  flex-col
  gap-3
  flex-1
`)

export const statRow = cva(`
  flex
  items-center
  justify-between
`)

export const statLabel = cva(`
  text-sm
  text-muted-foreground
`)

export const statValue = cva(`
  text-sm
  font-semibold
`, {
  variants: {
    type: {
      correct: 'text-green-500',
      wrong: 'text-foreground',
      skipped: 'text-foreground',
    },
  },
})

export const footer = cva(`
  flex
  items-center
  justify-end
  gap-2
  pt-4
  mt-auto
  border-t
  border-border/50
`)

export const retryButton = cva(`
  text-xs
  font-medium
  border
  border-border
  rounded
  px-4
  py-1.5
  hover:bg-muted
  transition-colors
`)

export const bgCircle = cva(`
  text-muted
  fill-none
  stroke-current
  stroke-[8px]
`)

export const fgCircle = cva(`
  text-foreground
  fill-none
  stroke-current
  stroke-[8px]
  transition-all
  duration-700
  -rotate-90
  origin-center
`)
