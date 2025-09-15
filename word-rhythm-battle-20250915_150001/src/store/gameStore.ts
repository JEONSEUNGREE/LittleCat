import { create } from 'zustand'

export interface Word {
  id: string
  text: string
  targetTime: number
  typed: boolean
  accuracy: 'perfect' | 'good' | 'miss' | null
}

interface GameState {
  isPlaying: boolean
  isPaused: boolean
  score: number
  combo: number
  maxCombo: number
  level: number
  bpm: number
  currentWord: Word | null
  wordQueue: Word[]
  typedText: string
  perfectHits: number
  goodHits: number
  misses: number
  gameTime: number
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  typeChar: (char: string) => void
  clearTypedText: () => void
  nextWord: () => void
  updateGameTime: (time: number) => void
  increaseBPM: () => void
}

const WORDS_LIBRARY = [
  'rhythm', 'battle', 'music', 'dance', 'beat', 'flow', 'sync', 'vibe',
  'tempo', 'groove', 'pulse', 'wave', 'sound', 'echo', 'bass', 'drum',
  'melody', 'harmony', 'chord', 'note', 'pitch', 'tone', 'track', 'mix',
  'drop', 'break', 'loop', 'sample', 'remix', 'master', 'studio', 'record'
]

const generateWord = (id: number, currentTime: number, bpm: number): Word => {
  const beatInterval = 60000 / bpm // milliseconds per beat
  return {
    id: `word-${id}`,
    text: WORDS_LIBRARY[Math.floor(Math.random() * WORDS_LIBRARY.length)],
    targetTime: currentTime + beatInterval * 4, // 4 beats ahead
    typed: false,
    accuracy: null
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  isPlaying: false,
  isPaused: false,
  score: 0,
  combo: 0,
  maxCombo: 0,
  level: 1,
  bpm: 80,
  currentWord: null,
  wordQueue: [],
  typedText: '',
  perfectHits: 0,
  goodHits: 0,
  misses: 0,
  gameTime: 0,

  startGame: () => {
    const initialWords = Array.from({ length: 5 }, (_, i) => 
      generateWord(i, Date.now(), 80)
    )
    set({
      isPlaying: true,
      isPaused: false,
      score: 0,
      combo: 0,
      maxCombo: 0,
      level: 1,
      bpm: 80,
      currentWord: initialWords[0],
      wordQueue: initialWords.slice(1),
      typedText: '',
      perfectHits: 0,
      goodHits: 0,
      misses: 0,
      gameTime: 0
    })
  },

  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  endGame: () => set({ isPlaying: false, isPaused: false }),

  typeChar: (char: string) => {
    const state = get()
    const newTypedText = state.typedText + char
    set({ typedText: newTypedText })

    if (state.currentWord && newTypedText === state.currentWord.text) {
      const timeDiff = Math.abs(Date.now() - state.currentWord.targetTime)
      let accuracy: 'perfect' | 'good' | 'miss'
      let points = 0
      
      if (timeDiff < 100) {
        accuracy = 'perfect'
        points = 100 * (state.combo + 1)
        set({ 
          perfectHits: state.perfectHits + 1,
          combo: state.combo + 1
        })
      } else if (timeDiff < 300) {
        accuracy = 'good'
        points = 50 * (state.combo + 1)
        set({ 
          goodHits: state.goodHits + 1,
          combo: state.combo + 1
        })
      } else {
        accuracy = 'miss'
        points = 10
        set({ 
          misses: state.misses + 1,
          combo: 0
        })
      }

      const newMaxCombo = Math.max(state.combo, state.maxCombo)
      set({ 
        score: state.score + points,
        maxCombo: newMaxCombo,
        typedText: ''
      })

      get().nextWord()
    }
  },

  clearTypedText: () => set({ typedText: '' }),

  nextWord: () => {
    const state = get()
    const newQueue = [...state.wordQueue]
    const nextWord = newQueue.shift()
    
    if (nextWord) {
      const newWord = generateWord(
        parseInt(state.wordQueue[state.wordQueue.length - 1]?.id.split('-')[1] || '0') + 1,
        Date.now(),
        state.bpm
      )
      newQueue.push(newWord)
      
      set({
        currentWord: nextWord,
        wordQueue: newQueue
      })
    }
  },

  updateGameTime: (time: number) => {
    const state = get()
    set({ gameTime: time })
    
    // Level up every 30 seconds
    const newLevel = Math.floor(time / 30000) + 1
    if (newLevel > state.level && newLevel <= 10) {
      set({ level: newLevel })
      get().increaseBPM()
    }
  },

  increaseBPM: () => {
    const state = get()
    const newBPM = Math.min(state.bpm + 10, 160)
    set({ bpm: newBPM })
  }
}))