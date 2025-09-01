export interface Task {
  id: string;
  title: string;
  description?: string;
  quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
  createdAt: Date;
  completedAt?: Date;
  completed: boolean;
  tags?: string[];
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
}

export type Quadrant = Task['quadrant'];

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  totalEstimatedTime: number;
  totalActualTime: number;
  tasksByQuadrant: Record<Quadrant, number>;
}