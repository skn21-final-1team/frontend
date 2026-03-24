export interface AIModel {
  id: string
  name: string
  description: string
}

export const AI_MODELS: AIModel[] = [
  { id: 'gpt-4o-mini', name: 'GPT-4o-mini', description: '빠르고 경제적' },
  { id: 'gpt-5.4-mini', name: 'GPT-5.4-mini', description: '고성능 경제적' },
  { id: 'exaone', name: 'EXAON-4.0-32B', description: 'LG AI 통합 모델' },
]

export const DEFAULT_MODEL = AI_MODELS[0]
