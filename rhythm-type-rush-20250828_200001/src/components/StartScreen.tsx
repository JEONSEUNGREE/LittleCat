import { Music, Zap, Trophy, Play } from 'lucide-react'

interface StartScreenProps {
  onStart: () => void
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Music className="w-20 h-20 text-rhythm-purple animate-pulse-strong" />
          <Zap className="w-10 h-10 text-yellow-400 absolute -top-2 -right-2 animate-beat" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow-glow">
        Rhythm Type Rush
      </h1>
      
      <p className="text-white/80 mb-8 text-lg">
        타이핑과 리듬이 만나는 새로운 게임!
      </p>
      
      <div className="space-y-4 mb-8">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h3 className="font-semibold text-white mb-2">게임 방법</h3>
          <ul className="text-white/70 text-sm space-y-1 text-left">
            <li>• 떨어지는 단어를 빠르게 타이핑하세요</li>
            <li>• 콤보를 쌓아 더 높은 점수를 획득하세요</li>
            <li>• 리듬에 맞춰 타이핑하면 보너스 점수!</li>
          </ul>
        </div>
        
        <div className="flex justify-around">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-1" />
            <p className="text-white/70 text-sm">최고 기록</p>
            <p className="text-white font-bold">도전하세요!</p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-1" />
            <p className="text-white/70 text-sm">콤보 시스템</p>
            <p className="text-white font-bold">x10 까지!</p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onStart}
        className="w-full py-4 bg-gradient-to-r from-rhythm-purple to-rhythm-pink rounded-xl font-bold text-white text-lg shadow-lg transform transition-all hover:scale-105 active:scale-95 neon-glow flex items-center justify-center gap-2"
      >
        <Play className="w-6 h-6" />
        게임 시작
      </button>
    </div>
  )
}

export default StartScreen