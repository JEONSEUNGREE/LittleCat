import { create } from 'zustand';
import { Category, Unit } from '../types/converter';
import { unitCategories } from '../data/units';

interface ConverterStore {
  categories: Category[];
  selectedCategory: Category | null;
  fromUnit: Unit | null;
  toUnit: Unit | null;
  inputValue: string;
  isDarkMode: boolean;
  recentConversions: Array<{
    category: string;
    from: string;
    to: string;
    fromValue: number;
    toValue: number;
  }>;
  
  setSelectedCategory: (category: Category) => void;
  setFromUnit: (unit: Unit) => void;
  setToUnit: (unit: Unit) => void;
  setInputValue: (value: string) => void;
  toggleDarkMode: () => void;
  swapUnits: () => void;
  addRecentConversion: (conversion: any) => void;
  convert: () => number;
}

export const useConverterStore = create<ConverterStore>((set, get) => ({
  categories: unitCategories,
  selectedCategory: null,
  fromUnit: null,
  toUnit: null,
  inputValue: '1',
  isDarkMode: false,
  recentConversions: [],
  
  setSelectedCategory: (category) => set({ 
    selectedCategory: category,
    fromUnit: category.units[0],
    toUnit: category.units[1],
  }),
  
  setFromUnit: (unit) => set({ fromUnit: unit }),
  setToUnit: (unit) => set({ toUnit: unit }),
  setInputValue: (value) => set({ inputValue: value }),
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  swapUnits: () => set((state) => ({
    fromUnit: state.toUnit,
    toUnit: state.fromUnit,
  })),
  
  addRecentConversion: (conversion) => set((state) => ({
    recentConversions: [conversion, ...state.recentConversions.slice(0, 4)],
  })),
  
  convert: () => {
    const { fromUnit, toUnit, inputValue, selectedCategory } = get();
    
    if (!fromUnit || !toUnit || !inputValue || isNaN(Number(inputValue))) {
      return 0;
    }
    
    const value = Number(inputValue);
    
    // Special handling for temperature
    if (selectedCategory?.id === 'temperature') {
      if (fromUnit.symbol === '°C' && toUnit.symbol === '°F') {
        return (value * 9/5) + 32;
      } else if (fromUnit.symbol === '°F' && toUnit.symbol === '°C') {
        return (value - 32) * 5/9;
      } else if (fromUnit.symbol === '°C' && toUnit.symbol === 'K') {
        return value + 273.15;
      } else if (fromUnit.symbol === 'K' && toUnit.symbol === '°C') {
        return value - 273.15;
      } else if (fromUnit.symbol === '°F' && toUnit.symbol === 'K') {
        return ((value - 32) * 5/9) + 273.15;
      } else if (fromUnit.symbol === 'K' && toUnit.symbol === '°F') {
        return ((value - 273.15) * 9/5) + 32;
      }
      return value;
    }
    
    // Standard conversion for other units
    const baseValue = value * fromUnit.factor;
    return baseValue / toUnit.factor;
  },
}));