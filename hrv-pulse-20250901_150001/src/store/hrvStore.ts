import { create } from 'zustand'

export interface HRVMeasurement {
  id: string
  value: number
  timestamp: Date
  stressLevel: 'low' | 'medium' | 'high'
  note?: string
}

interface HRVState {
  currentHRV: number
  stressLevel: 'low' | 'medium' | 'high'
  measurements: HRVMeasurement[]
  isMessuring: boolean
  addMeasurement: (value: number, note?: string) => void
  startMeasuring: () => void
  stopMeasuring: () => void
  calculateStressLevel: (hrv: number) => 'low' | 'medium' | 'high'
  initializeSampleData: () => void
}

export const useHRVStore = create<HRVState>((set, get) => ({
  currentHRV: 0,
  stressLevel: 'medium',
  measurements: [],
  isMessuring: false,

  addMeasurement: (value: number, note?: string) => {
    const stressLevel = get().calculateStressLevel(value)
    const newMeasurement: HRVMeasurement = {
      id: Date.now().toString(),
      value,
      timestamp: new Date(),
      stressLevel,
      note
    }
    
    set((state) => ({
      currentHRV: value,
      stressLevel,
      measurements: [newMeasurement, ...state.measurements].slice(0, 100) // Keep last 100 measurements
    }))
  },

  startMeasuring: () => set({ isMessuring: true }),
  
  stopMeasuring: () => set({ isMessuring: false }),

  calculateStressLevel: (hrv: number) => {
    if (hrv > 60) return 'low'
    if (hrv > 40) return 'medium'
    return 'high'
  },

  initializeSampleData: () => {
    const sampleData: HRVMeasurement[] = []
    const now = new Date()
    
    // Generate sample data for the last 7 days
    for (let i = 0; i < 28; i++) {
      const timestamp = new Date(now.getTime() - i * 6 * 60 * 60 * 1000) // Every 6 hours
      const value = Math.floor(Math.random() * 40) + 35 // Random HRV between 35-75
      const stressLevel = get().calculateStressLevel(value)
      
      sampleData.push({
        id: `sample-${i}`,
        value,
        timestamp,
        stressLevel,
        note: i % 4 === 0 ? '운동 후 측정' : i % 3 === 0 ? '명상 후 측정' : undefined
      })
    }
    
    set({
      measurements: sampleData,
      currentHRV: sampleData[0].value,
      stressLevel: sampleData[0].stressLevel
    })
  }
}))