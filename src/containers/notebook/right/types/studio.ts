export interface StudioFeature {
  id: string
  name: string
  description: string
  icon: string
  isEnabled: boolean
}

export interface GeneratedItem {
  id: string
  type: 'flashcard' | 'quiz' | 'summary'
  title: string
  sourceCount: number
  createdAt: Date
}

export type StudioFeatureList = StudioFeature[]
