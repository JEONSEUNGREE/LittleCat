import { ArrowLeft, RotateCcw, Star } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface GameHeaderProps {
  onBackToMenu: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ onBackToMenu }) => {
  const { currentLevel, moves, resetLevel, currentLevelData } = useGameStore();

  return (
    <div className="absolute top-0 left-0 right-0 z-30 p-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-shadow-dark/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToMenu}
              className="p-2 rounded-lg bg-shadow/50 hover:bg-shadow transition-colors"
              aria-label="메뉴로 돌아가기"
            >
              <ArrowLeft className="text-light" size={20} />
            </button>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-xs text-light/60">레벨</p>
                <p className="text-lg font-bold text-light">{currentLevel}</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-light/60">이동</p>
                <p className="text-lg font-bold text-light-bright">{moves}</p>
              </div>

              {currentLevelData && (
                <div className="flex gap-1">
                  {[
                    currentLevelData.stars.three,
                    currentLevelData.stars.two,
                    currentLevelData.stars.one,
                  ].map((starMoves, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={`${
                        moves <= starMoves
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={resetLevel}
              className="p-2 rounded-lg bg-shadow/50 hover:bg-shadow transition-colors"
              aria-label="레벨 초기화"
            >
              <RotateCcw className="text-light" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;