import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const CoinFlip: React.FC = () => {
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails'>('heads');
  const { 
    balance, 
    betAmount, 
    isFlipping, 
    flipCoin, 
    setBetAmount,
    winStreak,
    lossStreak,
  } = useGameStore();

  const handleFlip = () => {
    if (balance >= betAmount && !isFlipping) {
      flipCoin(selectedSide);
    }
  };

  const handleBetChange = (value: number) => {
    const newBet = Math.min(Math.max(10, value), balance);
    setBetAmount(newBet);
  };

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">코인 플립 투자</h2>
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-xl font-semibold text-gray-700">
              잔액: ₩{balance.toLocaleString()}
            </span>
          </div>
          {winStreak > 0 && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">{winStreak}연승</span>
            </div>
          )}
          {lossStreak > 0 && (
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">{lossStreak}연패</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl ${isFlipping ? 'flip-animation' : ''}`}>
            <div className="w-full h-full flex items-center justify-center text-white">
              <span className="text-4xl font-bold">
                {selectedSide === 'heads' ? 'H' : 'T'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setSelectedSide('heads')}
            disabled={isFlipping}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              selectedSide === 'heads'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${isFlipping ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            앞면 (H)
          </button>
          <button
            onClick={() => setSelectedSide('tails')}
            disabled={isFlipping}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              selectedSide === 'tails'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${isFlipping ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            뒷면 (T)
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          베팅 금액: ₩{betAmount.toLocaleString()}
        </label>
        <input
          type="range"
          min="10"
          max={balance}
          step="10"
          value={betAmount}
          onChange={(e) => handleBetChange(Number(e.target.value))}
          disabled={isFlipping || balance < 10}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₩10</span>
          <span>₩{balance.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handleFlip}
        disabled={isFlipping || balance < betAmount}
        className={`w-full btn-primary ${
          isFlipping || balance < betAmount
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
      >
        {isFlipping ? '플리핑 중...' : '투자하기'}
      </button>

      {balance < betAmount && balance > 0 && (
        <p className="text-center text-red-600 text-sm mt-2">
          베팅 금액을 줄여주세요
        </p>
      )}
      {balance <= 0 && (
        <p className="text-center text-red-600 text-sm mt-2">
          게임 오버! 리셋 버튼을 눌러주세요
        </p>
      )}
    </div>
  );
};