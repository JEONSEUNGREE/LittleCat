import { create } from 'zustand'

export interface Conversion {
  id: string
  fromUnit: string
  toUnit: string
  category: string
  timestamp: number
}

interface ConverterStore {
  inputValue: string
  fromUnit: string
  toUnit: string
  selectedCategory: string
  favorites: Conversion[]
  recentConversions: Conversion[]
  
  setInputValue: (value: string) => void
  setFromUnit: (unit: string) => void
  setToUnit: (unit: string) => void
  setSelectedCategory: (category: string) => void
  swapUnits: () => void
  addToFavorites: (conversion: Conversion) => void
  removeFromFavorites: (id: string) => void
  addToRecent: (conversion: Conversion) => void
  clearRecent: () => void
}

export const useConverterStore = create<ConverterStore>((set) => ({
  inputValue: '1',
  fromUnit: 'meter',
  toUnit: 'foot',
  selectedCategory: 'length',
  favorites: [],
  recentConversions: [],
  
  setInputValue: (value) => set({ inputValue: value }),
  setFromUnit: (unit) => set({ fromUnit: unit }),
  setToUnit: (unit) => set({ toUnit: unit }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  swapUnits: () => set((state) => ({
    fromUnit: state.toUnit,
    toUnit: state.fromUnit,
  })),
  
  addToFavorites: (conversion) => set((state) => ({
    favorites: [conversion, ...state.favorites.filter(f => f.id !== conversion.id)].slice(0, 10)
  })),
  
  removeFromFavorites: (id) => set((state) => ({
    favorites: state.favorites.filter(f => f.id !== id)
  })),
  
  addToRecent: (conversion) => set((state) => ({
    recentConversions: [conversion, ...state.recentConversions.filter(r => r.id !== conversion.id)].slice(0, 20)
  })),
  
  clearRecent: () => set({ recentConversions: [] }),
}))