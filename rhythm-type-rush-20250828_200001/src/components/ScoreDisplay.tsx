import { Trophy, Zap, Target, X } from 'lucide-react'
import useGameStore from '../store/gameStore'

function ScoreDisplay() {
  const { score, maxCombo, typedWords, missedWords } = useGameStore()
  const accuracy = typedWords + missedWords > 0 
    ? Math.round((typedWords / (typedWords + missedWords)) * 100)
    : 0
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 animate-pulse-strong">
      <div className="flex justify-center mb-6">
        <Trophy className="w-20 h-20 text-yellow-400 animate-beat" />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-shadow-glow">
        게임 종료!
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-rhythm-purple/50 to-rhythm-pink/50 rounded-xl p-4 border border-white/20">
          <p className="text-white/80 text-sm mb-1">최종 점수</p>
          <p className="text-4xl font-bold text-white">{score}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <p className="text-white/80 text-sm">최대 콤보</p>
            </div>
            <p className="text-2xl font-bold text-white">x{maxCombo}</p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <p className="text-white/80 text-sm">정확도</p>
            </div>
            <p className="text-2xl font-bold text-white">{accuracy}%</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <p className="text-white/80 text-sm mb-1">성공한 단어</p>
            <p className="text-xl font-bold text-green-400">{typedWords}</p>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-1">
              <X className="w-4 h-4 text-red-400" />
              <p className="text-white/80 text-sm">놓친 단어</p>
            </div>
            <p className="text-xl font-bold text-red-400">{missedWords}</p>
          </div>
        </div>
      </div>
      
      <p className="text-white/60 text-sm mt-6">
        잠시 후 메인 화면으로 돌아갑니다...
      </p>
    </div>
  )
}

export default ScoreDisplay