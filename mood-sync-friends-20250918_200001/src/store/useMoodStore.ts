import { create } from 'zustand';
import { Mood, Friend, User, MoodEntry } from '../types';
import { MOODS } from '../constants/moods';

interface MoodStore {
  user: User;
  friends: Friend[];
  selectedMood: Mood | null;
  setUserMood: (mood: Mood, message?: string) => void;
  selectMood: (mood: Mood | null) => void;
  updateFriendMood: (friendId: string, mood: Mood) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
}

const generateRandomMoodHistory = (): MoodEntry[] => {
  const history: MoodEntry[] = [];
  const moodArray = Object.values(MOODS);
  
  for (let i = 0; i < 5; i++) {
    const randomMood = moodArray[Math.floor(Math.random() * moodArray.length)];
    history.push({
      mood: randomMood,
      timestamp: new Date(Date.now() - (i + 1) * 3600000 * 24), // Past days
      message: i === 0 ? '오늘 기분이 좋아요!' : undefined,
    });
  }
  
  return history;
};

const mockFriends: Friend[] = [
  {
    id: '1',
    name: '김민수',
    avatar: '👨',
    currentMood: MOODS.happy,
    lastUpdate: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'online',
    moodHistory: generateRandomMoodHistory(),
  },
  {
    id: '2',
    name: '이수진',
    avatar: '👩',
    currentMood: MOODS.calm,
    lastUpdate: new Date(Date.now() - 7200000), // 2 hours ago
    status: 'online',
    moodHistory: generateRandomMoodHistory(),
  },
  {
    id: '3',
    name: '박지혜',
    avatar: '👩‍🦰',
    currentMood: MOODS.excited,
    lastUpdate: new Date(Date.now() - 1800000), // 30 min ago
    status: 'away',
    moodHistory: generateRandomMoodHistory(),
  },
  {
    id: '4',
    name: '최동현',
    avatar: '🧑',
    currentMood: MOODS.tired,
    lastUpdate: new Date(Date.now() - 10800000), // 3 hours ago
    status: 'offline',
    moodHistory: generateRandomMoodHistory(),
  },
];

export const useMoodStore = create<MoodStore>((set) => ({
  user: {
    id: 'user-1',
    name: '나',
    avatar: '😊',
    currentMood: null,
    moodHistory: [],
  },
  friends: mockFriends,
  selectedMood: null,
  
  setUserMood: (mood: Mood, message?: string) =>
    set((state) => ({
      user: {
        ...state.user,
        currentMood: mood,
        moodHistory: [
          {
            mood,
            timestamp: new Date(),
            message,
          },
          ...state.user.moodHistory,
        ],
      },
      selectedMood: null,
    })),
    
  selectMood: (mood: Mood | null) =>
    set({ selectedMood: mood }),
    
  updateFriendMood: (friendId: string, mood: Mood) =>
    set((state) => ({
      friends: state.friends.map((friend) =>
        friend.id === friendId
          ? {
              ...friend,
              currentMood: mood,
              lastUpdate: new Date(),
              moodHistory: [
                {
                  mood,
                  timestamp: new Date(),
                },
                ...friend.moodHistory,
              ],
            }
          : friend
      ),
    })),
    
  addFriend: (friend: Friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),
    
  removeFriend: (friendId: string) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== friendId),
    })),
}))