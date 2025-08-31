import { create } from 'zustand';
import { Compliment, UserStats } from '../types';

interface ComplimentStore {
  compliments: Compliment[];
  userStats: UserStats;
  selectedCategory: string;
  isAnonymous: boolean;
  
  addCompliment: (message: string, category: Compliment['category']) => void;
  reactToCompliment: (id: string) => void;
  toggleAnonymous: () => void;
  setSelectedCategory: (category: string) => void;
  updateStats: () => void;
}

const initialStats: UserStats = {
  complimentsSent: 0,
  complimentsReceived: 0,
  chainLength: 0,
  positivityScore: 100,
  lastActiveDate: new Date().toISOString().split('T')[0]
};

const colors = ['#FFB800', '#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#6BCF7F', '#C7B3FF'];

export const useStore = create<ComplimentStore>((set, get) => ({
  compliments: [],
  userStats: initialStats,
  selectedCategory: 'all',
  isAnonymous: true,

  addCompliment: (message, category) => {
    const newCompliment: Compliment = {
      id: Date.now().toString(),
      message,
      category,
      timestamp: Date.now(),
      reactions: 0,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    set((state) => ({
      compliments: [newCompliment, ...state.compliments].slice(0, 50),
      userStats: {
        ...state.userStats,
        complimentsSent: state.userStats.complimentsSent + 1,
        chainLength: state.userStats.chainLength + 1,
        positivityScore: Math.min(state.userStats.positivityScore + 5, 500),
        lastActiveDate: new Date().toISOString().split('T')[0]
      }
    }));
  },

  reactToCompliment: (id) => {
    set((state) => ({
      compliments: state.compliments.map((c) =>
        c.id === id ? { ...c, reactions: c.reactions + 1 } : c
      ),
      userStats: {
        ...state.userStats,
        positivityScore: Math.min(state.userStats.positivityScore + 1, 500)
      }
    }));
  },

  toggleAnonymous: () => {
    set((state) => ({ isAnonymous: !state.isAnonymous }));
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  updateStats: () => {
    const today = new Date().toISOString().split('T')[0];
    const stats = get().userStats;
    
    if (stats.lastActiveDate !== today) {
      set({
        userStats: {
          ...stats,
          chainLength: 0,
          lastActiveDate: today
        }
      });
    }
  }
}));