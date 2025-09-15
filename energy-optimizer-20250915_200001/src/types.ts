export interface EnergyEntry {
  id: string;
  timestamp: Date;
  level: number; // 1-10
  activity?: string;
  notes?: string;
  mood?: 'great' | 'good' | 'neutral' | 'tired' | 'exhausted';
}

export interface EnergyPattern {
  hour: number;
  averageLevel: number;
  sampleCount: number;
}

export interface Task {
  id: string;
  title: string;
  estimatedEnergy: number; // 1-10 energy required
  duration: number; // minutes
  completed: boolean;
  scheduledTime?: Date;
}