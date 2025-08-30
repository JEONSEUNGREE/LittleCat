import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit, CompletionRecord, UserStats } from '../types';

interface HabitStore {
  habits: Habit[];
  userStats: UserStats;
  selectedDate: Date;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streakData' | 'completions' | 'chainLinks'>) => void;
  removeHabit: (id: string) => void;
  toggleHabitCompletion: (habitId: string, date: Date) => void;
  updateStreak: (habitId: string) => void;
  setSelectedDate: (date: Date) => void;
  getHabitsByCategory: (category: string) => Habit[];
  getTodayProgress: () => number;
  updateUserStats: () => void;
}

const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      userStats: {
        totalHabits: 0,
        activeChains: 0,
        totalCompletions: 0,
        perfectDays: 0,
        currentMood: 'neutral',
        level: 1,
        experience: 0,
        nextLevelXP: 100,
      },
      selectedDate: new Date(),

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: Date.now().toString(),
          createdAt: new Date(),
          streakData: {
            currentStreak: 0,
            longestStreak: 0,
            totalCompletions: 0,
          },
          completions: [],
          chainLinks: [],
        };

        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
        get().updateUserStats();
      },

      removeHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((h) => h.id !== id),
        }));
        get().updateUserStats();
      },

      toggleHabitCompletion: (habitId, date) => {
        set((state) => {
          const habits = state.habits.map((habit) => {
            if (habit.id !== habitId) return habit;

            const dateStr = date.toDateString();
            const existingCompletion = habit.completions.find(
              (c) => new Date(c.date).toDateString() === dateStr
            );

            let newCompletions: CompletionRecord[];
            if (existingCompletion) {
              newCompletions = habit.completions.map((c) =>
                new Date(c.date).toDateString() === dateStr
                  ? { ...c, completed: !c.completed }
                  : c
              );
            } else {
              newCompletions = [
                ...habit.completions,
                {
                  date,
                  completed: true,
                },
              ];
            }

            // Update chain links
            const chainLinks = [...habit.chainLinks];
            if (newCompletions.find((c) => new Date(c.date).toDateString() === dateStr)?.completed) {
              chainLinks.push({
                id: Date.now().toString(),
                date,
                strength: 100,
              });
            }

            return {
              ...habit,
              completions: newCompletions,
              chainLinks,
            };
          });

          return { habits };
        });

        get().updateStreak(habitId);
        get().updateUserStats();
      },

      updateStreak: (habitId) => {
        set((state) => {
          const habits = state.habits.map((habit) => {
            if (habit.id !== habitId) return habit;

            const sortedCompletions = [...habit.completions]
              .filter((c) => c.completed)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            let currentStreak = 0;
            let tempStreak = 0;
            const today = new Date().toDateString();

            for (let i = 0; i < sortedCompletions.length; i++) {
              const completionDate = new Date(sortedCompletions[i].date);
              const dateStr = completionDate.toDateString();

              if (i === 0 && dateStr === today) {
                tempStreak = 1;
              } else if (i === 0 && dateStr === new Date(Date.now() - 86400000).toDateString()) {
                tempStreak = 1;
              } else if (i > 0) {
                const prevDate = new Date(sortedCompletions[i - 1].date);
                const dayDiff = Math.floor(
                  (prevDate.getTime() - completionDate.getTime()) / 86400000
                );
                if (dayDiff === 1) {
                  tempStreak++;
                } else {
                  break;
                }
              }
            }

            currentStreak = tempStreak;
            const longestStreak = Math.max(habit.streakData.longestStreak, currentStreak);
            const totalCompletions = sortedCompletions.length;

            return {
              ...habit,
              streakData: {
                currentStreak,
                longestStreak,
                totalCompletions,
                lastCompletedDate: sortedCompletions[0]?.date,
              },
            };
          });

          return { habits };
        });
      },

      setSelectedDate: (date) => set({ selectedDate: date }),

      getHabitsByCategory: (category) => {
        return get().habits.filter((h) => h.category === category);
      },

      getTodayProgress: () => {
        const { habits } = get();
        const today = new Date().toDateString();
        const totalHabits = habits.length;
        if (totalHabits === 0) return 0;

        const completedToday = habits.filter((habit) =>
          habit.completions.some(
            (c) => new Date(c.date).toDateString() === today && c.completed
          )
        ).length;

        return (completedToday / totalHabits) * 100;
      },

      updateUserStats: () => {
        const { habits } = get();
        const totalCompletions = habits.reduce(
          (sum, h) => sum + h.streakData.totalCompletions,
          0
        );
        const activeChains = habits.filter((h) => h.streakData.currentStreak > 0).length;

        // Calculate experience and level
        const experience = totalCompletions * 10;
        const level = Math.floor(experience / 100) + 1;
        const nextLevelXP = level * 100;

        set({
          userStats: {
            totalHabits: habits.length,
            activeChains,
            totalCompletions,
            perfectDays: 0, // Will implement perfect day calculation
            currentMood: 'good',
            level,
            experience: experience % 100,
            nextLevelXP,
          },
        });
      },
    }),
    {
      name: 'habit-chain-storage',
    }
  )
);

export default useHabitStore;