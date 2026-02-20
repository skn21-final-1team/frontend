import { fetcher } from '@/shared/utils/fetcher'

export interface SourceNode {
  id: number
  title: string | null
  url: string
  type: 'url' | 'file'
}

export interface ContentNode {
  id: number
  title: string
  parent_id: number | null
  is_expanded: boolean
  sources: SourceNode[]
  children: ContentNode[]
}

export const getNotebookContent = async (id: number): Promise<ContentNode[]> => {
  const response = await fetcher.get<ContentNode[]>(`/notebook/${id}/content`)
  return response
}