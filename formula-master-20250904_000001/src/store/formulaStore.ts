import { create } from 'zustand';
import { Formula } from '../types/formula';
import { formulas as initialFormulas } from '../data/formulas';

interface FormulaState {
  formulas: Formula[];
  currentCategory: 'all' | 'math' | 'physics' | 'chemistry';
  currentDifficulty: 'all' | 'easy' | 'medium' | 'hard';
  searchTerm: string;
  showMasteredOnly: boolean;
  
  setCategory: (category: 'all' | 'math' | 'physics' | 'chemistry') => void;
  setDifficulty: (difficulty: 'all' | 'easy' | 'medium' | 'hard') => void;
  setSearchTerm: (term: string) => void;
  toggleShowMasteredOnly: () => void;
  toggleMastered: (id: string) => void;
  updateReview: (id: string) => void;
  resetProgress: () => void;
  
  getFilteredFormulas: () => Formula[];
  getStats: () => {
    total: number;
    mastered: number;
    reviewed: number;
    byCategory: Record<string, number>;
  };
}

export const useFormulaStore = create<FormulaState>((set, get) => ({
  formulas: initialFormulas,
  currentCategory: 'all',
  currentDifficulty: 'all',
  searchTerm: '',
  showMasteredOnly: false,
  
  setCategory: (category) => set({ currentCategory: category }),
  setDifficulty: (difficulty) => set({ currentDifficulty: difficulty }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  toggleShowMasteredOnly: () => set((state) => ({ showMasteredOnly: !state.showMasteredOnly })),
  
  toggleMastered: (id) => set((state) => ({
    formulas: state.formulas.map(f => 
      f.id === id ? { ...f, mastered: !f.mastered } : f
    )
  })),
  
  updateReview: (id) => set((state) => ({
    formulas: state.formulas.map(f => 
      f.id === id 
        ? { ...f, reviewCount: f.reviewCount + 1, lastReviewed: new Date() }
        : f
    )
  })),
  
  resetProgress: () => set((state) => ({
    formulas: state.formulas.map(f => ({
      ...f,
      mastered: false,
      reviewCount: 0,
      lastReviewed: undefined
    }))
  })),
  
  getFilteredFormulas: () => {
    const state = get();
    return state.formulas.filter(formula => {
      const categoryMatch = state.currentCategory === 'all' || formula.category === state.currentCategory;
      const difficultyMatch = state.currentDifficulty === 'all' || formula.difficulty === state.currentDifficulty;
      const searchMatch = !state.searchTerm || 
        formula.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        formula.subcategory.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        formula.formula.toLowerCase().includes(state.searchTerm.toLowerCase());
      const masteredMatch = !state.showMasteredOnly || formula.mastered;
      
      return categoryMatch && difficultyMatch && searchMatch && masteredMatch;
    });
  },
  
  getStats: () => {
    const state = get();
    const stats = {
      total: state.formulas.length,
      mastered: state.formulas.filter(f => f.mastered).length,
      reviewed: state.formulas.filter(f => f.reviewCount > 0).length,
      byCategory: {
        math: state.formulas.filter(f => f.category === 'math').length,
        physics: state.formulas.filter(f => f.category === 'physics').length,
        chemistry: state.formulas.filter(f => f.category === 'chemistry').length,
      }
    };
    return stats;
  }
}));