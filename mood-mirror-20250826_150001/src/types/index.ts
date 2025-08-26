export type Mood = 'happy' | 'calm' | 'sad' | 'anxious' | 'angry' | 'excited' | 'neutral';

export interface MoodEntry {
  id: string;
  mood: Mood;
  intensity: number; // 1-5
  timestamp: Date;
  note?: string;
  color: string;
  pattern: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  currentMood?: MoodEntry;
}

export interface MoodMessage {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  timestamp: Date;
  isAnonymous: boolean;
}

export interface MoodStats {
  mood: Mood;
  count: number;
  percentage: number;
}