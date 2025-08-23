export interface Habit {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  targetFrequency: 'daily' | 'weekly' | 'monthly';
  targetCount: number;
  createdAt: Date;
  streak: number;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean;
  note?: string;
}