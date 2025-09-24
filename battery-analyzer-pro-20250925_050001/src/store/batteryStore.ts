import { create } from 'zustand'

interface AppUsage {
  name: string
  icon: string
  usage: number
  time: string
  color: string
}

interface BatteryTip {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
}

interface BatteryHistory {
  time: string
  level: number
}

interface BatteryStore {
  batteryLevel: number
  isCharging: boolean
  remainingTime: string
  temperature: number
  health: number
  voltage: number
  capacity: number
  appUsages: AppUsage[]
  tips: BatteryTip[]
  history: BatteryHistory[]
  setBatteryLevel: (level: number | ((prev: number) => number)) => void
  setCharging: (charging: boolean) => void
  updateBatteryInfo: () => void
  generateMockData: () => void
}

export const useBatteryStore = create<BatteryStore>((set) => ({
  batteryLevel: 75,
  isCharging: false,
  remainingTime: '3h 45m',
  temperature: 28,
  health: 92,
  voltage: 3.8,
  capacity: 3000,
  appUsages: [],
  tips: [],
  history: [],
  
  setBatteryLevel: (level) => set((state) => ({ 
    batteryLevel: typeof level === 'function' ? level(state.batteryLevel) : level 
  })),
  setCharging: (charging) => set({ isCharging: charging }),
  
  updateBatteryInfo: () => {
    set((state) => ({
      temperature: 25 + Math.random() * 10,
      voltage: 3.7 + Math.random() * 0.5,
      history: [
        ...state.history.slice(-23),
        {
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          level: state.batteryLevel
        }
      ]
    }))
  },
  
  generateMockData: () => {
    const mockApps: AppUsage[] = [
      { name: '유튜브', icon: '📺', usage: 28, time: '2h 15m', color: '#FF0000' },
      { name: '인스타그램', icon: '📷', usage: 18, time: '1h 30m', color: '#E4405F' },
      { name: '카카오톡', icon: '💬', usage: 15, time: '1h 15m', color: '#FFE300' },
      { name: '게임', icon: '🎮', usage: 22, time: '1h 50m', color: '#9333EA' },
      { name: '넷플릭스', icon: '🎬', usage: 12, time: '1h 00m', color: '#E50914' },
      { name: '기타', icon: '📱', usage: 5, time: '25m', color: '#6B7280' },
    ]
    
    const mockTips: BatteryTip[] = [
      {
        id: '1',
        title: '화면 밝기 자동 조절',
        description: '자동 밝기를 켜면 최대 20% 배터리 절약',
        impact: 'high'
      },
      {
        id: '2',
        title: '백그라운드 앱 정리',
        description: '사용하지 않는 앱을 종료하여 10% 절약',
        impact: 'medium'
      },
      {
        id: '3',
        title: '절전 모드 활성화',
        description: '배터리 20% 이하시 자동 절전 모드',
        impact: 'high'
      },
      {
        id: '4',
        title: 'Wi-Fi 자동 연결',
        description: '모바일 데이터보다 Wi-Fi가 배터리 효율적',
        impact: 'low'
      }
    ]
    
    const mockHistory: BatteryHistory[] = []
    for (let i = 23; i >= 0; i--) {
      const hour = new Date()
      hour.setHours(hour.getHours() - i)
      mockHistory.push({
        time: hour.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        level: Math.max(10, Math.min(100, 75 + Math.random() * 30 - 15 - i * 2))
      })
    }
    
    set({
      appUsages: mockApps,
      tips: mockTips,
      history: mockHistory
    })
  }
}))