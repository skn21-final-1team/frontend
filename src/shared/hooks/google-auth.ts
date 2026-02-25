import { useCallback } from 'react'
import { exchangeGoogleCallback, LoginResponse } from '@/shared/api/auth.api'

export interface UseGoogleAuthReturn {
  /**
   * 구글 로그인 페이지 URL을 생성합니다.
   * @param origin - 현재 애플리케이션의 Origin URL (예: window.location.origin)
   * @returns 생성된 구글 인증 페이지 URL
   */
  buildStartUrl: (origin: string) => string

  /**
   * 구글 인증 코드를 사용하여 로그인을 완료하고 결과를 가져옵니다.
   * @param code - 구글로부터 전달받은 Authorization code
   * @returns 액세스 토큰과 사용자 정보를 포함하는 로그인 결과 Promise
   * @throws 인증 코드가 누락된 경우 에러 발생
   */
  completeLogin: (code: string | null) => Promise<LoginResponse>

  /**
   * 현재 브라우저를 구글 로그인 페이지로 리다이렉트합니다.
   */
  loginWithGoogle: () => void
}

/**
 * 구글 OAuth 로그인을 처리하는 커스텀 훅입니다.
 * 구글 로그인 페이지 이동 기능 및 콜백 코드 처리 기능을 제공합니다.
 *
 * @returns {UseGoogleAuthReturn} 구글 로그인 처리를 위한 인터페이스 포함 객체
 */
export const useGoogleAuth = (): UseGoogleAuthReturn => {
  const buildStartUrl = useCallback((origin: string): string => {
    const callbackUrl = new URL('/auth/callback', origin).toString()
    const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authorizationUrl.searchParams.set('redirect_uri', callbackUrl)
    authorizationUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '')
    authorizationUrl.searchParams.set('response_type', 'code')
    authorizationUrl.searchParams.set(
      'scope',
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    )
    return authorizationUrl.toString()
  }, [])

  const completeLogin = useCallback(async (code: string | null): Promise<LoginResponse> => {
    if (!code) {
      throw new Error('Google OAuth code is missing')
    }
    const result = await exchangeGoogleCallback(code)
    return result
  }, [])

  const loginWithGoogle = useCallback(() => {
    const startUrl = buildStartUrl(window.location.origin)
    window.location.assign(startUrl)
  }, [buildStartUrl])

  return {
    buildStartUrl,
    completeLogin,
    loginWithGoogle,
  }
}
