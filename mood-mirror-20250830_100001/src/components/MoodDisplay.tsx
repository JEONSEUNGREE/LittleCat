import React, { useEffect, useState } from 'react'
import { Eye, EyeOff, Share2, Users } from 'lucide-react'
import useMoodStore from '../store/useMoodStore'
import { getMoodGradient, formatTimeAgo } from '../utils/moodUtils'

const MoodDisplay: React.FC = () => {
  const { currentMood, isSharing, toggleSharing, moodHistory } = useMoodStore()
  const [pulseAnimation, setPulseAnimation] = useState(false)
  
  useEffect(() => {
    if (currentMood) {
      setPulseAnimation(true)
      const timer = setTimeout(() => setPulseAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [currentMood])
  
  if (!currentMood) {
    return (
      <div className="w-full max-w-md mx-auto p-8 glass-effect rounded-2xl shadow-xl">
        <div className="text-center text-gray-400">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700/50 animate-pulse" />
          <p className="text-lg">감정을 선택해주세요</p>
          <p className="text-sm mt-2">당신의 감정이 색상으로 표현됩니다</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-6 glass-effect rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">현재 나의 감정</h3>
        <button
          onClick={toggleSharing}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all
            ${isSharing 
              ? 'bg-green-500/20 text-green-400 border border-green-400/50' 
              : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'}
          `}
        >
          {isSharing ? (
            <>
              <Eye className="w-4 h-4" />
              <span className="text-sm">공유중</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span className="text-sm">비공개</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <div 
          className={`
            w-48 h-48 mx-auto rounded-full
            bg-gradient-to-br ${getMoodGradient(currentMood.emotion)}
            ${pulseAnimation ? 'animate-ping' : 'animate-pulse-slow'}
            shadow-2xl
          `}
          style={{
            opacity: currentMood.intensity / 100,
            filter: `blur(${100 - currentMood.intensity}px)`
          }}
        />
        
        <div 
          className={`
            absolute inset-0 w-48 h-48 mx-auto rounded-full
            bg-gradient-to-br ${getMoodGradient(currentMood.emotion)}
            shadow-lg
          `}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-3xl font-bold text-white drop-shadow-lg">
                {currentMood.emotion}
              </p>
              <p className="text-sm text-white/80 mt-1">
                {currentMood.intensity}% 강도
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          <Share2 className="w-4 h-4 text-gray-300" />
          <span className="text-sm text-gray-300">공유하기</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          <Users className="w-4 h-4 text-gray-300" />
          <span className="text-sm text-gray-300">연결하기</span>
        </button>
      </div>
      
      {moodHistory.length > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-2">최근 감정 기록</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {moodHistory.slice(-5).reverse().map((mood) => (
              <div
                key={mood.id}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${mood.color}99, ${mood.color}66)`,
                  opacity: mood.intensity / 100
                }}
                title={`${mood.emotion} - ${formatTimeAgo(mood.timestamp)}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MoodDisplay