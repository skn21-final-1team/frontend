import { fetcher } from '@/shared/utils/fetcher'

export interface DirectoryRequest {
  title: string
  parent_id: number | null
}

export type directory = {
  id: number
  title: string
  url: null
  parent_id: number
  notebook_id: number
  children: Array<directory>
  sources: Array<source>
}

export type source = {
  id: number
  url: string
  title: string
  summary: string
  directory_id: number
  is_active: boolean
  created_at: string
}

export type DirectoryResponse = {
  directories: directory[]
  sources: source[]
}

export const getDirectories = async (notebook_id: number): Promise<DirectoryResponse> => {
  const response = await fetcher.get<DirectoryResponse>(`/directory/${notebook_id}`)
  return response.data
}
