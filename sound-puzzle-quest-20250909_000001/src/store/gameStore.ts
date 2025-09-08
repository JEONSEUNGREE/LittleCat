import { create } from 'zustand'

export type SoundType = 'bell' | 'drum' | 'piano' | 'guitar' | 'flute' | 'synth'

interface SoundTile {
  id: string
  sound: SoundType
  frequency: number
  isActive: boolean
}

interface GameState {
  level: number
  score: number
  lives: number
  isPlaying: boolean
  currentPattern: SoundTile[]
  userPattern: SoundTile[]
  availableSounds: SoundTile[]
  isShowingPattern: boolean
  highScore: number
  combo: number
  
  // Actions
  startGame: () => void
  endGame: () => void
  playSound: (tile: SoundTile) => void
  addToUserPattern: (tile: SoundTile) => void
  checkPattern: () => boolean
  nextLevel: () => void
  resetPattern: () => void
  generatePattern: () => void
  showPattern: () => void
  loseLife: () => void
  updateHighScore: () => void
}

const soundFrequencies: Record<SoundType, number[]> = {
  bell: [523, 587, 659, 698, 784],
  drum: [100, 150, 200, 250, 300],
  piano: [261, 329, 392, 440, 523],
  guitar: [164, 196, 246, 293, 329],
  flute: [880, 987, 1046, 1174, 1318],
  synth: [440, 494, 554, 622, 698]
}

const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  score: 0,
  lives: 3,
  isPlaying: false,
  currentPattern: [],
  userPattern: [],
  availableSounds: [],
  isShowingPattern: false,
  highScore: parseInt(localStorage.getItem('soundPuzzleHighScore') || '0'),
  combo: 0,

  startGame: () => {
    set({
      level: 1,
      score: 0,
      lives: 3,
      isPlaying: true,
      currentPattern: [],
      userPattern: [],
      combo: 0
    })
    get().generatePattern()
  },

  endGame: () => {
    get().updateHighScore()
    set({
      isPlaying: false,
      currentPattern: [],
      userPattern: [],
      isShowingPattern: false,
      combo: 0
    })
  },

  playSound: (tile: SoundTile) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = tile.frequency
    oscillator.type = getOscillatorType(tile.sound)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  },

  addToUserPattern: (tile: SoundTile) => {
    const { userPattern, currentPattern, checkPattern } = get()
    const newPattern = [...userPattern, tile]
    set({ userPattern: newPattern })
    
    get().playSound(tile)
    
    if (newPattern.length === currentPattern.length) {
      setTimeout(() => {
        if (checkPattern()) {
          get().nextLevel()
        } else {
          get().loseLife()
        }
      }, 500)
    }
  },

  checkPattern: () => {
    const { userPattern, currentPattern } = get()
    return userPattern.every((tile, index) => 
      tile.id === currentPattern[index].id
    )
  },

  nextLevel: () => {
    const { level, score, combo } = get()
    const points = (level * 100) + (combo * 50)
    set({ 
      level: level + 1, 
      score: score + points,
      combo: combo + 1,
      userPattern: []
    })
    setTimeout(() => {
      get().generatePattern()
    }, 1000)
  },

  resetPattern: () => {
    set({ userPattern: [], combo: 0 })
  },

  generatePattern: () => {
    const { level } = get()
    const patternLength = Math.min(3 + Math.floor(level / 2), 8)
    const soundTypes = Object.keys(soundFrequencies) as SoundType[]
    
    const pattern: SoundTile[] = []
    const availableTiles: SoundTile[] = []
    
    // Generate available tiles
    soundTypes.forEach(sound => {
      const frequencies = soundFrequencies[sound]
      frequencies.slice(0, Math.min(level + 2, 5)).forEach((freq, index) => {
        availableTiles.push({
          id: `${sound}-${index}`,
          sound,
          frequency: freq,
          isActive: false
        })
      })
    })
    
    // Create pattern
    for (let i = 0; i < patternLength; i++) {
      const randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)]
      pattern.push({ ...randomTile })
    }
    
    set({ 
      currentPattern: pattern, 
      availableSounds: availableTiles,
      userPattern: []
    })
    
    setTimeout(() => {
      get().showPattern()
    }, 500)
  },

  showPattern: async () => {
    set({ isShowingPattern: true })
    const { currentPattern } = get()
    
    for (let i = 0; i < currentPattern.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      get().playSound(currentPattern[i])
      
      // Visual feedback
      set(state => ({
        currentPattern: state.currentPattern.map((tile, index) => ({
          ...tile,
          isActive: index === i
        }))
      }))
      
      await new Promise(resolve => setTimeout(resolve, 400))
      
      set(state => ({
        currentPattern: state.currentPattern.map(tile => ({
          ...tile,
          isActive: false
        }))
      }))
    }
    
    set({ isShowingPattern: false })
  },

  loseLife: () => {
    const { lives } = get()
    if (lives > 1) {
      set({ lives: lives - 1, userPattern: [], combo: 0 })
      setTimeout(() => {
        get().showPattern()
      }, 1000)
    } else {
      get().endGame()
    }
  },

  updateHighScore: () => {
    const { score, highScore } = get()
    if (score > highScore) {
      set({ highScore: score })
      localStorage.setItem('soundPuzzleHighScore', score.toString())
    }
  }
}))

function getOscillatorType(sound: SoundType): OscillatorType {
  switch(sound) {
    case 'bell': return 'sine'
    case 'drum': return 'square'
    case 'piano': return 'triangle'
    case 'guitar': return 'sawtooth'
    case 'flute': return 'sine'
    case 'synth': return 'square'
    default: return 'sine'
  }
}

export default useGameStore