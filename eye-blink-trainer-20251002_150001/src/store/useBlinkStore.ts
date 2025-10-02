import { create } from 'zustand'

interface BlinkStats {
  totalBlinks: number
  averageRate: number
  sessionTime: number
  lastBlinkTime: number
  targetRate: number
  healthScore: number
}

interface BlinkStore {
  isTracking: boolean
  isPaused: boolean
  currentMode: 'training' | 'monitoring' | 'exercise'
  stats: BlinkStats
  history: number[]
  alerts: string[]
  
  startTracking: () => void
  stopTracking: () => void
  togglePause: () => void
  recordBlink: () => void
  setMode: (mode: 'training' | 'monitoring' | 'exercise') => void
  updateHealthScore: () => void
  addAlert: (message: string) => void
  clearAlerts: () => void
  resetStats: () => void
}

const useBlinkStore = create<BlinkStore>((set, get) => ({
  isTracking: false,
  isPaused: false,
  currentMode: 'training',
  stats: {
    totalBlinks: 0,
    averageRate: 15,
    sessionTime: 0,
    lastBlinkTime: Date.now(),
    targetRate: 15,
    healthScore: 100
  },
  history: [],
  alerts: [],
  
  startTracking: () => set({ 
    isTracking: true, 
    isPaused: false,
    stats: { 
      ...get().stats, 
      sessionTime: Date.now() 
    } 
  }),
  
  stopTracking: () => set({ 
    isTracking: false, 
    isPaused: false 
  }),
  
  togglePause: () => set((state) => ({ 
    isPaused: !state.isPaused 
  })),
  
  recordBlink: () => set((state) => {
    const now = Date.now()
    const timeSinceLast = now - state.stats.lastBlinkTime
    const newHistory = [...state.history.slice(-19), timeSinceLast]
    
    const averageInterval = newHistory.length > 0
      ? newHistory.reduce((a, b) => a + b, 0) / newHistory.length
      : 4000
    
    const averageRate = Math.round(60000 / averageInterval)
    
    return {
      stats: {
        ...state.stats,
        totalBlinks: state.stats.totalBlinks + 1,
        averageRate,
        lastBlinkTime: now
      },
      history: newHistory
    }
  }),
  
  setMode: (mode) => set({ currentMode: mode }),
  
  updateHealthScore: () => set((state) => {
    const { averageRate, targetRate } = state.stats
    const diff = Math.abs(averageRate - targetRate)
    const score = Math.max(0, Math.min(100, 100 - diff * 2))
    
    return {
      stats: {
        ...state.stats,
        healthScore: Math.round(score)
      }
    }
  }),
  
  addAlert: (message) => set((state) => ({
    alerts: [...state.alerts, message]
  })),
  
  clearAlerts: () => set({ alerts: [] }),
  
  resetStats: () => set({
    stats: {
      totalBlinks: 0,
      averageRate: 15,
      sessionTime: 0,
      lastBlinkTime: Date.now(),
      targetRate: 15,
      healthScore: 100
    },
    history: []
  })
})

export default useBlinkStore