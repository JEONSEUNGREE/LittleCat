import { create } from 'zustand'

export interface Mood {
  emoji: string
  label: string
  color: string
  intensity: number
}

interface NearbyMood extends Mood {
  id: string
  distance: number
  username: string
}

interface MoodStore {
  currentMood: Mood | null
  nearbyMoods: NearbyMood[]
  setCurrentMood: (mood: Mood) => void
  generateNearbyMoods: () => void
}

const moodOptions: Mood[] = [
  { emoji: '😊', label: '행복', color: '#FFD700', intensity: 0.8 },
  { emoji: '😌', label: '평온', color: '#87CEEB', intensity: 0.5 },
  { emoji: '😔', label: '우울', color: '#4682B4', intensity: 0.6 },
  { emoji: '😡', label: '화남', color: '#FF6347', intensity: 0.9 },
  { emoji: '😰', label: '불안', color: '#DDA0DD', intensity: 0.7 },
  { emoji: '🥰', label: '사랑', color: '#FF69B4', intensity: 0.9 },
  { emoji: '😴', label: '피곤', color: '#778899', intensity: 0.3 },
  { emoji: '🤔', label: '생각', color: '#9370DB', intensity: 0.5 },
]

const randomUsernames = [
  '익명의 파도', '고요한 바람', '따뜻한 햇살', '별빛 여행자',
  '구름 산책자', '달빛 수호자', '바다 꿈꾸는', '하늘 날개',
  '숲속 명상가', '빗소리 듣는', '눈송이 춤추는', '봄바람 부는'
]

const useMoodStore = create<MoodStore>((set) => ({
  currentMood: null,
  nearbyMoods: [],
  setCurrentMood: (mood) => set({ currentMood: mood }),
  generateNearbyMoods: () => {
    const nearbyCount = Math.floor(Math.random() * 5) + 3
    const nearby: NearbyMood[] = []
    
    for (let i = 0; i < nearbyCount; i++) {
      const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)]
      const randomUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)]
      nearby.push({
        ...randomMood,
        id: `mood-${Date.now()}-${i}`,
        distance: Math.random() * 100,
        username: randomUsername
      })
    }
    
    set({ nearbyMoods: nearby.sort((a, b) => a.distance - b.distance) })
  }
}))

export default useMoodStore