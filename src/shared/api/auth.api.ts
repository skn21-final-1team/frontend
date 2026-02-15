import { fetcher } from '@/shared/utils/fetcher'

export const login = async (email: string, password: string) => {
  const res = await fetcher.post('/login', { email, password })
  return res
}

export const signup = async (data: { email: string; password: string; name: string }) => {
  const res = await fetcher.post('/signup', data)
  return res
}
