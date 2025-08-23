export interface Habit {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  targetFrequency: 'daily' | 'weekly' | 'monthly';
  targetCount: number;
  createdAt: Date;
  lastCompletedAt?: Date;
  streak: number;
  longestStreak: number;
  completedDates: string[];
  isArchived: boolean;
}

export interface DailyProgress {
  habitId: string;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface Stats {
  totalHabits: number;
  activeHabits: number;
  totalStreakDays: number;
  completionRate: number;
  bestStreak: number;
}