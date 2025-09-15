import { Star, ChevronRight, Home } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface WinModalProps {
  onNextLevel: () => void;
  onBackToMenu: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ onNextLevel, onBackToMenu }) => {
  const { stars, moves, currentLevel, totalScore } = useGameStore();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-shadow to-shadow-dark rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-float">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-light-warm mb-4">
            레벨 완료!
          </h2>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                size={40}
                className={`${
                  star <= stars
                    ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="bg-shadow-dark/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-light/60 text-sm">이동 횟수</p>
                <p className="text-2xl font-bold text-light">{moves}</p>
              </div>
              <div>
                <p className="text-light/60 text-sm">획득 점수</p>
                <p className="text-2xl font-bold text-light-bright">
                  +{stars * 100}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-light/60 text-sm">총 점수</p>
              <p className="text-3xl font-bold text-light-warm">{totalScore}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBackToMenu}
              className="flex-1 py-3 px-4 bg-shadow/50 hover:bg-shadow rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Home size={20} className="text-light" />
              <span className="text-light font-medium">메뉴</span>
            </button>
            
            {currentLevel < 3 && (
              <button
                onClick={onNextLevel}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-light-bright to-light hover:from-light to-light-bright rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span className="text-shadow-dark font-bold">다음</span>
                <ChevronRight size={20} className="text-shadow-dark" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;