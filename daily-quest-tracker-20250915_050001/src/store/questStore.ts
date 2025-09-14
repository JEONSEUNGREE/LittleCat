import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Quest {
  id: string
  title: string
  description: string
  category: 'daily' | 'main' | 'side'
  difficulty: 'easy' | 'medium' | 'hard' | 'epic'
  xpReward: number
  goldReward: number
  completed: boolean
  completedAt?: string
  createdAt: string
  dueDate?: string
}

export interface PlayerStats {
  level: number
  currentXP: number
  xpToNextLevel: number
  totalGold: number
  questsCompleted: number
  streak: number
  lastActiveDate: string
  achievements: string[]
  title: string
}

interface QuestStore {
  quests: Quest[]
  playerStats: PlayerStats
  addQuest: (quest: Omit<Quest, 'id' | 'completed' | 'createdAt'>) => void
  completeQuest: (questId: string) => void
  deleteQuest: (questId: string) => void
  updateQuest: (questId: string, updates: Partial<Quest>) => void
  resetDailyQuests: () => void
  calculateLevel: (xp: number) => number
  checkStreak: () => void
}

const XP_PER_LEVEL = 100
const LEVEL_MULTIPLIER = 1.2

const getDifficultyRewards = (difficulty: Quest['difficulty']) => {
  switch (difficulty) {
    case 'easy': return { xp: 10, gold: 5 }
    case 'medium': return { xp: 25, gold: 15 }
    case 'hard': return { xp: 50, gold: 30 }
    case 'epic': return { xp: 100, gold: 75 }
    default: return { xp: 10, gold: 5 }
  }
}

const getPlayerTitle = (level: number): string => {
  if (level < 5) return 'Novice Adventurer'
  if (level < 10) return 'Apprentice Hero'
  if (level < 20) return 'Journeyman Warrior'
  if (level < 30) return 'Expert Champion'
  if (level < 50) return 'Master Crusader'
  if (level < 75) return 'Legendary Knight'
  if (level < 100) return 'Epic Conqueror'
  return 'Mythical Overlord'
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set, get) => ({
      quests: [],
      playerStats: {
        level: 1,
        currentXP: 0,
        xpToNextLevel: XP_PER_LEVEL,
        totalGold: 0,
        questsCompleted: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        achievements: [],
        title: 'Novice Adventurer'
      },

      addQuest: (questData) => {
        const rewards = getDifficultyRewards(questData.difficulty)
        const newQuest: Quest = {
          ...questData,
          id: Date.now().toString(),
          xpReward: rewards.xp,
          goldReward: rewards.gold,
          completed: false,
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          quests: [...state.quests, newQuest]
        }))
      },

      completeQuest: (questId) => {
        const quest = get().quests.find(q => q.id === questId)
        if (!quest || quest.completed) return

        set((state) => {
          const updatedQuests = state.quests.map(q =>
            q.id === questId
              ? { ...q, completed: true, completedAt: new Date().toISOString() }
              : q
          )

          const newXP = state.playerStats.currentXP + quest.xpReward
          const newGold = state.playerStats.totalGold + quest.goldReward
          const newQuestsCompleted = state.playerStats.questsCompleted + 1

          let newLevel = state.playerStats.level
          let currentXP = newXP
          let xpToNextLevel = state.playerStats.xpToNextLevel

          while (currentXP >= xpToNextLevel) {
            currentXP -= xpToNextLevel
            newLevel++
            xpToNextLevel = Math.floor(XP_PER_LEVEL * Math.pow(LEVEL_MULTIPLIER, newLevel - 1))
          }

          const newTitle = getPlayerTitle(newLevel)

          return {
            quests: updatedQuests,
            playerStats: {
              ...state.playerStats,
              level: newLevel,
              currentXP,
              xpToNextLevel,
              totalGold: newGold,
              questsCompleted: newQuestsCompleted,
              title: newTitle
            }
          }
        })
      },

      deleteQuest: (questId) => {
        set((state) => ({
          quests: state.quests.filter(q => q.id !== questId)
        }))
      },

      updateQuest: (questId, updates) => {
        set((state) => ({
          quests: state.quests.map(q =>
            q.id === questId ? { ...q, ...updates } : q
          )
        }))
      },

      resetDailyQuests: () => {
        set((state) => ({
          quests: state.quests.map(q =>
            q.category === 'daily' ? { ...q, completed: false, completedAt: undefined } : q
          )
        }))
      },

      calculateLevel: (xp) => {
        let level = 1
        let totalXpNeeded = XP_PER_LEVEL
        
        while (xp >= totalXpNeeded) {
          level++
          totalXpNeeded += Math.floor(XP_PER_LEVEL * Math.pow(LEVEL_MULTIPLIER, level - 1))
        }
        
        return level
      },

      checkStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        const lastActive = get().playerStats.lastActiveDate
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

        set((state) => {
          let newStreak = state.playerStats.streak
          
          if (lastActive === yesterday) {
            newStreak++
          } else if (lastActive !== today) {
            newStreak = 0
          }

          return {
            playerStats: {
              ...state.playerStats,
              streak: newStreak,
              lastActiveDate: today
            }
          }
        })
      }
    }),
    {
      name: 'quest-store',
      version: 1
    }
  )
)