export interface Habit {
  id: string
  name: string
  description?: string
  icon: string
  color: string
  frequency: 'daily' | 'weekly' | 'monthly'
  targetCount: number
  createdAt: Date
  completions: Completion[]
}

export interface Completion {
  date: string
  count: number
}

export interface HabitStats {
  totalHabits: number
  completedToday: number
  currentStreak: number
  bestStreak: number
  completionRate: number
}