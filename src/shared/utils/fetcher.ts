import axios from 'axios'
import { useTokenStore } from '@/shared/store/token-store'
import { BaseResponse } from '@/shared/types/response'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)

export const fetcher = {
  get: <T>(url: string) => api.get<BaseResponse<T>>(url).then((res) => res.data),
  post: <T>(url: string, data?: unknown) =>
    api.post<BaseResponse<T>>(url, data).then((res) => res.data),
  patch: <T>(url: string, data?: unknown) =>
    api.patch<BaseResponse<T>>(url, data).then((res) => res.data),
  delete: (url: string) => api.delete<BaseResponse<null>>(url).then((res) => res.data),
}
