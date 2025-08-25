import { create } from 'zustand'

interface Participant {
  id: string
  name: string
  speakTime: number
  isActive: boolean
  color: string
}

interface AgendaItem {
  id: string
  title: string
  allocatedTime: number
  usedTime: number
  isActive: boolean
}

interface MeetingStore {
  // Meeting state
  meetingTitle: string
  totalMeetingTime: number
  elapsedTime: number
  isRunning: boolean
  isPaused: boolean
  
  // Participants
  participants: Participant[]
  activeParticipantId: string | null
  
  // Agenda
  agendaItems: AgendaItem[]
  activeAgendaId: string | null
  
  // Actions
  setMeetingTitle: (title: string) => void
  setTotalMeetingTime: (time: number) => void
  startMeeting: () => void
  pauseMeeting: () => void
  stopMeeting: () => void
  
  // Participant actions
  addParticipant: (name: string) => void
  removeParticipant: (id: string) => void
  setActiveParticipant: (id: string | null) => void
  updateParticipantTime: (id: string, time: number) => void
  
  // Agenda actions
  addAgendaItem: (title: string, time: number) => void
  removeAgendaItem: (id: string) => void
  setActiveAgenda: (id: string | null) => void
  updateAgendaTime: (id: string, time: number) => void
  
  // Timer
  tick: () => void
}

const colors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
]

export const useMeetingStore = create<MeetingStore>((set, get) => ({
  // Initial state
  meetingTitle: '팀 회의',
  totalMeetingTime: 30 * 60, // 30 minutes in seconds
  elapsedTime: 0,
  isRunning: false,
  isPaused: false,
  participants: [],
  activeParticipantId: null,
  agendaItems: [],
  activeAgendaId: null,
  
  // Meeting actions
  setMeetingTitle: (title) => set({ meetingTitle: title }),
  setTotalMeetingTime: (time) => set({ totalMeetingTime: time }),
  
  startMeeting: () => set({ isRunning: true, isPaused: false }),
  pauseMeeting: () => set({ isPaused: true }),
  stopMeeting: () => set({ 
    isRunning: false, 
    isPaused: false, 
    elapsedTime: 0,
    activeParticipantId: null,
    activeAgendaId: null,
    participants: get().participants.map(p => ({ ...p, speakTime: 0, isActive: false })),
    agendaItems: get().agendaItems.map(a => ({ ...a, usedTime: 0, isActive: false }))
  }),
  
  // Participant actions
  addParticipant: (name) => {
    const participants = get().participants
    const newParticipant: Participant = {
      id: Date.now().toString(),
      name,
      speakTime: 0,
      isActive: false,
      color: colors[participants.length % colors.length]
    }
    set({ participants: [...participants, newParticipant] })
  },
  
  removeParticipant: (id) => {
    set({ participants: get().participants.filter(p => p.id !== id) })
  },
  
  setActiveParticipant: (id) => {
    const participants = get().participants.map(p => ({
      ...p,
      isActive: p.id === id
    }))
    set({ participants, activeParticipantId: id })
  },
  
  updateParticipantTime: (id, time) => {
    const participants = get().participants.map(p => 
      p.id === id ? { ...p, speakTime: time } : p
    )
    set({ participants })
  },
  
  // Agenda actions
  addAgendaItem: (title, time) => {
    const newItem: AgendaItem = {
      id: Date.now().toString(),
      title,
      allocatedTime: time,
      usedTime: 0,
      isActive: false
    }
    set({ agendaItems: [...get().agendaItems, newItem] })
  },
  
  removeAgendaItem: (id) => {
    set({ agendaItems: get().agendaItems.filter(a => a.id !== id) })
  },
  
  setActiveAgenda: (id) => {
    const agendaItems = get().agendaItems.map(a => ({
      ...a,
      isActive: a.id === id
    }))
    set({ agendaItems, activeAgendaId: id })
  },
  
  updateAgendaTime: (id, time) => {
    const agendaItems = get().agendaItems.map(a => 
      a.id === id ? { ...a, usedTime: time } : a
    )
    set({ agendaItems })
  },
  
  // Timer tick
  tick: () => {
    const state = get()
    if (!state.isRunning || state.isPaused) return
    
    set({ elapsedTime: state.elapsedTime + 1 })
    
    // Update active participant time
    if (state.activeParticipantId) {
      const participant = state.participants.find(p => p.id === state.activeParticipantId)
      if (participant) {
        state.updateParticipantTime(state.activeParticipantId, participant.speakTime + 1)
      }
    }
    
    // Update active agenda time
    if (state.activeAgendaId) {
      const agenda = state.agendaItems.find(a => a.id === state.activeAgendaId)
      if (agenda) {
        state.updateAgendaTime(state.activeAgendaId, agenda.usedTime + 1)
      }
    }
  }
}))