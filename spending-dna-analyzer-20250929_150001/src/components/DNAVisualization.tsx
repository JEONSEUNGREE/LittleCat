import React from 'react';
import { Dna, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { SpendingDNA } from '../types';

interface DNAVisualizationProps {
  dna: SpendingDNA | null;
}

const DNAVisualization: React.FC<DNAVisualizationProps> = ({ dna }) => {
  if (!dna) {
    return (
      <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Dna className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <p className="text-lg opacity-80">거래 데이터를 추가하여 DNA 분석을 시작하세요</p>
          </div>
        </div>
      </div>
    );
  }

  const getTrendIcon = () => {
    switch (dna.evolutionTrend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getRiskColor = () => {
    switch (dna.riskProfile) {
      case 'conservative':
        return 'text-green-400';
      case 'aggressive':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      food: '🍔',
      transport: '🚗',
      shopping: '🛍️',
      entertainment: '🎮',
      bills: '📱',
      health: '💊',
      education: '📚',
      savings: '💰',
      investment: '📈',
      other: '📦',
      balanced: '⚖️',
      diverse: '🌈',
    };
    return emojiMap[category] || '📊';
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-6 md:p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <Dna className="w-8 h-8" />
          당신의 지출 DNA
        </h2>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className="text-sm opacity-80">
            {dna.evolutionTrend === 'improving' ? '개선 중' :
             dna.evolutionTrend === 'declining' ? '악화 중' : '안정적'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DNA Helix Visual */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-3xl"></div>
          <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">주요 유전자</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryEmoji(dna.dominantGene)}</span>
                  <span className="font-bold capitalize">{dna.dominantGene}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">보조 유전자</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getCategoryEmoji(dna.secondaryGene)}</span>
                  <span className="font-semibold capitalize">{dna.secondaryGene}</span>
                </div>
              </div>
              <div className="h-px bg-white bg-opacity-20"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">위험 성향</span>
                <span className={`font-bold capitalize ${getRiskColor()}`}>
                  {dna.riskProfile === 'conservative' ? '안정형' :
                   dna.riskProfile === 'aggressive' ? '공격형' : '중립형'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">저축률</span>
              <span className="font-bold text-lg">{dna.savingsRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, dna.savingsRate)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-80">일관성 점수</span>
              <span className="font-bold text-lg">{dna.consistencyScore.toFixed(0)}/100</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${dna.consistencyScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-20">
            <p className="text-sm opacity-80 mb-2">DNA 프로필 요약</p>
            <p className="text-xs leading-relaxed">
              당신은 <span className="font-bold text-yellow-300">{getCategoryEmoji(dna.dominantGene)} {dna.dominantGene}</span>에 
              주로 지출하는 <span className={`font-bold ${getRiskColor()}`}>{dna.riskProfile === 'conservative' ? '안정적인' : dna.riskProfile === 'aggressive' ? '적극적인' : '균형잡힌'}</span> 소비자입니다.
              현재 저축률은 <span className="font-bold text-green-400">{dna.savingsRate.toFixed(1)}%</span>이며, 
              소비 패턴이 <span className="font-bold">{dna.evolutionTrend === 'improving' ? '개선되고' : dna.evolutionTrend === 'declining' ? '나빠지고' : '유지되고'}</span> 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNAVisualization;