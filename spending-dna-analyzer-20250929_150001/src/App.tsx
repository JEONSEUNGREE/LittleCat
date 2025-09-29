import React, { useEffect } from 'react';
import { Dna, TrendingUp, Brain, Target } from 'lucide-react';
import DNAVisualization from './components/DNAVisualization';
import TransactionList from './components/TransactionList';
import PersonalityRadar from './components/PersonalityRadar';
import GoalsTracker from './components/GoalsTracker';
import useStore from './store/useStore';

function App() {
  const { spendingDNA, analyzeSpendingDNA } = useStore();

  useEffect(() => {
    // Initial DNA analysis
    analyzeSpendingDNA();
  }, [analyzeSpendingDNA]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                <Dna className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Spending DNA Analyzer
                </h1>
                <p className="text-xs text-gray-600">지출 습관 DNA 분석기</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">실시간 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">AI 기반</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700">목표 관리</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* DNA Visualization */}
            <section>
              <DNAVisualization dna={spendingDNA} />
            </section>

            {/* Personality Radar */}
            <section>
              <PersonalityRadar />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Transaction List */}
            <section>
              <TransactionList />
            </section>

            {/* Goals Tracker */}
            <section>
              <GoalsTracker />
            </section>
          </div>
        </div>

        {/* Mobile Stats Bar */}
        <div className="mt-8 lg:hidden">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {spendingDNA?.savingsRate.toFixed(0) || 0}%
                </p>
                <p className="text-xs text-gray-600">저축률</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-600">
                  {spendingDNA?.consistencyScore.toFixed(0) || 0}
                </p>
                <p className="text-xs text-gray-600">일관성</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">
                  {spendingDNA?.riskProfile === 'conservative' ? '안정' :
                   spendingDNA?.riskProfile === 'aggressive' ? '공격' : '중립'}
                </p>
                <p className="text-xs text-gray-600">성향</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2024 Spending DNA Analyzer. 당신의 소비 습관을 과학적으로 분석합니다.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;