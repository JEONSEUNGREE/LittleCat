export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays?: number[];
  completedDates: string[];
  createdAt: string;
  streak: number;
  bestStreak: number;
  totalCompleted: number;
}