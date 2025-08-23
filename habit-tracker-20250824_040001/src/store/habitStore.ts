import { create } from 'zustand';
import { Habit } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  deleteHabit: (habitId: string) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
  getHabitsByDate: (date: string) => Habit[];
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
  
  for (const dateStr of sortedDates) {
    const checkDate = currentDate.toISOString().split('T')[0];
    if (dateStr === checkDate) {
      streak++;
      currentDate = new Date(currentDate.getTime() - 86400000);
    } else {
      break;
    }
  }
  
  return streak;
};

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  
  addHabit: (habitData) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completedDates: [],
      streak: 0,
    };
    set((state) => ({ habits: [...state.habits, newHabit] }));
  },
  
  toggleHabitCompletion: (habitId, date) => {
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id !== habitId) return habit;
        
        const completedDates = habit.completedDates.includes(date)
          ? habit.completedDates.filter((d) => d !== date)
          : [...habit.completedDates, date];
        
        return {
          ...habit,
          completedDates,
          streak: calculateStreak(completedDates),
        };
      }),
    }));
  },
  
  deleteHabit: (habitId) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== habitId),
    }));
  },
  
  updateHabit: (habitId, updates) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updates } : habit
      ),
    }));
  },
  
  getHabitsByDate: (date) => {
    const dayOfWeek = new Date(date).getDay();
    return get().habits.filter((habit) => habit.targetDays.includes(dayOfWeek));
  },
}));