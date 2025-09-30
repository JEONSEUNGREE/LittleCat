import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, ImpactMetrics, DailyStats } from '../types';

interface AppStore {
  tasks: Task[];
  currentDate: string;
  dailyStats: DailyStats[];
  
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  
  getTodaysTasks: () => Task[];
  getTodaysMetrics: () => ImpactMetrics;
  getWeeklyStats: () => DailyStats[];
}

const calculateMetrics = (tasks: Task[]): ImpactMetrics => {
  const completedTasks = tasks.filter(t => t.completedAt);
  
  if (completedTasks.length === 0) {
    return {
      totalImpact: 0,
      averageImpact: 0,
      highImpactTasks: 0,
      totalTimeSpent: 0,
      efficiency: 0
    };
  }
  
  const totalImpact = completedTasks.reduce((sum, t) => sum + t.impactScore, 0);
  const totalTime = completedTasks.reduce((sum, t) => sum + t.timeSpent, 0);
  const highImpact = completedTasks.filter(t => t.impactScore >= 7).length;
  
  return {
    totalImpact,
    averageImpact: totalImpact / completedTasks.length,
    highImpactTasks: highImpact,
    totalTimeSpent: totalTime,
    efficiency: totalTime > 0 ? (totalImpact / totalTime) * 60 : 0 // impact per hour
  };
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      currentDate: new Date().toISOString().split('T')[0],
      dailyStats: [],
      
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date()
        };
        
        set(state => ({
          tasks: [...state.tasks, newTask]
        }));
      },
      
      completeTask: (taskId) => {
        set(state => ({
          tasks: state.tasks.map(task => 
            task.id === taskId 
              ? { ...task, completedAt: new Date() }
              : task
          )
        }));
      },
      
      deleteTask: (taskId) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId)
        }));
      },
      
      updateTask: (taskId, updates) => {
        set(state => ({
          tasks: state.tasks.map(task => 
            task.id === taskId 
              ? { ...task, ...updates }
              : task
          )
        }));
      },
      
      getTodaysTasks: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().tasks.filter(task => {
          const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
          return taskDate === today;
        });
      },
      
      getTodaysMetrics: () => {
        const todaysTasks = get().getTodaysTasks();
        return calculateMetrics(todaysTasks);
      },
      
      getWeeklyStats: () => {
        const tasks = get().tasks;
        const stats: DailyStats[] = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          const dayTasks = tasks.filter(task => {
            const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
            return taskDate === dateStr;
          });
          
          stats.push({
            date: dateStr,
            tasks: dayTasks,
            metrics: calculateMetrics(dayTasks)
          });
        }
        
        return stats;
      }
    }),
    {
      name: 'daily-impact-store'
    }
  )
);