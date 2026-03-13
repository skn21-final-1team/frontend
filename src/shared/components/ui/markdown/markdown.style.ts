import { cva } from 'class-variance-authority'

export const content = cva(`
  flex
  flex-col
  gap-3
  text-sm
  leading-6
  whitespace-pre-wrap
  wrap-break-word
  [&_p]:inline
  [&_h4]:mt-0 [&_h4]:font-semibold
  [&_h3]:mt-0 [&_h3]:font-bold
  [&_h2]:mt-0 [&_h2]:font-bold
  [&_h1]:mt-0 [&_h1]:font-bold
  [&_li]:my-0.5
  [&_ul]:list-disc [&_ul]:whitespace-normal
  [&_ul]:list-inside
  [&_ul]:pl-2
  [&_ol]:list-decimal
  [&_ol]:list-inside
  [&_ol]:pl-2
  [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2
  [&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground
  [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]
  [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3
  [&_pre_code]:bg-transparent [&_pre_code]:p-0
  [&_hr]:my-3 [&_hr]:border-border
  [&_table]:my-2 [&_table]:w-full [&_table]:border-collapse
  [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-2 [&_th]:py-1 [&_th]:text-left
  [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1
`)
