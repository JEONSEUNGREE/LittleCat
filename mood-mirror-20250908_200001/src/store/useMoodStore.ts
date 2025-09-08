import { create } from 'zustand';
import { Mood, User, MoodReaction, MoodType, MOOD_COLORS } from '../types';

interface MoodStore {
  currentUser: User | null;
  currentMood: Mood | null;
  recentMoods: Mood[];
  communityMoods: Mood[];
  reactions: MoodReaction[];
  
  setCurrentUser: (user: User) => void;
  setMood: (moodType: MoodType, intensity: number) => void;
  addReaction: (moodId: string, type: 'resonate' | 'support' | 'understand') => void;
  fetchCommunityMoods: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const mockCommunityMoods: Mood[] = [
  {
    id: '1',
    color: MOOD_COLORS.joy,
    intensity: 0.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    pattern: 'circles',
    userId: 'user1'
  },
  {
    id: '2',
    color: MOOD_COLORS.calm,
    intensity: 0.6,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    pattern: 'waves',
    userId: 'user2'
  },
  {
    id: '3',
    color: MOOD_COLORS.creative,
    intensity: 0.9,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    pattern: 'spiral',
    userId: 'user3'
  },
  {
    id: '4',
    color: MOOD_COLORS.peaceful,
    intensity: 0.7,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    pattern: 'gradient',
    userId: 'user4'
  }
];

export const useMoodStore = create<MoodStore>((set, get) => ({
  currentUser: {
    id: generateId(),
    name: 'Anonymous User'
  },
  currentMood: null,
  recentMoods: [],
  communityMoods: mockCommunityMoods,
  reactions: [],
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  setMood: (moodType, intensity) => {
    const { currentUser, recentMoods } = get();
    if (!currentUser) return;
    
    const newMood: Mood = {
      id: generateId(),
      color: MOOD_COLORS[moodType],
      intensity,
      timestamp: new Date(),
      pattern: ['waves', 'circles', 'dots', 'gradient', 'spiral'][Math.floor(Math.random() * 5)] as any,
      userId: currentUser.id
    };
    
    set({
      currentMood: newMood,
      recentMoods: [newMood, ...recentMoods.slice(0, 9)]
    });
  },
  
  addReaction: (moodId, type) => {
    const { currentUser, reactions } = get();
    if (!currentUser) return;
    
    const newReaction: MoodReaction = {
      id: generateId(),
      moodId,
      userId: currentUser.id,
      type,
      timestamp: new Date()
    };
    
    set({
      reactions: [...reactions, newReaction]
    });
  },
  
  fetchCommunityMoods: () => {
    // Simulate fetching community moods
    const newMood: Mood = {
      id: generateId(),
      color: Object.values(MOOD_COLORS)[Math.floor(Math.random() * Object.values(MOOD_COLORS).length)],
      intensity: Math.random(),
      timestamp: new Date(),
      pattern: ['waves', 'circles', 'dots', 'gradient', 'spiral'][Math.floor(Math.random() * 5)] as any,
      userId: `user${Math.floor(Math.random() * 100)}`
    };
    
    set(state => ({
      communityMoods: [newMood, ...state.communityMoods.slice(0, 19)]
    }));
  }
}))