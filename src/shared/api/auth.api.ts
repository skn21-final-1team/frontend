import { fetcher } from '@/shared/utils/fetcher'

type User = {
  id: number
  name: string
  email: string
  auth_provider: string
}

type LoginResponse = {
  access_token: string
  user: User
}

export const login = async (email: string, password: string) => {
  const res = await fetcher.post<LoginResponse>('/login', { email, password })
  return res.data
}

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await fetcher.post('/signup', data)
  return res
}
