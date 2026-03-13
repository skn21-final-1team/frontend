export interface AIModel {
  id: string
  name: string
  description: string
}

export const AI_MODELS: AIModel[] = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '빠르고 경제적' },
  { id: 'exaone', name: 'EXAON-4.0-32B', description: '고성능 통합모델' },
]

export const DEFAULT_MODEL = AI_MODELS[0]
