import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import { Header } from '@/shared/components/layout/header'
import { ThemeProvider } from '@/shared/components/theme-provider'
import { AuthGuard } from '@/shared/components/auth-guard'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: 'Kalpie',
  description: '북마크 기반 개인화된 노트 정리 및 리서치 도구',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKR.className} antialiased`}>
        <ThemeProvider>
          <AuthGuard>
            <div className="min-w-5xl mt-16">
              <Header />
              <div className="h-[calc(100vh-64px)]">{children}</div>
            </div>
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}
