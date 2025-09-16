import { create } from 'zustand'

export interface ConversionHistory {
  id: string
  category: string
  fromUnit: string
  toUnit: string
  fromValue: number
  toValue: number
  timestamp: Date
}

interface ConverterState {
  selectedCategory: string
  inputValue: string
  fromUnit: string
  toUnit: string
  history: ConversionHistory[]
  favorites: string[]
  setSelectedCategory: (category: string) => void
  setInputValue: (value: string) => void
  setFromUnit: (unit: string) => void
  setToUnit: (unit: string) => void
  swapUnits: () => void
  addToHistory: (conversion: Omit<ConversionHistory, 'id' | 'timestamp'>) => void
  clearHistory: () => void
  toggleFavorite: (categoryUnit: string) => void
}

export const useConverterStore = create<ConverterState>((set) => ({
  selectedCategory: 'length',
  inputValue: '1',
  fromUnit: 'meter',
  toUnit: 'foot',
  history: [],
  favorites: [],
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setInputValue: (value) => set({ inputValue: value }),
  setFromUnit: (unit) => set({ fromUnit: unit }),
  setToUnit: (unit) => set({ toUnit: unit }),
  
  swapUnits: () => set((state) => ({
    fromUnit: state.toUnit,
    toUnit: state.fromUnit,
  })),
  
  addToHistory: (conversion) => set((state) => ({
    history: [
      {
        ...conversion,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      },
      ...state.history.slice(0, 9), // Keep only last 10 items
    ],
  })),
  
  clearHistory: () => set({ history: [] }),
  
  toggleFavorite: (categoryUnit) => set((state) => ({
    favorites: state.favorites.includes(categoryUnit)
      ? state.favorites.filter(f => f !== categoryUnit)
      : [...state.favorites, categoryUnit],
  })),
}))