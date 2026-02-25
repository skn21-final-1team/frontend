import { cva } from 'class-variance-authority'

export const header = cva(`
  fixed
  top-0
  z-50
  w-full
  bg-background
  pt-2
`)

export const container = cva(`
  flex
  h-14
  items-center
  justify-between
  px-4
  md:px-8
`)

export const leftSection = cva(`
  flex
  items-center
  gap-2
`)

export const logoLink = cva(`
  flex
  items-center
  gap-2
`)

export const logoText = cva(`
  font-semibold
  text-3xl
`)

export const titleDivider = cva(`
  h-6
  w-[2px]
  bg-slate-300
  mx-2
  dark:bg-slate-700
`)

export const notebookTitle = cva(`
  text-xl
  font-medium
  text-slate-700
  truncate
  max-w-[200px]
  md:max-w-[400px]
  dark:text-slate-300
`)

export const rightSection = cva(`
  flex
  items-center
  gap-4
`)

export const userInfo = cva(`
  flex
  items-center
  gap-2
  text-sm
  font-medium
`)

export const avatar = cva(`
  h-8
  w-8
  rounded-full
  bg-primary/30
  flex
  items-center
  justify-center
  text-sm
  text-primary
  font-bold
`)
