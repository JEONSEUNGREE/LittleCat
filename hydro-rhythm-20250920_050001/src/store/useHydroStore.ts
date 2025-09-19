import { create } from 'zustand'

interface Note {
  id: string
  lane: number
  position: number
  type: 'water' | 'bonus' | 'special'
  points: number
}

interface HydroState {
  // Game state
  isPlaying: boolean
  score: number
  combo: number
  maxCombo: number
  level: number
  
  // Hydration tracking
  dailyGoal: number
  currentIntake: number
  lastDrinkTime: number | null
  streakDays: number
  
  // Rhythm game
  notes: Note[]
  bpm: number
  accuracy: number
  perfectHits: number
  goodHits: number
  missedHits: number
  
  // Character state
  characterMood: 'thirsty' | 'normal' | 'happy' | 'energized'
  characterLevel: number
  
  // Actions
  startGame: () => void
  stopGame: () => void
  hitNote: (noteId: string, accuracy: 'perfect' | 'good' | 'miss') => void
  drinkWater: (amount: number) => void
  resetDaily: () => void
  updateBPM: (bpm: number) => void
  generateNotes: () => void
  updateCharacterMood: () => void
}

const useHydroStore = create<HydroState>((set, get) => ({
  // Initial state
  isPlaying: false,
  score: 0,
  combo: 0,
  maxCombo: 0,
  level: 1,
  
  dailyGoal: 2000,
  currentIntake: 0,
  lastDrinkTime: null,
  streakDays: 0,
  
  notes: [],
  bpm: 120,
  accuracy: 100,
  perfectHits: 0,
  goodHits: 0,
  missedHits: 0,
  
  characterMood: 'normal',
  characterLevel: 1,
  
  // Actions
  startGame: () => {
    set({ 
      isPlaying: true, 
      score: 0, 
      combo: 0,
      perfectHits: 0,
      goodHits: 0,
      missedHits: 0,
      accuracy: 100
    })
    get().generateNotes()
  },
  
  stopGame: () => set({ isPlaying: false }),
  
  hitNote: (noteId, accuracy) => {
    const state = get()
    const note = state.notes.find(n => n.id === noteId)
    if (!note) return
    
    let pointsEarned = 0
    let newCombo = state.combo
    
    if (accuracy === 'perfect') {
      pointsEarned = note.points * 2
      newCombo += 1
      set(state => ({ 
        perfectHits: state.perfectHits + 1,
        combo: newCombo,
        maxCombo: Math.max(newCombo, state.maxCombo)
      }))
    } else if (accuracy === 'good') {
      pointsEarned = note.points
      newCombo += 1
      set(state => ({ 
        goodHits: state.goodHits + 1,
        combo: newCombo,
        maxCombo: Math.max(newCombo, state.maxCombo)
      }))
    } else {
      newCombo = 0
      set(state => ({ 
        missedHits: state.missedHits + 1,
        combo: 0
      }))
    }
    
    const totalHits = state.perfectHits + state.goodHits + state.missedHits + 1
    const newAccuracy = ((state.perfectHits + state.goodHits + (accuracy !== 'miss' ? 1 : 0)) / totalHits) * 100
    
    set(state => ({
      score: state.score + pointsEarned,
      notes: state.notes.filter(n => n.id !== noteId),
      accuracy: newAccuracy
    }))
    
    if (accuracy !== 'miss') {
      get().drinkWater(50)
    }
  },
  
  drinkWater: (amount) => {
    set(state => ({
      currentIntake: Math.min(state.currentIntake + amount, state.dailyGoal * 1.5),
      lastDrinkTime: Date.now()
    }))
    get().updateCharacterMood()
  },
  
  resetDaily: () => {
    set({
      currentIntake: 0,
      lastDrinkTime: null,
      perfectHits: 0,
      goodHits: 0,
      missedHits: 0,
      accuracy: 100
    })
  },
  
  updateBPM: (bpm) => set({ bpm }),
  
  generateNotes: () => {
    const newNotes: Note[] = []
    const noteCount = 10 + Math.floor(Math.random() * 5)
    
    for (let i = 0; i < noteCount; i++) {
      newNotes.push({
        id: `note-${Date.now()}-${i}`,
        lane: Math.floor(Math.random() * 4),
        position: i * 100 + Math.random() * 50,
        type: Math.random() > 0.8 ? 'bonus' : 'water',
        points: Math.random() > 0.8 ? 20 : 10
      })
    }
    
    set({ notes: newNotes })
  },
  
  updateCharacterMood: () => {
    const { currentIntake, dailyGoal } = get()
    const percentage = (currentIntake / dailyGoal) * 100
    
    let mood: HydroState['characterMood'] = 'thirsty'
    if (percentage >= 100) mood = 'energized'
    else if (percentage >= 75) mood = 'happy'
    else if (percentage >= 50) mood = 'normal'
    
    set({ characterMood: mood })
  }
}))

export default useHydroStore