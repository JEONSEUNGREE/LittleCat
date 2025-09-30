export interface Task {
  id: string;
  title: string;
  description?: string;
  impactScore: number; // 1-10
  timeSpent: number; // minutes
  category: 'work' | 'personal' | 'learning' | 'health' | 'social';
  completedAt?: Date;
  createdAt: Date;
  tags: string[];
}

export interface ImpactMetrics {
  totalImpact: number;
  averageImpact: number;
  highImpactTasks: number;
  totalTimeSpent: number;
  efficiency: number; // impact per hour
}

export interface DailyStats {
  date: string;
  metrics: ImpactMetrics;
  tasks: Task[];
}