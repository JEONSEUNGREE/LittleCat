import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, HabitLog } from '../types/habit';

interface HabitStore {
  habits: Habit[];
  logs: HabitLog[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak'>) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitToday: (habitId: string) => void;
  getHabitLogs: (habitId: string) => HabitLog[];
  getTodayLog: (habitId: string) => HabitLog | undefined;
  getStreak: (habitId: string) => number;
}

const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      logs: [],

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date(),
          streak: 0,
        };
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },

      updateHabit: (id, updatedData) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updatedData } : habit
          ),
        }));
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
          logs: state.logs.filter((log) => log.habitId !== id),
        }));
      },

      toggleHabitToday: (habitId) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const existingLog = get().logs.find(
          (log) =>
            log.habitId === habitId &&
            new Date(log.date).toDateString() === today.toDateString()
        );

        if (existingLog) {
          set((state) => ({
            logs: state.logs.map((log) =>
              log.id === existingLog.id
                ? { ...log, completed: !log.completed }
                : log
            ),
          }));
        } else {
          const newLog: HabitLog = {
            id: Date.now().toString(),
            habitId,
            date: today,
            completed: true,
          };
          set((state) => ({
            logs: [...state.logs, newLog],
          }));
        }

        // Update streak
        const streak = get().getStreak(habitId);
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId ? { ...habit, streak } : habit
          ),
        }));
      },

      getHabitLogs: (habitId) => {
        return get().logs.filter((log) => log.habitId === habitId);
      },

      getTodayLog: (habitId) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().logs.find(
          (log) =>
            log.habitId === habitId &&
            new Date(log.date).toDateString() === today.toDateString()
        );
      },

      getStreak: (habitId) => {
        const logs = get()
          .logs.filter((log) => log.habitId === habitId && log.completed)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (logs.length === 0) return 0;

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (const log of logs) {
          const logDate = new Date(log.date);
          logDate.setHours(0, 0, 0, 0);

          const daysDiff = Math.floor(
            (currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysDiff === streak) {
            streak++;
          } else {
            break;
          }
        }

        return streak;
      },
    }),
    {
      name: 'habit-tracker-storage',
    }
  )
);

export default useHabitStore;