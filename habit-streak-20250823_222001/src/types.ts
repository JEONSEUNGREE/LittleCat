export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays?: number[];
  streak: number;
  bestStreak: number;
  completedDates: string[];
  createdAt: string;
  lastCompleted?: string;
}

export interface DayStatus {
  date: string;
  completed: boolean;
  habits: string[];
}