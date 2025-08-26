import { create } from 'zustand';
import { Mood, MoodEntry, User, MoodMessage } from '../types';

interface MoodStore {
  currentUser: User | null;
  moodHistory: MoodEntry[];
  connectedUsers: User[];
  messages: MoodMessage[];
  
  setCurrentUser: (user: User) => void;
  addMoodEntry: (mood: Mood, intensity: number, note?: string) => void;
  addMessage: (message: MoodMessage) => void;
  generateMockUsers: () => void;
}

const moodColors: Record<Mood, string> = {
  happy: '#FFD93D',
  calm: '#6BCFFF',
  sad: '#4A90E2',
  anxious: '#F5A623',
  angry: '#FF6B6B',
  excited: '#FF69B4',
  neutral: '#95A5A6'
};

const moodPatterns: Record<Mood, string> = {
  happy: 'radial-gradient(circle, rgba(255,217,61,0.3) 0%, rgba(255,217,61,0.1) 100%)',
  calm: 'linear-gradient(180deg, rgba(107,207,255,0.3) 0%, rgba(107,207,255,0.1) 100%)',
  sad: 'radial-gradient(ellipse, rgba(74,144,226,0.3) 0%, rgba(74,144,226,0.1) 100%)',
  anxious: 'conic-gradient(from 180deg, rgba(245,166,35,0.3), rgba(245,166,35,0.1), rgba(245,166,35,0.3))',
  angry: 'radial-gradient(circle at 30% 30%, rgba(255,107,107,0.3) 0%, rgba(255,107,107,0.1) 100%)',
  excited: 'radial-gradient(circle at 70% 70%, rgba(255,105,180,0.3) 0%, rgba(255,105,180,0.1) 100%)',
  neutral: 'linear-gradient(135deg, rgba(149,165,166,0.3) 0%, rgba(149,165,166,0.1) 100%)'
};

export const useMoodStore = create<MoodStore>((set) => ({
  currentUser: null,
  moodHistory: [],
  connectedUsers: [],
  messages: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  addMoodEntry: (mood, intensity, note) => set((state) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity,
      timestamp: new Date(),
      note,
      color: moodColors[mood],
      pattern: moodPatterns[mood]
    };

    const updatedUser = state.currentUser 
      ? { ...state.currentUser, currentMood: newEntry }
      : null;

    return {
      moodHistory: [...state.moodHistory, newEntry],
      currentUser: updatedUser
    };
  }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  generateMockUsers: () => set(() => {
    const moods: Mood[] = ['happy', 'calm', 'sad', 'anxious', 'angry', 'excited', 'neutral'];
    const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery'];
    
    const mockUsers = names.map((name, index) => {
      const mood = moods[index % moods.length];
      const moodEntry: MoodEntry = {
        id: `${index}-${Date.now()}`,
        mood,
        intensity: Math.floor(Math.random() * 5) + 1,
        timestamp: new Date(),
        color: moodColors[mood],
        pattern: moodPatterns[mood]
      };

      return {
        id: index.toString(),
        username: name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        currentMood: moodEntry
      };
    });

    return { connectedUsers: mockUsers };
  })
}))