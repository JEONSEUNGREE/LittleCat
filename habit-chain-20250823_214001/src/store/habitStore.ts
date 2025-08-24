import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Habit, 
  HabitCompletion, 
  HabitStats, 
  HabitWithStats, 
  HabitFormData, 
  ViewMode, 
  AppSettings 
} from '../types/habit';
import { format, startOfDay, differenceInDays } from 'date-fns';

interface HabitStore {
  // State
  habits: Habit[];
  completions: HabitCompletion[];
  viewMode: ViewMode;
  settings: AppSettings;
  isModalOpen: boolean;
  editingHabit: Habit | null;

  // Computed getters
  getHabitsWithStats: () => HabitWithStats[];
  getHabitStats: (habitId: string) => HabitStats;
  getTodayCompletions: () => HabitCompletion[];
  getOverallStats: () => {
    totalHabits: number;
    completedToday: number;
    averageStreak: number;
    totalCompletions: number;
  };

  // Actions
  addHabit: (data: HabitFormData) => void;
  updateHabit: (id: string, data: Partial<HabitFormData>) => void;
  deleteHabit: (id: string) => void;
  archiveHabit: (id: string) => void;
  
  toggleHabitCompletion: (habitId: string, date?: string) => void;
  addHabitCompletion: (habitId: string, date?: string, note?: string) => void;
  removeHabitCompletion: (habitId: string, date?: string) => void;
  
  setViewMode: (mode: ViewMode) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  openModal: (habit?: Habit) => void;
  closeModal: () => void;
  
