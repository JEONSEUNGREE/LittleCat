import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Quadrant, TaskStats } from '../types';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, quadrant: Quadrant) => void;
  toggleComplete: (id: string) => void;
  getTasksByQuadrant: (quadrant: Quadrant) => Task[];
  getStats: () => TaskStats;
  clearCompleted: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          completed: false,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      moveTask: (id, quadrant) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, quadrant } : task
          ),
        }));
      },

      toggleComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  completedAt: !task.completed ? new Date() : undefined,
                }
              : task
          ),
        }));
      },

      getTasksByQuadrant: (quadrant) => {
        return get().tasks.filter((task) => task.quadrant === quadrant);
      },

      getStats: () => {
        const tasks = get().tasks;
        const completedTasks = tasks.filter((t) => t.completed);
        
        const tasksByQuadrant = tasks.reduce((acc, task) => {
          acc[task.quadrant] = (acc[task.quadrant] || 0) + 1;
          return acc;
        }, {} as Record<Quadrant, number>);

        const totalEstimatedTime = tasks.reduce(
          (sum, task) => sum + (task.estimatedTime || 0),
          0
        );

        const totalActualTime = completedTasks.reduce(
          (sum, task) => sum + (task.actualTime || 0),
          0
        );

        return {
          totalTasks: tasks.length,
          completedTasks: completedTasks.length,
          totalEstimatedTime,
          totalActualTime,
          tasksByQuadrant,
        };
      },

      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        }));
      },
    }),
    {
      name: 'task-priority-matrix-storage',
    }
  )
);