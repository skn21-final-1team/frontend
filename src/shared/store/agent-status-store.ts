import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Status = 'working' | 'sleep' | 'ready'
interface AgentStatusStore {
  status: Status
  setStatus: (status: Status) => void
}

export const useAgentStatusStore = create(
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
