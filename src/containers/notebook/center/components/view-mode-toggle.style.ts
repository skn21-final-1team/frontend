import { cva } from 'class-variance-authority'

export const group = cva(`
  inline-flex
  items-center
  rounded-xl
  gap-2
`)

export const TabButton = cva(
  `
  data-[state=on]:bg-primary
  data-[state=on]:text-primary-foreground
  data-[state=on]:shadow-sm
  rounded-bl-none
  rounded-br-none
  
  outline-none
  bg-primary
  hover:bg-primary/80
`,
  {
    variants: {
      isActive: {
        true: '',
        false: `
          text-foreground/60
          hover:text-foreground
          bg-muted-foreground/40
          hover:bg-muted-foreground/30
        `,
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)
