export interface AIModel {
  id: string
  name: string
  description: string
}

export const AI_MODELS: AIModel[] = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '빠르고 경제적' },
  { id: 'gpt-4o', name: 'GPT-4o', description: '고성능 멀티모달' },
  { id: 'gpt-4.1', name: 'GPT-4.1', description: '최신 추론 모델' },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', description: '균형 잡힌 성능' },
]

export const DEFAULT_MODEL = AI_MODELS[0]
