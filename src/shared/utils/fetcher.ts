import axios from 'axios'
import { useUserStore } from '@/shared/store/user-store'
import { BaseResponse } from '@/shared/types/response'
import { User } from '@/shared/api/auth.api'

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
}
export const api = axios.create(config)

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
    if (error.response?.status === 401) {
      await axios
        .get<{ access_token: string; user: User }>('/api/refresh', config)
        .then((res) => {
          useUserStore.getState().setAccessToken(res.data.access_token)
        })
        .catch(() => {
          useUserStore.getState().clearUser()
          window.location.href = '/login'
        })
    }
    return Promise.reject(error)
  },
)

const apiUrl = (url: string) => `/api${url}`

export const fetcher = {
  get: <T>(url: string, params?: Record<string, string | number>) =>
    api.get<BaseResponse<T>>(apiUrl(url), { params }).then((res) => res.data),
  post: <T>(url: string, data?: unknown) =>
    api.post<BaseResponse<T>>(apiUrl(url), data).then((res) => res.data),
  patch: <T>(url: string, data?: unknown) =>
    api.patch<BaseResponse<T>>(apiUrl(url), data).then((res) => res.data),
  delete: (url: string) =>
    api.delete<BaseResponse<null>>(apiUrl(url)).then((res) => res.data),
}
