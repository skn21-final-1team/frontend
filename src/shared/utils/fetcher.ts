import axios from 'axios'
import { useUserStore } from '@/shared/store/user-store'
import { BaseResponse } from '@/shared/types/response'
import { User } from '@/shared/api/auth.api'

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}
const api = axios.create(config)

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      const refreshTokenResult = await axios
        .get<BaseResponse<{ access_token: string; user: User }>>('/api/auth/refresh', config)
        .then((res) => res.data.data.access_token)
        .then((token) => {
          useUserStore.getState().setAccessToken(token)
          error.config.headers.Authorization = `Bearer ${token}`
          error.config._retry = true
          return true
        })
        .catch(() => {
          useUserStore.getState().clearUser()
          window.location.href = '/login'
          return false
        })
      if (refreshTokenResult) {
        return api(error.config)
      }
    }
    return Promise.reject(error)
  },
)

const apiUrl = (url: string) => `/api${url}`

export const fetcher = {
  get: <T>(url: string) => api.get<BaseResponse<T>>(apiUrl(url)).then((res) => res.data),
  post: <T>(url: string, data?: unknown) =>
    api.post<BaseResponse<T>>(apiUrl(url), data).then((res) => res.data),
  patch: <T>(url: string, data?: unknown) =>
    api.patch<BaseResponse<T>>(apiUrl(url), data).then((res) => res.data),
  delete: (url: string) => api.delete<BaseResponse<null>>(apiUrl(url)).then((res) => res.data),
}
