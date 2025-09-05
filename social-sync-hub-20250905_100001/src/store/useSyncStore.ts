import { create } from 'zustand'

export interface Decision {
  id: string
  title: string
  description: string
  options: Option[]
  createdBy: string
  createdAt: Date
  expiresAt: Date
  participants: Participant[]
  status: 'active' | 'completed' | 'expired'
  result?: string
}

export interface Option {
  id: string
  text: string
  votes: number
  voters: string[]
  color: string
}

export interface Participant {
  id: string
  name: string
  avatar: string
  hasVoted: boolean
  emotion?: string
}

interface SyncStore {
  currentUser: Participant | null
  decisions: Decision[]
  activeDecisionId: string | null
  notifications: Notification[]
  setCurrentUser: (user: Participant) => void
  addDecision: (decision: Decision) => void
  voteOnOption: (decisionId: string, optionId: string) => void
  setActiveDecision: (id: string | null) => void
  addNotification: (notification: Notification) => void
  clearNotifications: () => void
}

export interface Notification {
  id: string
  message: string
  type: 'info' | 'success' | 'warning'
  timestamp: Date
}

const generateAvatar = (name: string) => {
  const colors = ['#6B5B95', '#FF6F61', '#88D8B0', '#FFD662', '#6BA292']
  const index = name.length % colors.length
  return colors[index]
}

export const useSyncStore = create<SyncStore>((set) => ({
  currentUser: null,
  decisions: [],
  activeDecisionId: null,
  notifications: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  addDecision: (decision) => 
    set((state) => ({
      decisions: [...state.decisions, decision],
      notifications: [...state.notifications, {
        id: Date.now().toString(),
        message: `새로운 결정: ${decision.title}`,
        type: 'info',
        timestamp: new Date()
      }]
    })),

  voteOnOption: (decisionId, optionId) =>
    set((state) => {
      const decision = state.decisions.find(d => d.id === decisionId)
      if (!decision || !state.currentUser) return state

      const updatedDecisions = state.decisions.map(d => {
        if (d.id !== decisionId) return d

        const updatedOptions = d.options.map(opt => {
          // Remove user's previous vote
          const filteredVoters = opt.voters.filter(v => v !== state.currentUser!.id)
          
          if (opt.id === optionId) {
            return {
              ...opt,
              votes: filteredVoters.length + 1,
              voters: [...filteredVoters, state.currentUser!.id]
            }
          }
          return {
            ...opt,
            votes: filteredVoters.length,
            voters: filteredVoters
          }
        })

        const updatedParticipants = d.participants.map(p => 
          p.id === state.currentUser!.id ? { ...p, hasVoted: true } : p
        )

        return {
          ...d,
          options: updatedOptions,
          participants: updatedParticipants
        }
      })

      return { 
        decisions: updatedDecisions,
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          message: '투표가 완료되었습니다!',
          type: 'success',
          timestamp: new Date()
        }]
      }
    }),

  setActiveDecision: (id) => set({ activeDecisionId: id }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification]
    })),

  clearNotifications: () => set({ notifications: [] })
}))