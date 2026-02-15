import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '@/shared/api/auth.api'

interface UserStore {
  user: User | null
  setUser: (user: User, token: string) => void
  accessToken: string | null
  setAccessToken: (token: string) => void
  clearUser: () => void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      accessToken: null,
      user: null,
      setUser: (user, token) => set({ user, accessToken: token }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearUser: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
