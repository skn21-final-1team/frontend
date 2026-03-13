import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AgentStatusStore {
  isWorking: boolean
  setIsWorking: (status: boolean) => void
}

export const useAgentStatusStore = create(
  persist<AgentStatusStore>(
    (set) => ({
      isWorking: false,
      setIsWorking: (status) => set({ isWorking: status }),
    }),
    {
      name: 'agent-status-storage',
    },
  ),
)
