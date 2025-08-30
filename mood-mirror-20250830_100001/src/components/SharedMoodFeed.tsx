import React, { useEffect, useState } from 'react'
import { Users, TrendingUp, Clock } from 'lucide-react'
import useMoodStore from '../store/useMoodStore'
import { getMoodGradient, formatTimeAgo, generateMoodId, MOOD_TYPES, calculateMoodSimilarity } from '../utils/moodUtils'
import type { Mood } from '../store/useMoodStore'

const SharedMoodFeed: React.FC = () => {
  const { sharedMoods, addSharedMood, currentMood, addConnection } = useMoodStore()
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null)
  
  // 가상의 다른 사용자 감정 시뮬레이션
  useEffect(() => {
    const simulateMoods = () => {
      const randomMood = MOOD_TYPES[Math.floor(Math.random() * MOOD_TYPES.length)]
      const newMood: Mood = {
        id: generateMoodId(),
        emotion: randomMood.emotion,
        color: randomMood.color,
        intensity: Math.floor(Math.random() * 100),
        timestamp: new Date(),
        anonymous: true
      }
      addSharedMood(newMood)
    }
    
    // 초기 몇 개의 무드 추가
    for (let i = 0; i < 5; i++) {
      setTimeout(() => simulateMoods(), i * 1000)
    }
    
    // 주기적으로 새로운 무드 추가
    const interval = setInterval(simulateMoods, 15000)
    return () => clearInterval(interval)
  }, [addSharedMood])
  
  const handleConnect = (mood: Mood) => {
    if (!currentMood) return
    
    const similarity = calculateMoodSimilarity(currentMood.emotion, mood.emotion)
    addConnection({
      id: generateMoodId(),
      userMoodId: currentMood.id,
      connectedMoodId: mood.id,
      similarity
    })
  }
  
  const filteredMoods = filterEmotion 
    ? sharedMoods.filter(mood => mood.emotion === filterEmotion)
    : sharedMoods
  
  return (
    <div className="w-full max-w-md mx-auto p-6 glass-effect rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          감정의 거울
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span>{sharedMoods.length} 감정</span>
        </div>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        <button
          onClick={() => setFilterEmotion(null)}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0
            ${!filterEmotion 
              ? 'bg-white text-gray-900' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'}
          `}
        >
          전체
        </button>
        {MOOD_TYPES.map(mood => (
          <button
            key={mood.emotion}
            onClick={() => setFilterEmotion(mood.emotion)}
            className={`
              px-3 py-1 rounded-full text-xs font-medium transition-all flex-shrink-0
              ${filterEmotion === mood.emotion
                ? `bg-gradient-to-r ${mood.gradient} text-white`
                : 'bg-white/10 text-gray-300 hover:bg-white/20'}
            `}
          >
            {mood.emotion}
          </button>
        ))}
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredMoods.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>아직 공유된 감정이 없습니다</p>
            <p className="text-sm mt-1">첫 번째로 감정을 공유해보세요!</p>
          </div>
        ) : (
          filteredMoods.map((mood) => (
            <div
              key={mood.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMoodGradient(mood.emotion)} shadow-lg`}
                  style={{ opacity: mood.intensity / 100 }}
                />
                <div>
                  <p className="text-white font-medium">{mood.emotion}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{mood.intensity}%</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(mood.timestamp)}</span>
                  </div>
                </div>
              </div>
              {currentMood && mood.id !== currentMood.id && (
                <button
                  onClick={() => handleConnect(mood)}
                  className="px-3 py-1 text-xs bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-gray-300"
                >
                  연결
                </button>
              )}
            </div>
          ))
        )}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default SharedMoodFeed