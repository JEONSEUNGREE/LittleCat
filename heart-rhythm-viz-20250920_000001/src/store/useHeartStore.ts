import { create } from 'zustand'

interface HeartReading {
  id: string
  bpm: number
  timestamp: Date
  variability: number
}

interface HeartState {
  currentBPM: number
  targetBPM: number
  isTracking: boolean
  readings: HeartReading[]
  coherenceScore: number
  sessionDuration: number
  startTracking: () => void
  stopTracking: () => void
  updateBPM: (bpm: number) => void
  addReading: (bpm: number, variability: number) => void
  clearReadings: () => void
  updateCoherence: (score: number) => void
}

const useHeartStore = create<HeartState>((set) => ({
  currentBPM: 65,
  targetBPM: 60,
  isTracking: false,
  readings: [],
  coherenceScore: 0,
  sessionDuration: 0,
  
  startTracking: () => set({ isTracking: true, readings: [], sessionDuration: 0 }),
  stopTracking: () => set({ isTracking: false }),
  
  updateBPM: (bpm) => set({ currentBPM: bpm }),
  
  addReading: (bpm, variability) => set((state) => ({
    readings: [...state.readings, {
      id: Date.now().toString(),
      bpm,
      timestamp: new Date(),
      variability
    }].slice(-100)
  })),
  
  clearReadings: () => set({ readings: [], coherenceScore: 0 }),
  
  updateCoherence: (score) => set({ coherenceScore: score })
}))

export default useHeartStore