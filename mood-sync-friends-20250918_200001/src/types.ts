export interface Mood {
  id: string;
  emoji: string;
  name: string;
  color: string;
  gradient: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  currentMood: Mood | null;
  lastUpdate: Date;
  status: 'online' | 'offline' | 'away';
  moodHistory: MoodEntry[];
}

export interface MoodEntry {
  mood: Mood;
  timestamp: Date;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  currentMood: Mood | null;
  moodHistory: MoodEntry[];
}