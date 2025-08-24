import { create } from 'zustand'

export type MoodType = 'happy' | 'calm' | 'neutral' | 'sad' | 'angry' | 'excited' | 'anxious' | 'loved'

export interface MoodEntry {
  id: string
  mood: MoodType
  message?: string
  timestamp: number
  userId: string
  userName: string
  reactions: { [userId: string]: string }
}

export interface Friend {
  id: string
  name: string
  currentMood?: MoodType
  lastUpdate?: number
  status: 'online' | 'offline'
}

interface MoodStore {
  currentUser: {
    id: string
    name: string
    currentMood: MoodType
  }
  friends: Friend[]
  moodHistory: MoodEntry[]
  friendMoods: MoodEntry[]
  
  setUserMood: (mood: MoodType, message?: string) => void
  addFriend: (friend: Friend) => void
  removeFriend: (friendId: string) => void
  addReaction: (entryId: string, reaction: string) => void
  updateUserName: (name: string) => void
  simulateFriendActivity: () => void
}

const mockFriends: Friend[] = [
  { id: '1', name: '지민', currentMood: 'happy', status: 'online', lastUpdate: Date.now() },
  { id: '2', name: '수진', currentMood: 'calm', status: 'online', lastUpdate: Date.now() - 300000 },
  { id: '3', name: '민호', currentMood: 'excited', status: 'offline', lastUpdate: Date.now() - 3600000 },
  { id: '4', name: '하은', currentMood: 'neutral', status: 'online', lastUpdate: Date.now() - 120000 },
]

const moodMessages = {
  happy: ['오늘은 정말 좋은 날이에요! 😊', '행복이 넘쳐요~', '기분 최고!'],
  calm: ['평온한 하루입니다', '마음이 차분해요', '여유로운 시간'],
  sad: ['조금 우울한 날이네요', '위로가 필요해요', '힘든 하루...'],
  excited: ['너무 신나요!!', '설레는 일이 생겼어요', '에너지가 넘쳐요!'],
  anxious: ['조금 불안해요', '걱정이 많은 날', '긴장되네요'],
  loved: ['사랑받는 기분이에요', '감사한 하루', '따뜻한 마음'],
  angry: ['화가 나요', '짜증나는 일이...', '스트레스 받아요'],
  neutral: ['그저 그래요', '평범한 하루', '보통이에요']
}

export const useMoodStore = create<MoodStore>((set, get) => ({
  currentUser: {
    id: 'user1',
    name: '나',
    currentMood: 'neutral'
  },
  friends: mockFriends,
  moodHistory: [],
  friendMoods: [],
  
  setUserMood: (mood, message) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      message,
      timestamp: Date.now(),
      userId: get().currentUser.id,
      userName: get().currentUser.name,
      reactions: {}
    }
    
    set((state) => ({
      currentUser: { ...state.currentUser, currentMood: mood },
      moodHistory: [entry, ...state.moodHistory].slice(0, 50)
    }))
  },
  
  addFriend: (friend) => {
    set((state) => ({
      friends: [...state.friends, friend]
    }))
  },
  
  removeFriend: (friendId) => {
    set((state) => ({
      friends: state.friends.filter(f => f.id !== friendId)
    }))
  },
  
  addReaction: (entryId, reaction) => {
    set((state) => ({
      friendMoods: state.friendMoods.map(entry =>
        entry.id === entryId
          ? { ...entry, reactions: { ...entry.reactions, [state.currentUser.id]: reaction } }
          : entry
      )
    }))
  },
  
  updateUserName: (name) => {
    set((state) => ({
      currentUser: { ...state.currentUser, name }
    }))
  },
  
  simulateFriendActivity: () => {
    const moods: MoodType[] = ['happy', 'calm', 'neutral', 'sad', 'angry', 'excited', 'anxious', 'loved']
    const friends = get().friends.filter(f => f.status === 'online')
    
    if (friends.length > 0 && Math.random() > 0.5) {
      const friend = friends[Math.floor(Math.random() * friends.length)]
      const newMood = moods[Math.floor(Math.random() * moods.length)]
      const messages = moodMessages[newMood]
      const message = messages[Math.floor(Math.random() * messages.length)]
      
      const entry: MoodEntry = {
        id: Date.now().toString(),
        mood: newMood,
        message,
        timestamp: Date.now(),
        userId: friend.id,
        userName: friend.name,
        reactions: {}
      }
      
      set((state) => ({
        friends: state.friends.map(f =>
          f.id === friend.id ? { ...f, currentMood: newMood, lastUpdate: Date.now() } : f
        ),
        friendMoods: [entry, ...state.friendMoods].slice(0, 50)
      }))
    }
  }
}))