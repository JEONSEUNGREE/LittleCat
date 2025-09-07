import { Heart, Link, MessageCircle, Share2 } from 'lucide-react'
import { Compliment } from '../store/complimentStore'
import { useComplimentStore } from '../store/complimentStore'
import { useState } from 'react'

interface ComplimentCardProps {
  compliment: Compliment
}

export default function ComplimentCard({ compliment }: ComplimentCardProps) {
  const { chainCompliment, reactToCompliment } = useComplimentStore()
  const [hasReacted, setHasReacted] = useState(false)
  const [isChaining, setIsChaining] = useState(false)

  const handleReact = () => {
    if (!hasReacted) {
      reactToCompliment(compliment.id)
      setHasReacted(true)
    }
  }

  const handleChain = () => {
    setIsChaining(true)
    chainCompliment(compliment.id)
    setTimeout(() => setIsChaining(false), 1000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '칭찬 릴레이',
          text: compliment.content,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share failed:', err)
      }
    }
  }

  return (
    <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 animate-fade-in">
      <div className={`h-32 ${compliment.color} rounded-xl mb-4 flex items-center justify-center p-4`}>
        <p className="text-white text-center font-medium">
          {compliment.content}
        </p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
          {compliment.category}
        </span>
        <span className="text-xs text-white/60">
          {compliment.isAnonymous ? '익명' : ''}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleReact}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
            hasReacted 
              ? 'bg-warm/20 text-warm' 
              : 'hover:bg-white/10 text-white/70'
          }`}
        >
          <Heart size={16} fill={hasReacted ? 'currentColor' : 'none'} />
          <span className="text-sm">{compliment.reactions}</span>
        </button>

        <button
          onClick={handleChain}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
            isChaining 
              ? 'bg-secondary/20 text-secondary animate-pulse' 
              : 'hover:bg-white/10 text-white/70'
          }`}
        >
          <Link size={16} />
          <span className="text-sm">{compliment.chainCount}</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70"
        >
          <Share2 size={16} />
        </button>
      </div>
    </div>
  )
}