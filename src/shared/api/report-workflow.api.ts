import { fetcher } from '@/shared/utils/fetcher'

export type WorkflowStatus =
  | 'idle'
  | 'running'
  | 'waiting_confirmation'
  | 'completed'
  | 'cancelled'

export type AwaitingAction = 'approve' | 'revise' | 'reset'

export interface ReportWorkflow {
  notebook_id: number
  status: WorkflowStatus
  current_step: number
  awaiting_action: AwaitingAction
  requirements_text: string
  outline_text: string
  draft_text: string
  final_text: string
  last_user_request: string
  last_revision_request: string
  thread_id: string
  created_at: string
  updated_at: string
}

export interface ReportWorkflowStreamRequest {
  notebook_id: number
  message: string
}

export interface WorkflowStateEvent {
  notebook_id: number
  status: WorkflowStatus
  current_step: number
  awaiting_action: AwaitingAction
  waiting_for_confirmation: boolean
}

export interface StepContentEvent {
  step: number
  content: string
}

export interface SystemEvent {
  message: string
}

export interface WorkflowApiError {
  title: string
  description: string
}

type ApiSuccess<T> = {
  success: true
  data: T
}

type ApiFailure<E> = {
  success: false
  error: E
}

type ApiResult<T, E> = ApiSuccess<T> | ApiFailure<E>

const buildError = (title: string, description: string): WorkflowApiError => ({
  title,
  description,
})

export type ReportWorkflowFetchResult = ApiResult<ReportWorkflow, WorkflowApiError>
export type ResetReportWorkflowResult = ApiResult<
  { notebook_id: number; status: 'cancelled' },
  WorkflowApiError
>

export const getReportWorkflow = async (notebookId: number): Promise<ReportWorkflowFetchResult> => {
  try {
    const response = await fetcher.get<ReportWorkflow>(`/report-workflow/notebook/${notebookId}`)
    return { success: true, data: response.data }
  } catch {
    return {
      success: false,
      error: buildError('워크플로우 불러오기 실패', '문서 작성 상태를 불러오지 못했습니다.'),
    }
  }
}

export const resetReportWorkflow = async (
  notebookId: number,
): Promise<ResetReportWorkflowResult> => {
  try {
    const response = await fetcher.post<{ notebook_id: number; status: 'cancelled' }>(
      `/report-workflow/notebook/${notebookId}/reset`,
    )
    return { success: true, data: response.data }
  } catch {
    return {
      success: false,
      error: buildError('워크플로우 초기화 실패', '워크플로우를 초기화하는 데 실패했습니다.'),
    }
  }
}
