import { create } from 'zustand'

interface HistoricalData {
  date: string
  value: number
  sentiment: string
}

interface FearIndexState {
  currentIndex: number
  sentiment: string
  historicalData: HistoricalData[]
  lastUpdated: string
  updateIndex: (index: number) => void
  addHistoricalData: (data: HistoricalData) => void
  clearHistory: () => void
}

export const useFearIndexStore = create<FearIndexState>((set) => ({
  currentIndex: 50,
  sentiment: 'Neutral',
  historicalData: [],
  lastUpdated: new Date().toISOString(),
  
  updateIndex: (index) => {
    const sentiment = 
      index <= 25 ? 'Extreme Fear' :
      index <= 45 ? 'Fear' :
      index <= 55 ? 'Neutral' :
      index <= 75 ? 'Greed' :
      'Extreme Greed'
    
    set({ 
      currentIndex: index, 
      sentiment,
      lastUpdated: new Date().toISOString()
    })
  },
  
  addHistoricalData: (data) => set((state) => ({
    historicalData: [...state.historicalData.slice(-29), data] // Keep last 30 entries
  })),
  
  clearHistory: () => set({ historicalData: [] })
}))