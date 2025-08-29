import { create } from 'zustand'

export interface Task {
  id: string
  title: string
  duration: number // in minutes
  color: string
  category: 'work' | 'personal' | 'health' | 'learning' | 'other'
  completed: boolean
}

export interface TimeBlock {
  id: string
  taskId: string | null
  startTime: string
  endTime: string
  date: string
}

interface TimeBlockStore {
  tasks: Task[]
  timeBlocks: TimeBlock[]
  addTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, task: Partial<Task>) => void
  deleteTask: (id: string) => void
  addTimeBlock: (block: Omit<TimeBlock, 'id'>) => void
  updateTimeBlock: (id: string, block: Partial<TimeBlock>) => void
  deleteTimeBlock: (id: string) => void
  assignTaskToBlock: (taskId: string, blockId: string) => void
  toggleTaskComplete: (taskId: string) => void
}

export const useTimeBlockStore = create<TimeBlockStore>((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Morning Workout',
      duration: 30,
      color: '#10b981',
      category: 'health',
      completed: false
    },
    {
      id: '2',
      title: 'Team Meeting',
      duration: 60,
      color: '#3b82f6',
      category: 'work',
      completed: false
    },
    {
      id: '3',
      title: 'Deep Work Session',
      duration: 120,
      color: '#8b5cf6',
      category: 'work',
      completed: false
    },
    {
      id: '4',
      title: 'Lunch Break',
      duration: 45,
      color: '#f59e0b',
      category: 'personal',
      completed: false
    },
    {
      id: '5',
      title: 'Learn TypeScript',
      duration: 90,
      color: '#ec4899',
      category: 'learning',
      completed: false
    }
  ],
  
  timeBlocks: [],
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
  })),
  
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id),
    timeBlocks: state.timeBlocks.map(block => 
      block.taskId === id ? { ...block, taskId: null } : block
    )
  })),
  
  addTimeBlock: (block) => set((state) => ({
    timeBlocks: [...state.timeBlocks, { ...block, id: Date.now().toString() }]
  })),
  
  updateTimeBlock: (id, updatedBlock) => set((state) => ({
    timeBlocks: state.timeBlocks.map(block => 
      block.id === id ? { ...block, ...updatedBlock } : block
    )
  })),
  
  deleteTimeBlock: (id) => set((state) => ({
    timeBlocks: state.timeBlocks.filter(block => block.id !== id)
  })),
  
  assignTaskToBlock: (taskId, blockId) => set((state) => ({
    timeBlocks: state.timeBlocks.map(block => 
      block.id === blockId ? { ...block, taskId } : block
    )
  })),
  
  toggleTaskComplete: (taskId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  }))
}))