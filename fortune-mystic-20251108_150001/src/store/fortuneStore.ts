import { create } from 'zustand'

export type FortuneType = 'tarot' | 'crystal' | 'daily'

export interface Fortune {
  type: FortuneType
  title: string
  message: string
  advice: string
  luckyNumber: number
  luckyColor: string
  timestamp: number
}

interface FortuneState {
  currentFortune: Fortune | null
  history: Fortune[]
  setFortune: (fortune: Fortune) => void
  clearFortune: () => void
}

export const useFortuneStore = create<FortuneState>((set) => ({
  currentFortune: null,
  history: [],
  setFortune: (fortune) => set((state) => ({
    currentFortune: fortune,
    history: [fortune, ...state.history].slice(0, 10)
  })),
  clearFortune: () => set({ currentFortune: null })
}))
