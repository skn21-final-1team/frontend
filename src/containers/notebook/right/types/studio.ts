export interface StudioFeature {
  id: string
  name: string
  description: string
  icon: string
  isEnabled: boolean
}

export interface GeneratedItem {
  id: string
  type: 'flashcard' | 'quiz'
  title: string
  sourceCount: number
  createdAt: Date
}

export type StudioFeatureList = StudioFeature[]

export interface QuizAnswer {
  id: number
  text: string
  hint: string
  is_correct: boolean
}

export interface QuizContent {
  id: number
  question: string
  answer: QuizAnswer[]
}

export interface FlashcardContent {
  id: number
  question: string
  answer: string
}

export interface QuizStudioContent {
  content_id: number
  type: 'quiz'
  contents: QuizContent[]
}

export interface FlashcardStudioContent {
  content_id: number
  type: 'flashcard'
  contents: FlashcardContent[]
}

export type StudioContent = QuizStudioContent | FlashcardStudioContent