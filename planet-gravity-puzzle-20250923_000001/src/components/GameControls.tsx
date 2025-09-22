import React from 'react';
import { Play, RotateCcw, Pause, Star, Info } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export default function GameControls() {
  const {
    level,
    spaceship,
    isPlaying,
    isPaused,
    adjustmentsUsed,
    levelComplete,
    levelFailed,
    stars,
    currentLevel,
    launchSpaceship,
    resetLevel,
    nextLevel,
    pauseGame,
    resumeGame,
  } = useGameStore();

  if (!level) return null;

  const earnedStars = stars[currentLevel] || 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-black/50 backdrop-blur-lg rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white font-bold text-lg">레벨 {level.id}: {level.name}</h2>
              <p className="text-gray-300 text-sm mt-1">{level.description}</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= earnedStars
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>중력 조정: {adjustmentsUsed} / {level.maxGravityAdjustments}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>목표: {adjustmentsUsed <= 1 ? '⭐⭐⭐' : adjustmentsUsed <= 3 ? '⭐⭐' : '⭐'}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {!spaceship.isLaunched && !levelComplete && !levelFailed && (
              <button
                onClick={launchSpaceship}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                발사
              </button>
            )}

            {isPlaying && !levelComplete && !levelFailed && (
              <button
                onClick={isPaused ? resumeGame : pauseGame}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Pause className="w-5 h-5" />
                {isPaused ? '계속' : '일시정지'}
              </button>
            )}

            {(levelComplete || levelFailed) && (
              <>
                <button
                  onClick={resetLevel}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  다시하기
                </button>
                {levelComplete && currentLevel < 5 && (
                  <button
                    onClick={nextLevel}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    다음 레벨
                  </button>
                )}
              </>
            )}

            {!isPlaying && spaceship.isLaunched && !levelComplete && !levelFailed && (
              <button
                onClick={resetLevel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                초기화
              </button>
            )}
          </div>
        </div>

        {levelComplete && (
          <div className="bg-green-600/90 backdrop-blur-lg rounded-lg p-4 text-center animate-bounce">
            <h3 className="text-white font-bold text-xl mb-2">레벨 완료!</h3>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 ${
                    star <= earnedStars
                      ? 'fill-yellow-400 text-yellow-400 animate-pulse'
                      : 'text-green-800'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/90">중력 조정 횟수: {adjustmentsUsed}회</p>
          </div>
        )}

        {levelFailed && (
          <div className="bg-red-600/90 backdrop-blur-lg rounded-lg p-4 text-center">
            <h3 className="text-white font-bold text-xl mb-2">실패!</h3>
            <p className="text-white/90">우주선이 충돌했거나 우주로 사라졌습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}