import { create } from 'zustand';
import { Habit, HabitCompletion } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  completions: HabitCompletion[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'currentStreak' | 'bestStreak' | 'completedDates'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  getHabitCompletions: (habitId: string) => HabitCompletion[];
  getTodayProgress: () => { completed: number; total: number; percentage: number };
  updateStreaks: () => void;
}

const useHabitStore = create<HabitStore>()((set, get) => ({
  habits: [],
  completions: [],

  addHabit: (habitData) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
      currentStreak: 0,
      bestStreak: 0,
      completedDates: [],
    };

    set((state) => ({
      habits: [...state.habits, newHabit],
    }));
  },

  updateHabit: (id, updates) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, ...updates } : habit
      ),
    }));
  },

  deleteHabit: (id) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
      completions: state.completions.filter((comp) => comp.habitId !== id),
    }));
  },

  toggleHabitCompletion: (habitId, date) => {
    const state = get();
    const existingCompletion = state.completions.find(
      (comp) => comp.habitId === habitId && comp.date === date
    );

    if (existingCompletion) {
      set((state) => ({
        completions: state.completions.filter(
          (comp) => !(comp.habitId === habitId && comp.date === date)
        ),
        habits: state.habits.map((habit) =>
          habit.id === habitId
            ? {
                ...habit,
                completedDates: habit.completedDates.filter((d) => d !== date),
              }
            : habit
        ),
      }));
    } else {
      const newCompletion: HabitCompletion = {
        habitId,
        date,
        completed: true,
      };

      set((state) => ({
        completions: [...state.completions, newCompletion],
        habits: state.habits.map((habit) =>
          habit.id === habitId
            ? {
                ...habit,
                completedDates: [...habit.completedDates, date],
              }
            : habit
        ),
      }));
    }

    get().updateStreaks();
  },

  getHabitCompletions: (habitId) => {
    return get().completions.filter((comp) => comp.habitId === habitId);
  },

  getTodayProgress: () => {
    const today = new Date().toISOString().split('T')[0];
    const habits = get().habits;
    const todayCompletions = get().completions.filter(
      (comp) => comp.date === today && comp.completed
    );

    const total = habits.length;
    const completed = todayCompletions.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  },

  updateStreaks: () => {
    set((state) => ({
      habits: state.habits.map((habit) => {
        const sortedDates = [...habit.completedDates].sort();
        let currentStreak = 0;
        let maxStreak = 0;
        let tempStreak = 0;
        let lastDate: Date | null = null;

        for (const dateStr of sortedDates) {
          const date = new Date(dateStr);
          
          if (!lastDate) {
            tempStreak = 1;
          } else {
            const dayDiff = Math.floor((date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (dayDiff === 1) {
              tempStreak++;
            } else {
              maxStreak = Math.max(maxStreak, tempStreak);
              tempStreak = 1;
            }
          }
          
          lastDate = date;
        }

        maxStreak = Math.max(maxStreak, tempStreak);

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        
        if (sortedDates.includes(today)) {
          const todayIndex = sortedDates.indexOf(today);
          currentStreak = 1;
          
          for (let i = todayIndex - 1; i >= 0; i--) {
            const prevDate = new Date(sortedDates[i]);
            const nextDate = new Date(sortedDates[i + 1]);
            const dayDiff = Math.floor((nextDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === 1) {
              currentStreak++;
            } else {
              break;
            }
          }
        } else if (sortedDates.includes(yesterday)) {
          const yesterdayIndex = sortedDates.indexOf(yesterday);
          currentStreak = 1;
          
          for (let i = yesterdayIndex - 1; i >= 0; i--) {
            const prevDate = new Date(sortedDates[i]);
            const nextDate = new Date(sortedDates[i + 1]);
            const dayDiff = Math.floor((nextDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === 1) {
              currentStreak++;
            } else {
              break;
            }
          }
        } else {
          currentStreak = 0;
        }

        return {
          ...habit,
          currentStreak,
          bestStreak: Math.max(maxStreak, currentStreak),
        };
      }),
    }));
  },
}));

export default useHabitStore;