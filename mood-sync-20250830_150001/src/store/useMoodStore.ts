import { create } from 'zustand'

export type MoodType = 'happy' | 'sad' | 'angry' | 'calm' | 'excited' | 'anxious' | 'neutral' | 'love'

interface Friend {
  id: string
  name: string
  mood: MoodType
  lastUpdate: Date
  message?: string
}

interface MoodStore {
  currentMood: MoodType
  moodMessage: string
  friends: Friend[]
  moodHistory: { mood: MoodType; timestamp: Date; message?: string }[]
  setMood: (mood: MoodType, message?: string) => void
  addFriend: (friend: Friend) => void
  updateFriendMood: (friendId: string, mood: MoodType, message?: string) => void
  removeFriend: (friendId: string) => void
}

const useMoodStore = create<MoodStore>((set) => ({
  currentMood: 'neutral',
  moodMessage: '',
  friends: [
    { id: '1', name: '민지', mood: 'happy', lastUpdate: new Date(), message: '오늘 날씨가 좋네요!' },
    { id: '2', name: '준호', mood: 'excited', lastUpdate: new Date(), message: '새 프로젝트 시작!' },
    { id: '3', name: '서연', mood: 'calm', lastUpdate: new Date(), message: '명상중...' },
    { id: '4', name: '지훈', mood: 'love', lastUpdate: new Date(), message: '❤️' },
  ],
  moodHistory: [],

  setMood: (mood, message) => set((state) => ({
    currentMood: mood,
    moodMessage: message || '',
    moodHistory: [
      { mood, timestamp: new Date(), message },
      ...state.moodHistory.slice(0, 49) // Keep last 50 entries
    ]
  })),

  addFriend: (friend) => set((state) => ({
    friends: [...state.friends, friend]
  })),

  updateFriendMood: (friendId, mood, message) => set((state) => ({
    friends: state.friends.map(f => 
      f.id === friendId 
        ? { ...f, mood, message, lastUpdate: new Date() }
        : f
    )
  })),

  removeFriend: (friendId) => set((state) => ({
    friends: state.friends.filter(f => f.id !== friendId)
  }))
}))

export default useMoodStore