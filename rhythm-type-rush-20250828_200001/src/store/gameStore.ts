import { create } from 'zustand'

interface Word {
  id: number
  text: string
  position: number
  speed: number
}

interface GameState {
  gameState: 'idle' | 'playing' | 'ended'
  score: number
  combo: number
  maxCombo: number
  missedWords: number
  typedWords: number
  currentWords: Word[]
  currentInput: string
  level: number
  startGame: () => void
  endGame: () => void
  addWord: (word: Word) => void
  removeWord: (id: number) => void
  updateWordPosition: (id: number, position: number) => void
  setCurrentInput: (input: string) => void
  checkWord: (word: string) => void
  incrementScore: (points: number) => void
  incrementCombo: () => void
  resetCombo: () => void
  incrementMissed: () => void
}

const wordBank = [
  'REACT', 'TYPE', 'BEAT', 'FLOW', 'SYNC', 'RUSH', 'CODE', 'GAME',
  'PLAY', 'WIN', 'FAST', 'MOVE', 'JUMP', 'RUN', 'FLY', 'STAR',
  'MOON', 'SUN', 'FIRE', 'ICE', 'WIND', 'ROCK', 'WAVE', 'BOOM',
  'ZAP', 'POP', 'BANG', 'ZOOM', 'DASH', 'FLIP', 'SPIN', 'LOOP'
]

const useGameStore = create<GameState>((set, get) => ({
  gameState: 'idle',
  score: 0,
  combo: 0,
  maxCombo: 0,
  missedWords: 0,
  typedWords: 0,
  currentWords: [],
  currentInput: '',
  level: 1,
  
  startGame: () => {
    set({
      gameState: 'playing',
      score: 0,
      combo: 0,
      maxCombo: 0,
      missedWords: 0,
      typedWords: 0,
      currentWords: [],
      currentInput: '',
      level: 1
    })
  },
  
  endGame: () => {
    set({ gameState: 'idle' })
  },
  
  addWord: (word) => {
    set((state) => ({
      currentWords: [...state.currentWords, word]
    }))
  },
  
  removeWord: (id) => {
    set((state) => ({
      currentWords: state.currentWords.filter(w => w.id !== id)
    }))
  },
  
  updateWordPosition: (id, position) => {
    set((state) => ({
      currentWords: state.currentWords.map(w =>
        w.id === id ? { ...w, position } : w
      )
    }))
  },
  
  setCurrentInput: (input) => {
    set({ currentInput: input.toUpperCase() })
  },
  
  checkWord: (word) => {
    const state = get()
    const wordUpper = word.toUpperCase()
    const matchedWord = state.currentWords.find(w => w.text === wordUpper)
    
    if (matchedWord) {
      state.removeWord(matchedWord.id)
      state.incrementScore(10 * (state.combo + 1))
      state.incrementCombo()
      set((s) => ({ 
        typedWords: s.typedWords + 1,
        currentInput: '' 
      }))
    }
  },
  
  incrementScore: (points) => {
    set((state) => ({ score: state.score + points }))
  },
  
  incrementCombo: () => {
    set((state) => {
      const newCombo = state.combo + 1
      return {
        combo: newCombo,
        maxCombo: Math.max(state.maxCombo, newCombo)
      }
    })
  },
  
  resetCombo: () => {
    set({ combo: 0 })
  },
  
  incrementMissed: () => {
    set((state) => ({ 
      missedWords: state.missedWords + 1,
      combo: 0
    }))
  }
}))

export { wordBank }
export default useGameStore