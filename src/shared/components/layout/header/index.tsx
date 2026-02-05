'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import * as s from './index.style'
import { useState } from 'react'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    name: 'Tera',
    email: 'tera@example.com',
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
          {isLoggedIn ? (
            <div className={s.userInfo()}>
              <span>{user.name}</span>
              <div className={s.avatar()}>{user.name[0]}</div>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/login" onClick={() => setIsLoggedIn(true)}>
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
