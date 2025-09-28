import { create } from 'zustand'

interface Fortune {
  id: string
  message: string
  luckyNumbers: number[]
  category: string
  date: Date
}

interface FortuneStore {
  currentFortune: Fortune | null
  fortuneHistory: Fortune[]
  isAnimating: boolean
  isCracked: boolean
  userQuestion: string
  setUserQuestion: (question: string) => void
  generateFortune: () => void
  crackCookie: () => void
  resetCookie: () => void
  clearHistory: () => void
}

const fortuneMessages = {
  love: [
    "Love is on the horizon, keep your heart open.",
    "A meaningful connection will surprise you soon.",
    "Your kindness will attract the right person.",
    "Romance blooms where friendship has been planted.",
    "Trust your heart, it knows the way."
  ],
  career: [
    "A new opportunity knocks at your door.",
    "Your hard work will soon pay off.",
    "Leadership is in your future.",
    "Success comes to those who persevere.",
    "Innovation will be your key to success."
  ],
  wisdom: [
    "The journey of a thousand miles begins with one step.",
    "Your wisdom grows with every challenge.",
    "Peace comes from within, seek it there.",
    "Every ending is a new beginning.",
    "Knowledge is the treasure that follows you everywhere."
  ],
  luck: [
    "Good fortune smiles upon you today.",
    "Your lucky star shines bright.",
    "Unexpected blessings are coming your way.",
    "Fortune favors the brave.",
    "Today's actions become tomorrow's fortune."
  ],
  general: [
    "Something wonderful is about to happen.",
    "Your potential is limitless.",
    "Great things never come from comfort zones.",
    "Believe in yourself and magic will happen.",
    "The best is yet to come."
  ]
}

const generateLuckyNumbers = (): number[] => {
  const numbers = new Set<number>()
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 49) + 1)
  }
  return Array.from(numbers).sort((a, b) => a - b)
}

const selectCategory = (question: string): string => {
  const lowerQuestion = question.toLowerCase()
  if (lowerQuestion.includes('love') || lowerQuestion.includes('relationship')) return 'love'
  if (lowerQuestion.includes('work') || lowerQuestion.includes('job') || lowerQuestion.includes('career')) return 'career'
  if (lowerQuestion.includes('money') || lowerQuestion.includes('luck') || lowerQuestion.includes('win')) return 'luck'
  if (lowerQuestion.includes('wisdom') || lowerQuestion.includes('learn') || lowerQuestion.includes('know')) return 'wisdom'
  return 'general'
}

export const useFortuneStore = create<FortuneStore>((set, get) => ({
  currentFortune: null,
  fortuneHistory: [],
  isAnimating: false,
  isCracked: false,
  userQuestion: '',
  
  setUserQuestion: (question) => set({ userQuestion: question }),
  
  generateFortune: () => {
    const { userQuestion } = get()
    const category = selectCategory(userQuestion)
    const messages = fortuneMessages[category as keyof typeof fortuneMessages]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    
    const fortune: Fortune = {
      id: Date.now().toString(),
      message: randomMessage,
      luckyNumbers: generateLuckyNumbers(),
      category,
      date: new Date()
    }
    
    set({ currentFortune: fortune })
  },
  
  crackCookie: () => {
    const { currentFortune, fortuneHistory } = get()
    set({ isAnimating: true })
    
    setTimeout(() => {
      set({ isCracked: true, isAnimating: false })
      if (currentFortune) {
        set({ fortuneHistory: [currentFortune, ...fortuneHistory].slice(0, 10) })
      }
    }, 500)
  },
  
  resetCookie: () => {
    set({ 
      isCracked: false, 
      currentFortune: null,
      userQuestion: '',
      isAnimating: false 
    })
  },
  
  clearHistory: () => set({ fortuneHistory: [] })
}))