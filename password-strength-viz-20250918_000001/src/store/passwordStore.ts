import { create } from 'zustand'
import { calculateStrength } from '../utils/passwordUtils'

interface PasswordHistory {
  password: string
  strength: number
  timestamp: Date
}

interface PasswordStore {
  history: PasswordHistory[]
  addToHistory: (password: string) => void
  clearHistory: () => void
}

export const usePasswordStore = create<PasswordStore>((set) => ({
  history: [],
  addToHistory: (password) => set((state) => ({
    history: [
      {
        password,
        strength: calculateStrength(password),
        timestamp: new Date()
      },
      ...state.history
    ].slice(0, 10)
  })),
  clearHistory: () => set({ history: [] })
}))