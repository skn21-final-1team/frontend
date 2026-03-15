import { fetcher } from '@/shared/utils/fetcher'
import type { SyncKeyResponse } from '@/shared/types/extension'

export const createExtensionSyncKey = async (notebookId: number): Promise<SyncKeyResponse> => {
  const response = await fetcher.post<SyncKeyResponse>('/directory/key', {
    notebook_id: notebookId,
  })
  return response.data
}
