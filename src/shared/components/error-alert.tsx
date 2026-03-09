'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/shared/components/ui/alert-dialog'

export interface ErrorAlertState {
  title: string
  description: string
}

interface ErrorAlertProps {
  error: ErrorAlertState | null
  onClose: () => void
}

export function ErrorAlert({ error, onClose }: ErrorAlertProps) {
  return (
    <AlertDialog open={error !== null} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{error?.title}</AlertDialogTitle>
          <AlertDialogDescription>{error?.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
