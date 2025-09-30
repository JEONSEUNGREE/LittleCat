import { create } from 'zustand'

export interface TimeEvent {
  id: string
  type: 'move' | 'interact' | 'trigger' | 'collision'
  position: { x: number; y: number }
  timestamp: number
  data?: any
  reversed?: boolean
}

export interface GameLevel {
  id: number
  name: string
  goalState: any
  initialState: any
  maxTimeSteps: number
  completed: boolean
  stars: number
}

interface GameState {
  currentLevel: number
  isPlaying: boolean
  isPaused: boolean
  isReversing: boolean
  timelinePosition: number
  timeline: TimeEvent[]
  score: number
  moves: number
  levels: GameLevel[]
  soundEnabled: boolean
  vibrationEnabled: boolean
  
  // Actions
  startLevel: (levelId: number) => void
  pauseGame: () => void
  resumeGame: () => void
  addTimeEvent: (event: Omit<TimeEvent, 'id' | 'timestamp'>) => void
  reverseTime: () => void
  forwardTime: () => void
  setTimelinePosition: (position: number) => void
  completeLevel: (stars: number) => void
  resetLevel: () => void
  toggleSound: () => void
  toggleVibration: () => void
}

const initialLevels: GameLevel[] = [
  {
    id: 1,
    name: '시작: 깨진 꽃병',
    goalState: { vase: 'broken', pieces: 5 },
    initialState: { vase: 'intact' },
    maxTimeSteps: 10,
    completed: false,
    stars: 0
  },
  {
    id: 2,
    name: '복잡한 도미노',
    goalState: { dominos: 'fallen', pattern: 'spiral' },
    initialState: { dominos: 'standing' },
    maxTimeSteps: 15,
    completed: false,
    stars: 0
  },
  {
    id: 3,
    name: '시간의 미로',
    goalState: { exit: 'reached', keys: 3 },
    initialState: { position: 'start', keys: 0 },
    maxTimeSteps: 20,
    completed: false,
    stars: 0
  },
  {
    id: 4,
    name: '연쇄 반응',
    goalState: { reactions: 5, sequence: 'complete' },
    initialState: { reactions: 0 },
    maxTimeSteps: 25,
    completed: false,
    stars: 0
  },
  {
    id: 5,
    name: '시간 역설',
    goalState: { paradox: 'resolved' },
    initialState: { paradox: 'created' },
    maxTimeSteps: 30,
    completed: false,
    stars: 0
  }
]

export const useGameStore = create<GameState>((set, get) => ({
  currentLevel: 0,
  isPlaying: false,
  isPaused: false,
  isReversing: false,
  timelinePosition: 0,
  timeline: [],
  score: 0,
  moves: 0,
  levels: initialLevels,
  soundEnabled: true,
  vibrationEnabled: true,

  startLevel: (levelId) => {
    set({
      currentLevel: levelId,
      isPlaying: true,
      isPaused: false,
      isReversing: false,
      timelinePosition: 0,
      timeline: [],
      moves: 0
    })
  },

  pauseGame: () => set({ isPaused: true }),
  
  resumeGame: () => set({ isPaused: false }),

  addTimeEvent: (event) => {
    const { timeline, timelinePosition } = get()
    const newEvent: TimeEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: timelinePosition
    }
    
    set({
      timeline: [...timeline, newEvent],
      timelinePosition: timelinePosition + 1,
      moves: get().moves + 1
    })
  },

  reverseTime: () => {
    const { timelinePosition, timeline } = get()
    if (timelinePosition > 0) {
      set({
        isReversing: true,
        timelinePosition: timelinePosition - 1,
        timeline: timeline.map((evt, idx) => 
          idx === timelinePosition - 1 
            ? { ...evt, reversed: true }
            : evt
        )
      })
      
      setTimeout(() => set({ isReversing: false }), 300)
    }
  },

  forwardTime: () => {
    const { timelinePosition, timeline } = get()
    if (timelinePosition < timeline.length) {
      set({
        timelinePosition: timelinePosition + 1,
        timeline: timeline.map((evt, idx) => 
          idx === timelinePosition 
            ? { ...evt, reversed: false }
            : evt
        )
      })
    }
  },

  setTimelinePosition: (position) => {
    const { timeline } = get()
    const clampedPosition = Math.max(0, Math.min(position, timeline.length))
    
    set({
      timelinePosition: clampedPosition,
      timeline: timeline.map((evt, idx) => ({
        ...evt,
        reversed: idx >= clampedPosition
      }))
    })
  },

  completeLevel: (stars) => {
    const { currentLevel, levels, score } = get()
    const updatedLevels = levels.map(level =>
      level.id === currentLevel
        ? { ...level, completed: true, stars: Math.max(level.stars, stars) }
        : level
    )
    
    set({
      levels: updatedLevels,
      score: score + stars * 100,
      isPlaying: false
    })
  },

  resetLevel: () => {
    set({
      timelinePosition: 0,
      timeline: [],
      moves: 0,
      isReversing: false
    })
  },

  toggleSound: () => set({ soundEnabled: !get().soundEnabled }),
  
  toggleVibration: () => set({ vibrationEnabled: !get().vibrationEnabled })
}))