import React from 'react'
import { TrendingUp, Info, Settings, Share2 } from 'lucide-react'

const Header: React.FC = () => {
  const [showInfo, setShowInfo] = React.useState(false)

  return (
    <>
      <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Math Formula Viz</h1>
                <p className="text-xs md:text-sm text-white/80">수학 공식 시각화 도구</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-smooth backdrop-blur-sm"
                title="도움말"
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-smooth backdrop-blur-sm"
                title="설정"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-smooth backdrop-blur-sm"
                title="공유"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showInfo && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 animate-slide-in">
          <div className="container mx-auto">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm text-blue-800">
                <p className="font-semibold mb-1">사용 방법</p>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>• 수식 입력: x를 변수로 사용 (예: x^2, sin(x), 2*x+1)</li>
                  <li>• 지원 함수: sin, cos, tan, log, exp, sqrt, abs 등</li>
                  <li>• 여러 그래프를 동시에 표시하고 비교할 수 있습니다</li>
                  <li>• 줌 인/아웃과 화면 맞춤 기능을 활용하세요</li>
                </ul>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-blue-600 hover:text-blue-800 transition-smooth"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header