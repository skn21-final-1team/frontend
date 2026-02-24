import axios, { AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/shared/store/user-store'
import { BaseResponse } from '@/shared/types/response'
import { User } from '@/shared/api/auth.api'
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source'

export const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
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

export const apiUrl = (url: string) => `/api${url}`

export const fetcher = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await api.get(apiUrl(url), config as any)
    return response.data.data as T
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await api.post(apiUrl(url), data, config as any)
    return response.data.data as T
  },

  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const response = await api.patch(apiUrl(url), data, config as any)
    return response.data.data as T
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const response = await api.delete(apiUrl(url), config as any)
    return response.data.data as T
  },
}

type RawAPIArgs = {
  url: string
  fetchConfig?: RequestInit
  data: unknown
  onMessage: (msg: EventSourceMessage) => void
  onError?: () => void
}

export const SSE = ({ url, fetchConfig, data, onMessage, onError }: RawAPIArgs) =>
  fetchEventSource(config.baseURL + apiUrl(url), {
    method: 'POST',
    ...fetchConfig,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useUserStore.getState().accessToken}`,
    },
    body: JSON.stringify(data),
    onopen: async (res) => {
      if (res.status === 401) {
        return Promise.reject(res)
      }
      return
    },
    onmessage: onMessage,
    onerror: onError,
  })