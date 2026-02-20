import { cva } from 'class-variance-authority'

export const wrapper = cva(
  `
  w-full
  rounded-lg
  border
  p-4
  transition-all
  `,
  {
    variants: {
      state: {
        default: `
          border-border
          bg-background
          hover:bg-muted
          cursor-pointer
        `,
        correct: `
          border-green-500
          bg-green-50
          cursor-default
        `,
        wrong: `
          border-red-400
          bg-red-50
          cursor-default
        `,
        disabled: `
          border-border
          bg-background
          opacity-40
          cursor-default
        `,
      },
    },
    defaultVariants: { state: 'default' },
  },
)

export const topRow = cva(`
  flex
  items-center
  gap-2
`)

export const optionLabel = cva(`
  text-sm
  font-semibold
  text-foreground
`)

export const optionText = cva(`
  flex-1
  text-sm
  text-foreground
`)

export const badge = cva(
  `
  text-xs
  font-bold
  `,
  {
    variants: {
      type: {
        correct: `text-green-600`,
        wrong: `text-red-500`,
      },
    },
  },
)

export const hint = cva(`
  mt-2
  text-xs
  text-muted-foreground
`)