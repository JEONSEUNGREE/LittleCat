import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Plant {
  id: string
  name: string
  level: number
  health: number
  type: 'seedling' | 'sprout' | 'flower' | 'tree'
}

interface HydrationStore {
  dailyGoal: number
  currentIntake: number
  streakDays: number
  totalWaterLogged: number
  plants: Plant[]
  currentPlant: Plant | null
  lastWaterTime: string | null
  
  addWater: (amount: number) => void
  setDailyGoal: (goal: number) => void
  waterPlant: () => void
  addNewPlant: (name: string) => void
  selectPlant: (plantId: string) => void
  resetDaily: () => void
  checkAndUpdateStreak: () => void
}

const useHydrationStore = create<HydrationStore>()(
  persist(
    (set, get) => ({
      dailyGoal: 2000,
      currentIntake: 0,
      streakDays: 0,
      totalWaterLogged: 0,
      plants: [],
      currentPlant: null,
      lastWaterTime: null,

      addWater: (amount: number) => {
        set((state) => {
          const newIntake = Math.min(state.currentIntake + amount, state.dailyGoal * 1.5)
          const newTotal = state.totalWaterLogged + amount
          
          return {
            currentIntake: newIntake,
            totalWaterLogged: newTotal,
            lastWaterTime: new Date().toISOString()
          }
        })
        get().waterPlant()
      },

      setDailyGoal: (goal: number) => {
        set({ dailyGoal: goal })
      },

      waterPlant: () => {
        set((state) => {
          if (!state.currentPlant) return state

          const waterRatio = state.currentIntake / state.dailyGoal
          const healthIncrease = Math.min(waterRatio * 20, 20)
          
          const updatedPlant = {
            ...state.currentPlant,
            health: Math.min(state.currentPlant.health + healthIncrease, 100)
          }

          // Level up logic
          if (updatedPlant.health >= 100) {
            updatedPlant.level += 1
            updatedPlant.health = 50
            
            if (updatedPlant.level >= 10 && updatedPlant.type === 'seedling') {
              updatedPlant.type = 'sprout'
            } else if (updatedPlant.level >= 20 && updatedPlant.type === 'sprout') {
              updatedPlant.type = 'flower'
            } else if (updatedPlant.level >= 30 && updatedPlant.type === 'flower') {
              updatedPlant.type = 'tree'
            }
          }

          const updatedPlants = state.plants.map(p => 
            p.id === updatedPlant.id ? updatedPlant : p
          )

          return {
            currentPlant: updatedPlant,
            plants: updatedPlants
          }
        })
      },

      addNewPlant: (name: string) => {
        const newPlant: Plant = {
          id: Date.now().toString(),
          name,
          level: 1,
          health: 50,
          type: 'seedling'
        }
        
        set((state) => ({
          plants: [...state.plants, newPlant],
          currentPlant: newPlant
        }))
      },

      selectPlant: (plantId: string) => {
        set((state) => ({
          currentPlant: state.plants.find(p => p.id === plantId) || null
        }))
      },

      resetDaily: () => {
        set({ currentIntake: 0 })
      },

      checkAndUpdateStreak: () => {
        const lastReset = localStorage.getItem('lastResetDate')
        const today = new Date().toDateString()
        
        if (lastReset !== today) {
          set((state) => {
            const goalMet = state.currentIntake >= state.dailyGoal * 0.8
            const newStreak = goalMet ? state.streakDays + 1 : 0
            
            localStorage.setItem('lastResetDate', today)
            
            return {
              streakDays: newStreak,
              currentIntake: 0
            }
          })
        }
      }
    }),
    {
      name: 'hydration-storage'
    }
  )
)

export default useHydrationStore