import { create } from 'zustand'

interface FocusBlock {
  id: string
  duration: number
  type: 'focus' | 'break'
  completed: boolean
}

interface FocusSession {
  id: string
  blocks: FocusBlock[]
  startTime: Date | null
  endTime: Date | null
  totalFocusTime: number
  completedBlocks: number
}

interface FocusStore {
  currentSession: FocusSession | null
  sessions: FocusSession[]
  isRunning: boolean
  currentBlockIndex: number
  timeRemaining: number
  focusPatterns: number[]
  
  // Actions
  startSession: (blocks: FocusBlock[]) => void
  pauseSession: () => void
  resumeSession: () => void
  endSession: () => void
  nextBlock: () => void
  updateTimeRemaining: (time: number) => void
  analyzeFocusPattern: () => number
  generateSmartBlocks: () => FocusBlock[]
}

const useFocusStore = create<FocusStore>((set, get) => ({
  currentSession: null,
  sessions: [],
  isRunning: false,
  currentBlockIndex: 0,
  timeRemaining: 0,
  focusPatterns: [25, 5, 25, 5, 25, 15], // Default pattern

  startSession: (blocks) => {
    const newSession: FocusSession = {
      id: Date.now().toString(),
      blocks,
      startTime: new Date(),
      endTime: null,
      totalFocusTime: 0,
      completedBlocks: 0
    }
    set({ 
      currentSession: newSession,
      isRunning: true,
      currentBlockIndex: 0,
      timeRemaining: blocks[0]?.duration || 0
    })
  },

  pauseSession: () => set({ isRunning: false }),
  
  resumeSession: () => set({ isRunning: true }),

  endSession: () => {
    const { currentSession, sessions } = get()
    if (currentSession) {
      const endedSession = {
        ...currentSession,
        endTime: new Date()
      }
      set({
        sessions: [...sessions, endedSession],
        currentSession: null,
        isRunning: false,
        currentBlockIndex: 0,
        timeRemaining: 0
      })
    }
  },

  nextBlock: () => {
    const { currentSession, currentBlockIndex } = get()
    if (!currentSession) return

    const nextIndex = currentBlockIndex + 1
    if (nextIndex < currentSession.blocks.length) {
      const updatedBlocks = [...currentSession.blocks]
      updatedBlocks[currentBlockIndex].completed = true
      
      const updatedSession = {
        ...currentSession,
        blocks: updatedBlocks,
        completedBlocks: currentSession.completedBlocks + 1,
        totalFocusTime: currentSession.blocks[currentBlockIndex].type === 'focus' 
          ? currentSession.totalFocusTime + currentSession.blocks[currentBlockIndex].duration
          : currentSession.totalFocusTime
      }

      set({
        currentSession: updatedSession,
        currentBlockIndex: nextIndex,
        timeRemaining: currentSession.blocks[nextIndex].duration
      })
    } else {
      get().endSession()
    }
  },

  updateTimeRemaining: (time) => set({ timeRemaining: time }),

  analyzeFocusPattern: () => {
    const { sessions } = get()
    if (sessions.length === 0) return 25

    const recentSessions = sessions.slice(-5)
    const avgFocusTime = recentSessions.reduce((acc, session) => 
      acc + (session.totalFocusTime / session.completedBlocks), 0) / recentSessions.length
    
    return Math.round(avgFocusTime) || 25
  },

  generateSmartBlocks: () => {
    const optimalFocusTime = get().analyzeFocusPattern()
    const blocks: FocusBlock[] = []
    
    // Generate 4 focus blocks with adaptive breaks
    for (let i = 0; i < 4; i++) {
      blocks.push({
        id: `focus-${i}`,
        duration: optimalFocusTime,
        type: 'focus',
        completed: false
      })
      
      if (i < 3) {
        // Short breaks between focus blocks
        blocks.push({
          id: `break-${i}`,
          duration: 5,
          type: 'break',
          completed: false
        })
      } else {
        // Longer break after 4 focus blocks
        blocks.push({
          id: `break-long`,
          duration: 15,
          type: 'break',
          completed: false
        })
      }
    }
    
    return blocks
  }
}))