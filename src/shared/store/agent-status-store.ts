import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AgentStatus = 'working' | 'sleep' | 'ready'

export const AGENT_MODE_CHAT_GUIDE_MESSAGE = `### AI가 어떤 문서를 작성해 볼까요?
원하는 문서 종류를 채팅으로 알려주면 선택된 자료를 바탕으로 바로 초안을 작성합니다.

사용 방법
- 만들고 싶은 문서 종류를 알려주세요.
- 대상 독자나 목적을 함께 적으면 더 정확하게 작성할 수 있어요.
- 톤앤매너나 포함할 항목이 있으면 같이 알려주세요.

예시 요청
- 서비스 소개서: "우리 서비스를 소개하는 랜딩 페이지용 소개서를 작성해줘."
- 기능 명세서: "선택한 자료를 바탕으로 핵심 기능 명세서를 정리해줘."
- 사용자 가이드: "초기 사용자를 위한 사용 가이드를 단계별로 작성해줘."`

interface AgentStatusStore {
  status: AgentStatus
  setStatus: (status: AgentStatus) => void
}

export const useAgentStatusStore = create<AgentStatusStore>()(
  persist<AgentStatusStore>(
    (set) => ({
      status: 'sleep',
      setStatus: (status) => set({ status }),
    }),
    {
      name: 'agent-status',
    },
  ),
)
