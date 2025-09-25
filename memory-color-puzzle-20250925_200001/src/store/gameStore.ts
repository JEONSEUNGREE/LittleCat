import { create } from 'zustand'

export interface GameState {
  level: number
  score: number
  highScore: number
  sequence: string[]
  playerSequence: string[]
  isShowingSequence: boolean
  isPlayerTurn: boolean
  gameStatus: 'idle' | 'playing' | 'success' | 'failed'
  currentHighlight: string | null
  lives: number
  maxLives: number
}

export interface GameActions {
  startGame: () => void
  addToSequence: () => void
  showSequence: () => void
  handlePlayerInput: (color: string) => void
  resetGame: () => void
  nextLevel: () => void
}

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']
const INITIAL_SEQUENCE_LENGTH = 3
const SEQUENCE_SHOW_DELAY = 600

const useGameStore = create<GameState & GameActions>((set, get) => ({
  level: 1,
  score: 0,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
  sequence: [],
  playerSequence: [],
  isShowingSequence: false,
  isPlayerTurn: false,
  gameStatus: 'idle',
  currentHighlight: null,
  lives: 3,
  maxLives: 3,

  startGame: () => {
    const initialSequence: string[] = []
    for (let i = 0; i < INITIAL_SEQUENCE_LENGTH; i++) {
      initialSequence.push(COLORS[Math.floor(Math.random() * COLORS.length)])
    }
    
    set({
      level: 1,
      score: 0,
      sequence: initialSequence,
      playerSequence: [],
      gameStatus: 'playing',
      lives: 3,
    })
    
    setTimeout(() => {
      get().showSequence()
    }, 500)
  },

  addToSequence: () => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    set((state) => ({
      sequence: [...state.sequence, newColor]
    }))
  },

  showSequence: async () => {
    set({ isShowingSequence: true, isPlayerTurn: false })
    const { sequence } = get()
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_DELAY))
      set({ currentHighlight: sequence[i] })
      await new Promise(resolve => setTimeout(resolve, SEQUENCE_SHOW_DELAY))
      set({ currentHighlight: null })
    }
    
    set({ isShowingSequence: false, isPlayerTurn: true })
  },

  handlePlayerInput: (color: string) => {
    const { isPlayerTurn, playerSequence, sequence, score, lives } = get()
    
    if (!isPlayerTurn) return
    
    const newPlayerSequence = [...playerSequence, color]
    const currentIndex = playerSequence.length
    
    if (sequence[currentIndex] !== color) {
      // Wrong input
      const newLives = lives - 1
      
      if (newLives <= 0) {
        // Game over
        set({
          gameStatus: 'failed',
          isPlayerTurn: false,
          lives: 0
        })
        
        // Update high score if needed
        const { highScore } = get()
        if (score > highScore) {
          localStorage.setItem('highScore', score.toString())
          set({ highScore: score })
        }
      } else {
        // Lost a life, show sequence again
        set({
          lives: newLives,
          playerSequence: [],
          isPlayerTurn: false
        })
        
        setTimeout(() => {
          get().showSequence()
        }, 1500)
      }
      return
    }
    
    set({ playerSequence: newPlayerSequence })
    
    if (newPlayerSequence.length === sequence.length) {
      // Level complete
      const levelScore = sequence.length * 10
      const newScore = score + levelScore
      
      set({
        score: newScore,
        gameStatus: 'success',
        isPlayerTurn: false
      })
      
      // Update high score if needed
      const { highScore } = get()
      if (newScore > highScore) {
        localStorage.setItem('highScore', newScore.toString())
        set({ highScore: newScore })
      }
      
      setTimeout(() => {
        get().nextLevel()
      }, 1000)
    }
  },

  nextLevel: () => {
    set((state) => ({
      level: state.level + 1,
      playerSequence: [],
      gameStatus: 'playing'
    }))
    
    get().addToSequence()
    
    setTimeout(() => {
      get().showSequence()
    }, 500)
  },

  resetGame: () => {
    set({
      level: 1,
      score: 0,
      sequence: [],
      playerSequence: [],
      isShowingSequence: false,
      isPlayerTurn: false,
      gameStatus: 'idle',
      currentHighlight: null,
      lives: 3
    })
  }
}))

export default useGameStore