import React from 'react'
import { Star, Heart, Sparkles } from 'lucide-react'
import { Wish } from '../store/wishStore'

interface WishCardProps {
  wish: Wish
  isStarred: boolean
  onStar: () => void
  onUnstar: () => void
}

const categoryIcons = {
  dream: '✨',
  love: '❤️',
  success: '🎯',
  health: '🌱',
  peace: '🕊️',
  other: '🌟',
}

const categoryLabels = {
  dream: '꿈',
  love: '사랑',
  success: '성공',
  health: '건강',
  peace: '평화',
  other: '기타',
}

export const WishCard: React.FC<WishCardProps> = ({
  wish,
  isStarred,
  onStar,
  onUnstar,
}) => {
  const handleStarClick = () => {
    if (isStarred) {
      onUnstar()
    } else {
      onStar()
    }
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}분 전`
    } else if (hours < 24) {
      return `${hours}시간 전`
    } else {
      const days = Math.floor(hours / 24)
      return `${days}일 전`
    }
  }

  return (
    <div className={`relative p-6 rounded-2xl ${wish.color} shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}>
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span className="text-2xl">{categoryIcons[wish.category]}</span>
        <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full">
          {categoryLabels[wish.category]}
        </span>
      </div>
      
      <div className="mt-4 mb-6">
        <p className="text-white text-lg font-medium leading-relaxed">
          {wish.content}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          onClick={handleStarClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
            isStarred
              ? 'bg-yellow-400 text-yellow-900'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          {isStarred ? (
            <>
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{wish.stars}</span>
            </>
          ) : (
            <>
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">{wish.stars}</span>
            </>
          )}
        </button>
        
        <span className="text-xs text-white/60">
          {getTimeAgo(wish.createdAt)}
        </span>
      </div>
      
      {isStarred && (
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-sparkle" />
        </div>
      )}
    </div>
  )
}