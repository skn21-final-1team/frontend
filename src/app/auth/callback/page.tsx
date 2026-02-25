'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Spinner } from '@/shared/components'
import { useGoogleAuth } from '@/shared/hooks/google-auth'
import { useUserStore } from '@/shared/store/user-store'

type CallbackStatus = 'processing' | 'failed'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<CallbackStatus>('processing')
  const [message, setMessage] = useState('로그인 처리 중입니다...')

  const code = searchParams.get('code')
  const { completeLogin } = useGoogleAuth()

  useEffect(() => {
    const processGoogleCallback = async () => {
      try {
        const loginResult = await completeLogin(code)
        useUserStore.getState().setUser(loginResult.user, loginResult.access_token)
        router.replace('/')
      } catch {
        setStatus('failed')
        setMessage('구글 로그인에 실패했습니다. 다시 시도해주세요.')
      }
    }

    processGoogleCallback()
  }, [code, router, completeLogin])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      {status === 'processing' ? <Spinner data-icon="inline-start" /> : null}
      <p>{message}</p>
    </main>
  )
}
