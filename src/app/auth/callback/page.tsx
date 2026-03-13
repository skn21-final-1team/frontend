'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Spinner, ErrorAlert, type ErrorAlertState } from '@/shared/components'
import { useGoogleAuth } from '@/shared/hooks/google-auth'
import { useUserStore } from '@/shared/store/user-store'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<ErrorAlertState | null>(null)

  const code = searchParams.get('code')
  const queryError = searchParams.get('error')
  const { completeLogin } = useGoogleAuth()
  const isProcessing = useRef(false)

  const hasError = queryError != null
  const hasNoCode = !queryError && !code

  useEffect(() => {
    if (hasError || hasNoCode || isProcessing.current) return
    isProcessing.current = true

    const processGoogleCallback = async () => {
      try {
        const loginResult = await completeLogin(code!)
        useUserStore.getState().setUser(loginResult.user, loginResult.access_token)
        router.replace('/')
      } catch {
        setError({
          title: '로그인 실패',
          description: '구글 로그인에 실패했습니다. 다시 시도해주세요.',
        })
        isProcessing.current = false
      }
    }

    processGoogleCallback()
  }, [hasError, hasNoCode, code, router, completeLogin])

  const alertError = hasError
    ? { title: '로그인 취소', description: '구글 로그인이 취소되었습니다.' }
    : hasNoCode
      ? { title: '로그인 실패', description: '인증 코드가 없습니다.' }
      : error

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      <ErrorAlert error={alertError} onClose={() => router.replace('/login')} />

      {!alertError && (
        <>
          <Spinner data-icon="inline-start" />
          <p>로그인 처리 중입니다...</p>
        </>
      )}
    </main>
  )
}
