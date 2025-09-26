import { create } from 'zustand'

export type Action = {
  id: string
  name: string
  icon: string
  effect: string
  available: boolean
}

export type GameState = {
  currentLoop: number
  timeRemaining: number
  maxTime: number
  isPlaying: boolean
  isVictory: boolean
  progress: number
  actions: Action[]
  history: string[]
  hints: string[]
}

interface GameStore extends GameState {
  startGame: () => void
  resetGame: () => void
  performAction: (actionId: string) => void
  tick: () => void
  addHint: (hint: string) => void
}

const initialActions: Action[] = [
  { id: 'door', name: 'Open Door', icon: '🚪', effect: 'locked', available: true },
  { id: 'window', name: 'Check Window', icon: '🪟', effect: 'stuck', available: true },
  { id: 'clock', name: 'Touch Clock', icon: '🕐', effect: 'reset', available: true },
  { id: 'key', name: 'Find Key', icon: '🔑', effect: 'hidden', available: false },
  { id: 'mirror', name: 'Break Mirror', icon: '🪞', effect: 'reveal', available: false },
  { id: 'book', name: 'Read Book', icon: '📖', effect: 'knowledge', available: false },
]

export const useGameStore = create<GameStore>((set, get) => ({
  currentLoop: 0,
  timeRemaining: 5,
  maxTime: 5,
  isPlaying: false,
  isVictory: false,
  progress: 0,
  actions: initialActions,
  history: [],
  hints: [],

  startGame: () => {
    set({
      isPlaying: true,
      currentLoop: 1,
      timeRemaining: 5,
      history: [],
      isVictory: false,
      progress: 0,
    })
  },

  resetGame: () => {
    set({
      currentLoop: 0,
      timeRemaining: 5,
      isPlaying: false,
      isVictory: false,
      progress: 0,
      actions: initialActions,
      history: [],
      hints: [],
    })
  },

  performAction: (actionId: string) => {
    const state = get()
    const action = state.actions.find(a => a.id === actionId)
    if (!action || !action.available) return

    const newHistory = [...state.history, `Loop ${state.currentLoop}: ${action.name}`]
    let newProgress = state.progress
    let newActions = [...state.actions]
    let newHints = [...state.hints]

    // Game logic for different actions
    switch (actionId) {
      case 'door':
        if (state.history.includes(`Loop ${state.currentLoop}: Find Key`)) {
          set({ isVictory: true, isPlaying: false })
          return
        }
        newHints.push('The door is locked. You need something to open it...')
        break
      case 'window':
        newProgress += 10
        newActions = newActions.map(a => 
          a.id === 'mirror' ? { ...a, available: true } : a
        )
        newHints.push('You notice a strange reflection in the window.')
        break
      case 'clock':
        // Reset the current loop
        set({
          currentLoop: state.currentLoop + 1,
          timeRemaining: 5,
          history: newHistory,
        })
        return
      case 'mirror':
        newProgress += 20
        newActions = newActions.map(a => 
          a.id === 'key' ? { ...a, available: true } : a
        )
        newHints.push('Behind the broken mirror, something glimmers.')
        break
      case 'key':
        newProgress += 30
        newActions = newActions.map(a => 
          a.id === 'book' ? { ...a, available: true } : a
        )
        newHints.push('You found the key! But there\'s more to discover.')
        break
      case 'book':
        newProgress += 20
        newHints.push('The book reveals the secret: Break the loop with the key!')
        break
    }

    set({
      history: newHistory,
      progress: Math.min(newProgress, 100),
      actions: newActions,
      hints: newHints,
    })
  },

  tick: () => {
    const state = get()
    if (!state.isPlaying || state.isVictory) return

    const newTime = state.timeRemaining - 1
    
    if (newTime <= 0) {
      // Time's up, start new loop
      set({
        currentLoop: state.currentLoop + 1,
        timeRemaining: state.maxTime,
        hints: [...state.hints, 'Time\'s up! The loop resets...']
      })
    } else {
      set({ timeRemaining: newTime })
    }
  },

  addHint: (hint: string) => {
    set(state => ({
      hints: [...state.hints, hint]
    }))
  },
}))