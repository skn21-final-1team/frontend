import { cva } from 'class-variance-authority'

export const box = cva(`
  flex
  flex-col
  items-center
  justify-center
  gap-8
  h-full
  [&>div]:text-sm
  [&>div]:text-center
  [&>div]:text-gray-500
`)

export const botIcon = cva(`
  w-32
  h-32
  text-gray-400
  -mt-20
`)

export const text = cva(`
  flex
  flex-col
  gap-2
`)
