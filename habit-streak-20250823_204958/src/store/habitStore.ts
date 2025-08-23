import { create } from 'zustand';
import { Habit } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'bestStreak' | 'completedDates'>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  updateStreak: (id: string) => void;
}

const useHabitStore = create<HabitStore>((set, get) => ({
      habits: [],
      
      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          streak: 0,
          bestStreak: 0,
          completedDates: [],
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },
      
      deleteHabit: (id) => {
        set((state) => ({ 
          habits: state.habits.filter(habit => habit.id !== id) 
        }));
      },
      
      toggleHabitCompletion: (id, date) => {
        set((state) => ({
          habits: state.habits.map(habit => {
            if (habit.id !== id) return habit;
            
            const completedDates = habit.completedDates.includes(date)
              ? habit.completedDates.filter(d => d !== date)
              : [...habit.completedDates, date];
            
            return { ...habit, completedDates };
          })
        }));
        get().updateStreak(id);
      },
      
      updateStreak: (id) => {
        set((state) => ({
          habits: state.habits.map(habit => {
            if (habit.id !== id) return habit;
            
            const sortedDates = [...habit.completedDates].sort();
            let currentStreak = 0;
            const today = new Date().toISOString().split('T')[0];
            
            if (sortedDates.includes(today)) {
              currentStreak = 1;
              for (let i = sortedDates.length - 2; i >= 0; i--) {
                const date = new Date(sortedDates[i]);
                const nextDate = new Date(sortedDates[i + 1]);
                const diffDays = Math.floor((nextDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                  currentStreak++;
                } else {
                  break;
                }
              }
            }
            
            const bestStreak = Math.max(habit.bestStreak, currentStreak);
            
            return { ...habit, streak: currentStreak, bestStreak };
          })
        }));
      },
    }));

export default useHabitStore;