import { useGoogleLogin as useGoogleAuth } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import { api } from '@/shared/utils/fetcher'
import { useUserStore } from '@/shared/store/user-store'

export const useGoogleLogin = () => {
  const router = useRouter()

  const handleGoogleLogin = useGoogleAuth({
    onSuccess: async (codeResponse) => {
      try {
        console.log('구글 로그인 성공, 토큰:', codeResponse)

        // 1. 구글에서 받은 토큰(access_token)을 백엔드로 보냄
        const response = await api.post('/auth/google', {
          id_token: codeResponse.access_token,
        })

        // 2. 백엔드에서 받은 우리 서버의 토큰 저장
        const { access_token, user } = response.data.data
        useUserStore.getState().setUser(user, access_token)

        alert('구글 로그인 성공!')
        router.push('/')
      } catch (error) {
        console.error('구글 로그인 서버 연동 실패:', error)
        alert('구글 로그인에 실패했습니다.')
      }
    },
    onError: (error) => {
      console.error('구글 로그인 팝업 실패:', error)
      alert('구글 로그인 팝업이 닫혔거나 에러가 발생했습니다.')
    },
  })

  return {
    handleGoogleLogin,
  }
}
