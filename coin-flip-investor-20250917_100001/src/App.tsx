import React from 'react';

import { Coins, ChartLine, BookOpen } from 'lucide-react';
import { CoinFlip } from './components/CoinFlip';
import { Stats } from './components/Stats';
import { Strategy } from './components/Strategy';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Coin Flip Investor
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  확률로 배우는 투자 심리학
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChartLine className="w-5 h-5 text-blue-600" />
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 게임 영역 */}
          <div className="lg:col-span-1">
            <CoinFlip />
          </div>

          {/* 통계 영역 */}
          <div className="lg:col-span-1">
            <Stats />
          </div>

          {/* 전략 설정 영역 */}
          <div className="lg:col-span-1">
            <Strategy />
          </div>
        </div>

        {/* 교육 콘텐츠 */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            투자 심리 학습
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">손실 회피 편향</h3>
              <p className="text-sm text-blue-700">
                손실을 이익보다 더 크게 느끼는 심리. 패배 후 더 큰 베팅으로 이어질 수 있습니다.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">도박사의 오류</h3>
              <p className="text-sm text-green-700">
                연속된 결과가 다음 결과에 영향을 준다고 믿는 오류. 각 던지기는 독립적입니다.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">확증 편향</h3>
              <p className="text-sm text-purple-700">
                자신의 믿음을 확인하는 정보만 주목하는 경향. 객관적 분석이 중요합니다.
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">💡 핵심 교훈:</span> 실제 투자에서는 감정을 배제하고 
              체계적인 전략과 리스크 관리가 성공의 열쇠입니다. 이 시뮬레이션을 통해 
              다양한 투자 전략의 결과를 경험해보세요.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;