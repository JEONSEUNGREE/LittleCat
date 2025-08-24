import { create } from 'zustand'

export type BreathingPattern = '4-4-4' | '4-7-8' | '5-5-5' | 'box'

interface BreathState {
  isBreathing: boolean
  currentPhase: 'inhale' | 'hold' | 'exhale' | 'pause'
  pattern: BreathingPattern
  sessionDuration: number
  totalSessions: number
  currentStreak: number
  setBreathing: (isBreathing: boolean) => void
  setPhase: (phase: 'inhale' | 'hold' | 'exhale' | 'pause') => void
  setPattern: (pattern: BreathingPattern) => void
  incrementSession: () => void
  resetSession: () => void
}

export const useBreathStore = create<BreathState>((set) => ({
  isBreathing: false,
  currentPhase: 'inhale',
  pattern: '4-4-4',
  sessionDuration: 0,
  totalSessions: 0,
  currentStreak: 0,
  setBreathing: (isBreathing) => set({ isBreathing }),
  setPhase: (phase) => set({ currentPhase: phase }),
  setPattern: (pattern) => set({ pattern }),
  incrementSession: () => set((state) => ({ 
    totalSessions: state.totalSessions + 1,
    currentStreak: state.currentStreak + 1 
  })),
  resetSession: () => set({ sessionDuration: 0 }),
}))