  // Utility functions
  calculateStreak: (habitId: string, endDate?: Date) => number;
  getCompletionDates: (habitId: string) => string[];
  exportData: () => string;
  importData: (data: string) => void;
  resetAllData: () => void;
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const calculateHabitStats = (habit: Habit, completions: HabitCompletion[]): HabitStats => {
  const habitCompletions = completions.filter(c => c.habitId === habit.id);
  
  if (habitCompletions.length === 0) {
    return {
      habitId: habit.id,
      currentStreak: 0,
      longestStreak: 0,
      totalCompletions: 0,
      completionRate: 0,
    };
  }

  // Sort completions by date
  const sortedCompletions = habitCompletions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalCompletions = sortedCompletions.length;
  const lastCompletion = new Date(sortedCompletions[sortedCompletions.length - 1].completedAt);

  // Calculate current streak
  let currentStreak = 0;
  const today = startOfDay(new Date());
  let checkDate = today;

  // If completed today, start from today, otherwise start from yesterday
  const isCompletedToday = sortedCompletions.some(c => c.date === format(today, 'yyyy-MM-dd'));
  if (!isCompletedToday) {
    checkDate = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  }

  while (checkDate >= new Date(habit.createdAt)) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    const hasCompletion = sortedCompletions.some(c => c.date === dateStr);
    
    if (hasCompletion) {
      currentStreak++;
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  const allDates = sortedCompletions.map(c => c.date);
  
  if (allDates.length > 0) {
    const startDate = new Date(allDates[0]);
    const endDate = new Date();
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = format(d, 'yyyy-MM-dd');
      if (allDates.includes(dateStr)) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
  }

  // Calculate completion rate
  const daysSinceCreated = differenceInDays(new Date(), new Date(habit.createdAt)) + 1;
  const completionRate = Math.round((totalCompletions / daysSinceCreated) * 100);

  return {
    habitId: habit.id,
    currentStreak,
    longestStreak,
    totalCompletions,
    completionRate: Math.min(completionRate, 100),
    lastCompletion,
  };
};

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      // Initial state
      habits: [],
      completions: [],
      viewMode: { type: 'list' },
      settings: {
        notifications: true,
        theme: 'system',
        firstDayOfWeek: 'monday',
      },
      isModalOpen: false,
      editingHabit: null,

      // Computed getters
      getHabitsWithStats: () => {
        const { habits, completions } = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        
        return habits
          .filter(habit => !habit.isArchived)
          .map(habit => {
            const stats = calculateHabitStats(habit, completions);
            const isCompletedToday = completions.some(
              c => c.habitId === habit.id && c.date === today
            );
            const habitCompletions = completions.filter(c => c.habitId === habit.id);

            return {
              ...habit,
              stats,
              isCompletedToday,
              completions: habitCompletions,
            };
          })
          .sort((a, b) => {
            // Sort by completion status (incomplete first), then by creation date
            if (a.isCompletedToday !== b.isCompletedToday) {
              return a.isCompletedToday ? 1 : -1;
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
      },

      getHabitStats: (habitId: string) => {
        const { habits, completions } = get();
        const habit = habits.find(h => h.id === habitId);
        if (!habit) {
          return {
            habitId,
            currentStreak: 0,
            longestStreak: 0,
            totalCompletions: 0,
            completionRate: 0,
          };
        }
        return calculateHabitStats(habit, completions);
      },

      getTodayCompletions: () => {
        const { completions } = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        return completions.filter(c => c.date === today);
      },

      getOverallStats: () => {
        const { habits, completions } = get();
        const activeHabits = habits.filter(h => !h.isArchived);
        const todayCompletions = get().getTodayCompletions();
        
        const averageStreak = activeHabits.length > 0 
          ? activeHabits.reduce((sum, habit) => {
              const stats = calculateHabitStats(habit, completions);
              return sum + stats.currentStreak;
            }, 0) / activeHabits.length
          : 0;

        return {
          totalHabits: activeHabits.length,
          completedToday: todayCompletions.length,
          averageStreak: Math.round(averageStreak * 10) / 10,
          totalCompletions: completions.length,
        };
      },

      // Actions
      addHabit: (data: HabitFormData) => {
        const newHabit: Habit = {
          id: generateId(),
          name: data.name,
          description: data.description,
          color: data.color,
          icon: data.icon,
          createdAt: new Date(),
          updatedAt: new Date(),
          targetDays: data.targetDays,
          isArchived: false,
        };

        set(state => ({
          habits: [...state.habits, newHabit],
          isModalOpen: false,
          editingHabit: null,
        }));
      },

      updateHabit: (id: string, data: Partial<HabitFormData>) => {
        set(state => ({
          habits: state.habits.map(habit =>
            habit.id === id
              ? { ...habit, ...data, updatedAt: new Date() }
              : habit
          ),
          isModalOpen: false,
          editingHabit: null,
        }));
      },

      deleteHabit: (id: string) => {
        set(state => ({
          habits: state.habits.filter(habit => habit.id !== id),
          completions: state.completions.filter(completion => completion.habitId !== id),
        }));
      },

      archiveHabit: (id: string) => {
        set(state => ({
          habits: state.habits.map(habit =>
            habit.id === id
              ? { ...habit, isArchived: true, updatedAt: new Date() }
              : habit
          ),
        }));
      },

      toggleHabitCompletion: (habitId: string, date?: string) => {
        const targetDate = date || format(new Date(), 'yyyy-MM-dd');
        const { completions } = get();
        
        const existingCompletion = completions.find(
          c => c.habitId === habitId && c.date === targetDate
        );

        if (existingCompletion) {
          get().removeHabitCompletion(habitId, targetDate);
        } else {
          get().addHabitCompletion(habitId, targetDate);
        }
      },

      addHabitCompletion: (habitId: string, date?: string, note?: string) => {
        const targetDate = date || format(new Date(), 'yyyy-MM-dd');
        const newCompletion: HabitCompletion = {
          id: generateId(),
          habitId,
          date: targetDate,
          completedAt: new Date(),
          note,
        };

        set(state => ({
          completions: [...state.completions, newCompletion],
        }));
      },

      removeHabitCompletion: (habitId: string, date?: string) => {
        const targetDate = date || format(new Date(), 'yyyy-MM-dd');
        
        set(state => ({
          completions: state.completions.filter(
            c => !(c.habitId === habitId && c.date === targetDate)
          ),
        }));
      },

      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode });
      },

      updateSettings: (newSettings: Partial<AppSettings>) => {
        set(state => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      openModal: (habit?: Habit) => {
        set({
          isModalOpen: true,
          editingHabit: habit || null,
        });
      },

      closeModal: () => {
        set({
          isModalOpen: false,
          editingHabit: null,
        });
      },

      calculateStreak: (habitId: string, endDate?: Date) => {
        const { completions } = get();
        const habitCompletions = completions
          .filter(c => c.habitId === habitId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (habitCompletions.length === 0) return 0;

        let streak = 0;
        const end = endDate || new Date();
        let currentDate = startOfDay(end);

        while (habitCompletions.some(c => c.date === format(currentDate, 'yyyy-MM-dd'))) {
          streak++;
          currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        }

        return streak;
      },

      getCompletionDates: (habitId: string) => {
        const { completions } = get();
        return completions
          .filter(c => c.habitId === habitId)
          .map(c => c.date)
          .sort();
      },

      exportData: () => {
        const { habits, completions, settings } = get();
        return JSON.stringify({ habits, completions, settings }, null, 2);
      },

      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.habits && parsed.completions) {
            set({
              habits: parsed.habits,
              completions: parsed.completions,
              settings: parsed.settings || get().settings,
            });
          }
        } catch (error) {
          console.error('Failed to import data:', error);
        }
      },

      resetAllData: () => {
        set({
          habits: [],
          completions: [],
          viewMode: { type: 'list' },
          isModalOpen: false,
          editingHabit: null,
        });
      },
    }),
    {
      name: 'habit-chain-storage',
      version: 1,
    }
  )
);