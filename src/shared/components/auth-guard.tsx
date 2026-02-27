'use client'
import { useEffect, useSyncExternalStore } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@/shared/store/user-store'

const AUTH_PAGES = ['/login', '/signup'] as const
const PUBLIC_PAGES = ['/auth/callback'] as const

type PagePath = string

function isAuthPage(path: PagePath): boolean {
  return AUTH_PAGES.includes(path as (typeof AUTH_PAGES)[number])
}

function isPublicPage(path: PagePath): boolean {
  return PUBLIC_PAGES.includes(path as (typeof PUBLIC_PAGES)[number])
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const accessToken = useUserStore((state) => state.accessToken)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    if (isPublicPage(pathname)) return

    if (accessToken && isAuthPage(pathname)) {
      router.replace('/')
      return
    }
    if (!accessToken && !isAuthPage(pathname)) {
      router.replace('/login')
    }
  }, [accessToken, pathname, router, isClient])

  if (!isClient) return null

  if (isPublicPage(pathname)) {
    return <>{children}</>
  }

  if (accessToken) {
    return !isAuthPage(pathname) ? <>{children}</> : null
  }
  return isAuthPage(pathname) ? <>{children}</> : null
}
