export interface Habit {
  id: string;
  title: string;
  emoji: string;
  streak: number;
  bestStreak: number;
  completedDates: string[];
  color: string;
  createdAt: string;
  targetDays: number;
}

export interface HabitStats {
  totalCompleted: number;
  currentStreak: number;
  bestStreak: number;
  completionRate: number;
}