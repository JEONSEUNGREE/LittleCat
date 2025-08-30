export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  targetFrequency: 'daily' | 'weekly' | 'custom';
  customFrequency?: number;
  createdAt: Date;
  category: HabitCategory;
  streakData: StreakData;
  completions: CompletionRecord[];
  chainLinks: ChainLink[];
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
  lastCompletedDate?: Date;
}

export interface CompletionRecord {
  date: Date;
  completed: boolean;
  notes?: string;
  mood?: 'great' | 'good' | 'neutral' | 'bad';
}

export interface ChainLink {
  id: string;
  date: Date;
  strength: number; // 0-100, represents the strength of the habit chain
  milestone?: string;
}

export type HabitCategory = 
  | 'health'
  | 'productivity'
  | 'learning'
  | 'fitness'
  | 'mindfulness'
  | 'social'
  | 'creative'
  | 'financial'
  | 'custom';

export interface UserStats {
  totalHabits: number;
  activeChains: number;
  totalCompletions: number;
  perfectDays: number;
  currentMood: 'great' | 'good' | 'neutral' | 'bad';
  level: number;
  experience: number;
  nextLevelXP: number;
}