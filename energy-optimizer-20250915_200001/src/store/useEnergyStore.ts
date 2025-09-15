import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { EnergyEntry, Task, EnergyPattern } from '../types';

interface EnergyStore {
  entries: EnergyEntry[];
  tasks: Task[];
  currentEnergy: number;
  
  addEntry: (entry: Omit<EnergyEntry, 'id'>) => void;
  updateCurrentEnergy: (level: number) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  getEnergyPatterns: () => EnergyPattern[];
  getOptimalTaskTime: (energyRequired: number) => Date | null;
  clearOldEntries: () => void;
}

export const useEnergyStore = create<EnergyStore>()(
  persist(
    (set, get) => ({
      entries: [],
      tasks: [],
      currentEnergy: 5,

      addEntry: (entry) =>
        set((state) => ({
          entries: [
            ...state.entries,
            {
              ...entry,
              id: Date.now().toString(),
              timestamp: new Date(),
            },
          ],
        })),

      updateCurrentEnergy: (level) =>
        set(() => ({
          currentEnergy: level,
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now().toString(),
            },
          ],
        })),

      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      getEnergyPatterns: () => {
        const entries = get().entries;
        const patterns: Map<number, { total: number; count: number }> = new Map();

        entries.forEach((entry) => {
          const hour = new Date(entry.timestamp).getHours();
          const current = patterns.get(hour) || { total: 0, count: 0 };
          patterns.set(hour, {
            total: current.total + entry.level,
            count: current.count + 1,
          });
        });

        return Array.from(patterns.entries()).map(([hour, data]) => ({
          hour,
          averageLevel: data.total / data.count,
          sampleCount: data.count,
        })).sort((a, b) => a.hour - b.hour);
      },

      getOptimalTaskTime: (energyRequired) => {
        const patterns = get().getEnergyPatterns();
        const now = new Date();
        const currentHour = now.getHours();
        
        // Find the next hour with sufficient energy
        const optimalHour = patterns.find(
          (p) => p.hour >= currentHour && p.averageLevel >= energyRequired
        );

        if (optimalHour) {
          const optimal = new Date();
          optimal.setHours(optimalHour.hour, 0, 0, 0);
          return optimal;
        }

        return null;
      },

      clearOldEntries: () =>
        set((state) => {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          return {
            entries: state.entries.filter(
              (entry) => new Date(entry.timestamp) > thirtyDaysAgo
            ),
          };
        }),
    }),
    {
      name: 'energy-optimizer-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);