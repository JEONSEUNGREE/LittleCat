import { create } from 'zustand'

type BreathingPattern = '4-4-4' | '4-7-8' | '5-5-5' | 'custom'
type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'pause'

interface BreathStore {
  isActive: boolean
  currentPhase: BreathingPhase
  pattern: BreathingPattern
  customPattern: { inhale: number; hold: number; exhale: number }
  cycleCount: number
  totalCycles: number
  soundEnabled: boolean
  vibrationEnabled: boolean
  
  startBreathing: () => void
  stopBreathing: () => void
  setPattern: (pattern: BreathingPattern) => void
  setCustomPattern: (inhale: number, hold: number, exhale: number) => void
  nextPhase: () => void
  incrementCycle: () => void
  resetCycles: () => void
  toggleSound: () => void
  toggleVibration: () => void
}

export const useBreathStore = create<BreathStore>((set) => ({
  isActive: false,
  currentPhase: 'inhale',
  pattern: '4-4-4',
  customPattern: { inhale: 4, hold: 4, exhale: 4 },
  cycleCount: 0,
  totalCycles: 0,
  soundEnabled: true,
  vibrationEnabled: false,
  
  startBreathing: () => set({ isActive: true, currentPhase: 'inhale' }),
  stopBreathing: () => set({ isActive: false, currentPhase: 'inhale' }),
  
  setPattern: (pattern) => set({ pattern }),
  setCustomPattern: (inhale, hold, exhale) => 
    set({ customPattern: { inhale, hold, exhale }, pattern: 'custom' }),
  
  nextPhase: () => set((state) => {
    const phases: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'pause']
    const currentIndex = phases.indexOf(state.currentPhase)
    const nextIndex = (currentIndex + 1) % phases.length
    return { currentPhase: phases[nextIndex] }
  }),
  
  incrementCycle: () => set((state) => ({ 
    cycleCount: state.cycleCount + 1,
    totalCycles: state.totalCycles + 1 
  })),
  
  resetCycles: () => set({ cycleCount: 0 }),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleVibration: () => set((state) => ({ vibrationEnabled: !state.vibrationEnabled })),
}))