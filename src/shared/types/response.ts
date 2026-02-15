export type BaseResponse<T> = {
  status: 'success' | 'error'
  code: number
  message: string
  data: T
}
