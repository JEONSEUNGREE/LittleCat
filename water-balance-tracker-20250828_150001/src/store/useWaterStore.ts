import { create } from 'zustand'

interface UserProfile {
  weight: number
  activityLevel: 'low' | 'moderate' | 'high'
  name: string
}

interface WaterEntry {
  id: string
  amount: number
  timestamp: number
  type: 'water' | 'coffee' | 'tea' | 'juice' | 'other'
}

interface WaterStore {
  profile: UserProfile | null
  entries: WaterEntry[]
  dailyGoal: number
  currentIntake: number
  lastResetDate: string
  
  setProfile: (profile: UserProfile) => void
  addWaterEntry: (amount: number, type: WaterEntry['type']) => void
  removeEntry: (id: string) => void
  calculateDailyGoal: () => number
  resetDaily: () => void
  getTodayEntries: () => WaterEntry[]
  getHydrationPercentage: () => number
}

const calculateGoal = (weight: number, activityLevel: string): number => {
  const baseAmount = weight * 35 // 35ml per kg
  const multiplier = 
    activityLevel === 'high' ? 1.3 :
    activityLevel === 'moderate' ? 1.15 :
    1.0
  return Math.round(baseAmount * multiplier)
}

export const useWaterStore = create<WaterStore>((set, get) => ({
  profile: null,
  entries: [],
  dailyGoal: 2000,
  currentIntake: 0,
  lastResetDate: new Date().toDateString(),

  setProfile: (profile) => {
    const goal = calculateGoal(profile.weight, profile.activityLevel)
    set({ 
      profile, 
      dailyGoal: goal 
    })
  },

  addWaterEntry: (amount, type) => {
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      timestamp: Date.now(),
      type
    }
    
    set((state) => ({
      entries: [...state.entries, newEntry],
      currentIntake: state.currentIntake + amount
    }))
  },

  removeEntry: (id) => {
    set((state) => {
      const entry = state.entries.find(e => e.id === id)
      if (!entry) return state
      
      return {
        entries: state.entries.filter(e => e.id !== id),
        currentIntake: Math.max(0, state.currentIntake - entry.amount)
      }
    })
  },

  calculateDailyGoal: () => {
    const { profile } = get()
    if (!profile) return 2000
    return calculateGoal(profile.weight, profile.activityLevel)
  },

  resetDaily: () => {
    const today = new Date().toDateString()
    const { lastResetDate } = get()
    
    if (lastResetDate !== today) {
      set({
        entries: [],
        currentIntake: 0,
        lastResetDate: today
      })
    }
  },

  getTodayEntries: () => {
    const today = new Date().toDateString()
    const { entries } = get()
    return entries.filter(e => 
      new Date(e.timestamp).toDateString() === today
    )
  },

  getHydrationPercentage: () => {
    const { currentIntake, dailyGoal } = get()
    return Math.min(100, Math.round((currentIntake / dailyGoal) * 100))
  }
}))