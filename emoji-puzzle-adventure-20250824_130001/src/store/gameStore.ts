import { create } from 'zustand'

export interface Puzzle {
  id: number
  question: string
  emojis: string[]
  answer: string[]
  hint: string
  difficulty: 'easy' | 'medium' | 'hard'
}

interface GameState {
  currentLevel: number
  score: number
  lives: number
  currentPuzzle: Puzzle | null
  selectedEmojis: string[]
  isCompleted: boolean
  showHint: boolean
  puzzles: Puzzle[]
  initGame: () => void
  selectEmoji: (emoji: string) => void
  removeEmoji: (index: number) => void
  checkAnswer: () => boolean
  nextLevel: () => void
  toggleHint: () => void
  resetLevel: () => void
  loseLife: () => void
}

const puzzleData: Puzzle[] = [
  {
    id: 1,
    question: "아침에 일어나서 하는 일",
    emojis: ["☀️", "🛏️", "😴", "⏰", "🚿", "☕", "🍳", "👔"],
    answer: ["⏰", "🚿", "☕"],
    hint: "알람 → 샤워 → 커피",
    difficulty: 'easy'
  },
  {
    id: 2,
    question: "비 오는 날 필요한 것들",
    emojis: ["☂️", "☀️", "🌧️", "👓", "🧥", "🥾", "🏖️", "🌈"],
    answer: ["☂️", "🧥", "🥾"],
    hint: "우산, 코트, 부츠",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "건강한 운동 루틴",
    emojis: ["🏃", "🥤", "🍔", "💪", "🧘", "🍎", "🎮", "😴"],
    answer: ["🏃", "💪", "🥤", "🍎"],
    hint: "달리기, 근력운동, 물, 과일",
    difficulty: 'medium'
  },
  {
    id: 4,
    question: "파티 준비물",
    emojis: ["🎂", "🎈", "📚", "🎁", "🎉", "🖊️", "🥤", "💼"],
    answer: ["🎂", "🎈", "🎁", "🎉"],
    hint: "케이크, 풍선, 선물, 파티",
    difficulty: 'medium'
  },
  {
    id: 5,
    question: "우주 여행에 필요한 것",
    emojis: ["🚀", "👨‍🚀", "🌍", "🌟", "🥘", "🧳", "📱", "🛸"],
    answer: ["🚀", "👨‍🚀", "🥘", "🧳"],
    hint: "로켓, 우주인, 음식, 짐",
    difficulty: 'hard'
  },
  {
    id: 6,
    question: "캠핑 필수품",
    emojis: ["⛺", "🔥", "🏢", "🔦", "🎒", "💻", "🌲", "🥾"],
    answer: ["⛺", "🔥", "🔦", "🎒", "🥾"],
    hint: "텐트, 모닥불, 손전등, 배낭, 등산화",
    difficulty: 'hard'
  }
]

export const useGameStore = create<GameState>((set, get) => ({
  currentLevel: 1,
  score: 0,
  lives: 3,
  currentPuzzle: null,
  selectedEmojis: [],
  isCompleted: false,
  showHint: false,
  puzzles: puzzleData,

  initGame: () => {
    set({
      currentLevel: 1,
      score: 0,
      lives: 3,
      currentPuzzle: puzzleData[0],
      selectedEmojis: [],
      isCompleted: false,
      showHint: false
    })
  },

  selectEmoji: (emoji: string) => {
    const { selectedEmojis, currentPuzzle } = get()
    if (currentPuzzle && selectedEmojis.length < currentPuzzle.answer.length) {
      set({ selectedEmojis: [...selectedEmojis, emoji] })
    }
  },

  removeEmoji: (index: number) => {
    const { selectedEmojis } = get()
    set({ selectedEmojis: selectedEmojis.filter((_, i) => i !== index) })
  },

  checkAnswer: () => {
    const { selectedEmojis, currentPuzzle } = get()
    if (!currentPuzzle) return false
    
    const isCorrect = selectedEmojis.length === currentPuzzle.answer.length &&
      selectedEmojis.every((emoji, index) => emoji === currentPuzzle.answer[index])
    
    if (isCorrect) {
      set(state => ({ 
        score: state.score + (currentPuzzle.difficulty === 'easy' ? 10 : 
                              currentPuzzle.difficulty === 'medium' ? 20 : 30),
        isCompleted: true 
      }))
    }
    return isCorrect
  },

  nextLevel: () => {
    const { currentLevel, puzzles } = get()
    const nextLevel = currentLevel + 1
    
    if (nextLevel <= puzzles.length) {
      set({
        currentLevel: nextLevel,
        currentPuzzle: puzzles[nextLevel - 1],
        selectedEmojis: [],
        isCompleted: false,
        showHint: false
      })
    }
  },

  toggleHint: () => {
    set(state => ({ 
      showHint: !state.showHint,
      score: state.showHint ? state.score : Math.max(0, state.score - 5)
    }))
  },

  resetLevel: () => {
    set({ selectedEmojis: [], showHint: false })
  },

  loseLife: () => {
    set(state => ({ 
      lives: Math.max(0, state.lives - 1),
      selectedEmojis: []
    }))
  }
}))