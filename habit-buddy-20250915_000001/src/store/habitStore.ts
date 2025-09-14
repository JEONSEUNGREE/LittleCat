import { create } from 'zustand';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  targetCount: number;
  currentCount: number;
  completedToday: boolean;
  streak: number;
  createdAt: Date;
  completedDates: string[];
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  daysRemaining: number;
  totalDays: number;
  participants: Friend[];
  progress: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  habitsCompleted: number;
  isOnline: boolean;
}

interface Stats {
  totalCompleted: number;
  currentStreak: number;
  longestStreak: number;
  weeklyProgress: number[];
}

interface HabitStore {
  habits: Habit[];
  challenges: Challenge[];
  friends: Friend[];
  stats: Stats;
  addHabit: (habit: Omit<Habit, 'id' | 'currentCount' | 'completedToday' | 'streak' | 'createdAt' | 'completedDates'>) => void;
  toggleHabit: (id: string) => void;
  incrementHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  joinChallenge: (challenge: Challenge) => void;
  leaveChallenge: (id: string) => void;
  initializeApp: () => void;
}

const defaultFriends: Friend[] = [
  { id: '1', name: '지민', avatar: '👩', streak: 15, habitsCompleted: 89, isOnline: true },
  { id: '2', name: '민수', avatar: '👨', streak: 7, habitsCompleted: 45, isOnline: false },
  { id: '3', name: '서연', avatar: '👤', streak: 23, habitsCompleted: 156, isOnline: true },
  { id: '4', name: '준호', avatar: '🧑', streak: 3, habitsCompleted: 21, isOnline: true },
];

const defaultChallenges: Challenge[] = [
  {
    id: '1',
    name: '21일 운동 챌린지',
    description: '매일 30분 이상 운동하기',
    daysRemaining: 14,
    totalDays: 21,
    participants: defaultFriends.slice(0, 2),
    progress: 33,
  },
  {
    id: '2',
    name: '독서 습관 만들기',
    description: '매일 20페이지 이상 책 읽기',
    daysRemaining: 7,
    totalDays: 14,
    participants: defaultFriends.slice(1, 3),
    progress: 50,
  },
];

export const useHabitStore = create<HabitStore>()((set, get) => ({
  habits: [],
  challenges: defaultChallenges,
  friends: defaultFriends,
  stats: {
    totalCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyProgress: [65, 80, 45, 90, 70, 85, 60],
  },

  addHabit: (habitData) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      currentCount: 0,
      completedToday: false,
      streak: 0,
      createdAt: new Date(),
      completedDates: [],
    };
    set((state) => ({
      habits: [...state.habits, newHabit],
    }));
  },

  toggleHabit: (id) => {
    set((state) => {
      const today = new Date().toDateString();
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id === id) {
          const completedToday = !habit.completedToday;
          const completedDates = completedToday
            ? [...habit.completedDates, today]
            : habit.completedDates.filter(date => date !== today);
          
          return {
            ...habit,
            completedToday,
            currentCount: completedToday ? habit.targetCount : 0,
            streak: completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            completedDates,
          };
        }
        return habit;
      });

      const totalCompleted = updatedHabits.filter(h => h.completedToday).length;
      const allCompleted = totalCompleted === updatedHabits.length && updatedHabits.length > 0;

      return {
        habits: updatedHabits,
        stats: {
          ...state.stats,
          totalCompleted: state.stats.totalCompleted + (updatedHabits.find(h => h.id === id)?.completedToday ? 1 : -1),
          currentStreak: allCompleted ? state.stats.currentStreak + 1 : state.stats.currentStreak,
          longestStreak: Math.max(state.stats.longestStreak, state.stats.currentStreak),
        },
      };
    });
  },

  incrementHabit: (id) => {
    set((state) => {
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id === id) {
          const newCount = Math.min(habit.currentCount + 1, habit.targetCount);
          const completedToday = newCount >= habit.targetCount;
          const today = new Date().toDateString();
          const completedDates = completedToday && !habit.completedDates.includes(today)
            ? [...habit.completedDates, today]
            : habit.completedDates;
          
          return {
            ...habit,
            currentCount: newCount,
            completedToday,
            streak: completedToday && !habit.completedToday ? habit.streak + 1 : habit.streak,
            completedDates,
          };
        }
        return habit;
      });

      return { habits: updatedHabits };
    });
  },

  deleteHabit: (id) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    }));
  },

  joinChallenge: (challenge) => {
    set((state) => ({
      challenges: [...state.challenges, challenge],
    }));
  },

  leaveChallenge: (id) => {
    set((state) => ({
      challenges: state.challenges.filter((c) => c.id !== id),
    }));
  },

  initializeApp: () => {
    const state = get();
    if (state.habits.length === 0) {
      // Add default habits for new users
      const defaultHabits = [
        { name: '물 8잔 마시기', icon: '💧', color: 'bg-blue-500', targetCount: 8 },
        { name: '30분 운동', icon: '🏃', color: 'bg-green-500', targetCount: 1 },
        { name: '책 읽기', icon: '📚', color: 'bg-purple-500', targetCount: 1 },
      ];
      
      defaultHabits.forEach(habit => {
        state.addHabit(habit);
      });
    }
  },
}));