import { create } from 'zustand'

interface CadenceSession {
  id: string
  date: Date
  averageCadence: number
  duration: number
  steps: number
  quality: number
}

interface CadenceStore {
  targetCadence: number
  currentCadence: number
  isTracking: boolean
  stepCount: number
  sessionTime: number
  sessions: CadenceSession[]
  weeklyGoal: number
  weeklySteps: number
  
  setTargetCadence: (cadence: number) => void
  setCurrentCadence: (cadence: number) => void
  startTracking: () => void
  stopTracking: () => void
  incrementSteps: () => void
  updateSessionTime: (time: number) => void
  saveSession: (session: CadenceSession) => void
  setWeeklyGoal: (goal: number) => void
  resetDaily: () => void
}

const useCadenceStore = create<CadenceStore>((set) => ({
  targetCadence: 170,
  currentCadence: 0,
  isTracking: false,
  stepCount: 0,
  sessionTime: 0,
  sessions: [],
  weeklyGoal: 50000,
  weeklySteps: 0,
  
  setTargetCadence: (cadence) => set({ targetCadence: cadence }),
  setCurrentCadence: (cadence) => set({ currentCadence: cadence }),
  startTracking: () => set({ isTracking: true, stepCount: 0, sessionTime: 0 }),
  stopTracking: () => set({ isTracking: false }),
  incrementSteps: () => set((state) => ({ 
    stepCount: state.stepCount + 1,
    weeklySteps: state.weeklySteps + 1 
  })),
  updateSessionTime: (time) => set({ sessionTime: time }),
  saveSession: (session) => set((state) => ({ 
    sessions: [...state.sessions, session].slice(-30)
  })),
  setWeeklyGoal: (goal) => set({ weeklyGoal: goal }),
  resetDaily: () => set({ stepCount: 0, sessionTime: 0 })
}))

export default useCadenceStore