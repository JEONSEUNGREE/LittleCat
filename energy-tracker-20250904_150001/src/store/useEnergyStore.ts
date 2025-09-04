import { create } from 'zustand'

export interface EnergyEntry {
  id: string
  timestamp: Date
  energyLevel: number // 1-10
  activity: string
  mood: string
  notes?: string
}

export interface EnergyPattern {
  hour: number
  averageEnergy: number
  sampleCount: number
}

interface EnergyStore {
  entries: EnergyEntry[]
  patterns: EnergyPattern[]
  currentEnergy: number
  addEntry: (entry: Omit<EnergyEntry, 'id'>) => void
  updateCurrentEnergy: (level: number) => void
  deleteEntry: (id: string) => void
  calculatePatterns: () => void
  getOptimalWorkTime: () => { start: number; end: number } | null
  getPredictedEnergy: (hour: number) => number
}

export const useEnergyStore = create<EnergyStore>((set, get) => ({
      entries: [],
      patterns: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        averageEnergy: 5,
        sampleCount: 0
      })),
      currentEnergy: 5,

      addEntry: (entry) => {
        const newEntry: EnergyEntry = {
          ...entry,
          id: Date.now().toString(),
          timestamp: new Date(entry.timestamp)
        }
        set((state) => ({
          entries: [...state.entries, newEntry].slice(-100) // Keep last 100 entries
        }))
        get().calculatePatterns()
      },

      updateCurrentEnergy: (level) => set({ currentEnergy: level }),

      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id)
        }))
        get().calculatePatterns()
      },

      calculatePatterns: () => {
        const { entries } = get()
        const patterns: EnergyPattern[] = Array.from({ length: 24 }, (_, hour) => ({
          hour,
          averageEnergy: 5,
          sampleCount: 0
        }))

        entries.forEach((entry) => {
          const hour = new Date(entry.timestamp).getHours()
          const pattern = patterns[hour]
          const newCount = pattern.sampleCount + 1
          pattern.averageEnergy =
            (pattern.averageEnergy * pattern.sampleCount + entry.energyLevel) / newCount
          pattern.sampleCount = newCount
        })

        set({ patterns })
      },

      getOptimalWorkTime: () => {
        const { patterns } = get()
        const highEnergyPatterns = patterns
          .filter((p) => p.sampleCount > 0 && p.averageEnergy >= 7)
          .sort((a, b) => b.averageEnergy - a.averageEnergy)

        if (highEnergyPatterns.length === 0) return null

        // Find consecutive high-energy hours
        let bestStart = highEnergyPatterns[0].hour
        let bestEnd = highEnergyPatterns[0].hour
        let currentStart = highEnergyPatterns[0].hour
        let currentEnd = highEnergyPatterns[0].hour

        for (let i = 1; i < highEnergyPatterns.length; i++) {
          if (highEnergyPatterns[i].hour - currentEnd <= 1) {
            currentEnd = highEnergyPatterns[i].hour
          } else {
            if (currentEnd - currentStart > bestEnd - bestStart) {
              bestStart = currentStart
              bestEnd = currentEnd
            }
            currentStart = highEnergyPatterns[i].hour
            currentEnd = highEnergyPatterns[i].hour
          }
        }

        if (currentEnd - currentStart > bestEnd - bestStart) {
          bestStart = currentStart
          bestEnd = currentEnd
        }

        return { start: bestStart, end: bestEnd }
      },

      getPredictedEnergy: (hour) => {
        const { patterns } = get()
        const pattern = patterns[hour]
        if (pattern.sampleCount === 0) {
          // Default energy curve if no data
          if (hour >= 9 && hour <= 11) return 8
          if (hour >= 14 && hour <= 16) return 6
          if (hour >= 20 && hour <= 22) return 7
          if (hour >= 0 && hour <= 6) return 3
          return 5
        }
        return Math.round(pattern.averageEnergy)
      }
    }))