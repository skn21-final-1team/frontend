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
  overflow-hidden
  aspect-16/10
  bg-muted
`)

export const cardImage = cva(`
  h-full
  w-full
  object-cover
  object-center
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

export const badgeStack = cva(`
  absolute
  bottom-3
  left-3
  right-3
  z-20
  flex
  items-center
  justify-between
`)

export const overlayTitleArea = cva(`
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

export const dateBadge = cva(`
  inline-flex
  items-center
  ml-auto
  rounded-full
  bg-black/45
  px-3
  py-1
  text-xs
  font-medium
  text-white
  backdrop-blur-sm
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
  cursor-pointer
`,
  {
    variants: {
      pinned: {
        true: `text-white opacity-100 bg-black/35`,
        false: `text-white/85 bg-black/40 hover:bg-black/50 hover:text-white`,
      },
    },
    defaultVariants: { pinned: false },
  },
)

export const pinIconFilled = cva(`fill-current`)

export const title = cva(`
  w-full
  overflow-hidden
  text-xl
  font-semibold
  text-white
  line-clamp-2
  break-keep
  leading-snug
`)

export const renameInput = cva(`
  w-full
  bg-transparent
  border-none
  border-b-2
  border-b-white/20
  text-xl
  font-semibold
  text-white
  placeholder:text-white/50
  overflow-hidden
  whitespace-pre-wrap
  break-keep
  leading-snug
  focus:outline-none
  focus:border-b-white/60
  focus:ring-0
`)

export const footer = cva(`
  flex
  items-center
  justify-end
`)

export const date = cva(`
  text-xs
  text-muted-foreground
`)

export const pinnedBadge = cva(`
  text-xs
  font-medium
  text-white
  bg-primary/80
  px-3
  py-1
  rounded-full
`)
