import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  description?: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // in minutes
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  assignedTime?: string
  energyLevel?: number
}

export interface EnergyEntry {
  id: string
  timestamp: string
  level: number // 1-5
  note?: string
}

interface EnergyStore {
  tasks: Task[]
  energyEntries: EnergyEntry[]
  currentEnergy: number
  
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
  
  addEnergyEntry: (level: number, note?: string) => void
  updateCurrentEnergy: (level: number) => void
  
  getOptimalTasksForEnergy: (energy: number) => Task[]
  getEnergyPattern: () => { hour: number; avgEnergy: number }[]
}

export const useEnergyStore = create<EnergyStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      energyEntries: [],
      currentEnergy: 3,

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now().toString(),
              completed: false,
            },
          ],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      toggleTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      addEnergyEntry: (level, note) => {
        const entry: EnergyEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          level,
          note,
        }
        set((state) => ({
          energyEntries: [...state.energyEntries, entry],
          currentEnergy: level,
        }))
      },

      updateCurrentEnergy: (level) =>
        set({ currentEnergy: level }),

      getOptimalTasksForEnergy: (energy) => {
        const { tasks } = get()
        const incompleteTasks = tasks.filter((t) => !t.completed)
        
        if (energy >= 4) {
          // High energy: hard tasks and high priority
          return incompleteTasks
            .filter((t) => t.difficulty === 'hard' || t.priority === 'high')
            .sort((a, b) => {
              if (a.priority === b.priority) return 0
              if (a.priority === 'high') return -1
              return 1
            })
        } else if (energy >= 2) {
          // Medium energy: medium tasks
          return incompleteTasks
            .filter((t) => t.difficulty === 'medium')
            .sort((a, b) => {
              if (a.priority === b.priority) return 0
              if (a.priority === 'high') return -1
              if (a.priority === 'medium' && b.priority === 'low') return -1
              return 1
            })
        } else {
          // Low energy: easy tasks
          return incompleteTasks
            .filter((t) => t.difficulty === 'easy')
            .sort((a, b) => a.estimatedTime - b.estimatedTime)
        }
      },

      getEnergyPattern: () => {
        const { energyEntries } = get()
        const hourlyData: { [hour: number]: number[] } = {}
        
        energyEntries.forEach((entry) => {
          const hour = new Date(entry.timestamp).getHours()
          if (!hourlyData[hour]) hourlyData[hour] = []
          hourlyData[hour].push(entry.level)
        })
        
        return Object.entries(hourlyData).map(([hour, levels]) => ({
          hour: parseInt(hour),
          avgEnergy: levels.reduce((a, b) => a + b, 0) / levels.length,
        })).sort((a, b) => a.hour - b.hour)
      },
    }),
    {
      name: 'energy-store',
    }
  )
)