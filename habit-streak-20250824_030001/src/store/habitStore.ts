import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'bestStreak' | 'totalCompleted' | 'completedDates'>) => void;
  toggleHabit: (habitId: string, date: string) => void;
  deleteHabit: (habitId: string) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
}

const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = [...completedDates].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }
  
  let streak = 0;
  let currentDate = sortedDates[0] === today ? new Date() : new Date(Date.now() - 86400000);
  
  for (const date of sortedDates) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (date === dateStr) {
      streak++;
      currentDate = new Date(currentDate.getTime() - 86400000);
    } else {
      break;
    }
  }
  
  return streak;
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [],
      
      addHabit: (habitData) => set((state) => ({
        habits: [...state.habits, {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          completedDates: [],
          streak: 0,
          bestStreak: 0,
          totalCompleted: 0,
        }]
      })),
      
      toggleHabit: (habitId, date) => set((state) => {
        const habit = state.habits.find(h => h.id === habitId);
        if (!habit) return state;
        
        const isCompleted = habit.completedDates.includes(date);
        let completedDates: string[];
        
        if (isCompleted) {
          completedDates = habit.completedDates.filter(d => d !== date);
        } else {
          completedDates = [...habit.completedDates, date];
        }
        
        const streak = calculateStreak(completedDates);
        const bestStreak = Math.max(streak, habit.bestStreak);
        const totalCompleted = completedDates.length;
        
        return {
          habits: state.habits.map(h => 
            h.id === habitId 
              ? { ...h, completedDates, streak, bestStreak, totalCompleted }
              : h
          )
        };
      }),
      
      deleteHabit: (habitId) => set((state) => ({
        habits: state.habits.filter(h => h.id !== habitId)
      })),
      
      updateHabit: (habitId, updates) => set((state) => ({
        habits: state.habits.map(h => 
          h.id === habitId ? { ...h, ...updates } : h
        )
      })),
    }),
    {
      name: 'habit-storage',
    }
  )
);