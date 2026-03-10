import axios from 'axios'
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

const plainApi = axios.create(config)

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

const refreshAccessToken = (): Promise<string> => {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      refreshQueue.push({ resolve, reject })
    })
  }

  isRefreshing = true

  return plainApi
    .get<BaseResponse<{ access_token: string; user: User }>>('/api/auth/refresh', {
      baseURL: config.baseURL,
      withCredentials: true,
    })
    .then((res) => {
      const token = res.data.data.access_token
      useUserStore.getState().setAccessToken(token)
      const queue = refreshQueue
      refreshQueue = []
      isRefreshing = false
      queue.forEach((q) => q.resolve(token))
      return token
    })
    .catch((err) => {
      const queue = refreshQueue
      refreshQueue = []
      isRefreshing = false
      queue.forEach((q) => q.reject(err))
      useUserStore.getState().clearUser()
      throw err
    })
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true
      try {
        const token = await refreshAccessToken()
        error.config.headers.Authorization = `Bearer ${token}`
        return api(error.config)
      } catch {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export const apiUrl = (url: string) => `/api${url}`

export const fetcher = {
  get: <T>(url: string) => api.get<BaseResponse<T>>(apiUrl(url)).then((res) => res.data),
  post: <T>(url: string, data?: unknown) =>
    api.post<BaseResponse<T>>(apiUrl(url), data).then((res) => res.data),
  patch: <T>(url: string, data?: unknown) =>
    api.patch<BaseResponse<T>>(apiUrl(url), data).then((res) => res.data),
  delete: (url: string) => api.delete<BaseResponse<null>>(apiUrl(url)).then((res) => res.data),
}

type RawAPIArgs = {
  url: string
  fetchConfig?: RequestInit
  data: unknown
  onMessage: (msg: EventSourceMessage) => void
  onError?: () => void
  signal?: AbortSignal
}

export const SSE = async ({ url, fetchConfig, data, onMessage, onError, signal }: RawAPIArgs) => {
  const runSSE = (token: string | null) =>
    fetchEventSource(config.baseURL + apiUrl(url), {
      method: 'POST',
      ...fetchConfig,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
      signal,
      onopen: async (res) => {
        if (res.ok) return
        if (res.status === 401) throw res
        throw new Error(`SSE open failed: ${res.status}`)
      },
      onmessage: onMessage,
      onerror: (err) => {
        throw err ?? new Error('SSE connection failed')
      },
    })

  try {
    await runSSE(useUserStore.getState().accessToken)
  } catch (err) {
    if (err instanceof Response && err.status === 401) {
      try {
        const newToken = await refreshAccessToken()
        await runSSE(newToken)
      } catch {
        onError?.()
      }
      return
    }
    onError?.()
  }
}
