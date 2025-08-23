export interface Habit {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  targetDays: number[];
  completedDates: string[];
  createdAt: string;
  streak: number;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
}