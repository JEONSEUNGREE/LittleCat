import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WaterIntake {
  id: string
  amount: number
  timestamp: number
  rhythm: number // 0-100 representing rhythm score
}

interface WaterStore {
  dailyGoal: number
  todayIntake: WaterIntake[]
  rhythmScore: number
  soundEnabled: boolean
  notifications: boolean
  lastNotification: number
  
  addWaterIntake: (amount: number) => void
  updateDailyGoal: (goal: number) => void
  toggleSound: () => void
  toggleNotifications: () => void
  calculateRhythmScore: () => number
  getTodayTotal: () => number
  getHourlyRhythm: () => number[]
  resetDaily: () => void
}

const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      dailyGoal: 2000, // ml
      todayIntake: [],
      rhythmScore: 0,
      soundEnabled: true,
      notifications: true,
      lastNotification: Date.now(),
      
      addWaterIntake: (amount: number) => {
        const now = Date.now()
        const rhythm = get().calculateRhythmScore()
        
        const newIntake: WaterIntake = {
          id: `water-${now}`,
          amount,
          timestamp: now,
          rhythm
        }
        
        set((state) => ({
          todayIntake: [...state.todayIntake, newIntake],
          rhythmScore: rhythm,
          lastNotification: now
        }))
        
        // Play rhythm sound if enabled
        if (get().soundEnabled) {
          // Simulate playing sound based on rhythm score
          const frequency = 200 + (rhythm * 5)
          playTone(frequency, 0.3)
        }
      },
      
      updateDailyGoal: (goal: number) => {
        set({ dailyGoal: goal })
      },
      
      toggleSound: () => {
        set((state) => ({ soundEnabled: !state.soundEnabled }))
      },
      
      toggleNotifications: () => {
        set((state) => ({ notifications: !state.notifications }))
      },
      
      calculateRhythmScore: () => {
        const intakes = get().todayIntake
        if (intakes.length < 2) return 50
        
        const intervals = []
        for (let i = 1; i < intakes.length; i++) {
          intervals.push(intakes[i].timestamp - intakes[i-1].timestamp)
        }
        
        // Calculate rhythm based on consistency of intervals
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
        const variance = intervals.reduce((sum, interval) => {
          return sum + Math.pow(interval - avgInterval, 2)
        }, 0) / intervals.length
        
        const standardDeviation = Math.sqrt(variance)
        const rhythmScore = Math.max(0, Math.min(100, 100 - (standardDeviation / avgInterval * 100)))
        
        return Math.round(rhythmScore)
      },
      
      getTodayTotal: () => {
        const today = new Date().setHours(0, 0, 0, 0)
        return get().todayIntake
          .filter(intake => intake.timestamp >= today)
          .reduce((total, intake) => total + intake.amount, 0)
      },
      
      getHourlyRhythm: () => {
        const hourly = new Array(24).fill(0)
        const today = new Date().setHours(0, 0, 0, 0)
        
        get().todayIntake
          .filter(intake => intake.timestamp >= today)
          .forEach(intake => {
            const hour = new Date(intake.timestamp).getHours()
            hourly[hour] += intake.amount
          })
        
        return hourly
      },
      
      resetDaily: () => {
        const today = new Date().setHours(0, 0, 0, 0)
        set((state) => ({
          todayIntake: state.todayIntake.filter(intake => intake.timestamp >= today)
        }))
      }
    }),
    {
      name: 'water-rhythm-storage',
    }
  )
)

// Helper function to play tone
function playTone(frequency: number, duration: number) {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  } catch (error) {
    console.log('Audio not supported')
  }
}

export default useWaterStore