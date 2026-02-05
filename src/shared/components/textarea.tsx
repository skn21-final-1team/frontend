import * as React from 'react'
import { Textarea as BaseTextarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/style/utils'

export interface ResizableTextareaProps extends React.ComponentProps<typeof BaseTextarea> {
  resizable?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ResizableTextareaProps>(
  ({ className, resizable = false, ...props }, ref) => {
    return (
      <BaseTextarea
        className={cn(resizable ? 'resize' : 'resize-none', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'ResizableTextarea'

export { Textarea }
