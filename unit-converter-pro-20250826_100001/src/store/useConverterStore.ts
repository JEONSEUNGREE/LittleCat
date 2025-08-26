import { create } from 'zustand';
import { Category, Unit } from '../types/converter';
import { categories } from '../data/units';

interface ConverterStore {
  categories: Category[];
  selectedCategory: Category | null;
  fromUnit: Unit | null;
  toUnit: Unit | null;
  inputValue: string;
  outputValue: string;
  favorites: Array<{ category: string; from: string; to: string }>;
  
  selectCategory: (category: Category) => void;
  setFromUnit: (unit: Unit) => void;
  setToUnit: (unit: Unit) => void;
  setInputValue: (value: string) => void;
  swapUnits: () => void;
  addToFavorites: () => void;
  removeFavorite: (index: number) => void;
  applyFavorite: (favorite: { category: string; from: string; to: string }) => void;
}

export const useConverterStore = create<ConverterStore>((set) => ({
  categories,
  selectedCategory: categories[0],
  fromUnit: categories[0].units[0],
  toUnit: categories[0].units[1],
  inputValue: '1',
  outputValue: '',
  favorites: [],
  
  selectCategory: (category) => {
    set({
      selectedCategory: category,
      fromUnit: category.units[0],
      toUnit: category.units[1],
      inputValue: '1',
    });
  },
  
  setFromUnit: (unit) => set({ fromUnit: unit }),
  setToUnit: (unit) => set({ toUnit: unit }),
  setInputValue: (value) => set({ inputValue: value }),
  
  swapUnits: () => {
    set((state) => ({
      fromUnit: state.toUnit,
      toUnit: state.fromUnit,
    }));
  },
  
  addToFavorites: () => {
    set((state) => {
      if (!state.selectedCategory || !state.fromUnit || !state.toUnit) return state;
      
      const newFavorite = {
        category: state.selectedCategory.name,
        from: state.fromUnit.symbol,
        to: state.toUnit.symbol,
      };
      
      const exists = state.favorites.some(
        (f) => f.category === newFavorite.category && 
               f.from === newFavorite.from && 
               f.to === newFavorite.to
      );
      
      if (!exists) {
        return { favorites: [...state.favorites, newFavorite] };
      }
      return state;
    });
  },
  
  removeFavorite: (index) => {
    set((state) => ({
      favorites: state.favorites.filter((_, i) => i !== index),
    }));
  },
  
  applyFavorite: (favorite) => {
    set((state) => {
      const category = state.categories.find((c) => c.name === favorite.category);
      if (!category) return state;
      
      const fromUnit = category.units.find((u) => u.symbol === favorite.from);
      const toUnit = category.units.find((u) => u.symbol === favorite.to);
      
      if (!fromUnit || !toUnit) return state;
      
      return {
        selectedCategory: category,
        fromUnit,
        toUnit,
      };
    });
  },
}));