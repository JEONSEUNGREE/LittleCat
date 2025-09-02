import { create } from 'zustand'

export interface Wish {
  id: string
  content: string
  category: 'dream' | 'love' | 'success' | 'health' | 'peace' | 'other'
  stars: number
  createdAt: Date
  color: string
}

interface WishStore {
  wishes: Wish[]
  myWishes: string[]
  starredWishes: string[]
  addWish: (content: string, category: Wish['category']) => void
  starWish: (id: string) => void
  unstarWish: (id: string) => void
  getRandomWishes: (count: number) => Wish[]
}

const getRandomColor = () => {
  const colors = [
    'bg-gradient-to-br from-purple-400 to-pink-400',
    'bg-gradient-to-br from-blue-400 to-cyan-400',
    'bg-gradient-to-br from-green-400 to-emerald-400',
    'bg-gradient-to-br from-yellow-400 to-orange-400',
    'bg-gradient-to-br from-pink-400 to-rose-400',
    'bg-gradient-to-br from-indigo-400 to-purple-400',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const initialWishes: Wish[] = [
  {
    id: '1',
    content: '세계 여행을 떠나고 싶어요',
    category: 'dream',
    stars: 42,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    color: getRandomColor(),
  },
  {
    id: '2',
    content: '사랑하는 사람과 평생 함께하고 싶어요',
    category: 'love',
    stars: 38,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    color: getRandomColor(),
  },
  {
    id: '3',
    content: '건강한 삶을 살고 싶어요',
    category: 'health',
    stars: 56,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    color: getRandomColor(),
  },
  {
    id: '4',
    content: '내가 만든 서비스로 많은 사람들을 행복하게 하고 싶어요',
    category: 'success',
    stars: 29,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    color: getRandomColor(),
  },
  {
    id: '5',
    content: '세상이 더 평화로워지길 바라요',
    category: 'peace',
    stars: 67,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    color: getRandomColor(),
  },
]

export const useWishStore = create<WishStore>((set, get) => ({
  wishes: initialWishes,
  myWishes: [],
  starredWishes: [],
  
  addWish: (content, category) => {
    const newWish: Wish = {
      id: Date.now().toString(),
      content,
      category,
      stars: 0,
      createdAt: new Date(),
      color: getRandomColor(),
    }
    
    set((state) => ({
      wishes: [newWish, ...state.wishes],
      myWishes: [...state.myWishes, newWish.id],
    }))
  },
  
  starWish: (id) => {
    set((state) => ({
      wishes: state.wishes.map((wish) =>
        wish.id === id ? { ...wish, stars: wish.stars + 1 } : wish
      ),
      starredWishes: [...state.starredWishes, id],
    }))
  },
  
  unstarWish: (id) => {
    set((state) => ({
      wishes: state.wishes.map((wish) =>
        wish.id === id ? { ...wish, stars: Math.max(0, wish.stars - 1) } : wish
      ),
      starredWishes: state.starredWishes.filter((wishId) => wishId !== id),
    }))
  },
  
  getRandomWishes: (count) => {
    const wishes = get().wishes
    const shuffled = [...wishes].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  },
}))