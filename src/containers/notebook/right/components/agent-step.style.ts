import { cva } from 'class-variance-authority'

export const container = cva(
  `
  rounded-2xl
  border-border
  transition-colors
  duration-200
`,
  {
    variants: {
      status: {
        working: 'flex flex-1 min-h-0 flex-col overflow-hidden bg-blue-50/60 dark:bg-blue-950/60',
        pending: 'bg-muted',
        completed: 'bg-green-50/60 dark:bg-green-950/60',
      },
    },
  },
)

export const header = cva(`
  flex
  items-center
  gap-2
  px-3
  py-3
  select-none
`)

export const titleDot = cva(`w-2 h-2 rounded-full shrink-0`, {
  variants: {
    status: {
      working: 'bg-blue-500',
      pending: 'bg-muted-foreground/40',
      completed: 'bg-green-500',
    },
  },
})

export const statusBadge = cva(`flex gap-1 text-xs font-medium rounded-full`, {
  variants: {
    status: {
      working: 'border-blue-400/60  text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
      pending: 'border-border bg-muted text-muted-foreground',
      completed:
        'border-green-400/60 bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
    },
  },
})

export const title = cva(`flex-1 text-xs font-medium`, {
  variants: {
    status: {
      working: 'text-blue-700 dark:text-blue-300',
      pending: 'text-muted-foreground',
      completed: 'text-green-700 dark:text-green-300',
    },
  },
})

export const content = cva(`
  flex-1
  min-h-0
  px-3
  overflow-hidden
  leading-relaxed
`)

export const contentInner = cva(`
  h-full
  overflow-y-auto
  px-3
  pt-2
  pb-3
  text-xs
`)
