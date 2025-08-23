import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, DailyProgress } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  progress: DailyProgress[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'longestStreak' | 'completedDates' | 'isArchived'>) => void;
  toggleHabitCompletion: (habitId: string, date?: string) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  archiveHabit: (id: string) => void;
  getHabitProgress: (habitId: string, date: string) => boolean;
  getTodayProgress: () => { completed: number; total: number; percentage: number };
}

const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      progress: [],

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date(),
          streak: 0,
          longestStreak: 0,
          completedDates: [],
          isArchived: false,
        };
        set((state) => ({ habits: [...state.habits, newHabit] }));
      },

      toggleHabitCompletion: (habitId, date = new Date().toISOString().split('T')[0]) => {
        set((state) => {
          const habit = state.habits.find(h => h.id === habitId);
          if (!habit) return state;

          const progressIndex = state.progress.findIndex(
            p => p.habitId === habitId && p.date === date
          );

          let newProgress = [...state.progress];
          let updatedHabit = { ...habit };

          if (progressIndex >= 0) {
            newProgress.splice(progressIndex, 1);
            const dateIndex = updatedHabit.completedDates.indexOf(date);
            if (dateIndex >= 0) {
              updatedHabit.completedDates.splice(dateIndex, 1);
            }
            updatedHabit.streak = calculateStreak(updatedHabit.completedDates);
          } else {
            newProgress.push({
              habitId,
              date,
              completed: true,
            });
            updatedHabit.completedDates.push(date);
            updatedHabit.lastCompletedAt = new Date(date);
            updatedHabit.streak = calculateStreak(updatedHabit.completedDates);
            updatedHabit.longestStreak = Math.max(updatedHabit.longestStreak, updatedHabit.streak);
          }

          const newHabits = state.habits.map(h => 
            h.id === habitId ? updatedHabit : h
          );

          return {
            habits: newHabits,
            progress: newProgress,
          };
        });
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map(h =>
            h.id === id ? { ...h, ...updates } : h
          ),
        }));
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter(h => h.id !== id),
          progress: state.progress.filter(p => p.habitId !== id),
        }));
      },

      archiveHabit: (id) => {
        set((state) => ({
          habits: state.habits.map(h =>
            h.id === id ? { ...h, isArchived: true } : h
          ),
        }));
      },

      getHabitProgress: (habitId, date) => {
        const state = get();
        return state.progress.some(
          p => p.habitId === habitId && p.date === date && p.completed
        );
      },

      getTodayProgress: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const activeHabits = state.habits.filter(h => !h.isArchived);
        const completedToday = activeHabits.filter(h =>
          state.progress.some(p => p.habitId === h.id && p.date === today && p.completed)
        ).length;

        return {
          completed: completedToday,
          total: activeHabits.length,
          percentage: activeHabits.length > 0 ? Math.round((completedToday / activeHabits.length) * 100) : 0,
        };
      },
    }),
    {
      name: 'habit-storage',
    }
  )
);

function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      streak++;
      currentDate = new Date(date);
    } else {
      break;
    }
  }
  
  return streak;
}

export default useHabitStore;