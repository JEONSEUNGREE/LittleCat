import { create } from 'zustand'

export interface Word {
  id: string
  word: string
  meaning: string
  level: number
  learned: boolean
  lastReviewed?: Date
}

export interface Plant {
  id: string
  wordId: string
  type: 'seed' | 'sprout' | 'flower' | 'tree'
  growthLevel: number // 0-100
  waterLevel: number // 0-100
  health: number // 0-100
}

interface GardenState {
  words: Word[]
  plants: Plant[]
  totalScore: number
  streakDays: number
  lastStudyDate: string | null
  addWord: (word: Omit<Word, 'id' | 'level' | 'learned'>) => void
  waterPlant: (plantId: string) => void
  studyWord: (wordId: string, correct: boolean) => void
  getPlantByWordId: (wordId: string) => Plant | undefined
  updateStreak: () => void
}

const wordList: Omit<Word, 'id' | 'level' | 'learned'>[] = [
  { word: 'serendipity', meaning: '뜻밖의 발견' },
  { word: 'ephemeral', meaning: '순간적인' },
  { word: 'resilient', meaning: '회복력 있는' },
  { word: 'innovative', meaning: '혁신적인' },
  { word: 'sustainable', meaning: '지속 가능한' },
  { word: 'empathy', meaning: '공감' },
  { word: 'ambitious', meaning: '야망 있는' },
  { word: 'meticulous', meaning: '꼼꼼한' },
]

export const useGardenStore = create<GardenState>((set, get) => ({
      words: wordList.map((w, i) => ({
        ...w,
        id: `word-${i}`,
        level: 0,
        learned: false,
      })),
      plants: wordList.map((_, i) => ({
        id: `plant-${i}`,
        wordId: `word-${i}`,
        type: 'seed' as const,
        growthLevel: 0,
        waterLevel: 50,
        health: 100,
      })),
      totalScore: 0,
      streakDays: 0,
      lastStudyDate: null,

      addWord: (word) => {
        const id = `word-${Date.now()}`
        const plantId = `plant-${Date.now()}`
        set((state) => ({
          words: [...state.words, { ...word, id, level: 0, learned: false }],
          plants: [...state.plants, {
            id: plantId,
            wordId: id,
            type: 'seed',
            growthLevel: 0,
            waterLevel: 50,
            health: 100,
          }],
        }))
      },

      waterPlant: (plantId) => {
        set((state) => ({
          plants: state.plants.map((p) =>
            p.id === plantId
              ? { ...p, waterLevel: Math.min(100, p.waterLevel + 20), health: Math.min(100, p.health + 10) }
              : p
          ),
        }))
      },

      studyWord: (wordId, correct) => {
        set((state) => {
          const updatedWords = state.words.map((w) =>
            w.id === wordId
              ? {
                  ...w,
                  level: correct ? Math.min(5, w.level + 1) : w.level,
                  learned: w.level >= 4 && correct,
                  lastReviewed: new Date(),
                }
              : w
          )

          const word = updatedWords.find((w) => w.id === wordId)
          const updatedPlants = state.plants.map((p) => {
            if (p.wordId === wordId && word) {
              const newGrowth = correct ? p.growthLevel + 20 : p.growthLevel + 5
              let newType: Plant['type'] = 'seed'
              
              if (newGrowth >= 80) newType = 'tree'
              else if (newGrowth >= 60) newType = 'flower'
              else if (newGrowth >= 30) newType = 'sprout'
              
              return {
                ...p,
                growthLevel: Math.min(100, newGrowth),
                type: newType,
                waterLevel: Math.max(0, p.waterLevel - 10),
              }
            }
            return p
          })

          return {
            words: updatedWords,
            plants: updatedPlants,
            totalScore: state.totalScore + (correct ? 10 : 2),
          }
        })
        get().updateStreak()
      },

      getPlantByWordId: (wordId) => {
        return get().plants.find((p) => p.wordId === wordId)
      },

      updateStreak: () => {
        const today = new Date().toDateString()
        const lastDate = get().lastStudyDate
        
        if (lastDate) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          
          if (lastDate === yesterday.toDateString()) {
            set((state) => ({
              streakDays: state.streakDays + 1,
              lastStudyDate: today,
            }))
          } else if (lastDate !== today) {
            set({ streakDays: 1, lastStudyDate: today })
          }
        } else {
          set({ streakDays: 1, lastStudyDate: today })
        }
      },
}))