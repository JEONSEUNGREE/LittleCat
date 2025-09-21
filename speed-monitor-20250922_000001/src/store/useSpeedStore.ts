import { create } from 'zustand'

interface SpeedReading {
  id: string
  timestamp: number
  downloadSpeed: number
  uploadSpeed: number
  ping: number
  connectionType: string
}

interface SpeedStore {
  readings: SpeedReading[]
  isMonitoring: boolean
  currentSpeed: {
    download: number
    upload: number
    ping: number
  }
  addReading: (reading: Omit<SpeedReading, 'id' | 'timestamp'>) => void
  setMonitoring: (status: boolean) => void
  updateCurrentSpeed: (speed: { download: number; upload: number; ping: number }) => void
  clearHistory: () => void
}

export const useSpeedStore = create<SpeedStore>((set) => ({
  readings: [],
  isMonitoring: false,
  currentSpeed: {
    download: 0,
    upload: 0,
    ping: 0
  },
  addReading: (reading) =>
    set((state) => ({
      readings: [
        {
          ...reading,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now()
        },
        ...state.readings
      ].slice(0, 100) // Keep only last 100 readings
    })),
  setMonitoring: (status) => set({ isMonitoring: status }),
  updateCurrentSpeed: (speed) => set({ currentSpeed: speed }),
  clearHistory: () => set({ readings: [] })
}))