import { useState, useEffect } from 'react'
import { RefreshCw, TrendingUp, Clock, Shuffle } from 'lucide-react'
import { useWishStore } from '../store/wishStore'
import { WishCard } from './WishCard'

type SortType = 'recent' | 'popular' | 'random'

export const WishWall: React.FC = () => {
  const { wishes, starredWishes, starWish, unstarWish } = useWishStore()
  const [sortType, setSortType] = useState<SortType>('recent')
  const [displayedWishes, setDisplayedWishes] = useState(wishes)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    sortWishes()
  }, [sortType, wishes])

  const sortWishes = () => {
    let sorted = [...wishes]
    
    switch (sortType) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popular':
        sorted.sort((a, b) => b.stars - a.stars)
        break
      case 'random':
        sorted.sort(() => Math.random() - 0.5)
        break
    }
    
    setDisplayedWishes(sorted)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      if (sortType === 'random') {
        sortWishes()
      }
      setIsRefreshing(false)
    }, 500)
  }

  const sortButtons = [
    { type: 'recent' as SortType, label: '최신순', icon: Clock },
    { type: 'popular' as SortType, label: '인기순', icon: TrendingUp },
    { type: 'random' as SortType, label: '랜덤', icon: Shuffle },
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">소원의 벽</h2>
        <div className="flex items-center gap-2">
          <div className="flex bg-white/10 rounded-full p-1">
            {sortButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <button
                  key={btn.type}
                  onClick={() => setSortType(btn.type)}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm transition-all ${
                    sortType === btn.type
                      ? 'bg-white/30 text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{btn.label}</span>
                </button>
              )
            })}
          </div>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedWishes.map((wish) => (
          <WishCard
            key={wish.id}
            wish={wish}
            isStarred={starredWishes.includes(wish.id)}
            onStar={() => starWish(wish.id)}
            onUnstar={() => unstarWish(wish.id)}
          />
        ))}
      </div>

      {displayedWishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">아직 소원이 없어요. 첫 번째 소원을 빌어보세요!</p>
        </div>
      )}
    </div>
  )
}