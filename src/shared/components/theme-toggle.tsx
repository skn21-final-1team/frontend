'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import * as S from './theme-toggle.style'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const mount = () => setMounted(true)
    mount()
  }, [])

  if (!mounted) {
    return (
      <button className={S.button()} aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      className={S.button()}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
