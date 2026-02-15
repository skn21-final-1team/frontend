'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import * as s from './index.style'
import { useUserStore } from '@/shared/store/user-store'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const user = useUserStore((state) => state.user)

  const handleLogout = () => {
    useUserStore.getState().clearUser()
    router.push('/login')
  }

  return (
    <header className={s.header()}>
      <div className={s.container()}>
        <div className={s.leftSection()}>
          <Image
            src="/notebooklm_logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>NotebookLM</span>
        </div>

        <div className={s.rightSection()}>
          <ThemeToggle />
          {user ? (
            <div className={s.userInfo()}>
              <span className={s.avatar()}>{user.name[0]}</span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
