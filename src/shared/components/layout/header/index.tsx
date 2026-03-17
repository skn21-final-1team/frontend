'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import * as s from './index.style'
import { useUserStore } from '@/shared/store/user-store'
import { useRouter } from 'next/navigation'
import { useNotebookMetaStore } from '@/shared/store/notebook-meta-store'

export function Header() {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const notebookName = useNotebookMetaStore((s) => s.title)

  const handleLogout = () => {
    useUserStore.getState().clearUser()
    router.push('/login')
  }

  return (
    <>
      <header className={s.header()}>
        <div className={s.container()}>
          <div className={s.leftSection()}>
            <Link href="/" className={s.logoLink()}>
              <Image
                src="/kalpi.png"
                alt="Logo"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
              />
              <span className={s.logoText()}>KALPIE</span>
            </Link>
            {notebookName && (
              <>
                <div className={s.titleDivider()} />
                <span className={s.notebookTitle()}>{notebookName}</span>
              </>
            )}
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
    </>
  )
}
