import { Heart, Info } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <header className="relative">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-full animate-pulse-soft">
              <Heart size={28} className="text-warm" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">칭찬 릴레이</h1>
              <p className="text-sm text-white/70">긍정의 에너지를 전파하세요</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Info size={24} />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {showInfo && (
        <div className="absolute top-full right-4 mt-2 p-4 glass-card max-w-sm animate-slide-up z-50">
          <h3 className="font-bold mb-2">칭찬 릴레이란?</h3>
          <p className="text-sm text-white/80 mb-3">
            익명으로 따뜻한 칭찬을 주고받으며 긍정적인 에너지를 
            전파하는 소셜 플랫폼입니다.
          </p>
          <ul className="text-sm text-white/70 space-y-1">
            <li>• 익명으로 안전하게 칭찬 공유</li>
            <li>• 칭찬 체인으로 긍정 에너지 확산</li>
            <li>• 하루를 밝게 만드는 따뜻한 커뮤니티</li>
          </ul>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 text-xs text-white/60 hover:text-white"
          >
            닫기
          </button>
        </div>
      )}
    </header>
  )
}