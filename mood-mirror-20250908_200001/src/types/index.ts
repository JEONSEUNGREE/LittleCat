export interface Mood {
  id: string;
  color: string;
  intensity: number;
  timestamp: Date;
  pattern?: string;
  userId: string;
}

export interface MoodPattern {
  type: 'waves' | 'circles' | 'dots' | 'gradient' | 'spiral';
  speed: number;
  opacity: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  currentMood?: Mood;
}

export interface MoodReaction {
  id: string;
  moodId: string;
  userId: string;
  type: 'resonate' | 'support' | 'understand';
  timestamp: Date;
}

export const MOOD_COLORS = {
  joy: '#FFD700',
  calm: '#87CEEB',
  energy: '#FF6B6B',
  peaceful: '#98D8C8',
  melancholy: '#9B59B6',
  anxious: '#FF8C42',
  content: '#A8E6CF',
  creative: '#FFB7B2',
  focused: '#4A90E2',
  grateful: '#F7DC6F',
  hopeful: '#BB8FCE',
  neutral: '#BDC3C7'
} as const;

export type MoodType = keyof typeof MOOD_COLORS;