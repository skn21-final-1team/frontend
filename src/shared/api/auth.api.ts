import { plainApi, apiUrl } from '@/shared/utils/fetcher'
import { BaseResponse } from '@/shared/types/response'

export type User = {
  id: number
  name: string
  email: string
  auth_provider: string
}

export type LoginResponse = {
  access_token: string
  user: User
}

export const login = async (email: string, password: string) => {
  const res = await plainApi.post<BaseResponse<LoginResponse>>(apiUrl('/login'), { email, password })
  return res.data.data
}

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await plainApi.post<BaseResponse<{ message: string }>>(apiUrl('/signup'), data)
  return res.data.data
}

export const exchangeGoogleCallback = async (code: string) => {
  const res = await plainApi.post<BaseResponse<LoginResponse>>(apiUrl('/auth/google'), { code })
  return res.data.data
}
