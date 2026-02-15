import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface TokenStore {
  accessToken: string | null
  setTokens: (accessToken: string) => void
  clearTokens: () => void
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      accessToken: null,
      setTokens: (accessToken) => set({ accessToken }),
      clearTokens: () => set({ accessToken: null }),
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
