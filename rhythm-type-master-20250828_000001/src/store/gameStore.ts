import { create } from 'zustand'

export type GameMode = 'easy' | 'medium' | 'hard' | 'extreme'
export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver'

interface Word {
  id: string
  text: string
  x: number
  y: number
  speed: number
  points: number
  color: string
}

interface GameStore {
  gameState: GameState
  gameMode: GameMode
  score: number
  combo: number
  maxCombo: number
  lives: number
  wordsPerMinute: number
  accuracy: number
  totalTyped: number
  correctTyped: number
  currentWord: string
  typedWord: string
  words: Word[]
  beatInterval: number
  lastBeatTime: number
  
  // Actions
  setGameState: (state: GameState) => void
  setGameMode: (mode: GameMode) => void
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  typeChar: (char: string) => void
  deleteChar: () => void
  submitWord: () => void
  addWord: (word: Word) => void
  removeWord: (id: string) => void
  updateWords: (deltaTime: number) => void
  loseLife: () => void
  updateBeat: (currentTime: number) => void
  resetGame: () => void
}

const WORD_LISTS = {
  easy: ['cat', 'dog', 'run', 'fun', 'sun', 'bat', 'hat', 'mat', 'rat', 'pat'],
  medium: ['jump', 'quick', 'brown', 'lazy', 'happy', 'music', 'rhythm', 'dance', 'beat', 'song'],
  hard: ['javascript', 'typescript', 'rhythm', 'master', 'cascade', 'dynamic', 'velocity', 'frequency'],
  extreme: ['synchronized', 'acceleration', 'performance', 'extraordinary', 'revolutionary', 'metamorphosis']
}

const GAME_CONFIG = {
  easy: { beatInterval: 2000, wordSpeed: 1, lives: 5 },
  medium: { beatInterval: 1500, wordSpeed: 1.5, lives: 4 },
  hard: { beatInterval: 1000, wordSpeed: 2, lives: 3 },
  extreme: { beatInterval: 750, wordSpeed: 2.5, lives: 2 }
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'menu',
  gameMode: 'easy',
  score: 0,
  combo: 0,
  maxCombo: 0,
  lives: 5,
  wordsPerMinute: 0,
  accuracy: 100,
  totalTyped: 0,
  correctTyped: 0,
  currentWord: '',
  typedWord: '',
  words: [],
  beatInterval: 2000,
  lastBeatTime: 0,

  setGameState: (state) => set({ gameState: state }),
  setGameMode: (mode) => set({ 
    gameMode: mode,
    beatInterval: GAME_CONFIG[mode].beatInterval,
    lives: GAME_CONFIG[mode].lives
  }),

  startGame: () => {
    const mode = get().gameMode
    set({
      gameState: 'playing',
      score: 0,
      combo: 0,
      maxCombo: 0,
      lives: GAME_CONFIG[mode].lives,
      wordsPerMinute: 0,
      accuracy: 100,
      totalTyped: 0,
      correctTyped: 0,
      currentWord: '',
      typedWord: '',
      words: [],
      beatInterval: GAME_CONFIG[mode].beatInterval,
      lastBeatTime: Date.now()
    })
  },

  pauseGame: () => set({ gameState: 'paused' }),
  resumeGame: () => set({ gameState: 'playing' }),
  endGame: () => set({ gameState: 'gameOver' }),

  typeChar: (char) => set((state) => ({
    typedWord: state.typedWord + char,
    totalTyped: state.totalTyped + 1
  })),

  deleteChar: () => set((state) => ({
    typedWord: state.typedWord.slice(0, -1)
  })),

  submitWord: () => {
    const state = get()
    const matchedWord = state.words.find(w => w.text === state.typedWord)
    
    if (matchedWord) {
      const newCombo = state.combo + 1
      const points = matchedWord.points * (1 + newCombo * 0.1)
      
      set({
        score: state.score + Math.floor(points),
        combo: newCombo,
        maxCombo: Math.max(newCombo, state.maxCombo),
        correctTyped: state.correctTyped + state.typedWord.length,
        typedWord: '',
        words: state.words.filter(w => w.id !== matchedWord.id),
        accuracy: Math.round((state.correctTyped + state.typedWord.length) / (state.totalTyped || 1) * 100)
      })
    } else {
      set({
        combo: 0,
        typedWord: ''
      })
    }
  },

  addWord: (word) => set((state) => ({
    words: [...state.words, word]
  })),

  removeWord: (id) => set((state) => ({
    words: state.words.filter(w => w.id !== id)
  })),

  updateWords: (deltaTime) => set((state) => ({
    words: state.words.map(word => ({
      ...word,
      y: word.y + word.speed * deltaTime * 0.05
    })).filter(word => {
      if (word.y > window.innerHeight - 100) {
        get().loseLife()
        return false
      }
      return true
    })
  })),

  loseLife: () => {
    const state = get()
    const newLives = state.lives - 1
    
    if (newLives <= 0) {
      set({ lives: 0, gameState: 'gameOver' })
    } else {
      set({ lives: newLives, combo: 0 })
    }
  },

  updateBeat: (currentTime) => {
    const state = get()
    if (currentTime - state.lastBeatTime >= state.beatInterval) {
      const wordList = WORD_LISTS[state.gameMode]
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
      const config = GAME_CONFIG[state.gameMode]
      
      const newWord: Word = {
        id: Math.random().toString(36).substr(2, 9),
        text: randomWord,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: -50,
        speed: config.wordSpeed + Math.random() * 0.5,
        points: randomWord.length * 10,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }
      
      get().addWord(newWord)
      set({ lastBeatTime: currentTime })
    }
  },

  resetGame: () => set({
    gameState: 'menu',
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 5,
    wordsPerMinute: 0,
    accuracy: 100,
    totalTyped: 0,
    correctTyped: 0,
    currentWord: '',
    typedWord: '',
    words: []
  })
}))