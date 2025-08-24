import { create } from 'zustand'

export interface Habit {
  id: string
  title: string
  description: string
  icon: string
  color: string
  streak: number
  completed: boolean
  lastCompleted?: string
  createdAt: string
  xp: number
}

interface HabitStore {
  habits: Habit[]
  totalXP: number
  level: number
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'completed' | 'createdAt' | 'xp'>) => void
  toggleHabit: (id: string) => void
  deleteHabit: (id: string) => void
  calculateLevel: () => void
}

const useHabitStore = create<HabitStore>((set) => ({
  habits: [
    {
      id: '1',
      title: 'Morning Exercise',
      description: 'Start the day with energy',
      icon: '🏃',
      color: 'bg-pixel-green',
      streak: 5,
      completed: false,
      createdAt: new Date().toISOString(),
      xp: 50
    },
    {
      id: '2',
      title: 'Read 30 Minutes',
      description: 'Expand your knowledge',
      icon: '📚',
      color: 'bg-pixel-blue',
      streak: 3,
      completed: false,
      createdAt: new Date().toISOString(),
      xp: 30
    },
    {
      id: '3',
      title: 'Drink Water',
      description: 'Stay hydrated throughout the day',
      icon: '💧',
      color: 'bg-pixel-purple',
      streak: 10,
      completed: true,
      lastCompleted: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      xp: 20
    }
  ],
  totalXP: 0,
  level: 1,

  addHabit: (habitData) => set((state) => ({
    habits: [...state.habits, {
      ...habitData,
      id: Date.now().toString(),
      streak: 0,
      completed: false,
      createdAt: new Date().toISOString(),
      xp: Math.floor(Math.random() * 50) + 10
    }]
  })),

  toggleHabit: (id) => set((state) => {
    const today = new Date().toDateString()
    const newHabits = state.habits.map(habit => {
      if (habit.id === id) {
        const lastCompletedDate = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : null
        const alreadyCompletedToday = lastCompletedDate === today
        
        if (!alreadyCompletedToday && !habit.completed) {
          return {
            ...habit,
            completed: true,
            streak: habit.streak + 1,
            lastCompleted: new Date().toISOString()
          }
        } else if (habit.completed && lastCompletedDate === today) {
          return {
            ...habit,
            completed: false,
            streak: Math.max(0, habit.streak - 1)
          }
        }
      }
      return habit
    })
    
    const newTotalXP = newHabits.reduce((sum, habit) => 
      habit.completed ? sum + habit.xp : sum, 0
    )
    
    return {
      habits: newHabits,
      totalXP: newTotalXP
    }
  }),

  deleteHabit: (id) => set((state) => ({
    habits: state.habits.filter(habit => habit.id !== id)
  })),

  calculateLevel: () => set((state) => ({
    level: Math.floor(state.totalXP / 100) + 1
  }))
}))

export default useHabitStore