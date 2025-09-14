import { Rocket, Shield, Zap } from 'lucide-react'

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-space-dark to-space-blue flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-float">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-planet-green rounded-full mx-auto mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
              <div className="absolute top-6 left-8 w-8 h-8 bg-green-600 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 right-6 w-6 h-6 bg-green-700 rounded-full opacity-50"></div>
              <div className="absolute top-12 right-10 w-4 h-4 bg-green-800 rounded-full opacity-40"></div>
            </div>
            <div className="absolute -top-2 -right-2">
              <Shield className="w-8 h-8 text-laser-blue animate-pulse-slow" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-4 game-text-shadow">
            PLANET
          </h1>
          <h2 className="text-3xl sm:text-4xl font-black text-laser-blue game-text-shadow">
            DEFENDER
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-laser-blue/30">
            <h3 className="text-laser-yellow font-bold mb-2 flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              게임 방법
            </h3>
            <ul className="text-white/90 text-sm space-y-1">
              <li>• 터치하여 대포 방향 조절</li>
              <li>• 적을 제거하여 행성 보호</li>
              <li>• 웨이브가 진행될수록 난이도 상승</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-laser-blue/30">
            <h3 className="text-laser-yellow font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              파워업
            </h3>
            <ul className="text-white/90 text-sm space-y-1">
              <li>• 빠른 발사 속도</li>
              <li>• 트리플 샷</li>
              <li>• 레이저 파워</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-planet-green to-emerald-600 text-white font-bold text-xl rounded-lg neon-glow transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          게임 시작
        </button>

        <p className="text-center text-white/60 text-xs mt-4">
          터치로 조작하는 360° 디펜스 게임
        </p>
      </div>
    </div>
  )
}