export interface Message {
  id: string
  role: 'user' | 'assistant' | 'ai'
  content: string
}
