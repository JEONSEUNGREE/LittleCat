import { create } from 'zustand'

export type CategoryType = 'length' | 'weight' | 'temperature' | 'time' | 'volume' | 'speed' | 'energy' | 'data'

interface ConverterStore {
  selectedCategory: CategoryType
  fromUnit: string
  toUnit: string
  value: string
  setSelectedCategory: (category: CategoryType) => void
  setFromUnit: (unit: string) => void
  setToUnit: (unit: string) => void
  setValue: (value: string) => void
}

export const useConverterStore = create<ConverterStore>((set) => ({
  selectedCategory: 'length',
  fromUnit: 'meter',
  toUnit: 'kilometer',
  value: '',
  setSelectedCategory: (category) => {
    const defaultUnits: Record<CategoryType, { from: string; to: string }> = {
      length: { from: 'meter', to: 'kilometer' },
      weight: { from: 'kilogram', to: 'gram' },
      temperature: { from: 'celsius', to: 'fahrenheit' },
      time: { from: 'second', to: 'minute' },
      volume: { from: 'liter', to: 'milliliter' },
      speed: { from: 'mps', to: 'kmh' },
      energy: { from: 'joule', to: 'kilojoule' },
      data: { from: 'byte', to: 'kilobyte' },
    }
    set({
      selectedCategory: category,
      fromUnit: defaultUnits[category].from,
      toUnit: defaultUnits[category].to,
    })
  },
  setFromUnit: (unit) => set({ fromUnit: unit }),
  setToUnit: (unit) => set({ toUnit: unit }),
  setValue: (value) => set({ value }),
}))