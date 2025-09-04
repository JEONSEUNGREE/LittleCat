import { create } from 'zustand'

interface Fortune {
  id: string
  text: string
  category: string
  luckyNumbers: number[]
  date: string
}

interface FortuneStore {
  currentFortune: Fortune | null
  history: Fortune[]
  isDarkMode: boolean
  hasOpenedToday: boolean
  streak: number
  totalOpened: number
  favorites: string[]
  lastOpenDate: string | null
  generateNewFortune: () => void
  toggleDarkMode: () => void
  toggleFavorite: (fortuneId: string) => void
  clearHistory: () => void
}

const fortuneTexts = [
  { text: "오늘의 작은 도전이 내일의 큰 성공이 될 것입니다.", category: "성공" },
  { text: "예상치 못한 곳에서 행운이 찾아올 것입니다.", category: "행운" },
  { text: "당신의 창의성이 빛을 발할 시간이 다가오고 있습니다.", category: "창의성" },
  { text: "인내심을 가지세요. 좋은 일이 곧 일어날 것입니다.", category: "인내" },
  { text: "오늘 만나는 사람이 당신의 인생을 바꿀 수도 있습니다.", category: "인연" },
  { text: "작은 친절이 큰 변화를 만들어냅니다.", category: "친절" },
  { text: "당신의 직관을 믿으세요. 그것이 올바른 길로 인도할 것입니다.", category: "직관" },
  { text: "새로운 시작을 위한 완벽한 시기입니다.", category: "시작" },
  { text: "당신의 노력이 곧 결실을 맺을 것입니다.", category: "노력" },
  { text: "미소는 당신이 줄 수 있는 가장 아름다운 선물입니다.", category: "미소" },
  { text: "오늘의 실수는 내일의 지혜가 됩니다.", category: "지혜" },
  { text: "당신이 원하는 변화가 되세요.", category: "변화" },
  { text: "감사하는 마음이 더 많은 축복을 가져옵니다.", category: "감사" },
  { text: "용기를 내세요. 당신은 생각보다 강합니다.", category: "용기" },
  { text: "오늘 하루도 특별한 선물입니다.", category: "선물" },
]

const generateLuckyNumbers = (): number[] => {
  const numbers: number[] = []
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  return numbers.sort((a, b) => a - b)
}

export const useFortuneStore = create<FortuneStore>((set, get) => ({
      currentFortune: null,
      history: [],
      isDarkMode: false,
      hasOpenedToday: false,
      streak: 0,
      totalOpened: 0,
      favorites: [],
      lastOpenDate: null,

      generateNewFortune: () => {
        const fortune = fortuneTexts[Math.floor(Math.random() * fortuneTexts.length)]
        const today = new Date().toISOString().split('T')[0]
        const lastOpen = get().lastOpenDate
        
        let newStreak = get().streak
        if (lastOpen) {
          const lastDate = new Date(lastOpen)
          const todayDate = new Date(today)
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
          
          if (diffDays === 1) {
            newStreak += 1
          } else if (diffDays > 1) {
            newStreak = 1
          }
        } else {
          newStreak = 1
        }

        const newFortune: Fortune = {
          id: Date.now().toString(),
          text: fortune.text,
          category: fortune.category,
          luckyNumbers: generateLuckyNumbers(),
          date: today,
        }

        set((state) => ({
          currentFortune: newFortune,
          history: [newFortune, ...state.history].slice(0, 30),
          hasOpenedToday: true,
          streak: newStreak,
          totalOpened: state.totalOpened + 1,
          lastOpenDate: today,
        }))
      },

      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.isDarkMode
          if (newDarkMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDarkMode: newDarkMode }
        })
      },

      toggleFavorite: (fortuneId: string) => {
        set((state) => {
          const isFavorite = state.favorites.includes(fortuneId)
          return {
            favorites: isFavorite
              ? state.favorites.filter(id => id !== fortuneId)
              : [...state.favorites, fortuneId]
          }
        })
      },

      clearHistory: () => {
        set({ history: [], favorites: [] })
      },
}))