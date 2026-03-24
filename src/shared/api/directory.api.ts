import { fetcher } from '@/shared/utils/fetcher'

export interface DirectoryRequest {
  title: string
  parent_id: number | null
}

export type directory = {
  id: number
  title: string
  url: null
  parent_id: number | null
  notebook_id: number
  children: Array<directory>
  sources: Array<source>
}

export type SourceStatus = 'pending' | 'completed' | 'failed'

export type source = {
  id: number
  url: string
  title: string | null
  summary: string | null
  is_active: boolean
  status: SourceStatus
}

export type DirectoryResponse = {
  directories: directory[]
  sources: source[]
}

export const getDirectories = async (notebook_id: number): Promise<DirectoryResponse> => {
  const response = await fetcher.get<DirectoryResponse>(`/directory/${notebook_id}`)
  return response.data
}

export interface AddSourceRequest {
  url: string
  notebook_id: number
  directory_id?: number
  title?: string
  is_active?: boolean
}

export const addSource = async (params: AddSourceRequest): Promise<source> => {
  const response = await fetcher.post<source>('/source/add', params)
  return response.data
}

export const updateSource = async (
  sourceId: number,
  data: { title?: string; is_active?: boolean },
) => {
  const response = await fetcher.patch<source>(`/source/${sourceId}`, data)
  return response.data
}

export const deleteSource = async (sourceId: number) => {
  const response = await fetcher.delete(`/source/${sourceId}`)
  return response.data
}

export const renameDirectory = async (directoryId: number, title: string) => {
  const response = await fetcher.patch<directory>(`/directory/${directoryId}`, { title })
  return response.data
}

export const deleteDirectory = async (directoryId: number) => {
  const response = await fetcher.delete(`/directory/${directoryId}`)
  return response.data
}

export const updateAllSourcesActive = async (notebookId: number, isActive: boolean) => {
  const response = await fetcher.patch<source[]>(`/notebook/${notebookId}/sources/active`, {
    is_active: isActive,
  })
  return response.data
}
