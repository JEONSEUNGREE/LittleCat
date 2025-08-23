import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types';

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'bestStreak' | 'completedDates' | 'createdAt'>) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  deleteHabit: (habitId: string) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
  getHabitsByDate: (date: string) => Habit[];
  getTodayProgress: () => { completed: number; total: number };
}

const calculateStreak = (completedDates: string[]): number => {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }
  
  let streak = 0;
  let currentDate = sortedDates[0] === today ? new Date() : new Date(Date.now() - 86400000);
  
  for (const date of sortedDates) {
    const dateObj = new Date(date);
    const dayDiff = Math.floor((currentDate.getTime() - dateObj.getTime()) / 86400000);
    
    if (dayDiff <= 1) {
      streak++;
      currentDate = dateObj;
    } else {
      break;
    }
  }
  
  return streak;
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      
      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          streak: 0,
          bestStreak: 0,
          completedDates: [],
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },
      
      toggleHabitCompletion: (habitId, date) => {
        set((state) => {
          const habit = state.habits.find((h) => h.id === habitId);
          if (!habit) return state;
          
          const updatedHabits = state.habits.map((h) => {
            if (h.id === habitId) {
              const completedDates = h.completedDates.includes(date)
                ? h.completedDates.filter((d) => d !== date)
                : [...h.completedDates, date];
              
              const streak = calculateStreak(completedDates);
              const bestStreak = Math.max(streak, h.bestStreak);
              
              return {
                ...h,
                completedDates,
                streak,
                bestStreak,
                lastCompleted: completedDates.includes(date) ? date : h.lastCompleted,
              };
            }
            return h;
          });
          
          return { habits: updatedHabits };
        });
      },
      
      deleteHabit: (habitId) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== habitId),
        }));
      },
      
      updateHabit: (habitId, updates) => {
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === habitId ? { ...h, ...updates } : h
          ),
        }));
      },
      
      getHabitsByDate: (date) => {
        return get().habits.filter((habit) => {
          if (habit.frequency === 'daily') return true;
          
          const dayOfWeek = new Date(date).getDay();
          if (habit.frequency === 'weekly' && habit.targetDays?.includes(dayOfWeek)) {
            return true;
          }
          
          return false;
        });
      },
      
      getTodayProgress: () => {
        const today = new Date().toISOString().split('T')[0];
        const todayHabits = get().getHabitsByDate(today);
        const completed = todayHabits.filter((h) => 
          h.completedDates.includes(today)
        ).length;
        
        return { completed, total: todayHabits.length };
      },
    }),
    {
      name: 'habit-storage',
    }
  )
);