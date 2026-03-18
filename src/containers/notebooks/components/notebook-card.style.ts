import { cva } from 'class-variance-authority'

export const card = cva(`
  flex
  flex-col
  w-full
  overflow-hidden
  bg-card
  border
  border-border
  rounded-2xl
  shadow-sm
  hover:shadow-md
  hover:border-primary/40
  transition-all
  duration-200
  cursor-pointer
  group
  relative
`)

export const topRow = cva(`
  absolute
  top-3
  left-3
  right-3
  flex
  justify-between
  items-center
  z-10
`)

export const media = cva(`
  relative
  w-full
  aspect-16/10
  bg-muted
`)

export const cardImage = cva(`
  h-full
  w-full
  object-cover
  transition-transform
  duration-300
  group-hover:scale-[1.03]
`)

export const mediaOverlay = cva(`
  absolute
  inset-0
  bg-linear-to-t
  from-black/45
  via-black/10
  to-transparent
`)

export const mediaFallback = cva(`
  absolute
  inset-0
  flex
  items-end
  p-4
  bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%),linear-gradient(135deg,hsl(var(--primary)/0.45),hsl(var(--card)))]
`)

export const mediaFallbackLabel = cva(`
  text-xs
  font-semibold
  uppercase
  tracking-[0.22em]
  text-white/90
`)

export const content = cva(`
  flex
  flex-1
  flex-col
  gap-3
  p-4
`)

export const menuButton = cva(`
  flex
  items-center
  justify-center
  w-6
  h-6
  rounded-md
  text-white/85
  bg-black/20
  hover:bg-black/35
  hover:text-white
  transition-colors
`)

export const pinButton = cva(
  `
  flex
  items-center
  justify-center
  w-6
  h-6
  rounded-md
  transition-colors
`,
  {
    variants: {
      pinned: {
        true: `text-white opacity-100 bg-black/35`,
        false: `text-white/85 bg-black/20 hover:bg-black/35 hover:text-white`,
      },
    },
    defaultVariants: { pinned: false },
  },
)

export const pinIconFilled = cva(`fill-current`)

export const title = cva(`
  text-base
  font-semibold
  text-card-foreground
  line-clamp-2
  break-keep
  leading-snug
`)

export const renameInput = cva(`
  w-full
  px-2
  py-1
  text-sm
  rounded-md
  border
  border-primary
  bg-background
  focus:outline-none
  focus:ring-1
  focus:ring-primary
`)

export const footer = cva(`
  flex
  items-center
  justify-between
  pt-2
  border-t
  border-border
`)

export const date = cva(`
  text-xs
  text-muted-foreground
`)

export const pinnedBadge = cva(`
  text-xs
  font-medium
  text-primary
  bg-primary/10
  px-2
  py-0.5
  rounded-full
`)
