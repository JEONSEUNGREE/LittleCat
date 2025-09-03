import React from 'react'
import { Play, Trophy, Sparkles, Zap, Target } from 'lucide-react'
import { useGameStore, Difficulty } from '../store/gameStore'

export const MainMenu: React.FC = () => {
  const { startGame, setDifficulty, difficulty, highScore } = useGameStore()
  
  const difficulties: { value: Difficulty; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'easy', label: '쉬움', icon: <Sparkles className="w-4 h-4" />, color: 'bg-green-500' },
    { value: 'medium', label: '보통', icon: <Zap className="w-4 h-4" />, color: 'bg-yellow-500' },
    { value: 'hard', label: '어려움', icon: <Target className="w-4 h-4" />, color: 'bg-red-500' }
  ]
  
  const handleStart = () => {
    startGame()
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white animate-pulse">
          Pattern Flow Master
        </h1>
        <p className="text-white/80">화면에 나타나는 패턴을 따라 그리세요!</p>
      </div>
      
      {highScore > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-bold text-xl">최고 점수: {highScore}</span>
          </div>
        </div>
      )}
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-bold text-center">난이도 선택</h2>
        
        <div className="space-y-2">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setDifficulty(diff.value)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                difficulty === diff.value
                  ? 'bg-white/30 scale-105'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${diff.color}`}>
                  {diff.icon}
                </div>
                <span className="text-white font-medium">{diff.label}</span>
              </div>
              {difficulty === diff.value && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleStart}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
      >
        <Play className="w-6 h-6" />
        <span className="text-lg">게임 시작</span>
      </button>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-2">
        <h3 className="text-white font-bold text-center">게임 방법</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• 노란색 패턴을 2초 동안 기억하세요</li>
          <li>• 파란색 점들을 순서대로 연결하세요</li>
          <li>• 시간 내에 정확하게 그려야 합니다</li>
          <li>• 콤보를 쌓아 더 높은 점수를 얻으세요</li>
        </ul>
      </div>
    </div>
  )
}