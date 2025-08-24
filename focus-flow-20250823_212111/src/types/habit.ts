export type HabitColor = 
  | 'blue' 
  | 'green' 
  | 'purple' 
  | 'red' 
  | 'yellow' 
  | 'pink' 
  | 'indigo' 
  | 'gray';

export type HabitIcon = 
  | 'target'
  | 'heart'
  | 'book'
  | 'dumbbell'
  | 'coffee'
  | 'moon'
  | 'sun'
  | 'droplet'
  | 'zap'
  | 'star'
  | 'leaf'
  | 'brain';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: HabitColor;
  icon: HabitIcon;
  createdAt: Date;
  updatedAt: Date;
  targetDays?: number;
  isArchived: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completedAt: Date;
  note?: string;
}

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  completionRate: number; // percentage
  lastCompletion?: Date;
}

export interface HabitWithStats extends Habit {
  stats: HabitStats;
  isCompletedToday: boolean;
  completions: HabitCompletion[];
}

export interface ViewMode {
  type: 'list' | 'calendar' | 'stats';
}

export interface AppSettings {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  firstDayOfWeek: 'sunday' | 'monday';
  reminderTime?: string;
}

export interface HabitFormData {
  name: string;
  description: string;
  color: HabitColor;
  icon: HabitIcon;
  targetDays?: number;
}