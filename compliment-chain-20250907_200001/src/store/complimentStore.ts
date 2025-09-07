import { create } from 'zustand'

export interface Compliment {
  id: string
  content: string
  category: string
  chainCount: number
  reactions: number
  createdAt: Date
  isAnonymous: boolean
  color: string
}

interface ComplimentStats {
  totalCompliments: number
  activeChains: number
  todayCompliments: number
}

interface ComplimentStore {
  compliments: Compliment[]
  stats: ComplimentStats
  loading: boolean
  fetchCompliments: () => void
  addCompliment: (content: string, category: string) => void
  chainCompliment: (id: string) => void
  reactToCompliment: (id: string) => void
}

const mockCompliments: Compliment[] = [
  {
    id: '1',
    content: '당신의 미소가 세상을 밝게 만들어요!',
    category: '격려',
    chainCount: 12,
    reactions: 45,
    createdAt: new Date(),
    isAnonymous: true,
    color: 'bg-gradient-to-br from-pink-400 to-purple-400'
  },
  {
    id: '2',
    content: '오늘도 수고했어요. 당신은 정말 대단해요!',
    category: '위로',
    chainCount: 8,
    reactions: 32,
    createdAt: new Date(),
    isAnonymous: true,
    color: 'bg-gradient-to-br from-blue-400 to-cyan-400'
  },
  {
    id: '3',
    content: '당신의 노력이 분명 좋은 결과를 가져올 거예요',
    category: '응원',
    chainCount: 15,
    reactions: 67,
    createdAt: new Date(),
    isAnonymous: true,
    color: 'bg-gradient-to-br from-green-400 to-teal-400'
  }
]

export const useComplimentStore = create<ComplimentStore>((set) => ({
  compliments: [],
  stats: {
    totalCompliments: 156,
    activeChains: 23,
    todayCompliments: 42
  },
  loading: false,
  
  fetchCompliments: () => {
    set({ loading: true })
    // Simulate API call
    setTimeout(() => {
      set({ compliments: mockCompliments, loading: false })
    }, 500)
  },
  
  addCompliment: (content: string, category: string) => {
    const colors = [
      'bg-gradient-to-br from-pink-400 to-purple-400',
      'bg-gradient-to-br from-blue-400 to-cyan-400',
      'bg-gradient-to-br from-green-400 to-teal-400',
      'bg-gradient-to-br from-yellow-400 to-orange-400',
      'bg-gradient-to-br from-indigo-400 to-purple-400'
    ]
    
    const newCompliment: Compliment = {
      id: Date.now().toString(),
      content,
      category,
      chainCount: 0,
      reactions: 0,
      createdAt: new Date(),
      isAnonymous: true,
      color: colors[Math.floor(Math.random() * colors.length)]
    }
    
    set((state) => ({
      compliments: [newCompliment, ...state.compliments],
      stats: {
        ...state.stats,
        totalCompliments: state.stats.totalCompliments + 1,
        todayCompliments: state.stats.todayCompliments + 1
      }
    }))
  },
  
  chainCompliment: (id: string) => {
    set((state) => ({
      compliments: state.compliments.map(c =>
        c.id === id ? { ...c, chainCount: c.chainCount + 1 } : c
      ),
      stats: {
        ...state.stats,
        activeChains: state.stats.activeChains + 1
      }
    }))
  },
  
  reactToCompliment: (id: string) => {
    set((state) => ({
      compliments: state.compliments.map(c =>
        c.id === id ? { ...c, reactions: c.reactions + 1 } : c
      )
    }))
  }
}))