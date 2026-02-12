import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface TokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: 'token-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
