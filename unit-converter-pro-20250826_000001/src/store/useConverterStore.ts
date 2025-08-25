import { create } from 'zustand';
import { UnitCategory, ConversionResult } from '../types';

interface ConverterStore {
  selectedCategory: UnitCategory;
  fromUnit: string;
  toUnit: string;
  inputValue: string;
  history: ConversionResult[];
  isDarkMode: boolean;
  
  setCategory: (category: UnitCategory) => void;
  setFromUnit: (unit: string) => void;
  setToUnit: (unit: string) => void;
  setInputValue: (value: string) => void;
  swapUnits: () => void;
  addToHistory: (result: ConversionResult) => void;
  clearHistory: () => void;
  toggleDarkMode: () => void;
}

export const useConverterStore = create<ConverterStore>((set) => ({
  selectedCategory: 'length',
  fromUnit: 'meter',
  toUnit: 'kilometer',
  inputValue: '1',
  history: [],
  isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  setCategory: (category) => set({ selectedCategory: category }),
  setFromUnit: (unit) => set({ fromUnit: unit }),
  setToUnit: (unit) => set({ toUnit: unit }),
  setInputValue: (value) => set({ inputValue: value }),
  swapUnits: () => set((state) => ({
    fromUnit: state.toUnit,
    toUnit: state.fromUnit,
  })),
  addToHistory: (result) => set((state) => ({
    history: [result, ...state.history.slice(0, 9)], // Keep last 10 conversions
  })),
  clearHistory: () => set({ history: [] }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));