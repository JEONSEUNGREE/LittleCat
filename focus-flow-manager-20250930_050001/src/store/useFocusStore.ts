import { create } from 'zustand'

interface FocusSession {
  id: string
  taskName: string
  duration: number // in minutes
  startTime: Date | null
  endTime: Date | null
  completed: boolean
  productivity: number // 0-100
}

interface FocusPattern {
  bestHours: number[]
  averageProductivity: number
  totalSessions: number
  totalFocusTime: number
  streakDays: number
}

interface FocusStore {
  // State
  currentSession: FocusSession | null
  sessions: FocusSession[]
  isRunning: boolean
  timeLeft: number // in seconds
  focusPattern: FocusPattern
  dailyGoal: number // in minutes
  dailyProgress: number // in minutes
  
  // Actions
  startSession: (taskName: string, duration: number) => void
  pauseSession: () => void
  resumeSession: () => void
  endSession: (productivity: number) => void
  updateTimeLeft: (time: number) => void
  setDailyGoal: (minutes: number) => void
  analyzeFocusPatterns: () => void
  getSuggestions: () => string[]
}

export const useFocusStore = create<FocusStore>((set, get) => ({
  // Initial state
  currentSession: null,
  sessions: JSON.parse(localStorage.getItem('focus-sessions') || '[]'),
  isRunning: false,
  timeLeft: 0,
  focusPattern: {
    bestHours: [9, 10, 14, 15],
    averageProductivity: 75,
    totalSessions: 0,
    totalFocusTime: 0,
    streakDays: 0
  },
  dailyGoal: 240, // 4 hours default
  dailyProgress: 0,
  
  // Actions
  startSession: (taskName: string, duration: number) => {
    const newSession: FocusSession = {
      id: Date.now().toString(),
      taskName,
      duration,
      startTime: new Date(),
      endTime: null,
      completed: false,
      productivity: 0
    }
    set({
      currentSession: newSession,
      isRunning: true,
      timeLeft: duration * 60
    })
  },
  
  pauseSession: () => set({ isRunning: false }),
  
  resumeSession: () => set({ isRunning: true }),
  
  endSession: (productivity: number) => {
    const { currentSession, sessions, dailyProgress } = get()
    if (!currentSession) return
    
    const completedSession = {
      ...currentSession,
      endTime: new Date(),
      completed: true,
      productivity
    }
    
    const updatedSessions = [...sessions, completedSession]
    localStorage.setItem('focus-sessions', JSON.stringify(updatedSessions))
    
    set({
      currentSession: null,
      sessions: updatedSessions,
      isRunning: false,
      timeLeft: 0,
      dailyProgress: dailyProgress + currentSession.duration
    })
    
    get().analyzeFocusPatterns()
  },
  
  updateTimeLeft: (time: number) => set({ timeLeft: time }),
  
  setDailyGoal: (minutes: number) => set({ dailyGoal: minutes }),
  
  analyzeFocusPatterns: () => {
    const { sessions } = get()
    if (sessions.length === 0) return
    
    // Calculate patterns from sessions
    const hourProductivity = new Map<number, number[]>()
    let totalProductivity = 0
    let totalTime = 0
    
    sessions.forEach(session => {
      if (!session.startTime) return
      const hour = new Date(session.startTime).getHours()
      if (!hourProductivity.has(hour)) {
        hourProductivity.set(hour, [])
      }
      hourProductivity.get(hour)?.push(session.productivity)
      totalProductivity += session.productivity
      totalTime += session.duration
    })
    
    // Find best hours
    const bestHours = Array.from(hourProductivity.entries())
      .map(([hour, productivities]) => ({
        hour,
        avg: productivities.reduce((a, b) => a + b, 0) / productivities.length
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 4)
      .map(item => item.hour)
    
    set({
      focusPattern: {
        bestHours,
        averageProductivity: Math.round(totalProductivity / sessions.length),
        totalSessions: sessions.length,
        totalFocusTime: totalTime,
        streakDays: calculateStreakDays(sessions)
      }
    })
  },
  
  getSuggestions: () => {
    const { focusPattern, dailyProgress, dailyGoal } = get()
    const suggestions: string[] = []
    const currentHour = new Date().getHours()
    
    if (focusPattern.bestHours.includes(currentHour)) {
      suggestions.push('지금이 당신의 최적 집중 시간입니다! 🎯')
    }
    
    if (dailyProgress < dailyGoal * 0.5 && currentHour > 14) {
      suggestions.push('오늘 목표 달성을 위해 집중 세션을 시작하세요 💪')
    }
    
    if (focusPattern.averageProductivity < 70) {
      suggestions.push('짧은 세션(25분)으로 시작해보세요 ⏱️')
    }
    
    if (focusPattern.streakDays > 3) {
      suggestions.push(`${focusPattern.streakDays}일 연속 달성 중! 계속 유지하세요 🔥`)
    }
    
    return suggestions
  }
}))

function calculateStreakDays(sessions: FocusSession[]): number {
  if (sessions.length === 0) return 0
  
  const dates = sessions
    .filter(s => s.startTime)
    .map(s => new Date(s.startTime!).toDateString())
  const uniqueDates = [...new Set(dates)].sort()
  
  let streak = 1
  for (let i = uniqueDates.length - 1; i > 0; i--) {
    const current = new Date(uniqueDates[i])
    const previous = new Date(uniqueDates[i - 1])
    const diffDays = Math.floor((current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}