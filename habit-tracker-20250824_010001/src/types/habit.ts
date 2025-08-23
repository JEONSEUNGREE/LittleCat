export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  currentStreak: number;
  bestStreak: number;
  completedDates: string[];
  createdAt: Date;
  category: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
  note?: string;
}