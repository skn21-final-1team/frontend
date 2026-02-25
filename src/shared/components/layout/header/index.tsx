'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import * as s from './index.style'
import { useUserStore } from '@/shared/store/user-store'
import { useRouter, useParams } from 'next/navigation'
import { getNotebook } from '@/shared/api/notebook.api'

export function Header() {
  const router = useRouter()
  const params = useParams()
  const user = useUserStore((state) => state.user)
  const [notebookName, setNotebookName] = useState<string | null>(null)

  const notebookId = params && typeof params.id === 'string' ? Number(params.id) : null

  useEffect(() => {
    let isMounted = true

    const fetchNotebookName = async () => {
      if (!notebookId) {
        if (isMounted) setNotebookName(null)
        return
      }

      try {
        const notebook = await getNotebook(notebookId)
        if (isMounted) {
          setNotebookName(notebook.title)
        }
      } catch (err) {
        console.error('Failed to fetch notebook name:', err)
        if (isMounted) setNotebookName(null)
      }
    }

    fetchNotebookName()

    return () => {
      isMounted = false
    }
  }, [notebookId])

  const handleLogout = () => {
    useUserStore.getState().clearUser()
    router.push('/login')
  }

  return (
    <header className={s.header()}>
      <div className={s.container()}>
        <div className={s.leftSection()}>
          <Link href="/notebooks" className={s.logoLink()}>
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
              <span className={s.notebookTitle()}>
                {notebookName}
              </span>
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
  )
}
