import React from 'react'
import { Sparkles, RefreshCw, Hash } from 'lucide-react'
import { useFortuneStore } from '../store/useFortuneStore'

export const FortuneDisplay: React.FC = () => {
  const { currentFortune, isCracked, resetCookie } = useFortuneStore()
  
  if (!currentFortune || !isCracked) return null
  
  return (
    <div className={`mt-8 ${isCracked ? 'animate-unfold' : 'opacity-0'}`}>
      <div className="fortune-paper rounded-lg p-6 mx-4 max-w-md mx-auto">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-fortune-red text-white text-xs font-semibold rounded-full">
            <Sparkles size={12} />
            {currentFortune.category.toUpperCase()}
          </span>
        </div>
        
        {/* Fortune message */}
        <div className="text-center mb-6">
          <p className="text-xl md:text-2xl text-fortune-dark font-serif italic leading-relaxed">
            "{currentFortune.message}"
          </p>
        </div>
        
        {/* Lucky numbers */}
        <div className="border-t border-amber-200 pt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Hash size={16} className="text-fortune-gold" />
            <span className="text-xs font-semibold text-fortune-dark">LUCKY NUMBERS</span>
          </div>
          <div className="flex justify-center gap-2">
            {currentFortune.luckyNumbers.map((num) => (
              <span 
                key={num} 
                className="inline-flex items-center justify-center w-10 h-10 bg-fortune-gold text-white font-bold rounded-full text-sm"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Reset button */}
      <div className="mt-6 text-center">
        <button
          onClick={resetCookie}
          className="inline-flex items-center gap-2 px-6 py-3 bg-fortune-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={18} />
          Get Another Fortune
        </button>
      </div>
    </div>
  )
}